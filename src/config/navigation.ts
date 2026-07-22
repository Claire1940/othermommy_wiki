import type { LucideIcon } from 'lucide-react'
import {
	CalendarDays,
	ScrollText,
	Users,
	Drama,
	Clapperboard,
	Film,
	BookOpen,
	Star,
} from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'release' -> t('nav.release')
	path: string // URL 路径，如 '/release'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

// 导航配置（Other Mommy 8 个内容分类，按搜索需求排序）
export const NAVIGATION_CONFIG: NavigationItem[] = [
	{ key: 'release', path: '/release', icon: CalendarDays, isContentType: true },
	{ key: 'plot', path: '/plot', icon: ScrollText, isContentType: true },
	{ key: 'cast', path: '/cast', icon: Users, isContentType: true },
	{ key: 'characters', path: '/characters', icon: Drama, isContentType: true },
	{ key: 'production', path: '/production', icon: Clapperboard, isContentType: true },
	{ key: 'trailer', path: '/trailer', icon: Film, isContentType: true },
	{ key: 'book', path: '/book', icon: BookOpen, isContentType: true },
	{ key: 'reviews', path: '/reviews', icon: Star, isContentType: true },
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
) // 移除开头的 '/' -> ['release', 'plot', 'cast', ...]

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
