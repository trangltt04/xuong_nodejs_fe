import { z } from 'zod'

export const categorySchema = z.object({
	title: z.string().min(5, 'Title must be at least 5 characters'),
	description: z.string().optional(),
	slug: z.string().optional()
})
