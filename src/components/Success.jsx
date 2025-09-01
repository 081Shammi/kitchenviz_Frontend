import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../reducers/cart';

export default function Success() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearCart());

    const timer = setTimeout(() => {
      navigate('/');
    }, 7000); // 7000 ms = 7 seconds

    // Cleanup timeout if component unmounts early
    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-green-50 flex-col">
      <h1
        className="text-3xl sm:text-4xl font-extrabold text-green-600 drop-shadow-lg mb-8 
                   animate-success-pop"
      >
        Payment Successful
      </h1>
      <button
        onClick={() => navigate('/')}
        className="px-8 py-3 rounded-full bg-green-600 hover:bg-green-700 transition text-white font-semibold text-lg shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400 animate-fadeIn"
      >
        Back to Home
      </button>
      <style>
        {`
          @keyframes success-pop {
            0% { opacity: 0; transform: scale(0.95); }
            70% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-success-pop {
            animation: success-pop 0.9s cubic-bezier(.3,1.5,.3,1) both;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(16px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fadeIn {
            animation: fadeIn 0.9s 0.4s both;
          }
        `}
      </style>
    </div>
  );
}
