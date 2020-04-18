import TransactionsRepository from '../repositories/TransactionsRepository';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

export default class GetBalanceService {
  private repository: TransactionsRepository;

  constructor(repository: TransactionsRepository) {
    this.repository = repository;
  }

  private getTransactionSumByType(type: 'income' | 'outcome'): number {
    return this.repository
      .all()
      .filter(transaction => transaction.type === type)
      .map(transaction => transaction.value)
      .reduce((total, num) => total + num);
  }

  public execute(): Balance {
    const income = this.getTransactionSumByType('income');
    const outcome = this.getTransactionSumByType('outcome');
    const total = income - outcome;

    return { income, outcome, total };
  }
}
