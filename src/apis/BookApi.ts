import HttpRequests from '@util/HttpRequests';
import { bookStore } from '@store';
import { printLog } from '@util/Utils';
import { SearchResult } from './models/ISection';

export const fetchBookList = async(sectionId: number | undefined) => {
    if(!sectionId)
        return;
    printLog("sectionId " + sectionId);
    bookStore.setLoading(true);
    try {
        const response = await HttpRequests.getInstance().get<{books : IBook[]}>(`/book/${sectionId}`);
        const books = response.books;
        if(books)
            bookStore.setBooks(books);
    }catch(err) {
        throw err;
    }finally {
        bookStore.setLoading(false);
    }
}

export const searchBooks = async(sectionId: number, keyword: string) => {
    if(!sectionId || !keyword)
        return;
    try {
        const response = await HttpRequests.getInstance().get<{result: IBookResult[]}>
        (`/section?section_id=${sectionId}&keyword=${keyword}`);
        if(response.result)
            return toSearchResult(response.result);
    }catch(err) {
        throw err;
    }
}

const toSearchResult = (bookResult: IBookResult[]) => {
    let rev: SearchResult[] = [];
    bookResult.map((book => {
        rev.push({
            id: book.id,
            label: book.title,
            thumb_path: book.book_thumb_path,
        });
    }));
    return rev;
}
export interface IBookResult {
    id: number;
    title: string;
    book_thumb_path?: string;
}

export interface IBook {
    id?: number;
    section_id: number;
    order: number;
    title: string;
    book_thumb_path?: string;
    description?: string;
    date: Date;
}