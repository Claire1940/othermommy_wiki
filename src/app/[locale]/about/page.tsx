import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.othermommy.wiki'
  const path = '/about'

  return {
    title: 'About Other Mommy Wiki - Your Other Mommy (2026) Film Resource',
    description: 'Learn about Other Mommy Wiki, a fan-driven resource hub providing cast info, plot analysis, trailer coverage, and the latest on the 2026 supernatural horror film Other Mommy.',
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Other Mommy Wiki',
      title: 'About Other Mommy Wiki',
      description: 'Learn about our mission to provide the best Other Mommy (2026) film resources and guides.',
      images: [
        {
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          alt: 'Other Mommy Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About Other Mommy Wiki',
      description: 'Learn about our mission to provide the best Other Mommy (2026) film resources.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Other Mommy Wiki
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Your fan-driven resource center for the 2026 horror film Other Mommy
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Welcome to Other Mommy Wiki</h2>
            <p>
              Other Mommy Wiki is an <strong>unofficial, fan-made resource website</strong> dedicated to exploring
              the 2026 supernatural horror film Other Mommy. We are a community-driven platform that provides
              comprehensive cast and character profiles, plot analysis, trailer coverage, release information, and
              insights into the source novel to deepen your understanding of the film.
            </p>
            <p>
              Whether you are counting down to the October 2026 theatrical release, curious about Jessica Chastain's
              chilling dual role, or eager to learn about Josh Malerman's novel Incidents Around the House, Other
              Mommy Wiki is here to be your guide to every corner of the story.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Our Mission</h2>
            <p>
              Our mission is simple: <strong>to give horror fans accurate, up-to-date information and clear guides</strong>
              that help them follow the film, its cast, and its story. We strive to:
            </p>
            <ul>
              <li><strong>Provide reliable information:</strong> Keep our content updated with the latest official news, cast announcements, and release details</li>
              <li><strong>Build useful guides:</strong> Create clear character, plot, and trailer breakdowns that help readers understand the film</li>
              <li><strong>Foster community:</strong> Create a welcoming space where fans can discuss theories, share excitement, and explore the story together</li>
              <li><strong>Stay accessible:</strong> Keep all resources free and easy to use for fans of all backgrounds</li>
            </ul>

            <h2>Our Vision</h2>
            <p>
              We envision Other Mommy Wiki as the <strong>go-to destination</strong> for every fan of the film seeking
              to understand its world. We want to be the resource that readers trust and rely on, whether they want
              cast details, a closer look at the Other Mommy entity, or background on the novel that inspired it all.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎬</div>
              <h3 className="text-xl font-semibold text-white mb-2">Cast & Characters</h3>
              <p className="text-slate-300">
                Profiles of Jessica Chastain's dual role as Bela's mother and the entity Other Mommy,
                plus the full cast and the characters they bring to life.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">📖</div>
              <h3 className="text-xl font-semibold text-white mb-2">Plot & Story Analysis</h3>
              <p className="text-slate-300">
                Clear breakdowns of the story, the Other Mommy entity, and the meaning behind
                its demand to "enter the heart." Explore the family at the center of the horror.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎞️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Trailer & Videos</h3>
              <p className="text-slate-300">
                Coverage of the official trailer, clips, and promotional material from
                Universal Pictures and Blumhouse as they are released.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎟️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Release & Tickets</h3>
              <p className="text-slate-300">
                The October 9, 2026 theatrical release date, distribution details, and where to find
                showtimes and tickets as they become available.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">📕</div>
              <h3 className="text-xl font-semibold text-white mb-2">The Source Novel</h3>
              <p className="text-slate-300">
                Background on Incidents Around the House by Bird Box author Josh Malerman,
                the book that inspired the film, and how the adaptation connects to it.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="text-xl font-semibold text-white mb-2">Multilingual Support</h3>
              <p className="text-slate-300">
                Content available in multiple languages, including English, Spanish, French,
                and German, to serve horror fans across different regions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Community-Driven</h2>
            <p>
              Other Mommy Wiki is built <strong>by fans, for fans</strong>. We welcome contributions,
              feedback, and suggestions from readers of all kinds. Our content is constantly evolving based on:
            </p>
            <ul>
              <li><strong>Reader feedback:</strong> Your suggestions help us improve and expand our coverage</li>
              <li><strong>Community discoveries:</strong> Fan theories, details spotted in trailers, and shared insights</li>
              <li><strong>Official updates:</strong> We monitor news from Universal Pictures and Blumhouse and update our content accordingly</li>
              <li><strong>Release developments:</strong> We track cast announcements, trailer drops, and release information as it arrives</li>
            </ul>
            <p>
              <strong>Want to contribute?</strong> Whether you've spotted a detail in the trailer, have a theory about
              the story, or have suggestions for new sections, we'd love to hear from you! Reach out through our
              contact channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>About the Team</h2>
            <p>
              Other Mommy Wiki is maintained by a dedicated team of passionate horror fans and writers who love
              the genre as much as you do. We are fans first, constantly following the latest news, analyzing
              trailers, and digging into the source material.
            </p>
            <p>
              Our team combines expertise in:
            </p>
            <ul>
              <li><strong>Film analysis:</strong> Deep understanding of story, character, and horror storytelling</li>
              <li><strong>Web development:</strong> Building fast, user-friendly tools and interfaces</li>
              <li><strong>Content creation:</strong> Writing clear, helpful guides and breakdowns</li>
              <li><strong>Community management:</strong> Listening to reader feedback and fostering a positive environment</li>
            </ul>
            <p className="text-slate-400 italic text-sm">
              Project Codename: "The Hallway Whisper" – Exploring the horror together.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Important Disclaimer</h2>
            <p className="text-yellow-400/90">
              <strong>Other Mommy Wiki is an unofficial fan-made website.</strong> We are NOT affiliated with,
              endorsed by, or associated with Universal Pictures, Blumhouse Productions, Atomic Monster, the
              filmmakers, or any official entities related to Other Mommy.
            </p>
            <p>
              All film content, trademarks, characters, and assets are the property of their respective owners.
              We use film-related content under fair use principles for informational and educational purposes only.
            </p>
            <p>
              Other Mommy Wiki is a non-commercial, fan-created resource built by fans, for fans.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Get in Touch</h2>
            <p>
              We'd love to hear from you! Whether you have questions, suggestions, found an error, or just want to say hi:
            </p>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
                <a href="mailto:contact@othermommy.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contact@othermommy.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Report an Error</h3>
                <a href="mailto:support@othermommy.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  support@othermommy.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Content Submissions</h3>
                <a href="mailto:contribute@othermommy.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contribute@othermommy.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Partnerships</h3>
                <a href="mailto:partnerships@othermommy.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  partnerships@othermommy.wiki
                </a>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              <strong>Response Time:</strong> We aim to respond to all inquiries within 2-3 business days.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-y border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest cast news, trailer drops, and Other Mommy updates.
            Bookmark this site and check back regularly for new content!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[hsl(var(--nav-theme-light))] text-white font-semibold hover:opacity-90 transition"
          >
            Explore Resources
          </Link>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
