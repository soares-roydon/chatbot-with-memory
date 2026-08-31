import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';

export const reviewController = {
   async getReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         return res.status(400).json({ error: 'Invalid product id' });
      }

      const reviews = await reviewService.getReviews(productId);

      return res.status(200).json({ reviews });
   },
};
