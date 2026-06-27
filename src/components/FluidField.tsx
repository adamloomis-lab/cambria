import type { LucideIcon } from 'lucide-react'

// Shared "fluid" form controls for Cambria's Bistro, tuned for the warm crema
// paper surface: floating-label fields (oxblood underline + focus glow),
// single-select icon cards, a restyled light select, and an animated drawn
// checkmark for the personalized thank-you state. Reused across the Contact,
// Employment, and Reservations forms.
//
// All inputs are UNCONTROLLED (native `name`/`defaultValue`) so the existing
// Netlify Forms FormData submission keeps working exactly as before.

interface FloatFieldProps {
  name: string
  label: string
  type?: string
  required?: boolean
  textarea?: boolean
  rows?: number
  idPrefix?: string
  placeholder?: string
  defaultValue?: string
  pattern?: string
}

export function FloatField({
  name,
  label,
  type = 'text',
  required,
  textarea,
  rows = 5,
  idPrefix = 'f',
  defaultValue,
}: FloatFieldProps) {
  const id = `${idPrefix}-${name}`
  const input =
    'peer w-full bg-transparent px-4 pt-6 pb-2 font-body text-ink text-body-md placeholder-transparent outline-none'
  const labelCls =
    'pointer-events-none absolute left-4 top-4 origin-left font-sans text-ink-faint text-body-md transition-all duration-200 ' +
    'peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-gold-deep ' +
    'peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.16em] peer-[:not(:placeholder-shown)]:text-ink-faint'
  return (
    <div className="group relative border border-line bg-paper transition-all duration-300 focus-within:border-oxblood focus-within:shadow-[0_10px_30px_-14px_rgba(74,14,14,0.45)]">
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          placeholder=" "
          defaultValue={defaultValue}
          className={`${input} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          required={required}
          placeholder=" "
          defaultValue={defaultValue}
          className={input}
        />
      )}
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && <span className="ml-1 text-oxblood-light">*</span>}
      </label>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-0.5 w-[calc(100%-2rem)] -translate-x-1/2 scale-x-0 bg-oxblood transition-transform duration-300 peer-focus:scale-x-100"
      />
    </div>
  )
}

export interface IconOption {
  value: string
  label: string
  icon: LucideIcon
}

interface IconCardsProps {
  legend: string
  options: IconOption[]
  value: string
  onChange: (value: string) => void
  /** Grid columns at sm+ breakpoint (mobile is always 2-col). */
  smCols?: 2 | 3 | 4
  children?: React.ReactNode
}

// Single-select icon cards. Mobile = 2-col, sm+ configurable. Active card
// fills oxblood. The selected value is held by the parent and mirrored into a
// hidden input by the caller so Netlify receives the same field as the old
// <select>.
export function IconCards({ legend, options, value, onChange, smCols = 3, children }: IconCardsProps) {
  const smGrid = smCols === 4 ? 'sm:grid-cols-4' : smCols === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'
  return (
    <fieldset>
      <legend className="mb-3 block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
        {legend}
      </legend>
      <div className={`grid grid-cols-2 gap-2.5 ${smGrid}`}>
        {options.map((o) => {
          const active = value === o.value
          const Icon = o.icon
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? '' : o.value)}
              className={`flex flex-col items-start gap-2 border px-3.5 py-3.5 text-left font-sans text-body-md transition-all duration-200 active:scale-[0.98] ${
                active
                  ? 'border-oxblood bg-oxblood text-on-oxblood shadow-[0_12px_28px_-14px_rgba(74,14,14,0.75)]'
                  : 'border-line bg-paper text-ink hover:border-oxblood hover:bg-crema-soft'
              }`}
            >
              <Icon
                size={22}
                className={active ? 'text-gold-soft' : 'text-oxblood'}
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span className="text-[14px] font-medium leading-tight">{o.label}</span>
            </button>
          )
        })}
        {children}
      </div>
    </fieldset>
  )
}

interface LightSelectProps {
  name: string
  label: string
  options: string[]
  placeholder: string
  required?: boolean
  idPrefix?: string
  defaultValue?: string
}

// Light, restyled native select matching the fluid surface, for granular
// secondary fields (availability, party size, etc.). Stays uncontrolled.
export function LightSelect({
  name,
  label,
  options,
  placeholder,
  required,
  idPrefix = 'f',
  defaultValue = '',
}: LightSelectProps) {
  const id = `${idPrefix}-${name}`
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint"
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full appearance-none border border-line bg-paper px-4 py-3.5 font-body text-body-md text-ink transition-all duration-300 focus-visible:outline-none focus:border-oxblood focus:ring-1 focus:ring-oxblood/30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(112,99,96,0.8)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 16px center',
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

// Animated drawn checkmark for the personalized thank-you state (oxblood).
export function SuccessCheck() {
  return (
    <svg viewBox="0 0 52 52" className="h-14 w-14" aria-hidden="true">
      <circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke="var(--color-oxblood)"
        strokeWidth="3"
        strokeDasharray="151"
        strokeDashoffset="151"
        style={{ animation: 'cam-draw-check 0.6s ease forwards' }}
      />
      <path
        d="M15 27 l7 7 l15 -16"
        fill="none"
        stroke="var(--color-oxblood)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="40"
        strokeDashoffset="40"
        style={{ animation: 'cam-draw-check 0.4s 0.5s ease forwards' }}
      />
    </svg>
  )
}
