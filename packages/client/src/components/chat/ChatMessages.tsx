import remarkGfm from 'remark-gfm';
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
      <div className="flex flex-col gap-2 mb-4">
         {messages.map((message, index) => (
            <div
               key={index}
               ref={index === messages.length - 1 ? lastMessageRef : null}
               onCopy={(e) => {
                  onCopyMessage(e);
               }}
               className={`px-3 py-2 rounded-xl max-w-md wrap-break-word lg:max-w-4xl ${
                  message.role === 'user'
                     ? 'bg-indigo-400 text-white rounded-br-none self-end'
                     : 'bg-gray-100 text-black rounded-bl-none self-start'
               }`}
            >
               <ReactMarkDown
                  remarkPlugins={[remarkGfm]}
                  components={{
                     // ─────────────────────────────────────────
                     // Headings
                     // ─────────────────────────────────────────

                     h1: ({ children }) => (
                        <h1 className="mb-6 mt-2 text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                           {children}
                        </h1>
                     ),

                     h2: ({ children }) => (
                        <h2 className="mb-4 mt-8 text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                           {children}
                        </h2>
                     ),

                     h3: ({ children }) => (
                        <h3 className="mb-3 mt-7 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                           {children}
                        </h3>
                     ),

                     h4: ({ children }) => (
                        <h4 className="mb-2 mt-5 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                           {children}
                        </h4>
                     ),

                     // ─────────────────────────────────────────
                     // Paragraphs
                     // ─────────────────────────────────────────

                     p: ({ children }) => (
                        <p
                           className={`leading-7 ${message.role === 'user' ? 'white' : 'text-zinc-800 my-3'} dark:text-zinc-300`}
                        >
                           {children}
                        </p>
                     ),

                     // ─────────────────────────────────────────
                     // Bold / Italic
                     // ─────────────────────────────────────────

                     strong: ({ children }) => (
                        <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
                           {children}
                        </strong>
                     ),

                     em: ({ children }) => (
                        <em className="text-zinc-600 dark:text-zinc-400">
                           {children}
                        </em>
                     ),

                     // ─────────────────────────────────────────
                     // Lists
                     // ─────────────────────────────────────────

                     ul: ({ children }) => (
                        <ul className="my-4 ml-6 list-disc space-y-2 marker:text-zinc-400 dark:marker:text-zinc-500">
                           {children}
                        </ul>
                     ),

                     ol: ({ children }) => (
                        <ol className="my-4 ml-6 list-decimal space-y-2 marker:font-medium marker:text-zinc-500">
                           {children}
                        </ol>
                     ),

                     li: ({ children }) => (
                        <li
                           className={`pl-1 leading-7 text-zinc-700 dark:text-zinc-300`}
                        >
                           {children}
                        </li>
                     ),

                     // ─────────────────────────────────────────
                     // Blockquote
                     // ─────────────────────────────────────────

                     blockquote: ({ children }) => (
                        <blockquote className="my-5 border-l-[3px] border-zinc-300 bg-zinc-50 px-5 py-0.5 italic text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400">
                           {children}
                        </blockquote>
                     ),

                     // ─────────────────────────────────────────
                     // Horizontal rule
                     // ─────────────────────────────────────────

                     hr: () => (
                        <hr className="my-7 border-0 border-t border-zinc-200 dark:border-zinc-800" />
                     ),

                     // ─────────────────────────────────────────
                     // Inline code
                     // ─────────────────────────────────────────

                     code: ({ children }) => (
                        <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-[13px] text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                           {children}
                        </code>
                     ),

                     // ─────────────────────────────────────────
                     // Links
                     // ─────────────────────────────────────────

                     a: ({ href, children }) => (
                        <a
                           href={href}
                           target="_blank"
                           rel="noopener noreferrer"
                           className={`font-medium  ${message.role === 'user' ? 'text-white hover:text-orange-400' : 'text-zinc-700'} text-blue-600 underline decoration-blue-300 underline-offset-2 transition-colors hover:text-blue-700 hover:decoration-blue-500 dark:text-blue-400 dark:decoration-blue-700 dark:hover:text-blue-300`}
                        >
                           {children}
                        </a>
                     ),

                     img: ({ src, alt }) => (
                        <img
                           src={src}
                           alt={alt ?? ''}
                           loading="lazy"
                           className="my-6 max-h-125 w-auto max-w-full rounded-xl border border-zinc-200 object-contain shadow-sm dark:border-zinc-800"
                        />
                     ),

                     // ─────────────────────────────────────────
                     // Tables
                     // ─────────────────────────────────────────

                     table: ({ children }) => (
                        <div className="my-6 w-full overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
                           <table className="w-full min-w-125 border-collapse text-sm">
                              {children}
                           </table>
                        </div>
                     ),

                     thead: ({ children }) => (
                        <thead className="bg-zinc-100 dark:bg-zinc-900">
                           {children}
                        </thead>
                     ),

                     tbody: ({ children }) => (
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                           {children}
                        </tbody>
                     ),

                     tr: ({ children }) => (
                        <tr className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                           {children}
                        </tr>
                     ),

                     th: ({ children }) => (
                        <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">
                           {children}
                        </th>
                     ),

                     td: ({ children }) => (
                        <td className="px-4 py-3 align-top text-zinc-700 dark:text-zinc-300">
                           {children}
                        </td>
                     ),
                  }}
               >
                  {message.content}
               </ReactMarkDown>
            </div>
         ))}
      </div>
   );
};

export default ChatMessages;
