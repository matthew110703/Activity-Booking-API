import { Response } from "express";
import { ApiResponseError } from "../types/response";
import { ValidationError } from "express-validator";

const errorCodes: Record<string, string> = {
  400: "Bad_Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not_Found",
  409: "Conflict",
  422: "Unprocessable_Entity",
  429: "Too_Many_Requests",
  500: "Internal_Server_Error",
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  validationErrors?: ValidationError[]
) => {
  const errorCode = errorCodes[statusCode.toString()] || errorCodes[500];
  const response: ApiResponseError = {
    success: false,
    error: {
      code: errorCode,
      details: message,
      validationErrors: validationErrors ? validationErrors : undefined,
    },
  };
  res.status(statusCode).json(response);
};

export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
) => {
  const response = {
    success: true,
    message,
    data: data && data,
  };
  res.status(statusCode).json(response);
};
