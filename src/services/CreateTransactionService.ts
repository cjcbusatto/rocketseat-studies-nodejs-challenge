import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  private allowedTransactionTypes = ['income', 'outcome'];

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  private hasEnoughFunds(amount: number): boolean {
    try {
      const currentBalance = this.transactionsRepository
        .all()
        .map(transaction => {
          if (transaction.type === 'income') {
            return transaction.value;
          }

          if (transaction.type === 'outcome') {
            return -transaction.value;
          }

          // In case we have a wrong typed transaction included in the storage,
          // it should not have any influence in the current balance
          return 0;
        })
        .reduce((total, num) => total + num);

      return currentBalance - amount >= 0;
    } catch {
      return false;
    }
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!this.allowedTransactionTypes.includes(type)) {
      throw new Error('Invalid transaction type.');
    }

    if (type === 'outcome' && !this.hasEnoughFunds(value)) {
      throw new Error('Not enough funds to cover the transaction');
    }

    return this.transactionsRepository.create({
      title,
      value,
      type,
    });
  }
}

export default CreateTransactionService;
