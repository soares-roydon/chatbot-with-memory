import type { Request, Response } from 'express';
import z from 'zod';
import { chatService } from '../services/chat.service.js';

// Implementation detail
const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is requirerd.')
      .max(1000, 'Prompt is too long (max 1000 characters)'),
   conversationId: z.uuid(),
});

// Public Interface
export const chatController = {
   async sendMessage(req: Request, res: Response) {
      const parsedResult = chatSchema.safeParse(req.body);

      if (!parsedResult.success) {
         res.status(400).json({ error: parsedResult.error.format() });
         return;
      }
      try {
         const { prompt, conversationId } = parsedResult.data;

         const aiResponse = await chatService.sendMessage(
            prompt,
            conversationId
         );

         return res.json({ message: aiResponse.message });
      } catch (error) {
         return res.status(500).json({ error: 'Failed to generate response' });
      }
   },
};
