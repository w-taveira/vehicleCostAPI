import { TaxStrategy } from '../../domain/tax/TaxStrategy.interface';

export interface CalculateViabilityInput {
  kmPerMonth: number;
  pricePerKm: number;
  variableCostPerKm: number;
  fixedMonthlyCosts: number;
  taxStrategy: TaxStrategy;
  profitTarget: number;
}

export interface CalculateViabilityOutput {
  monthlyRevenue: number;
  taxes: number;
  grossProfit: number;
  netProfit: number;
  breakEvenKm: number;
  isViable: boolean;
}

export class CalculateViabilityUseCase {
  execute(input: CalculateViabilityInput): CalculateViabilityOutput {
    const {
      kmPerMonth,
      pricePerKm,
      variableCostPerKm,
      fixedMonthlyCosts,
      taxStrategy,
      profitTarget,
    } = input;

    if (kmPerMonth <= 0) {
      throw new Error('KmPerMonth must be greater than zero');
    }

    const monthlyRevenue = kmPerMonth * pricePerKm;
    const variableCosts = kmPerMonth * variableCostPerKm;
    const grossProfit = monthlyRevenue - (variableCosts + fixedMonthlyCosts);

    // Tax is calculated over gross revenue (simplified regime)
    const taxes = taxStrategy.calculateTax(monthlyRevenue);
    const netProfit = grossProfit - taxes;
    const netProfitCents = Math.round(netProfit * 100);
    const profitTargetCents = profitTarget * 100;

    const breakEvenKm = fixedMonthlyCosts / (pricePerKm - variableCostPerKm);

    return {
      monthlyRevenue,
      taxes,
      grossProfit,
      netProfit,
      breakEvenKm,
      isViable: netProfitCents >= profitTargetCents,
    };
  }
}
