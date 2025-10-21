import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import PDFViewer from '../shared/PDFViewer';
import SignatureCanvas from '../shared/SignatureCanvas';
import { motion } from 'framer-motion';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface RentAgreementProps {
  propertyId: string;
  tenantId: string;
  ownerId: string;
}

export default function RentAgreement({ propertyId, tenantId, ownerId }: RentAgreementProps) {
  const [signature, setSignature] = useState<string | null>(null);
  const [signing, setSigning] = useState(false);
  
  const { data: agreement, isLoading, error } = useQuery(['agreement', propertyId], 
    () => axios.get(`/api/agreements/${propertyId}`)
  );

  const handleSign = async () => {
    if (!signature) return;
    setSigning(true);
    
    try {
      await axios.post(`/api/agreements/${propertyId}/sign`, {
        signature,
        userId: tenantId
      });
      setSigning(false);
    } catch (error) {
      console.error('Failed to sign agreement:', error);
      setSigning(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-red-500">
        <ExclamationCircleIcon className="h-12 w-12 mb-4" />
        <p>Failed to load agreement</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
        <h2 className="text-2xl font-bold text-white">Rent Agreement</h2>
        <p className="text-blue-100 mt-2">Property ID: {propertyId}</p>
      </div>

      <div className="p-6 space-y-6">
        {agreement && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Agreement Date</p>
                <p className="font-medium">{new Date(agreement.data.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="font-medium capitalize">{agreement.data.status}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg border p-4">
          {agreement && <PDFViewer url={agreement.data.documentUrl} />}
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Digital Signature</h3>
          <SignatureCanvas onSave={setSignature} />
        </div>

        <div className="flex justify-end space-x-4">
          <button 
            onClick={() => setSignature(null)}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 
                     transition-colors duration-200"
          >
            Clear
          </button>
          <motion.button 
            onClick={handleSign}
            disabled={!signature || signing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-8 py-2 rounded-lg text-white transition-all duration-200 
                      flex items-center space-x-2
                      ${signature ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            {signing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white" />
                <span>Signing...</span>
              </>
            ) : (
              <>
                <CheckCircleIcon className="h-5 w-5" />
                <span>Sign Agreement</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
