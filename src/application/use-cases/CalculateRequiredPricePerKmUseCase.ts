import { TaxStrategy } from 'src/domain/tax/TaxStrategy.interface';

export interface CalculateRequiredPricePerKmInput {
  kmPerMonth: number;
  variableCostPerKm: number;
  fixedMonthlyCosts: number;
  profitTarget: number;
  taxStrategy: TaxStrategy;
}

export interface CalculateRequiredPricePerKmOutput {
  requiredPricePerKm: number;
  breakEvenPricePerKm: number;
}

export class CalculateRequiredPricePerKmUseCase {
  execute(
    input: CalculateRequiredPricePerKmInput,
  ): CalculateRequiredPricePerKmOutput {
    const {
      kmPerMonth,
      variableCostPerKm,
      fixedMonthlyCosts,
      profitTarget,
      taxStrategy,
    } = input;

    if (kmPerMonth <= 0) {
      throw new Error('kmPermonth must be greater than zero');
    }

    const taxRate = taxStrategy.getMaxRate();

    if (taxRate >= 1) {
      throw new Error('Invalid tax rate');
    }

    const requiredPricePerKm =
      (profitTarget + kmPerMonth * variableCostPerKm + fixedMonthlyCosts) /
      (kmPerMonth * (1 - taxRate));

    const breakEvenPricePerKm =
      fixedMonthlyCosts / kmPerMonth + variableCostPerKm;

    return {
      requiredPricePerKm,
      breakEvenPricePerKm,
    };
  }
}
