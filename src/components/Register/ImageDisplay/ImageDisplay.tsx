import React, { useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";

const ImageDisplay: React.FC = () => {
  const uploadedImages = useAppSelector(
    (state) => state.imageUploadReducer.uploadedImages
  );

  const uploadedImagesStatus = useAppSelector(
    (state) => state.imageUploadReducer.status
  );

  const imageStatus = useAppSelector(
    (state) => state.imageUploadReducer.imagestatus
  );

  useEffect(() => {
    if (imageStatus === "success") {
      alert("uploaded succesfully");
    }
  }, [imageStatus]);
  return (
    <div>
      {uploadedImages.length === 0 && (
        <>
          <p>No images</p>
        </>
      )}
      {uploadedImages.length > 0 &&
        uploadedImagesStatus === "done" &&
        uploadedImages.map((image, index) => (
          <img src={image} key={index} alt={`Uploaded  ${index}`} />
        ))}
    </div>
  );
};

export default ImageDisplay;
