import ChatBot from './components/chat/ChatBot';
import ReviewList from './components/reviews/ReviewList';

function App() {
   return (
      <>
         <div className="h-dvh">
            {/* <ChatBot /> */}
            <ReviewList productId={1} />
         </div>
      </>
   );
}

export default App;
