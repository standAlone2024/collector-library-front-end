export const CURRENT_HOMEPAGE_VERSION   = process.env.NEXT_PUBLIC_VERSION;
export const API_URL                    = 'http://localhost:3003';
export const DESCRIPTION_FONT_BIG       = 20;
export const DESCRIPTION_FONT_MID       = 16;
export const DESCRIPTION_FONT_SML       = 12;
export const BASIC_FONT_SIZE            = 12;
export const IS_SERVICE                 = false;
export const PATH_SECTION               = 'sections';
export const PATH_BOOK                  = 'books';
export const S3_PATH = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com`;
export const PATH_ORIGIN = 'origin';
export const enum LOG_LEVEL {
    LOG, WARNING, ERROR
};
export const enum ROLE {
    ADMIN = 1, 
    USER
};
export enum AUTH_ERROR_CODE {
    ACCESS_TOKEN_MISSING = 'ACCESS_TOKEN_MISSING',
    ACCESS_TOKEN_INVALID = 'ACCESS_TOKEN_INVALID',
    REFRESH_TOKEN_MISSING = 'REFRESH_TOKEN_MISSING',
    REFRESH_TOKEN_INVALID = 'REFRESH_TOKEN_INVALID'
};