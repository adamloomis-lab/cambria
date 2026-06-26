import Button from '../components/Button'
import Backdrop from '../components/Backdrop'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 pt-20 text-center">
      <Backdrop src="/images/interior-bar.webp" kenburns={false} />
      <div className="relative z-10">
        <p className="eyebrow on-dark">404</p>
        <h1 className="mt-4 font-display text-display-lg-mobile text-cream md:text-display-lg">
          This table seems to be empty
        </h1>
        <p className="mx-auto mt-5 max-w-md text-body-lg text-cream-soft">
          We couldn&rsquo;t find the page you were looking for. Let&rsquo;s get you back to the good stuff.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/" variant="cream">
            Back Home
          </Button>
          <Button href="/menu" variant="ghost">
            See the Menu
          </Button>
        </div>
      </div>
    </section>
  )
}
