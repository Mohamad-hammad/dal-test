import { Router } from 'express';
import { getAllTransactions, getTransactionById, createTransaction } from '../controllers/TransactionController';

const router = Router();

router.get('/', getAllTransactions);
router.get('/:id', getTransactionById);
router.post('/', createTransaction);

export default router;