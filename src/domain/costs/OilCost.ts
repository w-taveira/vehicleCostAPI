import { Vehicle } from '../vehicle/Vehicle';
import { CostPerKm } from './CostPerKm';

export class OilCost implements CostPerKm {
  constructor(
    private readonly oilChangeCost: number,
    private readonly vehicle: Vehicle,
  ) {
    this.validate();
  }

  private validate() {
    if (this.oilChangeCost <= 0) {
      throw new Error('Oil change cost must be greater than zero');
    }
  }

  calculateCostPerKm(): number {
    return this.oilChangeCost / this.vehicle.getOilChangeInterval();
  }
}
