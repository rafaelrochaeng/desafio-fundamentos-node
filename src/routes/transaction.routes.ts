import { Router, json } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.use(json());


transactionRouter.get('/', (request, response) => {
  try {
    // TODO
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    const apr = {"transactions": transactions, "balance": balance };

    response.json(apr);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO
    const { title, value, type } = request.body;
    const createTransaction = new CreateTransactionService(transactionsRepository);
    const transation = createTransaction.execute({ title, value, type });

    return response.json(transation);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
