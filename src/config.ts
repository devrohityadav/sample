export const config = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || "development",
  DB_URL:
    process.env.DB_URL || "postgresql://postgres:password@localhost:5000/test",
  // maxUploadSize in bytes 5 * 1024 * 1024 = 5mb
  MAX_UPLOAD_SIZE: 5 * 1024 * 1024,
};
