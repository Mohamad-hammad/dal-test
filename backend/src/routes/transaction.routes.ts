import { Router } from 'express';
import { getAllTransactions } from '../controllers/TransactionController';

const router = Router();

router.get('/', getAllTransactions);

export default router;