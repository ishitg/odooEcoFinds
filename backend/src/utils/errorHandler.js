// utils/errorHandler.js
import { ApiError } from "./ApiError.js";

export const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error caught:", err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
      data: err.data || null,
    });
  }

  // fallback for unexpected errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: [err.message],
    data: null,
  });
};
