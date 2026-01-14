import { Vehicle } from '../vehicle/Vehicle';
import { CostPerKm } from './CostPerKm';

export class TireCost implements CostPerKm {
  constructor(
    private readonly tireSetCost: number,
    private readonly vehicle: Vehicle,
  ) {
    this.validate();
  }

  private validate() {
    if (this.tireSetCost <= 0) {
      throw new Error('Tire set cost must be greater than zero');
    }
  }

  calculateCostPerKm(): number {
    return this.tireSetCost / this.vehicle.getTireDurability();
  }
}
