import { Request, Response, RequestHandler } from 'express';
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

export const getTransactionById: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const transactionRepository = AppDataSource.getRepository(Transaction);
        
        const transaction = await transactionRepository.findOne({
            where: { id }
        });

        if (!transaction) {
            res.status(404).json({ 
                message: `Transaction with ID ${id} not found` 
            });
            return;
        }

        res.json(transaction);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching transaction', 
            error: (error as Error).message 
        });
    }
} 