import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, type Review } from '../generated/prisma/client';

const prisma = new PrismaClient({
   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

export const reviewRepository = {
   async getReviews(productId: number, limit?: number): Promise<Review[]> {
      return prisma.review.findMany({
         where: { productId },
         orderBy: { createdAt: 'desc' },
         take: limit,
      });
   },
};
