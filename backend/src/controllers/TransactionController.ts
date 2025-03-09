import { Request, Response, RequestHandler } from 'express';
import { Transaction } from '../entities/Transaction';
import { AppDataSource } from '../data-source';
import { TransactionType } from '../entities/enums/TransactionType';

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

export const createTransaction: RequestHandler = async (req, res) => {
    try {
        const { amount, type } = req.body;

        if (!amount || !type) {
            res.status(400).json({
                message: 'Amount and type are required fields'
            });
            return;
        }

        const numericAmount = Number(amount);
        if (isNaN(numericAmount)) {
            res.status(400).json({
                message: 'Amount must be a valid number'
            });
            return;
        }

        if (!Object.values(TransactionType).includes(type)) {
            res.status(400).json({
                message: 'Invalid transaction type. Must be either "credit" or "debit"'
            });
            return;
        }

        const transactionRepository = AppDataSource.getRepository(Transaction);
        const newTransaction = transactionRepository.create({
            amount: numericAmount,
            type: type as TransactionType
        });

        const savedTransaction = await transactionRepository.save(newTransaction);
        res.status(201).json(savedTransaction);
    } catch (error) {
        res.status(500).json({
            message: 'Error creating transaction',
            error: (error as Error).message
        });
    }
} 