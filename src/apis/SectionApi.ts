import axios from 'axios';
import { printLog } from '@util/Utils';
import HttpRequests from '@/utils/HttpRequests';
import { ISection } from './models/ISection';

export const getList = async(userId: number | undefined) => {
    if(!userId || userId === undefined)
        return;
    try{
        const response = await HttpRequests.getInstance().get<{sections: ISection[]}>(`/section/${userId}`);
        printLog(response.sections);
        return response.sections;
    }catch(err){
        if (axios.isAxiosError(err)) {  
            if (err.response) {
                throw err.response;  
            } else {
                throw err;
            }
        } else {
            printLog(err);
            throw new Error('An unknown error occurred');
        }
    }
}

export const createSection = async(section : ISection) => {
    if(!section || !section.user_id)
        return;
    printLog('input section');
    printLog(section);
    try{
        const response = await HttpRequests.getInstance().post<{message: string}>(`/section`, section);
        printLog(response.message);
        return response.message;
    }catch(error)
    {
        throw error;
    }
}

export const uploadImage = async(file: File, userId: number) => {
    if(!file || !userId)
        return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId.toString());
    try{
        const response = await HttpRequests.getInstance().post<Promise<{ originalPath: string, thumbnailPath: string }>>('/image/upload', formData);
        return response.thumbnailPath;
    }catch(error){
        throw error
    }
}