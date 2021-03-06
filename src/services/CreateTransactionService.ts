import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if(type === 'outcome' && total < value){
      throw Error('string');
    }
    const newTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return newTransaction;
  }
}

export default CreateTransactionService;
