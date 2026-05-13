import { Response } from 'express';
export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}
export declare function sendSuccess(res: Response, data: unknown, message?: string, statusCode?: number): Response<any, Record<string, any>>;
export declare function sendCreated(res: Response, data: unknown, message?: string): Response<any, Record<string, any>>;
export declare function sendPaginated(res: Response, data: unknown[], meta: PaginationMeta, message?: string): Response<any, Record<string, any>>;
export declare function paginate(page: number, limit: number, total: number): PaginationMeta;
export declare function getPaginationParams(query: any): {
    page: number;
    limit: number;
    skip: number;
};
//# sourceMappingURL=response.util.d.ts.map