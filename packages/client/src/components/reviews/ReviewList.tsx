import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import { useEffect, useState } from 'react';
import StarRating from './StarRating';

type Props = {
   productId: number;
};

type Review = {
   id: number;
   author: string;
   content: string;
   rating: number;
   createdAt: string;
};

type GetReviewsResponse = {
   summary: string | null;
   reviews: Review[];
};

const ReviewList = ({ productId }: Props) => {
   const [error, setError] = useState<string>();
   const [reviewData, setReviewData] = useState<GetReviewsResponse>();
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const fetchReviews = async () => {
      setIsLoading(true);
      try {
         const { data } = await axios.get<GetReviewsResponse>(
            `http://localhost:3000/api/products/${productId}/reviews`
         );
         setReviewData(data);
         setIsLoading(false);
      } catch (error) {
         console.error(error);
         setError('Could not fetch the reviews, try again');
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchReviews();
   }, []);

   if (isLoading) {
      return (
         <div className="flex flex-col gap-5">
            {[1, 2, 3].map((i) => (
               <div key={i}>
                  <Skeleton width={150} />
                  <Skeleton width={100} />
                  <Skeleton count={2} />
               </div>
            ))}
         </div>
      );
   }

   if (error) {
      return (
         <div className="bg-red-50 text-red-500 m-2 p-3 font-bold  rounded-md">
            {error}
         </div>
      );
   }

   return (
      <div className="flex flex-col gap-5">
         {reviewData?.reviews.map((review) => (
            <div className="border" key={review.id}>
               <div className="font-semibold">{review.author}</div>
               <div>
                  <StarRating value={review.rating} />
               </div>
               <div className="py-2">{review.content}</div>
            </div>
         ))}
      </div>
   );
};

export default ReviewList;
