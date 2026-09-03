import { BrowserRouter, Route, Routes } from 'react-router';
import ChatBot from './components/chat/ChatBot';
// import ReviewList from "./components/reviews/ReviewList";

function App() {
   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<ChatBot />} />
               {/* <Route path="/summarize" element={<ReviewList productId={1}/>}/> */}
            </Routes>
         </BrowserRouter>
      </>
   );
}

export default App;
