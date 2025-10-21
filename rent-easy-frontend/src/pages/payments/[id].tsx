import React from 'react';
import { motion } from 'framer-motion';
import { usePaymentHistory } from '@/hooks/usePaymentHistory';
import Button from '@/components/shared/Button';
import { Card, CardBody } from '@/components/shared/Card';
import Badge from '@/components/shared/Badge';
import { Spinner } from '@/components/shared/spinner';
import { useRouter } from 'next/router';
import { PaymentDetails } from '@/components/payment/PaymentDetails';

const PaymentDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: payment, isLoading, error } = usePaymentHistory(id as string);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'failed':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600">
          Error loading payment details. Please try again.
        </div>
      ) : payment ? (
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-semibold mb-2">Payment Details</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Transaction ID: {payment.transactionId}
              </p>
            </div>
            <Badge color={getStatusColor(payment.status)} size="lg">
              {payment.status}
            </Badge>
          </div>

          <PaymentDetails payment={payment} />

          <div className="mt-8 flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => router.push('/payments')}
            >
              Back to Payments
            </Button>
            {payment.invoice && (
              <Button onClick={() => window.open(payment.invoice, '_blank')}>
                Download Invoice
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">Payment Not Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The payment record you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push('/payments')}>
            View All Payments
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaymentDetailsPage;