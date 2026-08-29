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
      <div className="flex flex-col gap-2">
         {messages.map((message, index) => (
            <div
               key={index}
               ref={index === messages.length - 1 ? lastMessageRef : null}
               onCopy={(e) => {
                  onCopyMessage(e);
               }}
               className={`px-3 py-2 rounded-xl max-w-full md:max-w-md min-w-0 overflow-hidden wrap-break-word lg:max-w-4xl ${
                  message.role === 'user'
                     ? 'bg-black text-white rounded-br-none self-end'
                     : 'bg-white-100 text-black rounded-bl-none self-start border'
               }`}
            >
               <ReactMarkDown
                  remarkPlugins={[remarkGfm]}
                  components={{
                     // ─────────────────────────────────────────
                     // Headings — smaller on mobile, scale up on md:
                     // ─────────────────────────────────────────

                     h1: ({ children }) => (
                        <h1 className="mb-3 mt-1 first:mt-0 text-lg md:text-2xl md:mb-6 md:mt-2 font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                           {children}
                        </h1>
                     ),

                     h2: ({ children }) => (
                        <h2 className="mb-2 mt-4 first:mt-0 text-base md:text-xl md:mb-4 md:mt-8 font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                           {children}
                        </h2>
                     ),

                     h3: ({ children }) => (
                        <h3 className="mb-2 mt-4 first:mt-0 text-base md:text-lg md:mb-3 md:mt-7 font-semibold text-zinc-900 dark:text-zinc-100">
                           {children}
                        </h3>
                     ),

                     h4: ({ children }) => (
                        <h4 className="mb-1.5 mt-3 first:mt-0 text-sm md:text-base md:mb-2 md:mt-5 font-semibold text-zinc-900 dark:text-zinc-100">
                           {children}
                        </h4>
                     ),

                     // ─────────────────────────────────────────
                     // Paragraphs — tighter line-height & spacing on mobile
                     // ─────────────────────────────────────────

                     p: ({ children }) => (
                        <p
                           className={`text-[15px] md:text-base leading-6 md:leading-7 first:mt-0 last:mb-0 ${message.role === 'user' ? 'white' : 'text-zinc-800 my-2 md:my-3'} dark:text-zinc-300`}
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
                     // Lists — less indent & tighter spacing on mobile
                     // ─────────────────────────────────────────

                     ul: ({ children }) => (
                        <ul className="my-2 ml-4 md:my-4 md:ml-6 list-disc space-y-1 md:space-y-2 marker:text-zinc-400 dark:marker:text-zinc-500">
                           {children}
                        </ul>
                     ),

                     ol: ({ children }) => (
                        <ol className="my-2 ml-4 md:my-4 md:ml-6 list-decimal space-y-1 md:space-y-2 marker:font-medium marker:text-zinc-500">
                           {children}
                        </ol>
                     ),

                     li: ({ children }) => (
                        <li className="pl-0.5 md:pl-1 text-[15px] md:text-base leading-6 md:leading-7 text-zinc-700 dark:text-zinc-300">
                           {children}
                        </li>
                     ),

                     // ─────────────────────────────────────────
                     // Blockquote — less padding on mobile
                     // ─────────────────────────────────────────

                     blockquote: ({ children }) => (
                        <blockquote className="my-3 md:my-5 border-l-[3px] border-zinc-300 bg-zinc-50 px-3 md:px-5 py-0.5 italic text-sm md:text-base text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400">
                           {children}
                        </blockquote>
                     ),

                     // ─────────────────────────────────────────
                     // Horizontal rule
                     // ─────────────────────────────────────────

                     hr: () => (
                        <hr className="my-4 md:my-7 border-0 border-t border-zinc-200 dark:border-zinc-800" />
                     ),

                     // ─────────────────────────────────────────
                     // Code blocks (fenced ```) — smaller text & padding on mobile
                     // ─────────────────────────────────────────

                     pre: ({ children }) => (
                        <pre
                           className={`my-3 md:my-4 overflow-x-auto rounded-md md:rounded-lg p-3 md:p-4 text-xs md:text-sm leading-5 md:leading-6 ${
                              message.role === 'user'
                                 ? 'bg-indigo-600/40 text-indigo-50'
                                 : 'bg-zinc-800 text-zinc-200 border border-zinc-700/50'
                           }`}
                        >
                           {children}
                        </pre>
                     ),

                     // ─────────────────────────────────────────
                     // Inline code
                     // ─────────────────────────────────────────

                     code: ({ children }) => (
                        <code
                           className={`rounded-md px-1 md:px-1.5 py-0.5 font-mono text-[12px] md:text-[13px] ${
                              message.role === 'user'
                                 ? 'bg-white/20 text-indigo-100'
                                 : 'bg-white/80 text-zinc-800 border border-zinc-200/60 dark:bg-zinc-700 dark:text-zinc-200 dark:border-zinc-600'
                           }`}
                        >
                           {children}
                        </code>
                     ),

                     // ─────────────────────────────────────────
                     // Links — 44px min touch target on mobile
                     // ─────────────────────────────────────────

                     a: ({ href, children }) => (
                        <a
                           href={href}
                           target="_blank"
                           rel="noopener noreferrer"
                           className={`font-medium inline-flex items-center min-h-[44px] md:min-h-0 md:inline ${message.role === 'user' ? 'text-white hover:text-orange-400' : 'text-blue-600'} underline decoration-blue-300 underline-offset-2 transition-colors hover:text-blue-700 hover:decoration-blue-500 dark:text-blue-400 dark:decoration-blue-700 dark:hover:text-blue-300`}
                        >
                           {children}
                        </a>
                     ),

                     img: ({ src, alt }) => (
                        <img
                           src={src}
                           alt={alt ?? ''}
                           loading="lazy"
                           className="my-3 md:my-6 max-h-60 md:max-h-125 w-auto max-w-full rounded-lg md:rounded-xl border border-zinc-200 object-contain shadow-sm dark:border-zinc-800"
                        />
                     ),

                     // ─────────────────────────────────────────
                     // Tables — tighter padding & smaller text on mobile
                     // ─────────────────────────────────────────

                     table: ({ children }) => (
                        <div className="my-3 md:my-6 w-full overflow-x-auto rounded-lg md:rounded-xl border border-zinc-200 dark:border-zinc-800">
                           <table className="w-full min-w-[300px] md:min-w-125 border-collapse text-xs md:text-sm">
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
                        <th className="whitespace-nowrap px-2.5 py-2 md:px-4 md:py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100">
                           {children}
                        </th>
                     ),

                     td: ({ children }) => (
                        <td className="px-2.5 py-2 md:px-4 md:py-3 align-top text-zinc-700 dark:text-zinc-300">
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
