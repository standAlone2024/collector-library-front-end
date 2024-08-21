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