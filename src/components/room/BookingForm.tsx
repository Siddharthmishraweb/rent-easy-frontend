import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DatePicker from '@/components/shared/DatePicker';
import Input from '@/components/shared/Input';
import Button from '@/components/shared/Button';
import { Room } from '@/types/property';

interface BookingFormProps {
  room: Room;
  className?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({ room, className = '' }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    startDate: '',
    duration: '12',  // Default duration in months
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      startDate: date ? date.toISOString() : ''
    }));
    if (errors.startDate) {
      setErrors(prev => ({
        ...prev,
        startDate: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.startDate) {
      newErrors.startDate = 'Move-in date is required';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[-()\s]/g, ''))) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (!formData.duration || parseInt(formData.duration) < 1) {
      newErrors.duration = 'Duration must be at least 1 month';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotalAmount = () => {
    const monthlyRent = room.rent || 0;
    const duration = parseInt(formData.duration) || 0;
    const totalRent = monthlyRent * duration;
    const securityDeposit = room.securityDeposit || monthlyRent * 2;
    return {
      totalRent,
      securityDeposit,
      total: totalRent + securityDeposit
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Here you would typically make an API call to submit the booking
      // For now, we'll just simulate a successful booking
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to a success page or show a success message
      router.push({
        pathname: '/booking/success',
        query: {
          roomId: room.id,
          startDate: formData.startDate,
          duration: formData.duration
        }
      });
    } catch (error) {
      setErrors({
        submit: 'Failed to submit booking. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const { totalRent, securityDeposit, total } = calculateTotalAmount();

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-xl font-semibold mb-4">Book This Room</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <DatePicker
            label="Move-in Date"
            value={formData.startDate ? new Date(formData.startDate) : undefined}
            onChange={handleDateChange}
            minDate={new Date()}
            error={errors.startDate}
          />
        </div>

        <Input
          label="Duration (months)"
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          min="1"
          max="60"
          required
          error={errors.duration}
        />

        <Input
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          error={errors.name}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          error={errors.email}
        />

        <Input
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
          error={errors.phone}
        />

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between mb-2">
            <span>Monthly Rent:</span>
            <span>₹{room.rent?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Total Rent ({formData.duration} months):</span>
            <span>₹{totalRent.toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Security Deposit:</span>
            <span>₹{securityDeposit.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total Amount:</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>

        {errors.submit && (
          <div className="text-red-500 text-sm mt-2">{errors.submit}</div>
        )}

        <Button
          type="submit"
          className="w-full mt-4"
          disabled={loading}
          isLoading={loading}
        >
          {loading ? 'Processing...' : 'Book Now'}
        </Button>

        <p className="text-xs text-gray-500 mt-2">
          By clicking "Book Now", you agree to our terms and conditions and acknowledge
          that you'll need to complete the verification process.
        </p>
      </form>
    </div>
  );
};