import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	// 支持语言列表（en + es/fr/de，按 languages.json 最终语言集合）
	locales: ['en', 'es', 'fr', 'de'],

	// 默认语言
	defaultLocale: 'en',

	// URL 前缀策略：默认语言无前缀
	localePrefix: 'as-needed',

	// 启用自动语言检测
	localeDetection: true,
})

// 导出类型
export type Locale = (typeof routing.locales)[number]
