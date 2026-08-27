import axios from 'axios';
import { Button } from './button';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';

type FormData = {
   prompt: string;
};

type ChatResponse = {
   message: string;
};

type Message = {
   content: string;
   role: 'user' | 'bot';
};

const ChatBot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const { register, handleSubmit, reset, formState } = useForm<FormData>();
   const conversationId = useRef(crypto.randomUUID());

   async function onSubmit({ prompt }: FormData) {
      setMessages((oldMessages) => [
         ...oldMessages,
         { content: prompt, role: 'user' },
      ]);
      reset();
      const { data } = await axios.post<ChatResponse>('/api/chat', {
         prompt,
         conversationId: conversationId.current,
      });

      setMessages((oldMessages) => [
         ...oldMessages,
         { content: data.message, role: 'bot' },
      ]);
   }

   function onKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   }

   return (
      <div className="flex flex-col justify-between h-screen py-4">
         <div className="flex flex-col gap-2">
            {messages.map((message, index) => (
               <p
                  key={index}
                  className={`px-3 py-1.5 rounded-lg max-w-4xl ${
                     message.role === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none self-end'
                        : 'bg-gray-100 text-black rounded-bl-none self-start'
                  }`}
               >
                  {message.content}
               </p>
            ))}
         </div>
         <div>
            <form
               onSubmit={handleSubmit(onSubmit)}
               onKeyDown={(e) => {
                  onKeyDown(e);
               }}
               className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
            >
               <textarea
                  {...register('prompt', {
                     required: true,
                     validate: (data) => data.trim().length > 0,
                  })}
                  className="w-full border-0 focus:outline-0 resize-none"
                  placeholder="Ask anything"
                  maxLength={1000}
               />
               <Button
                  disabled={!formState.isValid}
                  className={'rounded-full w-10 h-10'}
                  type="submit"
               >
                  <FaArrowUp />
               </Button>
            </form>
         </div>
      </div>
   );
};

export default ChatBot;
