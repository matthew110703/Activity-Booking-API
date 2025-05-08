import { ValidationError } from "express-validator";

export type ApiResponseSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

export type ApiResponseError = {
  success: false;
  error: {
    code: string;
    details?: string | Record<string, string>;
    validationErrors?: ValidationError[];
  };
};

// A union type to represent either response
export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;
