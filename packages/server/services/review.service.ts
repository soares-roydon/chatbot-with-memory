import type { Review } from '../generated/prisma/client';
import { reviewRepository } from '../repositories/review.repository';
import { llmClient } from '../llm/client';
import { fileURLToPath } from 'node:url';
import { read_file } from '../utils/file_ops';
import path from 'node:path';

export const reviewService = {
   getReviews(productId: number): Promise<Review[]> {
      return reviewRepository.getReviews(productId);
   },

   async summarizeReviews(productId: number): Promise<string | undefined> {
      const reviews = await reviewRepository.getReviews(productId, 10);

      const joinedReviews = reviews.map((r) => r.content).join('\n\n');

      //  ---------------------------------------------------------
      const __filename = fileURLToPath(import.meta.url);
      const __directory = path.dirname(__filename);

      const template = read_file(
         path.join(__directory, '..', 'prompts', 'summarize-reviews.txt')
      );
      //  ---------------------------------------------------------

      const prompt = template.replace('{{reviews}}', joinedReviews);

      const response = await llmClient.generateText({
         model: 'gemini-3.1-flash-lite',
         prompt,
      });

      return response.text;
   },
};
