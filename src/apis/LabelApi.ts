import HttpRequests from '@util/HttpRequests';
import { bookStore, labelStore } from '@store';
import { printLog } from '@util/Utils';

export const fetchLabelList = async(sectionId: number | undefined) => {
    if(!sectionId) return;
    printLog(sectionId);

    labelStore.setLoading(true);
    try{
        const response = await HttpRequests.getInstance().get<{sectionLabels: ISectionOptLabel[]}>(`/label/${sectionId}`);
        if(response.sectionLabels)
        {
            printLog(response.sectionLabels);
            labelStore.setLabels(response.sectionLabels);
        }
    }catch(err) {
        throw err;
    }finally {
        labelStore.setLoading(false);
    }
}

export const createLabel = async(label : ISectionOptLabel | undefined) => {
    if(!label) return;
    printLog(label);

    labelStore.setLoading(true);
    try{
        const response = await HttpRequests.getInstance().post<{label: ISectionOptLabel}>(`/label`);
        if(response.label)
            labelStore.addLabel(response.label);
    }catch(err) {
        throw err;
    }finally {
        labelStore.setLoading(false);
    }
}

export const updateLabel = async(label: ISectionOptLabel | undefined) => {
    if(!label) return;
    printLog(label);

    labelStore.setLoading(true);
    try{
        const response = await HttpRequests.getInstance().put<{label: ISectionOptLabel}>(`/label`, label);
        if(response.label)
            labelStore.updateLabel(response.label);
    }catch(err) {
        throw err;
    }finally {
        labelStore.setLoading(false);
    }
}

export const deleteLabel = async(id: number | undefined) => {
    if(!id) return;
    printLog(id);

    labelStore.setLoading(true);
    try{
        const response = await HttpRequests.getInstance().delete<{message: string}>(`/label/${id}`);
        if(response.message)
        {
            printLog('message: ' + response.message);
            bookStore.deleteBook(id);
        }
    }catch(err) {
        throw err;
    }finally {
        labelStore.setLoading(false);
    }
}

export interface ISectionOptLabel {
    id?: number;
    section_id: number;
    label_name: string;
    order: number;
}