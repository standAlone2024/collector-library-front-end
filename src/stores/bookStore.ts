import { makeAutoObservable, runInAction } from 'mobx';
import { IBookWithOCR, IBookDeatil } from '@api/BookApi';

class BookStore{
    books: IBookWithOCR[] = [];
    bookDetail: IBookDeatil | null = null;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    clear() {
        runInAction(() => {
            this.books = [];
            this.bookDetail = null;
        });
    }

    setLoading(loading: boolean) {
        this.loading = loading;
    }

    setBooks(books: IBookWithOCR[]) {
        runInAction(() => {
            this.books = books;
        });
    }

    setBookDetail(bookDetail: IBookDeatil) {
        runInAction(()=> {
            this.bookDetail = bookDetail;
        })
    }

    getBookDetail() {
        return this.bookDetail;
    }

    getBooks() {
        return this.books;
    }

    getBook(id: number) {
        return this.books.find(book => book.id === id);
    }

    addBook(book: IBookWithOCR) {
        runInAction(() => {
            this.books.push(book);
        });
    }

    updateBook(updateBook: IBookWithOCR) {
        runInAction(() => {
            const index = this.books.findIndex(book => book.id === updateBook.id);
            if(index !== -1){
                this.books[index] = updateBook;
            }
        })
    }

    deleteBook(id: number) {
        runInAction(() => {
            this.books = this.books.filter(book => book.id !== id);
        });
    }
}
const bookStore = new BookStore();
export default bookStore;