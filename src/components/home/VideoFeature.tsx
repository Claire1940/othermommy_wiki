"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Play, ExternalLink } from "lucide-react";

interface VideoFeatureProps {
  videoId: string;
  title: string;
}

/**
 * YouTube 视频特性区
 * - 进入视口后通过 IntersectionObserver 自动加载并播放（静音、循环）
 * - 未激活时展示海报占位 + 点击播放按钮（兼容移动端与浏览器自动播放策略）
 */
export function VideoFeature({ videoId, title }: VideoFeatureProps) {
  const watchUrl = useMemo(
    () => `https://www.youtube.com/watch?v=${videoId}`,
    [videoId],
  );

  // 自动播放（静音 + 循环）+ playsinline（移动端内联）+ rel=0（不显示相关视频）
  const embedUrl = useMemo(
    () =>
      `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&rel=0`,
    [videoId],
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [activated, setActivated] = useState(false);

  // 视口进入即激活（threshold 0.35，保证用户确实在看视频区域）
  useEffect(() => {
    if (activated || typeof window === "undefined") return;

    const node = containerRef.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setActivated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            setActivated(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [activated]);

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg bg-black"
        style={{ paddingBottom: "56.25%" }}
      >
        {activated ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setActivated(true)}
            aria-label={`Play ${title}`}
            className="group absolute inset-0 flex items-center justify-center"
          >
            {/* 海报占位（带 blur 渐隐） */}
            <img
              src="/images/hero.webp"
              alt={title}
              className="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-70"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-black/30" />
            {/* 播放按钮 */}
            <span
              className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-full
                         bg-[hsl(var(--nav-theme))] text-white shadow-lg
                         transition-transform duration-300 group-hover:scale-110"
            >
              <Play className="h-7 w-7 translate-x-0.5 fill-current" />
            </span>
          </button>
        )}
      </div>

      <div className="flex justify-center">
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
        >
          Watch on YouTube
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
