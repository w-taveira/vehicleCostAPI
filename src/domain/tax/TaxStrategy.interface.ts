export interface TaxStrategy {
  calculateTax(monthlyRevenue: number): number;
  getMaxRate(): number;
}
