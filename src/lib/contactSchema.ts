import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name needs at least two characters.'),
  email: z.string().email('Enter a valid email.'),
  company: z.string().trim().optional(),
  projectType: z.string().min(1, 'Choose a project type.'),
  message: z.string().trim().min(20, 'Add a little more context (20+ characters).'),
})

export type ContactInput = z.infer<typeof contactSchema>
