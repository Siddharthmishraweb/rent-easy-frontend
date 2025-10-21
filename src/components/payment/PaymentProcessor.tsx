import { useState } from 'react';
import { loadRazorpay } from '../../utils/payment';
import axios from 'axios';
import toast from 'react-hot-toast';

interface PaymentProps {
  amount: number;
  propertyId: string;
  tenantId: string;
  rentMonth: string;
}

export default function PaymentProcessor({ amount, propertyId, tenantId, rentMonth }: PaymentProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('/api/payments/create-order', {
        amount,
        propertyId,
        rentMonth
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "RentEasy",
        order_id: data.orderId,
        handler: async (response: any) => {
          await axios.post('/api/payments/verify', {
            ...response,
            propertyId,
            tenantId,
            rentMonth
          });
          toast.success('Payment successful!');
        }
      };

      const rzp = await loadRazorpay();
      const paymentObject = new rzp(options);
      paymentObject.open();
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-green-500 text-white px-6 py-2 rounded disabled:bg-gray-400"
    >
      {loading ? 'Processing...' : `Pay ₹${amount}`}
    </button>
  );
}
