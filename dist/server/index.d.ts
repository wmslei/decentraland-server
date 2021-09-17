import { Request, Response, RequestHandler } from 'express';
export declare function useRollbar(accessToken: string): void;
export declare function handleRequest<T = Request, U = Response>(callback: (req: T, res: U) => any): RequestHandler;
export declare function extractFromReq<T = string>(req: Request, param: string): T;
export declare function sendOk(data: any): {
    ok: boolean;
    data: any;
};
export declare function sendError(data: any, error: any): {
    ok: boolean;
    data: any;
    error: any;
};
