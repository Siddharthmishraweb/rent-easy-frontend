import { SAMPLE_AGREEMENTS, SAMPLE_PAYMENTS, SAMPLE_MAINTENANCE_REQUESTS } from './properties';

// Rental Agreement APIs
export const mockCreateAgreement = (agreementData: any) => {
  const newAgreement = {
    ...agreementData,
    id: "mock-agreement-" + Date.now(),
    isActive: true,
    status: "active",
    createdAt: new Date().toISOString()
  };
  return {
    message: "Rental agreement created",
    data: newAgreement
  };
};

export const mockGetAllAgreements = () => {
  return {
    data: SAMPLE_AGREEMENTS
  };
};

export const mockGetAgreementById = (agreementId: string) => {
  const agreement = SAMPLE_AGREEMENTS.find(a => a.id === agreementId);
  if (!agreement) throw new Error("Agreement not found");

  return {
    data: agreement
  };
};

export const mockTerminateAgreement = (agreementId: string, reason: string) => {
  const agreement = SAMPLE_AGREEMENTS.find(a => a.id === agreementId);
  if (!agreement) throw new Error("Agreement not found");

  const updatedAgreement = {
    ...agreement,
    isActive: false,
    status: "terminated",
    meta: {
      ...agreement.meta,
      terminationReason: reason
    }
  };

  return {
    message: "Rental agreement terminated",
    data: updatedAgreement
  };
};

export const mockGenerateAgreementPdf = (agreementId: string) => {
  return {
    filename: `rental-agreement-${agreementId}.pdf`,
    base64: "mock-pdf-base64-string"
  };
};

// Payment APIs
export const mockCreatePayment = (paymentData: any) => {
  const newPayment = {
    ...paymentData,
    id: "mock-payment-" + Date.now(),
    transactionNumber: "TXN-" + Date.now(),
    status: "paid",
    createdAt: new Date().toISOString()
  };
  return {
    message: "Payment created",
    data: newPayment
  };
};

export const mockGetPaymentsByUser = (userId: string) => {
  const payments = SAMPLE_PAYMENTS.filter(p => p.userId === userId);
  return {
    message: "Payments fetched",
    data: payments
  };
};

export const mockGetPaymentBreakup = (agreementId: string, month: string, year: string) => {
  const agreement = SAMPLE_AGREEMENTS.find(a => a.id === agreementId);
  if (!agreement) throw new Error("Agreement not found");

  return {
    statusCode: 200,
    status: "OK",
    message: "Success",
    data: {
      agreementId,
      month,
      year,
      dueDate: `${year}-${month}-05T00:00:00.000Z`,
      rentAmount: agreement.rentAmount,
      penaltyAmount: 0,
      totalAmount: agreement.rentAmount,
      alreadyPaid: null,
      existingPayment: null
    }
  };
};

// Maintenance Request APIs
export const mockCreateMaintenanceRequest = (requestData: any) => {
  const newRequest = {
    ...requestData,
    id: "mock-request-" + Date.now(),
    status: "pending",
    createdAt: new Date().toISOString()
  };
  return {
    statusCode: 201,
    status: "OK",
    message: "Request created successfully.",
    data: newRequest
  };
};

export const mockGetOwnerRequests = (ownerId: string) => {
  const requests = SAMPLE_MAINTENANCE_REQUESTS.filter(r => r.ownerId === ownerId);
  return {
    statusCode: 200,
    status: "OK",
    message: "Requests fetched successfully.",
    data: requests
  };
};

export const mockGetTenantRequests = (tenantId: string) => {
  const requests = SAMPLE_MAINTENANCE_REQUESTS.filter(r => r.raisedBy === tenantId);
  return {
    statusCode: 200,
    status: "OK",
    message: "Requests fetched successfully.",
    data: requests
  };
};

export const mockUpdateRequestStatus = (requestId: string, newStatus: 'accepted' | 'completed' | 'rejected') => {
  const request = SAMPLE_MAINTENANCE_REQUESTS.find(r => r.id === requestId);
  if (!request) throw new Error("Request not found");

  const updatedRequest = {
    ...request,
    status: newStatus,
    updatedAt: new Date().toISOString()
  };

  return {
    statusCode: 200,
    status: "OK",
    message: `Request ${newStatus} successfully.`,
    data: updatedRequest
  };
};