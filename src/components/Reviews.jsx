import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid, faStarHalfStroke as faStarHalfSolid, faStar as faStarRegular } from '@fortawesome/free-solid-svg-icons';

function Reviews({ productId }) {
  const [reviews, setReviews] = useState([
    { id: 1, productId: productId, author: "John Doe", rating: 4, comment: "Great product! Highly recommended." },
    { id: 2, productId: productId, author: "Jane Smith", rating: 5, comment: "Excellent quality and fast delivery." },
  ]);
  const [newReviewText, setNewReviewText] = useState('');
  const [newRating, setNewRating] = useState(5);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReviewText.trim()) {
      const nextReviewId = reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1;
      const newReview = {
        id: nextReviewId,
        productId: productId,
        author: "You",
        rating: newRating,
        comment: newReviewText,
      };
      setReviews([...reviews, newReview]);
      setNewReviewText('');
      alert("Review submitted! (Simulated)");
    } else {
      alert("Please enter a review comment.");
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FontAwesomeIcon key={i} icon={faStarSolid} className="text-yellow-500" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FontAwesomeIcon key={i} icon={faStarHalfSolid} className="text-yellow-500" />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={faStarRegular} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="mt-10 p-6 rounded-lg bg-white shadow-xl border border-gray-100">
      <h3 className="text-2xl font-bold mb-5 text-gray-800 border-b pb-2">Customer Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
      ) : (
        <ul className="space-y-6">
          {reviews.filter(review => review.productId === productId).map(review => (
            <li key={review.id} className="py-4 border-b last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <strong className="font-semibold text-gray-700">{review.author}</strong>
                  <div className="text-sm text-gray-500">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{review.comment}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 pt-6 border-t">
        <h4 className="text-xl font-semibold mb-4 text-gray-800">Write a Review</h4>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
            <select
              id="rating"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-700"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
            >
              <option value={5}>5 Stars - Excellent</option>
              <option value={4}>4 Stars - Very Good</option>
              <option value={3}>3 Stars - Good</option>
              <option value={2}>2 Stars - Fair</option>
              <option value={1}>1 Star - Poor</option>
            </select>
          </div>
          <div>
            <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
            <textarea
              id="reviewText"
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm text-gray-700"
              placeholder="Share your thoughts about the product..."
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Reviews;