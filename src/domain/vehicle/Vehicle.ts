export class Vehicle {
  constructor(
    private readonly fuelConsumptionKmPerLiter: number,
    private readonly tireDurabilityKm: number,
    private readonly oilChangeIntervalKm: number,
    private readonly vehicleValue: number,
    private readonly annualDepreciationRate: number,
  ) {
    this.validate();
  }

  private validate() {
    if (this.fuelConsumptionKmPerLiter <= 0) {
      throw new Error('Fuel consumption must be greater than zero');
    }

    if (this.tireDurabilityKm <= 0) {
      throw new Error('Tire durability must be greater than zero');
    }

    if (this.oilChangeIntervalKm <= 0) {
      throw new Error('Oil change interval must be greater than zero');
    }

    if (this.vehicleValue <= 0) {
      throw new Error('Vehicle value must be greater than zero');
    }

    if (this.annualDepreciationRate < 0) {
      throw new Error('Depreciation rate cannot be negative');
    }
  }

  getFuelConsumption() {
    return this.fuelConsumptionKmPerLiter;
  }

  getTireDurability() {
    return this.tireDurabilityKm;
  }

  getOilChangeInterval() {
    return this.oilChangeIntervalKm;
  }

  getVehicleValue() {
    return this.vehicleValue;
  }

  getAnnualDepreciationRate() {
    return this.annualDepreciationRate;
  }
}
