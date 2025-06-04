import { z } from 'zod';
export const transactionSchema = z
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
