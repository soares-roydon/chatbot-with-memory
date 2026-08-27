import { useEffect, useRef } from 'react';
import ReactMarkDown from 'react-markdown';

export type Message = {
   content: string;
   role: 'user' | 'bot';
};

type Props = {
   messages: Message[];
};

const ChatMessages = ({ messages }: Props) => {
   const lastMessageRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

   function onCopyMessage(e: React.ClipboardEvent<HTMLDivElement>) {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
         e.preventDefault();
         e.clipboardData.setData('text/plain', selection);
      }
   }

   return (
      <div className="flex flex-col gap-2">
         {messages.map((message, index) => (
            <div
               key={index}
               ref={index === messages.length - 1 ? lastMessageRef : null}
               onCopy={(e) => {
                  onCopyMessage(e);
               }}
               className={`px-3 py-1.5 rounded-lg max-w-4xl ${
                  message.role === 'user'
                     ? 'bg-blue-500 text-white rounded-br-none self-end'
                     : 'bg-gray-100 text-black rounded-bl-none self-start'
               }`}
            >
               <ReactMarkDown>{message.content}</ReactMarkDown>
            </div>
         ))}
      </div>
   );
};

export default ChatMessages;
