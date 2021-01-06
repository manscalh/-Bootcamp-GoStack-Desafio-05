import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transaction = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.json({transaction,balance});
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {

    const { title, value, type } = request.body;
    const createTransactonService = new CreateTransactionService(transactionsRepository);
    const transaction = createTransactonService.execute({title,value,type});
    return response.status(201).json(transaction);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
