import React, { useState } from 'react';
import Button from '../shared/Button';
import { useAuth } from '@/contexts/AuthContext';
import { documentService } from '@/services/document.service';

export const DocumentUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user?.id) return;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('userId', user.id);

    try {
      setUploading(true);
      await documentService.create(formData);
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        onChange={handleFileSelect}
        className="hidden"
        id="document-upload"
        accept=".pdf,.doc,.docx,image/*"
      />
      <label htmlFor="document-upload">
        <Button
          variant="outline"
          type="button"
          disabled={uploading}
        >
          Select File
        </Button>
      </label>
      {selectedFile && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{selectedFile.name}</span>
          <Button
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      )}
    </div>
  );
};