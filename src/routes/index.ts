import { Router } from 'express';
import transactionRouter from '@/routes/transaction';

const router = Router();

router.use('/transaction', transactionRouter);

export default router;
