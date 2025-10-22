import React from 'react';
import type { RentPayment } from '@/types/api';
import { Card, CardBody } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';

interface PaymentDetailsProps {
  payment: RentPayment;
}

export const PaymentDetails: React.FC<PaymentDetailsProps> = ({ payment }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'green';
      case 'pending':
        return 'yellow';
      case 'overdue':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Card>
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">Amount</p>
                <p className="text-xl font-semibold">₹{payment.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">Status</p>
                <Badge color={getStatusColor(payment.status)}>{payment.status}</Badge>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400 mb-1">Due Date</p>
                <p>{new Date(payment.dueDate).toLocaleDateString()}</p>
              </div>
              {payment.paymentDate && (
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Payment Date</p>
                  <p>{new Date(payment.paymentDate).toLocaleDateString()}</p>
                </div>
              )}
              {payment.transactionId && (
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Transaction ID</p>
                  <p className="font-mono">{payment.transactionId}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Property Details</h3>
            <div className="space-y-3">
              {payment.propertyName && (
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Property</p>
                  <p>{payment.propertyName}</p>
                </div>
              )}
              {payment.tenantName && (
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Tenant</p>
                  <p>{payment.tenantName}</p>
                </div>
              )}
              {payment.tenantEmail && (
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Tenant Email</p>
                  <p>{payment.tenantEmail}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};