import { z } from 'zod'

export const signUpSchema = z.object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
}).superRefine((o, ctx) => {
    if (o.password !== o.confirmPassword) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Password mismatch c password" })
    }
})