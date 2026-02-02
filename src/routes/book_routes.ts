import { Router } from 'express';
import { BookController } from '../controllers/book_controller';

export class BookRoutes {
    public router: Router;
    private bookController: BookController;

    constructor() {
        this.router = Router();
        this.bookController = new BookController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', this.bookController.createBook);
        this.router.get('/', this.bookController.getAllBooks);
        this.router.get('/search', this.bookController.searchBooks);
        this.router.get('/stock/available', this.bookController.getInStockBooks);
        this.router.get('/genre/:genre', this.bookController.getBooksByGenre);
        this.router.get('/:id', this.bookController.getBookById);
        this.router.put('/:id', this.bookController.updateBook);
        this.router.delete('/:id', this.bookController.deleteBook);
    }

    public getRouter(): Router {
        return this.router;
    }
}