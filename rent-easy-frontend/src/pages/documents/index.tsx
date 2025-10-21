import React from 'react';
import { motion } from 'framer-motion';
import { useDocuments } from '@/hooks/useDocuments';
import { Button } from '@/components/shared/Button';
import { Card, CardBody } from '@/components/shared/Card';
import { Spinner } from '@/components/shared/Spinner';
import { useAuth } from '@/contexts/AuthContext';
import { DocumentUploader } from '@/components/document/DocumentUploader';

const DocumentsPage = () => {
  const { data: documents, isLoading, error } = useDocuments();
  const { user } = useAuth();

  const handleDownload = async (documentId: string) => {
    // Implement document download logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">My Documents</h1>
        <DocumentUploader />
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="text-center text-red-600">
          Error loading documents. Please try again.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents?.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardBody>
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900">
                      <svg
                        className="w-6 h-6 text-primary-600 dark:text-primary-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{doc.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Uploaded on {new Date(doc.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(doc.id)}
                    >
                      Download
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {documents?.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">No Documents Yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Upload your first document using the button above
          </p>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;