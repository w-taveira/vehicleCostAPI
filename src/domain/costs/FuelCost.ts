import { Vehicle } from '../vehicle/Vehicle';
import { CostPerKm } from './CostPerKm';

export class FuelCost implements CostPerKm {
  constructor(
    private readonly fuelPricePerLiter: number,
    private readonly vehicle: Vehicle,
  ) {
    this.validate();
  }

  private validate() {
    if (this.fuelPricePerLiter <= 0) {
      throw new Error('Fuel price must be greater than zero');
    }
  }

  calculateCostPerKm(): number {
    return this.fuelPricePerLiter / this.vehicle.getFuelConsumption();
  }
}
