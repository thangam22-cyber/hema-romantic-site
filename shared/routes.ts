import { z } from 'zod';
import { insertSecretSchema } from './schema';

export const api = {
  // We can use these if we want to move password validation to backend, 
  // but for this specific "romantic website" request, client-side validation 
  // with hardcoded values (as requested) is also acceptable for the "lite" feel.
  // We'll keep the API contract simple.
  verify: {
    method: 'POST' as const,
    path: '/api/verify' as const,
    input: z.object({
      type: z.enum(['main', 'birthday']),
      password: z.string()
    }),
    responses: {
      200: z.object({ success: z.boolean() }),
    },
  }
};
