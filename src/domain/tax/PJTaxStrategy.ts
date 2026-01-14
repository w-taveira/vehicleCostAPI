import { TaxStrategy } from './TaxStrategy.interface';

export class PJTaxStrategy implements TaxStrategy {
  private readonly rate = 0.11;

  calculateTax(monthlyRevenue: number): number {
    return monthlyRevenue * this.rate;
  }

  getMaxRate(): number {
    return this.rate;
  }
}
