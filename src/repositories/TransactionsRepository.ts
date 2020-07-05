import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;///`transactions: ${this.transactions}`;
  }

  public getBalance(): Balance {
    // TODO
    const incomeTotal = this.transactions.reduce((acc, cur) => {
      if(cur.type === 'income') return acc + cur.value;
      else return acc;
    }, 0);

    const outcomeTotal = this.transactions.reduce((acc, cur) => {
      if(cur.type === 'outcome') return acc + cur.value;
      else return acc;
    }, 0);

    const balance = incomeTotal - outcomeTotal;

    return {
      "income": incomeTotal,
      "outcome": outcomeTotal,
      "total": balance,
    }

  }

  public create({ title, value, type}: CreateTransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, value, type });
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
