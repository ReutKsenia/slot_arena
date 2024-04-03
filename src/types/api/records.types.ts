export interface RecordsPagesResponse<TRecords = any> {
    data: TRecords[];
    meta?: RecordsMeta;
    links?: any;
}

interface RecordsMeta {
    currentPage: number;
    perPage: number;
    pageCount: number;
    totalCount: number;
}