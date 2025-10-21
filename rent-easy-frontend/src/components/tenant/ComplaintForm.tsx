import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { agreementService } from '../../services/agreement.service';
import type { RentalAgreement } from '../../types/api';
import { FiSend, FiAlertCircle } from 'react-icons/fi';

interface ComplaintFormProps {
  tenantId: string;
}

type ComplaintPriority = 'LOW' | 'MEDIUM' | 'HIGH';

interface ComplaintData {
  agreementId: string;
  description: string;
  priority: ComplaintPriority;
  images?: File[];
}

export default function ComplaintForm({ tenantId }: ComplaintFormProps) {
  const [selectedAgreement, setSelectedAgreement] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<ComplaintPriority>('MEDIUM');
  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  const { data: agreements } = useQuery(
    ['tenantAgreements', tenantId],
    () => agreementService.getUserAgreements(),
    {
      select: (data) => data.filter((agreement) => agreement.status === 'ACTIVE'),
    }
  );

  const submitComplaint = useMutation(
    (data: ComplaintData) => {
      const formData = new FormData();
      formData.append('agreementId', data.agreementId);
      formData.append('description', data.description);
      formData.append('priority', data.priority);
      
      if (data.images) {
        data.images.forEach((image) => {
          formData.append('images', image);
        });
      }

      return axios.post('/api/complaints', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    {
      onSuccess: () => {
        // Reset form
        setSelectedAgreement('');
        setDescription('');
        setPriority('MEDIUM');
        setImages([]);
        setPreview([]);
      },
    }
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);

      // Create preview URLs
      const urls = files.map((file) => URL.createObjectURL(file));
      setPreview(urls);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitComplaint.mutate({
      agreementId: selectedAgreement,
      description,
      priority,
      images,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-6">
        <div>
          <label htmlFor="property" className="block text-sm font-medium text-gray-700">
            Select Property
          </label>
          <select
            id="property"
            value={selectedAgreement}
            onChange={(e) => setSelectedAgreement(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Choose a property</option>
            {agreements?.map((agreement: RentalAgreement) => (
              <option key={agreement._id} value={agreement._id}>
                {agreement.property.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as ComplaintPriority)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="LOW">Low Priority</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="HIGH">High Priority</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Describe your complaint in detail..."
            required
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Images (Optional)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <FiAlertCircle className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="images"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload images</span>
                  <input
                    id="images"
                    type="file"
                    className="sr-only"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>

          {preview.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {preview.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="h-24 w-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(preview.filter((_, i) => i !== index));
                      setImages(images.filter((_, i) => i !== index));
                    }}
                    className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitComplaint.isLoading}
            className={`
              flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white
              ${
                submitComplaint.isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }
            `}
          >
            <FiSend className="mr-2 -ml-1 h-5 w-5" />
            {submitComplaint.isLoading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </div>
      </div>
    </form>
  );
}