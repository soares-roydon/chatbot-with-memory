import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, type Review } from '../generated/prisma/client';
import dayjs from 'dayjs';

export const prisma = new PrismaClient({
   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

export const reviewRepository = {
   getReviews(productId: number, limit?: number): Promise<Review[]> {
      return prisma.review.findMany({
         where: { productId },
         orderBy: { createdAt: 'desc' },
         take: limit,
      });
   },

   storeReviewSummary(productId: number, summary: string) {
      const now = new Date();
      const expiresAt = dayjs(now).add(7, 'days').toDate();

      const data = {
         content: summary,
         expiresAt,
         productId,
      };
      return prisma.summary.upsert({
         where: { productId },
         create: data,
         update: data,
      });
   },

   async getReviewSummary(productId: number): Promise<string | null> {
      const summary = await prisma.summary.findFirst({
         where: {
            AND: [
               { productId },
               {
                  expiresAt: {
                     gt: new Date(),
                  },
               },
            ],
         },
         select: {
            content: true,
         },
      });

      return summary ? summary.content : null;
   },
};
