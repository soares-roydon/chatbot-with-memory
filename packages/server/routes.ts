import { Router } from 'express';
import { chatController } from './controllers/chat.controller.js';
import { Prisma, PrismaClient } from './generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { reviewController } from './controllers/review.controller.js';

const router = Router();

router.post('/chat', (req, res) => {
   chatController.sendMessage(req, res);
});

router.get('/products/:id/reviews', reviewController.getReviews);

export default router;
