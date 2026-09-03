import { reviewRepository } from '../repositories/review.repository.js';
import { llmClient } from '../llm/client.js';
import { fileURLToPath } from 'node:url';
import { read_file } from '../utils/file_ops.js';
import path from 'node:path';

export const reviewService = {
   async summarizeReviews(productId: number): Promise<string | undefined> {
      const existingSummary =
         await reviewRepository.getReviewSummary(productId);

      if (existingSummary) {
         return existingSummary;
      }

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

      const { text: summary } = await llmClient.generateText({
         model: 'gemini-3.1-flash-lite',
         prompt,
      });

      await reviewRepository.storeReviewSummary(productId, summary);

      return summary;
   },
};
