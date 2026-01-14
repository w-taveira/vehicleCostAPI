import { Vehicle } from '../vehicle/Vehicle';

export class DepreciationCost {
  constructor(private readonly vehicle: Vehicle) {}

  calculateAnnualCost(): number {
    return (
      this.vehicle.getVehicleValue() * this.vehicle.getAnnualDepreciationRate()
    );
  }
}
