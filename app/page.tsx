import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock,
  MapPin,
  Phone,
  Quotes,
  Star,
} from "./components/site-icons";
import { ContactForm } from "./components/contact-form";
import { CoverageOrbit } from "./components/coverage-orbit";

const services = [
  {
    number: "01",
    title: "Life insurance",
    description:
      "Build a plan around the people who depend on you, without buying cover you do not need.",
    detail: "Family protection",
  },
  {
    number: "02",
    title: "Auto insurance",
    description:
      "Compare practical protection for the car you drive, the miles you cover, and the risks you actually face.",
    detail: "On-road confidence",
  },
  {
    number: "03",
    title: "Home insurance",
    description:
      "Protect your property and belongings with coverage shaped around how and where you live.",
    detail: "Property and belongings",
  },
  {
    number: "04",
    title: "Business insurance",
    description:
      "Understand the responsibilities around your clients, customers, team, and day-to-day operations.",
    detail: "Commercial risk",
  },
];

const amenities = [
  "Free consultation",
  "Wheelchair accessible",
  "Parking available",
  "Cards accepted",
];

export default function Home() {
  return (
    <main>
      <div className="ambient-grid" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="David Cutting Insurance Services home">
          <span className="brand-mark" aria-hidden="true">DC</span>
          <span className="brand-copy">
            <strong>David Cutting</strong>
            <small>Insurance Services</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#coverage">Coverage</a>
          <a href="#approach">Approach</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="header-call" href="tel:+19099858098">
          <Phone size={18} weight="regular" aria-hidden="true" />
          <span>(909) 985-8098</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="hero-index reveal reveal-one" aria-hidden="true">
            <span>DC / 34.0975° N</span>
            <span>117.6484° W / 2026</span>
          </div>
          <p className="eyebrow reveal reveal-one">Protection protocol / Upland, California</p>
          <h1 className="reveal reveal-two">
            Cover the <em>future</em> you are already building.
          </h1>
          <p className="hero-intro reveal reveal-three">
            David Cutting turns life, auto, home, and business risk into a coverage plan you can
            understand—one direct conversation at a time.
          </p>
          <div className="hero-actions reveal reveal-four">
            <a className="button button-dark" href="tel:+19099858098">
              Call David
              <ArrowUpRight size={19} weight="regular" aria-hidden="true" />
            </a>
            <a className="text-link" href="#coverage">
              Explore coverage
              <ArrowDown size={17} weight="regular" aria-hidden="true" />
            </a>
          </div>
          <div className="availability reveal reveal-four">
            <span className="availability-dot" aria-hidden="true" />
            <span>Open Monday–Friday</span>
            <span className="availability-time">9:00 AM–5:30 PM</span>
          </div>
        </div>

        <div className="hero-visual reveal reveal-two">
          <div className="hero-image-wrap">
            <Image
              src="/images/advisor-meeting.jpg"
              alt="An insurance advisor discussing documents with two clients"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 52vw"
              className="hero-image"
            />
            <div className="image-caption">
              <span>Human counsel / system 01</span>
              <strong>Calibrated around your needs</strong>
            </div>
          </div>
          <CoverageOrbit />
        </div>

        <p className="hero-side-note" aria-hidden="true">Clarity / before / coverage</p>
      </section>

      <section className="proof-bar" aria-label="Office amenities">
        <p>Service infrastructure / in person or by phone</p>
        <div>
          {amenities.map((amenity) => (
            <span key={amenity}>
              <Check size={15} weight="regular" aria-hidden="true" />
              {amenity}
            </span>
          ))}
        </div>
      </section>

      <div className="signal-marquee" aria-hidden="true">
        <div>
          <span>Life / Auto / Home / Business</span>
          <i>Protection built around real lives</i>
          <span>Life / Auto / Home / Business</span>
          <i>Protection built around real lives</i>
        </div>
      </div>

      <section className="coverage-section section-shell" id="coverage">
        <div className="section-kicker">
          <span>Coverage matrix / 01—04</span>
          <p>Four essentials. One person who can help you see the whole picture.</p>
        </div>

        <div className="coverage-heading">
          <p className="eyebrow">What David offers</p>
          <h2>Four protection systems. Calibrated to one life.</h2>
        </div>

        <div className="services-list">
          {services.map((service) => (
            <article className="service-row" key={service.title}>
              <span className="service-number">{service.number}</span>
              <div>
                <p className="service-detail">{service.detail}</p>
                <h3>{service.title}</h3>
              </div>
              <p>{service.description}</p>
              <a href="#contact" aria-label={`Ask about ${service.title}`}>
                <span>Discuss</span>
                <ArrowRight size={20} weight="regular" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="approach-section" id="approach">
        <div className="approach-image">
          <Image
            src="/images/small-business.jpg"
            alt="A small business owner helping a customer in her shop"
            fill
            sizes="(max-width: 767px) 100vw, 48vw"
          />
          <span>Business cover that starts with how you really work.</span>
        </div>

        <div className="approach-copy">
          <p className="eyebrow">Human intelligence / first</p>
          <h2>Start with the person. Then map the risk.</h2>
          <p className="approach-lead">
            Insurance can get complicated quickly. David starts by understanding what you own,
            how you work, and where uncertainty is costing you peace of mind.
          </p>

          <ol className="process-list">
            <li>
              <span>01</span>
              <div>
                <h3>Share what changed</h3>
                <p>A new home, a growing business, a first car, or a family to protect.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Talk through the tradeoffs</h3>
                <p>Understand the options, the gaps, and the cost before making a decision.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Choose with confidence</h3>
                <p>Land on coverage that fits your needs instead of a generic package.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="review-section section-shell">
        <div className="review-meta">
          <div className="stars" aria-label="Five star review">
            {[0, 1, 2, 3, 4].map((star) => (
              <Star key={star} size={17} weight="fill" aria-hidden="true" />
            ))}
          </div>
          <span>Google review</span>
        </div>
        <blockquote>
          <Quotes size={48} weight="regular" aria-hidden="true" />
          <p>
            “Very friendly customer service, fast and best prices possible! I have referred
            friends to David Cutting Insurance.”
          </p>
          <footer>Rachelle Fielding</footer>
        </blockquote>
        <div className="review-aside">
          <a
            href="https://david-cutting-insurance-services.ueniweb.com/reviews"
            target="_blank"
            rel="noreferrer"
          >
            4 public reviews
            <ArrowUpRight size={14} weight="regular" aria-hidden="true" />
          </a>
          <p>Local service remembered for being personal, quick, and straightforward.</p>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-info">
          <p className="eyebrow">Open a channel</p>
          <h2>Let&apos;s map what needs protection.</h2>
          <p>
            Call for a free consultation or leave a few details. There is no pressure to know
            exactly what coverage you need before you get in touch.
          </p>

          <div className="contact-details">
            <a href="tel:+19099858098">
              <Phone size={22} weight="regular" aria-hidden="true" />
              <span>
                <small>Call</small>
                (909) 985-8098
              </span>
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=163+S+Euclid+Ave+Upland+CA+91786"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={22} weight="regular" aria-hidden="true" />
              <span>
                <small>Visit</small>
                163 S Euclid Ave, Upland, CA 91786
              </span>
            </a>
            <div>
              <Clock size={22} weight="regular" aria-hidden="true" />
              <span>
                <small>Hours</small>
                Mon–Fri, 9:00 AM–5:30 PM
              </span>
            </div>
          </div>

          <div className="home-image">
            <Image
              src="/images/home-keys.jpg"
              alt="A couple holding the keys to their new home"
              fill
              loading="eager"
              sizes="(max-width: 767px) 100vw, 42vw"
            />
          </div>

          <div className="mockup-disclosure">
            <strong>Before this mockup goes live</strong>
            <p>
              Connect the form to a secure inbox and add verified licensing, carrier, privacy,
              and policy disclosures supplied by the business owner.
            </p>
          </div>
        </div>

        <ContactForm />
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden="true">DC</span>
          <p>David Cutting Insurance Services</p>
        </div>
        <p>Personal insurance guidance in Upland, California.</p>
        <div className="footer-links">
          <a href="#coverage">Coverage</a>
          <a href="#approach">Approach</a>
          <a href="#contact">Contact</a>
        </div>
        <small>
          Preview redesign. Photography by Kampus Production, Tima Miroshnichenko, and RDNE
          Stock project via Pexels.
        </small>
      </footer>

      <nav className="mobile-dock" aria-label="Quick mobile actions">
        <a href="#coverage">Coverage</a>
        <a href="#contact">Contact</a>
        <a href="tel:+19099858098">Call David</a>
      </nav>
    </main>
  );
}
