import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ImageUploader from '../shared/ImageUploader';
import axios from 'axios';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  address: Yup.object({
    street: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    pincode: Yup.string().required('Required'),
  }),
  rent: Yup.number().required('Required').positive(),
  deposit: Yup.number().required('Required').positive(),
  roomType: Yup.string().required('Required'),
  amenities: Yup.array().of(Yup.string()),
});

export default function PropertyRegistrationForm() {
  const { user } = useAuth();
  const [images, setImages] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      address: {
        street: '',
        city: '',
        state: '',
        pincode: '',
      },
      rent: '',
      deposit: '',
      roomType: '',
      amenities: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          formData.append(key, JSON.stringify(values[key]));
        });
        
        images.forEach((image, index) => {
          formData.append(`images`, image);
        });

        await axios.post('/api/properties', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        toast.success('Property registered successfully!');
      } catch (error) {
        toast.error('Failed to register property');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          {...formik.getFieldProps('title')}
          className="w-full p-2 border rounded"
        />
        {/* Add other form fields */}
      </div>

      {/* Image Upload */}
      <ImageUploader 
        onImagesSelected={setImages}
        maxImages={5}
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Register Property
      </button>
    </form>
  );
}
