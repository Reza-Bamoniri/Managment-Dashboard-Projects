import { useState } from "react";

function useImageUpload(initialImage = "") {
  const [preview, setPreview] = useState(initialImage);

  const handleImageChange = (file: File | null) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreview("");
  };

  return {
    preview,
    handleImageChange,
    removeImage,
  };
}

export default useImageUpload;
