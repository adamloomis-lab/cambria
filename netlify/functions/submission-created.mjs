// Netlify auto-invokes this on every successful form submission (the filename
// "submission-created" is the magic). It texts the owner via Twilio with a
// concise, formatted message per form type. Dormant until the Twilio env vars
// are set, so it never errors before setup and never blocks Netlify's own
// email notifications (it always returns 200).
//
// Required env vars (set in Netlify once the Twilio account exists):
//   TWILIO_ACCOUNT_SID   AC...
//   TWILIO_AUTH_TOKEN    (secret)
//   TWILIO_FROM          +1XXXXXXXXXX  (your Twilio number)
//   OWNER_SMS_TO         +13302948325  (owner cell)
// Optional:
//   SMS_BIZ_NAME         defaults to "Cambria's"

export const handler = async (event) => {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM, OWNER_SMS_TO } = process.env
  const BIZ = process.env.SMS_BIZ_NAME || "Cambria's"

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM || !OWNER_SMS_TO) {
    console.log('[sms] Twilio env not configured yet — skipping SMS (email still sent by Netlify).')
    return { statusCode: 200, body: 'skipped: twilio not configured' }
  }

  let payload = {}
  try {
    payload = JSON.parse(event.body || '{}').payload || {}
  } catch {
    return { statusCode: 200, body: 'bad payload' }
  }

  const form = payload.form_name || 'form'
  const d = payload.data || {}
  const line = (label, v) => (v ? `\n${label}: ${v}` : '')

  let body
  if (form === 'reservation') {
    body =
      `${BIZ} — NEW RESERVATION` +
      line('Name', d.name) +
      line('Party', d.party) +
      line('When', [d.date, d.time].filter(Boolean).join(' ')) +
      line('Phone', d.phone) +
      line('Occasion', d.occasion) +
      line('Notes', d.notes)
  } else if (form === 'application') {
    body =
      `${BIZ} — JOB APPLICATION` +
      line('Name', d.name) +
      line('Position', d.position) +
      line('Availability', d.availability) +
      line('Phone', d.phone) +
      line('Email', d.email)
  } else {
    body =
      `${BIZ} — NEW MESSAGE` +
      line('Subject', d.subject) +
      line('Name', d.name) +
      line('Phone', d.phone) +
      line('Email', d.email) +
      (d.message ? `\nMessage: ${String(d.message).slice(0, 400)}` : '')
  }

  const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64')
  const params = new URLSearchParams({ To: OWNER_SMS_TO, From: TWILIO_FROM, Body: body })

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      },
    )
    if (!res.ok) {
      console.error('[sms] Twilio error', res.status, await res.text())
      return { statusCode: 200, body: 'twilio error (logged)' }
    }
    console.log('[sms] sent for', form)
    return { statusCode: 200, body: 'sent' }
  } catch (e) {
    console.error('[sms] exception', e)
    return { statusCode: 200, body: 'exception (logged)' }
  }
}
