import React, { useState } from "react";
import axios from "axios";

import { Message } from "./message";
import Progress from "./progressBar";

export const FileUpload = ({
  id,
  fileTag,
  uploadUrl,
  uploadedFile,
  setUploadedFile,
}) => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = async (e) => {
    setUploadPercentage(0);
    const file = e.target.files[0];

    if (file === undefined) {
      setMessageType("error");
      setMessage("No file was selected!");
      return;
    }

    const formData = new FormData();
    formData.append(`${fileTag}`, file);

    try {
      const res = await axios.post(uploadUrl, formData, {
        onUploadProgress: ({ loaded, total }) => {
          setUploadPercentage(parseInt(Math.round((loaded * 100) / total)));
        },
      });

      const { fileName, filePath, size } = res.data;
      const fileSize = (size / (1024 * 1024)).toFixed(3);
      setUploadedFile({
        id,
        fileName,
        filePath,
        size: fileSize,
      });

      setMessageType("success");
      setMessage(`${fileTag} Uploaded (File size : ${fileSize} MB)`);
    } catch (err) {
      if (err.response.status === 500) {
        setMessageType("error");
        setMessage(`Can't upload ${fileTag} (File too large)`);
      }

      if (err.response.status === 404) {
        setMessageType("error");
        setMessage(`Url not found!`);
      }
    }
  };

  return (
    <div id="file_upload">
      <b>
        Upload {fileTag} <i className="req">*</i>
      </b>
      <small>only .gif, .jpg, .jpeg, .png, .pdf | Should not exceed 5MB</small>

      <input
        name="file"
        type="file"
        id={`file_${id}`}
        data-max-size="5mb"
        onChange={onChange}
        style={{ display: "none" }}
        accept=".gif, .jpg, .jpeg, .png, .pdf"
      />

      <label className="button" htmlFor={`file_${id}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
        </svg>
        Upload {fileTag}
      </label>

      {uploadPercentage > 0 && <Progress percentage={uploadPercentage} />}
      <Message size={uploadedFile.size} type={messageType} message={message} />
    </div>
  );
};
