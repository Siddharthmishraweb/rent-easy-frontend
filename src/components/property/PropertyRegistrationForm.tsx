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

interface PropertyFormValues {
  title: string;
  description: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  rent: string;
  deposit: string;
  roomType: string;
  amenities: string[];
}

export default function PropertyRegistrationForm() {
  const { user } = useAuth();
  const [images, setImages] = useState<File[]>([]);

  const formik = useFormik<PropertyFormValues>({
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
        
        // Append form values with proper type checking
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('address', JSON.stringify(values.address));
        formData.append('rent', values.rent);
        formData.append('deposit', values.deposit);
        formData.append('roomType', values.roomType);
        formData.append('amenities', JSON.stringify(values.amenities));
        
        // Append images
        images.forEach((image) => {
          formData.append('images', image);
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
        <div>
          <input
            type="text"
            {...formik.getFieldProps('title')}
            placeholder="Property Title"
            className="w-full p-2 border rounded"
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
          )}
        </div>

        <div>
          <textarea
            {...formik.getFieldProps('description')}
            placeholder="Property Description"
            className="w-full p-2 border rounded h-32"
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              {...formik.getFieldProps('address.street')}
              placeholder="Street Address"
              className="w-full p-2 border rounded"
            />
            {formik.touched.address?.street && formik.errors.address?.street && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.address.street}</div>
            )}
          </div>

          <div>
            <input
              type="text"
              {...formik.getFieldProps('address.city')}
              placeholder="City"
              className="w-full p-2 border rounded"
            />
            {formik.touched.address?.city && formik.errors.address?.city && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.address.city}</div>
            )}
          </div>

          <div>
            <input
              type="text"
              {...formik.getFieldProps('address.state')}
              placeholder="State"
              className="w-full p-2 border rounded"
            />
            {formik.touched.address?.state && formik.errors.address?.state && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.address.state}</div>
            )}
          </div>

          <div>
            <input
              type="text"
              {...formik.getFieldProps('address.pincode')}
              placeholder="PIN Code"
              className="w-full p-2 border rounded"
            />
            {formik.touched.address?.pincode && formik.errors.address?.pincode && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.address.pincode}</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              {...formik.getFieldProps('rent')}
              placeholder="Monthly Rent"
              className="w-full p-2 border rounded"
            />
            {formik.touched.rent && formik.errors.rent && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.rent}</div>
            )}
          </div>

          <div>
            <input
              type="number"
              {...formik.getFieldProps('deposit')}
              placeholder="Security Deposit"
              className="w-full p-2 border rounded"
            />
            {formik.touched.deposit && formik.errors.deposit && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.deposit}</div>
            )}
          </div>
        </div>

        <div>
          <select
            {...formik.getFieldProps('roomType')}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Room Type</option>
            <option value="1BHK">1 BHK</option>
            <option value="2BHK">2 BHK</option>
            <option value="3BHK">3 BHK</option>
            <option value="4BHK">4 BHK</option>
          </select>
          {formik.touched.roomType && formik.errors.roomType && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.roomType}</div>
          )}
        </div>
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
