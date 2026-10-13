// Netlify auto-invokes this on every successful form submission (the filename
// "submission-created" is the magic). Two jobs:
//
// 1. Forward the submission to Cambria's Hub (HUB_INGEST_URL, signed with
//    HUB_INGEST_SECRET), where it lands in Messages and the team is told.
//    Reservations no longer come through Netlify Forms (the form books
//    through the hub directly); contact and job applications do.
// 2. Text the owner via Twilio, when the TWILIO_* env vars are set.
//
// Always returns 200 so Netlify's own email notifications are never blocked.

export const handler = async (event) => {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM, OWNER_SMS_TO, HUB_INGEST_URL, HUB_INGEST_SECRET } = process.env
  const BIZ = process.env.SMS_BIZ_NAME || "Cambria's"

  let payload = {}
  try {
    payload = JSON.parse(event.body || '{}').payload || {}
  } catch {
    return { statusCode: 200, body: 'bad payload' }
  }
  const form = payload.form_name || 'form'
  const d = payload.data || {}

  // ---- 1. The hub
  if (HUB_INGEST_URL && HUB_INGEST_SECRET) {
    try {
      const res = await fetch(HUB_INGEST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-hub-secret': HUB_INGEST_SECRET },
        body: JSON.stringify({ form, data: d, r: 'cambrias-bistro' }),
      })
      console.log('[hub] forwarded', form, res.status)
    } catch (e) {
      console.error('[hub] forward failed', e)
    }
  } else {
    console.log('[hub] HUB_INGEST_URL / HUB_INGEST_SECRET not set — not forwarded.')
  }

  // ---- 2. The text
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM || !OWNER_SMS_TO) {
    return { statusCode: 200, body: 'forwarded; sms skipped (twilio not configured)' }
  }
  const line = (label, v) => (v ? `\n${label}: ${v}` : '')
  let body
  if (form === 'reservation') {
    body = `${BIZ} — NEW RESERVATION` + line('Name', d.name) + line('Party', d.party) + line('When', [d.date, d.time].filter(Boolean).join(' ')) + line('Phone', d.phone) + line('Occasion', d.occasion) + line('Notes', d.notes)
  } else if (form === 'application') {
    body = `${BIZ} — JOB APPLICATION` + line('Name', d.name) + line('Position', d.position) + line('Availability', d.availability) + line('Phone', d.phone) + line('Email', d.email)
  } else {
    body = `${BIZ} — NEW MESSAGE` + line('Subject', d.subject) + line('Name', d.name) + line('Phone', d.phone) + line('Email', d.email) + (d.message ? `\nMessage: ${String(d.message).slice(0, 400)}` : '')
  }
  const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64')
  const params = new URLSearchParams({ To: OWNER_SMS_TO, From: TWILIO_FROM, Body: body })
  try {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
      method: 'POST',
      headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    })
    if (!res.ok) {
      console.error('[sms] Twilio error', res.status, await res.text())
      return { statusCode: 200, body: 'twilio error (logged)' }
    }
    return { statusCode: 200, body: 'sent' }
  } catch (e) {
    console.error('[sms] exception', e)
    return { statusCode: 200, body: 'exception (logged)' }
  }
}
