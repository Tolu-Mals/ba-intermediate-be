import logger from '@/utils/logger';
import { Router, type Request, type Response } from 'express';
import { z } from 'zod';

const router = Router();

const ESTIMATED_GAS = 0.00001;

const transactionSchema = z
  .object({
    token: z.enum(['bitcoin', 'ethereum']),
    address: z.string().min(26, {
      message: 'Wallet address should be at least 26 characters long',
    }),
    amount: z.string().refine((val) => Number(val) >= 1e-18, {
      message: 'Should be at least 0.0000000000000000001',
    }),
  })
  .refine(
    (data) =>
      data.token === 'bitcoin'
        ? /^(1|3)[a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(data.address) ||
          /^bc1[a-zA-HJ-NP-Z0-9]{39,59}$/.test(data.address)
        : /^0x[a-fA-F0-9]{40}$/.test(data.address),
    {
      message: 'Invalid address for selected token',
      path: ['address'],
    },
  );

router.post('/preview', (req: Request, res: Response) => {
  console.log(req.body);
  const result = transactionSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ message: result.error.errors });
  }

  const amount = Number.parseFloat(result.data?.amount as string);

  res.status(200).json({
    estimatedGas: String(ESTIMATED_GAS),
    totalAmount: `${ESTIMATED_GAS + amount}${result.data?.token === 'bitcoin' ? 'BTC' : 'ETH'}`,
    status: 'preview',
  });
});

export default router;
