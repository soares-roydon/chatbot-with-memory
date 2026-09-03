import { Router } from 'express';
import { chatController } from './controllers/chat.controller.js';
// import { reviewController } from './controllers/review.controller.js';

const router = Router();

router.post('/chat', (req, res) => {
   chatController.sendMessage(req, res);
});

// router.get('/products/:id/reviews', reviewController.getReviews);

// router.post(
//    '/products/:id/reviews/summarize',
//    reviewController.summarizeReviews
// );

export default router;
