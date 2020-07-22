import React from "react";

const Progress = ({ percentage }) => {
  return (
    <div>
      <div className="upload_progress" style={{ width: `${percentage}%` }}>
        {`${percentage}%`}
      </div>
    </div>
  );
};

export default Progress;
