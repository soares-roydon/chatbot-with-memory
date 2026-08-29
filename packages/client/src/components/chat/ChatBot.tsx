import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useRef, useState } from 'react';
import TypingIndicator from './TypingIndicator';
import ChatMessages, { type Message } from './ChatMessages';
import ChatInput, { type ChatFormData } from './ChatInput';
import { BACKEND_URL } from '@/data/url';
import ThemeToggle from './ThemeToggle';
import { ScrollArea } from '@/components/ui/scroll-area';

type ChatResponse = {
   message: string;
};

const ChatBot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [error, setError] = useState<string>();
   const [isBotTyping, setIsBotTyping] = useState(false);
   const conversationId = useRef(uuidv4());

   async function onSubmit({ prompt }: ChatFormData) {
      setMessages((oldMessages) => [
         ...oldMessages,
         { content: prompt.trim(), role: 'user' },
      ]);

      setIsBotTyping(true);
      setError('');

      try {
         const { data } = await axios.post<ChatResponse>(
            `${BACKEND_URL}/api/chat`,
            {
               prompt,
               conversationId: conversationId.current,
            }
         );

         setMessages((oldMessages) => [
            ...oldMessages,
            { content: data.message, role: 'bot' },
         ]);
      } catch (error: any) {
         console.error(error);
         setError('Something went wrong!');
      }

      setIsBotTyping(false);
   }

   return (
      <div className="flex flex-col h-full">
         {/* Header — sits in normal flow, never overlaps messages */}
         <div className="flex items-center justify-end py-2 px-3 shrink-0">
            <ThemeToggle />
         </div>

         {/* Scrollable messages with styled scrollbar */}
         <div className="relative flex-1 min-h-0">
            <ScrollArea className="h-full">
               <div className="pb-36 pt-1 px-3">
                  <div className="flex flex-col min-h-full gap-2">
                     <div className="flex-1" />
                     <ChatMessages messages={messages} />
                     {isBotTyping && <TypingIndicator />}
                     {error ? (
                        <div className="text-red-500">{error}</div>
                     ) : null}
                  </div>
               </div>
            </ScrollArea>

            {/* Floating input — overlays the bottom of the scroll area */}
            <div className="absolute bottom-0 left-0 right-0 z-10 mx-3 rounded-3xl bg-background mb-2 border-zinc-200 dark:border-zinc-800">
               <ChatInput onSubmit={onSubmit} />
            </div>
         </div>
      </div>
   );
};

export default ChatBot;
