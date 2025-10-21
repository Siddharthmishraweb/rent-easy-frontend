import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { paymentService } from '../../services/payment.service';
import type { RentPayment as RentPaymentType } from '../../types/api';
import { FiCreditCard, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import { loadRazorpay } from '../../utils/payment';

interface RentPaymentProps {
  tenantId: string;
}

export default function RentPayment({ tenantId }: RentPaymentProps) {
  const [selectedPayment, setSelectedPayment] = useState<RentPaymentType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: payments, isLoading, refetch } = useQuery(
    ['pendingPayments', tenantId],
    () => paymentService.getUserPayments(),
    {
      select: (data) => data.filter((payment) => payment.status === 'PENDING'),
    }
  );

  const initPaymentMutation = useMutation(
    (paymentId: string) => paymentService.initiatePayment(paymentId),
    {
      onSuccess: async (data) => {
        try {
          setIsProcessing(true);
          const razorpay = await loadRazorpay();
          
          const options = {
            key: data.keyId,
            amount: data.amount,
            currency: data.currency,
            name: 'RentEasy',
            description: 'Rent Payment',
            order_id: data.orderId,
            handler: async (response: any) => {
              try {
                await paymentService.verifyPayment(selectedPayment!._id, {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                });
                refetch();
              } catch (error) {
                console.error('Payment verification failed:', error);
              }
            },
            modal: {
              ondismiss: () => {
                setIsProcessing(false);
                setSelectedPayment(null);
              },
            },
            theme: {
              color: '#2563EB',
            },
          };

          const rzp = new razorpay(options);
          rzp.open();
        } catch (error) {
          console.error('Failed to initialize Razorpay:', error);
          setIsProcessing(false);
          setSelectedPayment(null);
        }
      },
    }
  );

  const handlePayment = (payment: RentPaymentType) => {
    setSelectedPayment(payment);
    initPaymentMutation.mutate(payment._id);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
            <div className="h-8 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!payments?.length) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm text-center">
        <FiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Pending Payments</h3>
        <p className="text-gray-600">You're all caught up with your rent payments!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Pending Payments</h3>
      {payments.map((payment) => (
        <div
          key={payment._id}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h4 className="font-medium text-gray-900">
                {payment.agreement.property.title}
              </h4>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <FiCalendar className="mr-1.5 h-4 w-4 text-gray-400" />
                Due on {new Date(payment.dueDate).toLocaleDateString()}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">₹{payment.amount}</p>
                <p className="text-sm text-gray-500">Monthly Rent</p>
              </div>
              <button
                onClick={() => handlePayment(payment)}
                disabled={isProcessing}
                className={`
                  flex items-center px-4 py-2 rounded-lg text-white font-medium
                  ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }
                `}
              >
                <FiCreditCard className="mr-2 h-5 w-5" />
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}