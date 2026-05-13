import { Response } from 'express';

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export function sendSuccess(
  res: Response,
  data: unknown,
  message = 'Success',
  statusCode = 200
) {
  return res.status(statusCode).json({ success: true, message, data });
}

export function sendCreated(res: Response, data: unknown, message = 'Created successfully') {
  return sendSuccess(res, data, message, 201);
}

export function sendPaginated(
  res: Response,
  data: unknown[],
  meta: PaginationMeta,
  message = 'Success'
) {
  return res.status(200).json({ success: true, message, data, meta });
}

export function paginate(page: number, limit: number, total: number): PaginationMeta {
  const totalPages = Math.ceil(total / limit);
  return {
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

export function getPaginationParams(query: any): { page: number; limit: number; skip: number } {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 20));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
