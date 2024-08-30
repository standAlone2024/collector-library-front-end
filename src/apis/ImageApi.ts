import { printLog } from '@util/Utils';
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

export interface IImageReult {
    original_path: string,
    thumbnail_path: string,
    original_fileName: string,
    extracted_text?: string
}