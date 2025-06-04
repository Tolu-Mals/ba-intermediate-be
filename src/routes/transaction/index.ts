import { Router, type Request, type Response } from 'express';
import { transactionSchema } from './schema';
import { fromZodError } from 'zod-validation-error';

const router = Router();

const ESTIMATED_GAS = 0.00001;

router.post('/preview', (req: Request, res: Response) => {
  const result = transactionSchema.safeParse(req.body);

  if (!result.success) {
    const errorMessage = fromZodError(result.error).toString();
    res.status(400).json({ message: errorMessage });
    return;
  }

  const amount = Number.parseFloat(result.data?.amount as string);

  res.status(200).json({
    estimatedGas: String(ESTIMATED_GAS),
    totalAmount: `${ESTIMATED_GAS + amount}${result.data?.token === 'bitcoin' ? 'BTC' : 'ETH'}`,
    status: 'preview',
  });
});

export default router;
