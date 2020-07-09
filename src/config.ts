export const config = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URL:
    process.env.DB_URL || "postgresql://postgres:password@localhost:5000/test",
  DESTINATION: "uploads/",
  // maxUploadSize in bytes 200 * 1024 = 200kb (approx)
  MAX_UPLOAD_SIZE: 200 * 1024,
};
