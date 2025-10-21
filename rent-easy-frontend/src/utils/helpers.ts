import axios from 'axios';

interface UploadResponse {
  url: string;
  key: string;
}

export const uploadImage = async (file: File): Promise<UploadResponse> => {
  try {
    // Create form data
    const formData = new FormData();
    formData.append('image', file);

    // Get presigned URL from your backend
    const { data: { url, fields } } = await axios.get('/api/upload/presigned');

    // Upload to S3
    const uploadFormData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      uploadFormData.append(key, value as string);
    });
    uploadFormData.append('file', file);

    await axios.post(url, uploadFormData);

    // Return the final URL
    return {
      url: `${url}/${fields.key}`,
      key: fields.key,
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const getImageUrl = (key: string): string => {
  if (!key) return '';
  if (key.startsWith('http')) return key;
  return `${process.env.NEXT_PUBLIC_CDN_URL}/${key}`;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
};

export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat('en-IN').format(number);
};

export const pluralize = (count: number, singular: string, plural: string): string => {
  return count === 1 ? singular : plural;
};

export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T => {
  let timeout: NodeJS.Timeout;

  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

export const generateArrayFromNumber = (number: number): number[] => {
  return Array.from({ length: number }, (_, i) => i + 1);
};

export const calculateTimeAgo = (date: string | Date): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays}d ago`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths}mo ago`;
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}y ago`;
};

export const isValidImage = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const retryWithDelay = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await sleep(delay);
    return retryWithDelay(fn, retries - 1, delay * 2);
  }
};