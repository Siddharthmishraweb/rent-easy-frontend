import { useRef, useEffect } from 'react';
import SignaturePad from 'signature_pad';

interface SignatureCanvasProps {
  onSave: (signature: string) => void;
}

export default function SignatureCanvas({ onSave }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current);
    }
  }, []);

  const handleClear = () => {
    signaturePadRef.current?.clear();
  };

  const handleSave = () => {
    if (signaturePadRef.current?.isEmpty()) return;
    const dataUrl = signaturePadRef.current?.toDataURL();
    onSave(dataUrl);
  };

  return (
    <div className="border rounded p-4">
      <canvas 
        ref={canvasRef}
        width={500}
        height={200}
        className="border border-gray-300"
      />
      <div className="flex space-x-4 mt-4">
        <button 
          onClick={handleClear}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Clear
        </button>
        <button 
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Signature
        </button>
      </div>
    </div>
  );
}
