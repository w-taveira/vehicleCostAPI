import { TaxStrategy } from '../../domain/tax/TaxStrategy.interface';

export interface AnalyzeVehicleScenarioUseCaseInput {
  kmPerMonth: number;
  variableCostPerKm: number;
  fixedMonthlyCost: number;
  profitTarget: number;
  taxStrategy: TaxStrategy;
}

export interface AnalyzeVehicleScenarioUseCaseOutput {
  pricePerKm: number;
  monthlyRevenue: number;
  taxes: number;
  netProfit: number;
  iterations: number;
}

export class AnalyzeVehicleScenarioUseCase {
  execute(
    input: AnalyzeVehicleScenarioUseCaseInput,
  ): AnalyzeVehicleScenarioUseCaseOutput {
    const {
      kmPerMonth,
      variableCostPerKm,
      fixedMonthlyCost,
      profitTarget,
      taxStrategy,
    } = input;

    let price =
      (profitTarget + kmPerMonth * variableCostPerKm + fixedMonthlyCost) /
      (kmPerMonth * (1 - 0.275));

    const EPSILON = 0.001;
    const MAX_ITER = 20;

    let revenue = 0;
    let taxes = 0;
    let netProfit = 0;
    let i = 0;

    for (i = 0; i < MAX_ITER; i++) {
      revenue = price * kmPerMonth;

      taxes = taxStrategy.calculateTax(revenue);
      const taxRate = taxes / revenue;

      netProfit =
        revenue - taxes - fixedMonthlyCost - variableCostPerKm * kmPerMonth;

      const error = profitTarget - netProfit;

      if (Math.abs(error) < 1) break;

      const newPrice =
        (profitTarget + fixedMonthlyCost + variableCostPerKm * kmPerMonth) /
        (kmPerMonth * (1 - taxRate));

      if (Math.abs(newPrice - price) < EPSILON) {
        price = newPrice;
        break;
      }

      price = newPrice;
    }

    return {
      pricePerKm: price,
      monthlyRevenue: revenue,
      taxes,
      netProfit,
      iterations: i + 1,
    };
  }
}
