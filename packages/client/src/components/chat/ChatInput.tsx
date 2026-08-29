import React, { useRef } from 'react';
import { Button } from '../ui/button';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

export type ChatFormData = {
   prompt: string;
};

type Props = {
   onSubmit: (data: ChatFormData) => void;
};

const ChatInput = ({ onSubmit }: Props) => {
   const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();
   const focusInputRef = useRef<HTMLTextAreaElement | null>(null);
   const handleFormSubmit = handleSubmit((data) => {
      reset({ prompt: '' });
      onSubmit(data);
   });

   // Destructure the ref from register so we can merge it with our own
   const { ref: formRef, ...promptFieldRest } = register('prompt', {
      required: true,
      validate: (data) => data.trim().length > 0,
   });

   function handleKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleFormSubmit();
      }
   }

   return (
      <form
         onSubmit={handleFormSubmit}
         onKeyDown={(e) => {
            handleKeyDown(e);
         }}
         className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
      >
         <textarea
            {...promptFieldRest}
            autoFocus
            ref={(el) => {
               formRef(el); // give react-hook-form its ref
               focusInputRef.current = el; // keep our own ref for scrolling
            }}
            onFocus={() => {
               // Wait for mobile keyboard animation to finish (~300ms)
               // before scrolling, so the browser knows the final viewport size
               setTimeout(() => {
                  focusInputRef.current?.scrollIntoView({
                     behavior: 'smooth',
                     block: 'center',
                  });
               }, 300);
            }}
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
   );
};

export default ChatInput;
