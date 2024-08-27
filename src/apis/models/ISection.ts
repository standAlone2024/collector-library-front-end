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