'use client';

import Image from 'next/image';
import { useState } from 'react';

const UploadPage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      setImageUrl(data.url);
    } else {
      console.error('Failed to upload image');
      
    }
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
      />
      {imageUrl && (
        <div>
          <p>Image uploaded successfully!</p>
          <Image height={200} width={200} src={imageUrl} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default UploadPage;
