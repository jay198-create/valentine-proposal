import { z } from 'zod';
import { insertProposalSchema, proposals } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  proposals: {
    create: {
      method: 'POST' as const,
      path: '/api/proposals',
      input: insertProposalSchema,
      responses: {
        201: z.custom<typeof proposals.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/proposals/:id',
      responses: {
        200: z.custom<typeof proposals.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    accept: {
      method: 'POST' as const,
      path: '/api/proposals/:id/accept',
      input: z.object({}),
      responses: {
        200: z.object({ 
          success: z.boolean(), 
          phoneNumber: z.string(), 
          partnerName: z.string() 
        }),
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
