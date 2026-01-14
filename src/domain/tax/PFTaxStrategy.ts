import { TaxStrategy } from './TaxStrategy.interface';

export class PFTaxStrategy implements TaxStrategy {
  calculateTax(monthlyRevenue: number): number {
    const rate = this.resolveRate(monthlyRevenue);
    return monthlyRevenue * rate;
  }

  resolveRate(monthlyRevenue: number): number {
    if (monthlyRevenue <= 5000) return 0.08;
    if (monthlyRevenue <= 10000) return 0.15;
    if (monthlyRevenue <= 20000) return 0.22;

    return 0.275;
  }

  getMaxRate(): number {
    return 0.275;
  }
}
