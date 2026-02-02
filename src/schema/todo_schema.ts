import { Schema, Document, model } from 'mongoose';

export interface ToDoInterface extends Document {
    title: string;
    description?: string;
    status: 'pending' | 'completed';
    dueDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const TodoSchema = new Schema<ToDoInterface>(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending'
        },
        dueDate: {
            type: Date
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const TodoModel = model<ToDoInterface>('Todo', TodoSchema);