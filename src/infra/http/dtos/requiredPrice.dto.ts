import { IsEnum, IsNumber, Min } from 'class-validator';

export enum TaxType {
  PF = 'PF',
  PJ = 'PJ',
}

export class RequiredPriceDto {
  @IsNumber({}, { message: 'kmPerMonth must be a number' })
  @Min(0.01, { message: 'kmPerMonth must be greater than zero' })
  kmPerMonth: number;

  @IsNumber({}, { message: 'variableCostPerKm must be a number' })
  @Min(0.01, { message: 'variableCostPerKm must be greater than zero' })
  variableCostPerKm: number;

  @IsNumber({}, { message: 'fixedMonthCost must be a number' })
  @Min(0.01, { message: 'fixedMonthCost must be greater than zero' })
  fixedMonthCost: number;

  @IsNumber({}, { message: 'profitTarget must be a number' })
  @Min(0.01, { message: 'profitTarget must be greater than zero' })
  profitTarget: number;

  @IsEnum(TaxType, {
    message: 'taxType must be one of the following values: PF, PJ',
  })
  taxType: TaxType;
}
