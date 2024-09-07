export interface Har {
    log: Log;
}

export interface Log {
    version: string;
    creator: Creator;
    pages: Page[];
    entries: Entry[];
}

export interface Creator {
    name: string;
    version: string;
}

export interface Page {
    startedDateTime: string;
    id: string;
    title: string;
    pageTimings: PageTimings;
}

export interface PageTimings {
    onContentLoad: number;
    onLoad: number;
}

export interface Entry {
    startedDateTime: string;
    time: number;
    request: Request;
    response: Response;
    cache: Cache;
    timings: Timings;
    serverIPAddress?: string;
    connection?: string;
    pageref?: string;
}

export interface Request {
    method: string;
    url: string;
    httpVersion: string;
    cookies: Cookie[];
    headers: Header[];
    queryString: QueryString[];
    postData?: PostData;
    headersSize: number;
    bodySize: number;
}

export interface Response {
    status: number;
    statusText: string;
    httpVersion: string;
    cookies: Cookie[];
    headers: Header[];
    content: Content;
    redirectURL: string;
    headersSize: number;
    bodySize: number;
    _transferSize?: number;
}

export interface Cookie {
    name: string;
    value: string;
    path?: string;
    domain?: string;
    expires?: string;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: string;
}

export interface Header {
    name: string;
    value: string;
}

export interface QueryString {
    name: string;
    value: string;
}

export interface PostData {
    mimeType: string;
    text: string;
    params?: Param[];
}

export interface Param {
    name: string;
    value?: string;
    fileName?: string;
    contentType?: string;
}

export interface Content {
    size: number;
    mimeType: string;
    text?: string;
    encoding?: string;
}

export interface Cache {
    beforeRequest?: CacheEntry;
    afterRequest?: CacheEntry;
}

export interface CacheEntry {
    expires?: string;
    lastAccess: string;
    eTag: string;
    hitCount: number;
}

export interface Timings {
    blocked: number;
    dns: number;
    connect: number;
    send: number;
    wait: number;
    receive: number;
    ssl: number;
}