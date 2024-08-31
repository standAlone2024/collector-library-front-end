import HttpRequests from '@util/HttpRequests';
import { bookStore } from '@store';
import { printLog } from '@util/Utils';
import { SearchResult } from '@api/SectionApi'

export const fetchBookList = async(sectionId: number | undefined) => {
    if(!sectionId)
        return;
    printLog("sectionId " + sectionId);
    bookStore.setLoading(true);
    try {
        const response = await HttpRequests.getInstance().get<{books : IBook[]}>(`/book/${sectionId}`);
        if(response.books)
            bookStore.setBooks(response.books);
    }catch(err) {
        throw err;
    }finally {
        bookStore.setLoading(false);
    }
}

export const createBook = async(book:IBookWithOCR) => {
    if(!book)
        return;
    printLog(book);
    bookStore.setLoading(true);
    try{
        const response = await HttpRequests.getInstance().post<{book: IBookWithOCR}>(`/book`, book);
        if(response.book)
        {
            bookStore.addBook(response.book);
            // printLog('id: ' + response.book.id);
            printLog('id: ' + response.book.extracted_text);
            return response.book.id;
        }
    }catch(err) {
        throw err;
    }finally{
        bookStore.setLoading(false);
    }
}

export const searchBooks = async(sectionId: number, keyword: string) => {
    if(!sectionId || !keyword)
        return;
    printLog(sectionId, keyword);
    try {
        const response = await HttpRequests.getInstance().get<{books: IBookResult[]}>
        (`/book?section_id=${sectionId}&keyword=${keyword}`);
        if(response.books)
            return toSearchResult(response.books);
    }catch(err) {
        throw err;
    }
}

export const deleteBook = async(selectedId: number) => {
    if(!selectedId)
        return;
    bookStore.setLoading(true);
    printLog(selectedId);
    try{
        const response = await HttpRequests.getInstance().delete<{message: string}>(`/book/${selectedId}`);
        if(response.message)
        {
            printLog(response.message)
            bookStore.deleteBook(selectedId);
        }
    }catch(err) {
        throw err;
    }finally{
        bookStore.setLoading(false);
    }
}

export const updateBook = async(book: IBook) =>{
    if(!book)
        return;
    bookStore.setLoading(true);
    printLog(book);
    try{
        const response = await HttpRequests.getInstance().put<{book: IBook}>(`/book/${book.id}`, book);
        if(response.book)
            bookStore.updateBook(response.book)
    }catch(err) {
        throw err
    }finally{
        bookStore.setLoading(false);
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
    printLog(rev.length);
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
    created_date?: Date;
    updated_date?: Date;
}

export interface IBookWithOCR extends IBook {
    extracted_text?: string[];
}