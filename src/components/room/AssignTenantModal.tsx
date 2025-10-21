import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AssignTenantInput } from '@/types/room';
import Modal from '@/components/shared/Modal';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import DatePicker from '@/components/shared/DatePicker';

interface AssignTenantModalProps {
  roomId: string;
  onSubmit: (roomId: string, data: AssignTenantInput) => Promise<void>;
  onClose: () => void;
}

export default function AssignTenantModal({
  roomId,
  onSubmit,
  onClose
}: AssignTenantModalProps) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<AssignTenantInput>({
    defaultValues: {
      roomId,
      paymentSchedule: {
        frequency: 'monthly',
        dueDay: 5
      }
    }
  });

  const onFormSubmit = async (data: AssignTenantInput) => {
    try {
      setLoading(true);
      await onSubmit(roomId, data);
      onClose();
    } catch (error) {
      console.error('Failed to assign tenant:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Assign Tenant" onClose={onClose}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div>
          <Input
            label="Tenant ID"
            {...register('tenantId', { required: 'Tenant ID is required' })}
            error={errors.tenantId?.message}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Schedule
          </label>
          <div className="mt-1 grid grid-cols-2 gap-4">
            <div>
              <select
                {...register('paymentSchedule.frequency')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div>
              <Input
                type="number"
                label="Due Day"
                {...register('paymentSchedule.dueDay', {
                  required: 'Due day is required',
                  min: { value: 1, message: 'Due day must be at least 1' },
                  max: { value: 28, message: 'Due day must be at most 28' }
                })}
                error={errors.paymentSchedule?.dueDay?.message}
              />
            </div>
          </div>
        </div>

        <div>
          <DatePicker
            label="Agreement End Date"
            {...register('agreementEndDate', { required: 'End date is required' })}
            error={errors.agreementEndDate?.message}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Assign Tenant
          </Button>
        </div>
      </form>
    </Modal>
  );
}