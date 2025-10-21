import { SAMPLE_USERS } from './properties';

export const SAMPLE_DOCUMENTS = [
  {
    id: "68f7722468add6afcf532495",
    userId: SAMPLE_USERS.owner.id,
    docType: "aadhaar",
    url: "https://www.researchgate.net/profile/Syeda-Javeriya/publication/382500899/figure/fig3/AS:11431281263128004@1721920589085/Sample-Images-of-real-Aadhar-card-from-roboflow-website.jpg",
    isVerified: true,
    uniqueNumber: "EDKPM7963N",
    uploadedAt: "2025-10-21T11:44:36.691Z",
    createdAt: "2025-10-21T11:44:36.692Z"
  }
];

export const mockCreateDocument = (documentData: any) => {
  const newDoc = {
    ...documentData,
    id: "mock-doc-" + Date.now(),
    uploadedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };
  SAMPLE_DOCUMENTS.push(newDoc);
  return {
    statusCode: 201,
    status: "OK",
    message: "Document uploaded successfully",
    data: newDoc
  };
};

export const mockGetAllDocuments = () => {
  return {
    statusCode: 200,
    status: "OK",
    message: "All documents fetched successfully",
    data: SAMPLE_DOCUMENTS
  };
};

export const mockGetDocumentById = (documentId: string) => {
  const doc = SAMPLE_DOCUMENTS.find(d => d.id === documentId);
  if (!doc) throw new Error("Document not found");
  return {
    statusCode: 200,
    status: "OK",
    message: "Document fetched successfully",
    data: doc
  };
};

export const mockUpdateDocument = (documentId: string, documentData: any) => {
  const index = SAMPLE_DOCUMENTS.findIndex(d => d.id === documentId);
  if (index === -1) throw new Error("Document not found");
  
  SAMPLE_DOCUMENTS[index] = {
    ...SAMPLE_DOCUMENTS[index],
    ...documentData,
    updatedAt: new Date().toISOString()
  };

  return {
    statusCode: 200,
    status: "OK",
    message: "Document updated successfully",
    data: SAMPLE_DOCUMENTS[index]
  };
};

export const mockDeleteDocument = (documentId: string) => {
  const index = SAMPLE_DOCUMENTS.findIndex(d => d.id === documentId);
  if (index === -1) throw new Error("Document not found");
  
  SAMPLE_DOCUMENTS.splice(index, 1);
  return {
    message: "Document deleted successfully"
  };
};

export const mockGetDocumentsByUserId = (userId: string) => {
  const docs = SAMPLE_DOCUMENTS.filter(d => d.userId === userId);
  return {
    statusCode: 200,
    status: "OK",
    message: "All documents fetched successfully",
    data: docs
  };
};