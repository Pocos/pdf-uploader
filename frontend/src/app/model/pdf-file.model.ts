export interface PdfFile{
    filename: string;
    mimetype: string;
    filePath: string;
    thumbnailPath: string;
    fileSize: number;
    created_at: Date;
    modified_at: Date;
}

export interface PdfFileResponse {
    currentPage: number;
    totalResults: number;
    totalPages: number;
    data: PdfFile[];
}