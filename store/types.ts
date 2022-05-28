export enum Methods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
export type IArgs = Record<string, string> | undefined
export interface IDefinition<
    URL extends string,
    QueryStrings extends IArgs,
    HttpVerb extends Methods,
    RequestType extends Methods extends Methods.GET | Methods.DELETE ? void : object,
    ResponseType
    > {
    url: URL;
    args: QueryStrings;
    verb: HttpVerb;
    req: RequestType;
    resp: ResponseType
}

export type URL<T extends IDefinition<any, any, any, any, any>> = T extends { url: infer U } ? U : never;
export type QueryStrings<T extends IDefinition<any, any, any, any, any>> = T extends { args: infer A } ? A : never;
export type HttpVerb<T extends IDefinition<any, any, any, any, any>> = T extends { verb: infer M } ? M : never;
export type RequestType<T extends IDefinition<any, any, any, any, any>> = T extends { req: infer M } ? M : never;
export type ResponseType<T extends IDefinition<any, any, any, any, any>> = T extends { resp: infer M } ? M : never;