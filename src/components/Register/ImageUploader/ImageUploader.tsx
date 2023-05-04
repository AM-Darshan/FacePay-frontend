import React, { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  addUploadedImages,
  setUploadStatus,
} from "../../../app/userData/imageUploadSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const ImageUploader = () => {
  const dispatch = useAppDispatch();
  const userImageStore = useAppSelector((state) => state.imageUploadReducer);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const uploadedImages: any = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result as string;
          uploadedImages.push(base64Image);
          dispatch(addUploadedImages(uploadedImages));
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  function handleClick(event: any) {
    event.preventDefault();
    dispatch(setUploadStatus("done"));
  }

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="form-control-file mb-3"
      />
      <button
        onClick={handleClick}
        className="btn btn-primary"
        disabled={userImageStore.uploadedImages.length === 0}
      >
        Done
      </button>
    </div>
  );
};

export default ImageUploader;
