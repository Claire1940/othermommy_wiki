"use client";

import { useState, Suspense, lazy } from "react";
import {
  ArrowRight,
  BookOpen,
  BookText,
  CalendarDays,
  ChevronDown,
  Clapperboard,
  ExternalLink,
  Film,
  Ghost,
  Play,
  Sparkles,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

// ============================================================
// 模块通用渲染组件（Other Mommy 8 大主题模块）
// 每个模块渲染数据文件中的全部字段，模块级标题不含内部链接
// ============================================================

// 模块标题区：图标 + eyebrow + 标题（含 Other Mommy）+ 简介
function ModuleHeader({
  icon: Icon,
  eyebrow,
  title,
  intro,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="text-center mb-8 md:mb-12 scroll-reveal">
      <div
        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-3 md:mb-4
                   bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]"
      >
        <Icon className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
        <span className="text-xs md:text-sm font-medium uppercase tracking-wide">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">{title}</h2>
      <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
        {intro}
      </p>
    </div>
  );
}

// 通用条目网格（title + description）
function ItemsGrid({
  items,
}: {
  items: { title: string; description: string }[];
}) {
  return (
    <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[hsl(var(--nav-theme)/0.15)] text-sm font-bold text-[hsl(var(--nav-theme-light))]">
              {index + 1}
            </span>
            <h3 className="font-bold text-base md:text-lg">{item.title}</h3>
          </div>
          <p className="text-sm md:text-base text-muted-foreground">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

// FAQ 折叠面板（question + answer）
function FaqAccordion({
  faqs,
  expanded,
  setExpanded,
}: {
  faqs: { question: string; answer: string }[];
  expanded: number | null;
  setExpanded: (v: number | null) => void;
}) {
  return (
    <div className="scroll-reveal space-y-2 max-w-3xl mx-auto">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-border rounded-xl overflow-hidden"
        >
          <button
            onClick={() => setExpanded(expanded === index ? null : index)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
          >
            <span className="font-semibold">{faq.question}</span>
            <ChevronDown
              className={`w-5 h-5 flex-shrink-0 transition-transform ${expanded === index ? "rotate-180" : ""}`}
            />
          </button>
          {expanded === index && (
            <div className="px-5 pb-5 text-muted-foreground text-sm">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// 演职员卡片（actor + role + note）
function CastGrid({
  cast,
}: {
  cast: { actor: string; role: string; note: string }[];
}) {
  return (
    <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cast.map((c, index) => (
        <div
          key={index}
          className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
        >
          <span className="inline-block text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-3">
            {c.role}
          </span>
          <h3 className="font-bold text-lg mb-1 text-[hsl(var(--nav-theme-light))]">
            {c.actor}
          </h3>
          <p className="text-sm text-muted-foreground">{c.note}</p>
        </div>
      ))}
    </div>
  );
}

// 时间线（date + title + description）
function MilestonesTimeline({
  milestones,
}: {
  milestones: { date: string; title: string; description: string }[];
}) {
  return (
    <div className="scroll-reveal relative pl-6 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-6 max-w-3xl mx-auto">
      {milestones.map((m, index) => (
        <div key={index} className="relative">
          <div className="absolute -left-[1.4rem] w-4 h-4 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background" />
          <div className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
            <span className="inline-block text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-2">
              {m.date}
            </span>
            <h3 className="font-bold mb-1">{m.title}</h3>
            <p className="text-sm text-muted-foreground">{m.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.othermommy.wiki";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Other Mommy Wiki",
        description:
          "Complete Other Mommy (2026) film guide: cast, plot, trailer, release date, characters, and the Josh Malerman novel Incidents Around the House.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Other Mommy (2026) - Supernatural Horror Film",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Other Mommy Wiki",
        alternateName: "Other Mommy",
        url: siteUrl,
        description:
          "Complete Other Mommy (2026) film resource hub for cast, plot, trailer, release date, characters, and the Josh Malerman novel Incidents Around the House",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Other Mommy Wiki - 2026 Supernatural Horror Film",
        },
        sameAs: [
          "https://www.youtube.com/watch?v=bEpTgowZ1dI",
          "https://www.imdb.com/title/tt36586020/",
          "https://www.youtube.com/@UniversalPictures",
          "https://www.blumhouse.com/",
        ],
      },
      {
        "@type": "Movie",
        name: "Other Mommy",
        genre: ["Horror", "Supernatural Horror", "Psychological Horror"],
        director: {
          "@type": "Person",
          name: "Rob Savage",
        },
        actor: [
          { "@type": "Person", name: "Jessica Chastain" },
          { "@type": "Person", name: "Jay Duplass" },
        ],
        datePublished: "2026-10-09",
        productionCompany: {
          "@type": "Organization",
          name: "Blumhouse Productions",
        },
      },
      {
        "@type": "VideoObject",
        name: "Other Mommy | Official Trailer",
        description:
          "Official Other Mommy trailer from Universal Pictures and Blumhouse, starring Jessica Chastain in a dual role as Bela's mother and the entity Other Mommy.",
        uploadDate: "2026-07-22",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/bEpTgowZ1dI",
        url: "https://www.youtube.com/watch?v=bEpTgowZ1dI",
      },
    ],
  };

  // 模块 FAQ 折叠状态
  const [plotFaqExpanded, setPlotFaqExpanded] = useState<number | null>(null);
  const [entityFaqExpanded, setEntityFaqExpanded] = useState<number | null>(
    null,
  );
  const mobileBannerAd = getPreferredMobileBannerSelection();

  // Tools Grid 导航项 1:1 映射到模块锚点
  const sectionIds = [
    "movie-overview",
    "plot-story",
    "cast-characters",
    "the-entity",
    "production",
    "trailer-media",
    "the-book",
    "release-reviews",
  ];

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* ================= Hero Section ================= */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <a
                href="https://www.youtube.com/watch?v=bEpTgowZ1dI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href="https://www.imdb.com/title/tt36586020/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* ================= Video Section（紧跟 Hero，max-w-5xl） ================= */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="bEpTgowZ1dI"
              title="Other Mommy | Official Trailer"
            />
          </div>
        </div>
      </section>

      {/* ================= Tools Grid（8 导航卡片，max-w-5xl） ================= */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              // 导航项 1:1 映射到对应模块锚点，平滑滚动
              const sectionId = sectionIds[index];

              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= Latest Updates（保留模板模块） ================= */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />

      {/* 广告位 2: 首屏内容后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端方形 / 桌面端横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* ================= Module 1: Other Mommy Movie Overview ================= */}
      <section id="movie-overview" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Film}
            eyebrow={t.modules.otherMommyMovieOverview.eyebrow}
            title={t.modules.otherMommyMovieOverview.title}
            intro={t.modules.otherMommyMovieOverview.intro}
          />
          <ItemsGrid items={t.modules.otherMommyMovieOverview.items} />
        </div>
      </section>

      {/* ================= Module 2: Other Mommy Plot and Story ================= */}
      <section
        id="plot-story"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={BookOpen}
            eyebrow={t.modules.otherMommyPlotAndStory.eyebrow}
            title={t.modules.otherMommyPlotAndStory.title}
            intro={t.modules.otherMommyPlotAndStory.intro}
          />
          <FaqAccordion
            faqs={t.modules.otherMommyPlotAndStory.faqs}
            expanded={plotFaqExpanded}
            setExpanded={setPlotFaqExpanded}
          />
        </div>
      </section>

      {/* 广告位 4: 阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* ================= Module 3: Other Mommy Cast and Characters ================= */}
      <section id="cast-characters" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Users}
            eyebrow={t.modules.otherMommyCastAndCharacters.eyebrow}
            title={t.modules.otherMommyCastAndCharacters.title}
            intro={t.modules.otherMommyCastAndCharacters.intro}
          />
          <CastGrid cast={t.modules.otherMommyCastAndCharacters.cast} />
        </div>
      </section>

      {/* ================= Module 4: Who Is the Other Mommy? ================= */}
      <section
        id="the-entity"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Ghost}
            eyebrow={t.modules.otherMommyEntity.eyebrow}
            title={t.modules.otherMommyEntity.title}
            intro={t.modules.otherMommyEntity.intro}
          />
          <FaqAccordion
            faqs={t.modules.otherMommyEntity.faqs}
            expanded={entityFaqExpanded}
            setExpanded={setEntityFaqExpanded}
          />
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* ================= Module 5: Other Mommy Production ================= */}
      <section id="production" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Clapperboard}
            eyebrow={t.modules.otherMommyProduction.eyebrow}
            title={t.modules.otherMommyProduction.title}
            intro={t.modules.otherMommyProduction.intro}
          />
          <ItemsGrid items={t.modules.otherMommyProduction.items} />
        </div>
      </section>

      {/* ================= Module 6: Other Mommy Trailer and Media ================= */}
      <section
        id="trailer-media"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Play}
            eyebrow={t.modules.otherMommyTrailerAndMedia.eyebrow}
            title={t.modules.otherMommyTrailerAndMedia.title}
            intro={t.modules.otherMommyTrailerAndMedia.intro}
          />
          <ItemsGrid items={t.modules.otherMommyTrailerAndMedia.items} />
        </div>
      </section>

      {/* ================= Module 7: Other Mommy Source Novel ================= */}
      <section id="the-book" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={BookText}
            eyebrow={t.modules.otherMommyBook.eyebrow}
            title={t.modules.otherMommyBook.title}
            intro={t.modules.otherMommyBook.intro}
          />
          <ItemsGrid items={t.modules.otherMommyBook.items} />
        </div>
      </section>

      {/* ================= Module 8: Other Mommy Release and Reviews ================= */}
      <section
        id="release-reviews"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={CalendarDays}
            eyebrow={t.modules.otherMommyReleaseAndReviews.eyebrow}
            title={t.modules.otherMommyReleaseAndReviews.title}
            intro={t.modules.otherMommyReleaseAndReviews.intro}
          />
          <MilestonesTimeline
            milestones={t.modules.otherMommyReleaseAndReviews.milestones}
          />
        </div>
      </section>

      {/* ================= FAQ Section ================= */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* ================= CTA Section ================= */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* ================= Footer ================= */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.youtube.com/watch?v=bEpTgowZ1dI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.imdb.com/title/tt36586020/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@UniversalPictures"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.blumhouse.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
