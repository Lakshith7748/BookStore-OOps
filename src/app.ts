import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { BookRoutes } from './routes/book_routes';

dotenv.config();

interface IApp {
    startServer(): void;
    connectDatabase(): Promise<void>;
    initializeMiddleware(): void;
    initializeRoutes(): void;
    initializeErrorHandling(): void;
}

export default class App implements IApp {
    public PORT: number | string;
    public app: express.Application;
    private mongoUri: string;

    constructor() {
        this.PORT = process.env.PORT || 4000;
        this.mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/bookstore';
        this.app = express();

        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeErrorHandling();
        this.connectDatabase();
        this.startServer();
    }

    initializeMiddleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

            if (req.method === 'OPTIONS') {
                res.sendStatus(200);
                return;
            }
            next();
        });

        this.app.use((req: Request, res: Response, next: NextFunction) => {
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
            next();
        });
    }

    initializeRoutes(): void {
        this.app.get('/health', (req: Request, res: Response) => {
            res.status(200).json({
                success: true,
                message: 'Server is running',
                timestamp: new Date().toISOString()
            });
        });

        this.app.get('/api', (req: Request, res: Response) => {
            res.status(200).json({
                success: true,
                message: 'Welcome to the Book Store API',
                version: '1.0.0',
                endpoints: {
                    books: '/api/books',
                    health: '/health'
                }
            });
        });

        const bookRoutes = new BookRoutes();
        this.app.use('/api/books', bookRoutes.getRouter());

        this.app.use((req: Request, res: Response) => {
            res.status(404).json({
                success: false,
                message: 'Route not found',
                path: req.path
            });
        });
    }

    initializeErrorHandling(): void {
        this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error('Error:', err.message);
            console.error('Stack:', err.stack);

            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
            });
        });
    }

    async connectDatabase(): Promise<void> {
        try {
            await mongoose.connect(this.mongoUri);
            console.log('✅ Database Connected Successfully');
            console.log(`📊 Database: ${mongoose.connection.name}`);
        } catch (err: any) {
            console.error('❌ Database Connection Failed:', err.message);
            console.error('Please check your MongoDB connection string');
        }

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️  Database Disconnected');
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ Database Error:', err);
        });
    }

    startServer(): void {
        this.app.listen(this.PORT, () => {
            console.log('=================================');
            console.log(`🚀 Server is running`);
            console.log(`📡 Port: ${this.PORT}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 API Base URL: http://localhost:${this.PORT}/api`);
            console.log('=================================');
        });
    }
}