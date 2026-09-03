import { prisma } from './review.repository.js';

export const productRepository = {
   getProduct(productId: number) {
      return prisma.product.findUnique({
         where: { id: productId },
      });
   },
};
