import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
   apiKey: process.env.GEMINI_API_KEY,
});

type GenerateTextResults = {
   id: string;
   text: string;
};

type GenerateTextOptions = {
   model?: string;
   prompt: string;
   previous_interaction_id?: string;
   system_instruction?: string;
};
export const llmClient = {
   async generateText({
      prompt,
      model = 'gemini-3.1-flash-lite',
   }: GenerateTextOptions): Promise<GenerateTextResults> {
      const response = await ai.interactions.create({
         model,
         input: prompt,
      });

      return {
         id: response.id,
         text: response.output_text!,
      };
   },
};
