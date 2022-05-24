export enum Methods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
export type IArgs = Record<string, string> | undefined
export interface IEndpoint<
    EURL extends string,
    EARGS extends IArgs,
    EMETHOD extends Methods,
    EREQ extends Methods extends Methods.GET | Methods.DELETE ? void : object,
    ERESP
    > {
    url: EURL;
    args: EARGS;
    method: EMETHOD;
    req: EREQ;
    resp: ERESP
}

export type EURL<T extends IEndpoint<any, any, any, any, any>> = T extends { url: infer U } ? U : never;
export type EARGS<T extends IEndpoint<any, any, any, any, any>> = T extends { args: infer A } ? A : never;
export type EMETHOD<T extends IEndpoint<any, any, any, any, any>> = T extends { method: infer M } ? M : never;
export type EREQ<T extends IEndpoint<any, any, any, any, any>> = T extends { req: infer M } ? M : never;
export type ERESP<T extends IEndpoint<any, any, any, any, any>> = T extends { resp: infer M } ? M : never;