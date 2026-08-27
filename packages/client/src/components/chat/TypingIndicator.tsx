const TypingIndicator = () => {
   return (
      <div className="flex gap-1 px-3 py-3 bg-gray-100 self-start rounded-bl-none rounded-lg">
         <Dot />
         <Dot className="[animation-delay:0.2s]" />
         <Dot className="[animation-delay:0.4s]" />
      </div>
   );
};

type DotProp = {
   className?: string;
};

const Dot = ({ className }: DotProp) => {
   return (
      <div
         className={`w-2 h-2 rounded-full bg-gray-700 animate-bounce ${className}`}
      ></div>
   );
};

export default TypingIndicator;
