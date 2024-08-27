import { makeAutoObservable, runInAction, action } from 'mobx';
import { IBook } from '@api/BookApi';

class BookStore{
    books: IBook[] = [];
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    clear() {
        runInAction(() => {
            this.books = [];
        });
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setBooks(books: IBook[]) {
        runInAction(() => {
            this.books = books;
        });
    }

    getBooks() {
        return this.books;
    }

    getBook(id: number) {
        return this.books.find(book => book.id === id);
    }

    addBook(book: IBook) {
        runInAction(() => {
            this.books.push(book);
        });
    }

    updateBook(updateBook: IBook) {
        runInAction(() => {
            const index = this.books.findIndex(book => book.id === updateBook.id);
            if(index !== -1){
                this.books[index] = updateBook;
            }
        })
    }

    deleteBook(id: number) {
        runInAction(() => {
            this.books = this.books.filter(book => book.id === id);
        });
    }
}
const bookStore = new BookStore();
export default bookStore;