import axios from 'axios';
import { printLog } from '@util/Utils';
import HttpRequests from '@util/HttpRequests';
import { sectionStore } from '@store';

export const fetchSectionList = async(userId: number | undefined) => {
    if(!userId)
        return;
    sectionStore.setLoading(true);
    try{
        const response = await HttpRequests.getInstance().get<{sections: ISection[]}>(`/section/${userId}`);
        const sections = response.sections;
        // printLog(sections);
        sectionStore.setSections(sections);
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
    finally{
        sectionStore.setLoading(false);
    }
}

export const createSection = async(section : ISection) => {
    if(!section || !section.user_id)
        return;
    // printLog('input section');
    // printLog(section);
    sectionStore.setLoading(true);
    try{
        const response = await HttpRequests.getInstance().post<{section: ISection}>(`/section`, section);
        if(response.section)
            sectionStore.addSection(response.section);
    }catch(error){
        throw error;
    }finally{
        sectionStore.setLoading(false);
    }
}

export const updateSection = async(section: ISection) => {
    if(!section)
        return;
    // printLog(section);
    sectionStore.setLoading(true);
    try{
        const response = await HttpRequests.getInstance().put<{section: ISection}>(`/section/${section.id}`, section);
        if(response.section)
            sectionStore.updateSection(response.section);
    }catch(error){
        throw error;
    }finally{
        sectionStore.setLoading(false);
    }
}

export const deleteSection = async(id: number) => {
    if(!id)
        return;
    // printLog(id);
    sectionStore.setLoading(true);
    try{
        const response = await HttpRequests.getInstance().delete<{message: string}>(`/section/${id}`);
        if(response.message)
            sectionStore.deleteSection(id);
    }catch(error){
        throw error;
    }finally{
        sectionStore.setLoading(false);
    }
}

export const searchSection = async(keyword: string) => {
    if(!keyword)
        return;
    try{
        const response = await HttpRequests.getInstance().get<{result: SearchResult[]}>(`/section?keywork=${keyword}`)
        if(response.result)
            return response.result;
    }catch(error){
        throw error;
    }
}

export interface ISection {
    id?: number;
    user_id: number;
    order: number;
    label: string;
    sec_thumb_path?: string;
    date?: Date;
}

export type SearchResult = {
    id: number;
    label: string;
    thumb_path?: string;
};