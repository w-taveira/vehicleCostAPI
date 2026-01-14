import { Vehicle } from 'src/domain/vehicle/Vehicle';
import { CostPerKm } from '../../domain/costs/CostPerKm';
import { DepreciationCost } from '../../domain/costs/DepreciationCost';
import { InsuranceCost } from '../../domain/costs/InsuranceCost';
import { IpvaCost } from '../../domain/costs/IpvaCost';
import { FuelCost } from 'src/domain/costs/FuelCost';
import { TireCost } from 'src/domain/costs/TireCost';
import { OilCost } from 'src/domain/costs/OilCost';

type Input = {
  kmPerMonth: number;
  insuranceAnnualCost: number;

  vehicle: {
    fuelConsumptionKmPerLiter: number;
    tireDurabilityKm: number;
    oilChangeIntervalKm: number;
    vehicleValue: number;
    annualDreciationRate: number;
  };

  variableCosts: {
    fuelPricePerLiter: number;
    tireSetCost: number;
    oilChangeCost: number;
  };

  ipva: {
    fipeValue: number;
    ipvaRate: number;
  };
};

type Output = {
  costPerKm: number;
  fixedMonthlyCost: number;
  totalMonthlyCost: number;
};

export class CalculateOperacionalCostsUseCase {
  execute(input: Input): Output {
    if (input.kmPerMonth <= 0) {
      throw new Error('Km per month must be greater then zero');
    }

    const vehicle = new Vehicle(
      input.vehicle.fuelConsumptionKmPerLiter,
      input.vehicle.tireDurabilityKm,
      input.vehicle.oilChangeIntervalKm,
      input.vehicle.vehicleValue,
      input.vehicle.annualDreciationRate,
    );

    const variableCosts: CostPerKm[] = [
      new FuelCost(input.variableCosts.fuelPricePerLiter, vehicle),
      new TireCost(input.variableCosts.tireSetCost, vehicle),
      new OilCost(input.variableCosts.oilChangeCost, vehicle),
    ];

    const depreciation = new DepreciationCost(vehicle);
    const insurance = new InsuranceCost(input.insuranceAnnualCost);
    const ipva = new IpvaCost(input.ipva.fipeValue, input.ipva.ipvaRate);

    const variableCostPerKm = variableCosts.reduce(
      (total, cost) => total + cost.calculateCostPerKm(),
      0,
    );

    const depreciationPerMonth = depreciation.calculateAnnualCost() / 12;
    const insurancePerMonth = insurance.getAnnualCost() / 12;
    const ipvaPerMonth = ipva.getAnnualCost() / 12;

    const fixedMonthlyCost =
      depreciationPerMonth + insurancePerMonth + ipvaPerMonth;

    const totalMonthlyCost =
      fixedMonthlyCost + variableCostPerKm * input.kmPerMonth;

    return {
      costPerKm: variableCostPerKm,
      fixedMonthlyCost,
      totalMonthlyCost,
    };
  }
}
