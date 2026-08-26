import { Router } from 'express';
import { chatController } from './controllers/chat.controller';

const router = Router();

router.post('/chat', (req, res) => {
   chatController.sendMessage(req, res);
});

export default router;
