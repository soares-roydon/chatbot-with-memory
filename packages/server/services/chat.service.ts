import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import { conversationRepository } from '../repositories/conversation.repository.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Implementation detail
const ai = new GoogleGenAI({
   apiKey: process.env.GEMINI_API_KEY,
});

type ChatResponseType = {
   id: string;
   message: string | undefined;
};

// const rules = fs.readFileSync(
//    path.join(__dirname, '..', 'prompts', 'rules.md'),
//    'utf-8'
// );
// const instructions = template.replace('{{RULES}}', rules);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const instructions = fs.readFileSync(
   path.join(__dirname, '..', 'prompts', 'chatbot.txt'),
   'utf-8'
);

// Public interface
export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponseType> {
      const aiResponse = await ai.interactions.create({
         model: 'gemini-3.1-flash-lite',
         input: prompt,
         previous_interaction_id:
            conversationRepository.getLastResponseId(conversationId),
         // generation_config: {
         //    max_output_tokens: 200,
         // },
         system_instruction: instructions,
      });

      conversationRepository.setLastResponseId(conversationId, aiResponse.id);

      return {
         id: aiResponse.id,
         message: aiResponse.output_text,
      };
   },
};
