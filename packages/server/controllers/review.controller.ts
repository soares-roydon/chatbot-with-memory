import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service.js';
import { productRepository } from '../repositories/product.repository.js';
import { reviewRepository } from '../repositories/review.repository.js';

export const reviewController = {
   async getReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         return res.status(400).json({ error: 'Invalid product id' });
      }

      const product = await productRepository.getProduct(productId);

      if (!product) {
         return res.status(404).json({ error: 'Product does not exist' });
      }

      const reviews = await reviewRepository.getReviews(productId);
      const summary = await reviewRepository.getReviewSummary(productId);

      return res.status(200).json({
         reviews,
         summary,
      });
   },

   async summarizeReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         return res.status(400).json({ error: 'Invalid product id' });
      }

      const product = await productRepository.getProduct(productId);

      if (!product) {
         return res.status(400).json({ error: 'Invalid product' });
      }

      const review = await reviewRepository.getReviews(productId, 1);

      if (!review.length) {
         return res
            .status(400)
            .json({ error: 'There are no reviews to summarize' });
      }

      const summary = await reviewService.summarizeReviews(productId);

      return res.status(201).json({ summary });
   },
};
