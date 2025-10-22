import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useToast } from '@/contexts/ToastContext';
import { Card, CardHeader, CardBody } from '@/components/shared/Card';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import { Alert } from '@/components/shared/Alert';
import { uploadImage } from '@/utils/helpers';
import { config } from '@/config';
import { useUser } from '@/contexts/AuthContext';
import { RentHistory } from '@/components/tenant/RentHistory';
import { PropertyRentalHistory } from '@/components/owner/PropertyRentalHistory';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  profileImage: FileList;
}

const ProfilePage = () => {
  const router = useRouter();
  const toast = useToast();
  const { user, updateUser } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(user?.profilePicture || '');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (!config.allowedImageTypes.includes(file.type)) {
          toast.error('Please upload a valid image file (JPG, PNG, or WebP)');
          return;
        }
        if (file.size > config.maxFileSize) {
          toast.error('Image size should be less than 5MB');
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [toast]
  );

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsUploading(true);
      let imageUrl = user?.profilePicture;

      if (data.profileImage?.[0]) {
        const uploadResult = await uploadImage(data.profileImage[0]);
        imageUrl = uploadResult.url;
      }

      // Make API call to update user profile
      const updatedUser = await fetch(`${config.apiUrl}/api/users/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          profileImage: imageUrl,
        }),
      }).then((res) => res.json());

      updateUser(updatedUser);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-4"
    >
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-semibold">Profile Settings</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary-100 dark:border-primary-900">
                  <img
                    src={imagePreview || '/images/default-avatar.png'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 cursor-pointer rounded-full transition-opacity">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    {...register('profileImage')}
                    onChange={handleImageChange}
                  />
                  <span>Change Photo</span>
                </label>
              </div>
              <p className="text-sm text-gray-500">
                Recommended: Square image, at least 400x400px
              </p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                error={errors.name?.message}
                {...register('name', { required: 'Name is required' })}
              />
              <Input
                label="Email"
                type="email"
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              <Input
                label="Phone"
                type="tel"
                error={errors.phone?.message}
                {...register('phone', {
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Invalid phone number',
                  },
                })}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="ghost" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isUploading}>
                Save Changes
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {/* User History */}
      {user && user.id && (
        <div className="mt-8 space-y-6">
          {user.role === 'TENANT' ? (
            <RentHistory userId={user.id} />
          ) : (
            <PropertyRentalHistory userId={user.id} />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ProfilePage;