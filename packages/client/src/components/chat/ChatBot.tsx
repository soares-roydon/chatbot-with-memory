import axios from 'axios';
import { useRef, useState } from 'react';
import TypingIndicator from './TypingIndicator';
import ChatMessages, { type Message } from './ChatMessages';
import ChatInput, { type ChatFormData } from './ChatInput';

type ChatResponse = {
   message: string;
};

const ChatBot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [error, setError] = useState<string>();
   const [isBotTyping, setIsBotTyping] = useState(false);
   const conversationId = useRef(crypto.randomUUID());

   async function onSubmit({ prompt }: ChatFormData) {
      setMessages((oldMessages) => [
         ...oldMessages,
         { content: prompt.trim(), role: 'user' },
      ]);

      setIsBotTyping(true);
      setError('');

      try {
         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });

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
      <div className="flex flex-col justify-between py-4 h-full">
         <div className="flex flex-col gap-2 overflow-y-auto">
            <ChatMessages messages={messages} />
            {isBotTyping && <TypingIndicator />}

            {error ? <div className="text-red-500">{error}</div> : null}
         </div>
         <ChatInput onSubmit={onSubmit} />
      </div>
   );
};

export default ChatBot;
