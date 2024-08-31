import { printLog, calculateFileHash } from '@util/Utils';
import HttpRequests from '@util/HttpRequests';

export const uploadImage = async(file: File, userId: number, path: string) => {
    printLog('upload file');
    if(!file || !userId)
        return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId.toString());
    formData.append('rootPath', path);
    try{
        const response = await HttpRequests.getInstance()
        .post<Promise<{ imageResult: IImageReult }>>('/image/upload', formData);
        printLog('extracted_text' + response.imageResult.extracted_text);
        return response.imageResult;
    }catch(error){
        throw error
    }
}

export const getStoredExtractedText = async (file: File): Promise<IStoredImageData | null> => {
    const fileHash = await calculateFileHash(file);
    const storedData = localStorage.getItem(`visionAnalyzed_${fileHash}`);
    if (storedData) {
        try {
            const parsedData: IStoredImageData = JSON.parse(storedData);
            if (typeof parsedData.s3Path === 'string' && Array.isArray(parsedData.extractedText)) {
                return parsedData;
            }
        } catch (error) {
            // console.error("Error parsing stored data:", error);
            throw error;
        }
    }
    return null;
};

export const storeExtractedText = async (file: File, s3Path: string, extractedText: string[]): Promise<void> => {
    const fileHash = await calculateFileHash(file);
    const dataToStore: IStoredImageData = {
      s3Path,
      extractedText
    };
    localStorage.setItem(`visionAnalyzed_${fileHash}`, JSON.stringify(dataToStore));
};

export interface IImageReult {
    original_path: string,
    thumbnail_path: string,
    original_fileName: string,
    extracted_text?: string[],
}

export interface IStoredImageData {
    s3Path: string;
    extractedText: string[];
}