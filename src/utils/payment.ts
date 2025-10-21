export const loadRazorpay = (): Promise<any> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve((window as any).Razorpay);
    };
    document.body.appendChild(script);
  });
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

export const generatePaymentReceipt = (paymentDetails: any) => {
  return {
    transactionId: paymentDetails.razorpay_payment_id,
    amount: paymentDetails.amount,
    date: new Date().toISOString(),
    status: 'success'
  };
};
