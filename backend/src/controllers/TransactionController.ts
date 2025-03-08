import { Request, Response } from 'express';
import { Transaction } from '../entities/Transaction';
import { AppDataSource } from '../data-source';

export const getAllTransactions = async (req: Request, res: Response) => {
    try {
        const transactionRepository = AppDataSource.getRepository(Transaction);
        const transactions = await transactionRepository.find({
            order: {
                timestamp: 'DESC'
            }
        });
        
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching transactions', 
            error: (error as Error).message 
        });
    }
} 