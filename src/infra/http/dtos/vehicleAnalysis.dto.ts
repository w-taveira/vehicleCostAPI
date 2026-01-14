import { IsEnum, IsNumber, Min } from 'class-validator';

export enum TaxType {
  PF = 'PF',
  PJ = 'PJ',
}

export class VehicleAnalysisDto {
  @IsNumber({}, { message: 'kmPerMonth must be a number' })
  @Min(0.01, { message: 'kmPerMonth must be greater than zero' })
  kmPerMonth: number;

  @IsNumber({}, { message: 'profitTarget must be a number' })
  @Min(0.01, { message: 'profitTarget must be greater than zero' })
  profitTarget: number;

  @IsEnum(TaxType, {
    message: 'taxType must be one of the following values: PF, PJ',
  })
  taxType: TaxType;

  @IsNumber({}, { message: 'fuelConsumptionPerLiter must be a number' })
  @Min(0.01, { message: 'fuelConsumptionPerLiter must be greater than zero' })
  fuelConsumptionPerLiter: number;

  @IsNumber({}, { message: 'fuelPricePerLiter must be a number' })
  @Min(0.01, { message: 'fuelPricePerLiter must be greater than zero' })
  fuelPricePerLiter: number;

  @IsNumber({}, { message: 'tireDurabilityKm must be a number' })
  @Min(0.01, { message: 'tireDurabilityKm must be greater than zero' })
  tireDurabilityKm: number;

  @IsNumber({}, { message: 'tireCost must be a number' })
  @Min(0.01, { message: 'tireCost must be greater than zero' })
  tireCost: number;

  @IsNumber({}, { message: 'oilChangeIntervalKm must be a number' })
  @Min(0.01, { message: 'oilChangeIntervalKm must be greater than zero' })
  oilChangeIntervalKm: number;

  @IsNumber({}, { message: 'oilChangeCost must be a number' })
  @Min(0.01, { message: 'oilChangeCost must be greater than zero' })
  oilChangeCost: number;

  @IsNumber({}, { message: 'vehicleValue must be a number' })
  @Min(0.01, { message: 'vehicleValue must be greater than zero' })
  vehicleValue: number;

  @IsNumber({}, { message: 'annualDepreciationRate must be a number' })
  @Min(0.0001, {
    message: 'annualDepreciationRate must be greater than zero',
  })
  annualDepreciationRate: number;

  @IsNumber({}, { message: 'fipeValue must be a number' })
  @Min(0.01, { message: 'fipeValue must be greater than zero' })
  fipeValue: number;

  @IsNumber({}, { message: 'ipvaRate must be a number' })
  @Min(0.0001, { message: 'ipvaRate must be greater than zero' })
  ipvaRate: number;

  @IsNumber({}, { message: 'insuranceAnnualCost must be a number' })
  @Min(0.01, { message: 'insuranceAnnualCost must be greater than zero' })
  insuranceAnnualCost: number;
}
