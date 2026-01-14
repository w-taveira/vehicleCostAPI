import { Body, Controller, Post } from '@nestjs/common';
import { RequiredPriceDto } from '../../dtos/requiredPrice.dto';
import { CalculateRequiredPricePerKmUseCase } from 'src/application/use-cases/CalculateRequiredPricePerKmUseCase';
import { CalculateOperacionalCostsUseCase } from 'src/application/use-cases/CalculateOperationalCostsUseCase';
import { CalculateViabilityUseCase } from 'src/application/use-cases/CalculateViabilityUseCase';
import { VehicleAnalysisDto } from '../../dtos/vehicleAnalysis.dto';
import { TaxStrategyFactory } from 'src/domain/tax/taxStrategy.factory';
import { AnalyzeVehicleScenarioUseCase } from 'src/application/use-cases/AnalyzeVehicleScenarioUseCase';

@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly operationalCostsUseCase: CalculateOperacionalCostsUseCase,
    private readonly requiredPriceUseCase: CalculateRequiredPricePerKmUseCase,
    private readonly viabilityUseCase: CalculateViabilityUseCase,
    private readonly analizeVehicleScenarioUseCase: AnalyzeVehicleScenarioUseCase,
  ) {}

  @Post('required-price')
  calculateRequiredPrice(@Body() body: RequiredPriceDto) {
    const taxStrategy = TaxStrategyFactory.create(body.taxType);

    return this.requiredPriceUseCase.execute({
      kmPerMonth: body.kmPerMonth,
      variableCostPerKm: body.variableCostPerKm,
      fixedMonthlyCosts: body.fixedMonthCost,
      profitTarget: body.profitTarget,
      taxStrategy,
    });
  }

  @Post('analyze/basic')
  analyzeBasic(@Body() body: VehicleAnalysisDto) {
    //resolvendo estrategia de imposto
    const taxStrategy = TaxStrategyFactory.create(body.taxType);

    // calcular custos operacionais
    const operationalCosts = this.operationalCostsUseCase.execute({
      kmPerMonth: body.kmPerMonth,
      insuranceAnnualCost: body.insuranceAnnualCost,
      vehicle: {
        fuelConsumptionKmPerLiter: body.fuelConsumptionPerLiter,
        tireDurabilityKm: body.tireDurabilityKm,
        oilChangeIntervalKm: body.oilChangeIntervalKm,
        vehicleValue: body.vehicleValue,
        annualDreciationRate: body.annualDepreciationRate,
      },
      variableCosts: {
        fuelPricePerLiter: body.fuelPricePerLiter,
        tireSetCost: body.tireCost,
        oilChangeCost: body.oilChangeCost,
      },
      ipva: {
        fipeValue: body.fipeValue,
        ipvaRate: body.ipvaRate,
      },
    });

    // calcular preco necessario por km
    const requiredPrice = this.requiredPriceUseCase.execute({
      kmPerMonth: body.kmPerMonth,
      variableCostPerKm: operationalCosts.costPerKm,
      fixedMonthlyCosts: operationalCosts.fixedMonthlyCost,
      profitTarget: body.profitTarget,
      taxStrategy,
    });

    // verificar viabilidade
    const viability = this.viabilityUseCase.execute({
      kmPerMonth: body.kmPerMonth,
      pricePerKm: requiredPrice.requiredPricePerKm,
      variableCostPerKm: operationalCosts.costPerKm,
      fixedMonthlyCosts: operationalCosts.fixedMonthlyCost,
      taxStrategy,
      profitTarget: body.profitTarget,
    });

    return {
      operationalCosts,
      requiredPrice,
      viability,
    };
  }

  @Post('analyze/advanced')
  analyzeAdvance(@Body() body: VehicleAnalysisDto) {
    //resolvendo estrategia de imposto
    const taxStrategy = TaxStrategyFactory.create(body.taxType);

    // calcular custos operacionais
    const operationalCosts = this.operationalCostsUseCase.execute({
      kmPerMonth: body.kmPerMonth,
      insuranceAnnualCost: body.insuranceAnnualCost,
      vehicle: {
        fuelConsumptionKmPerLiter: body.fuelConsumptionPerLiter,
        tireDurabilityKm: body.tireDurabilityKm,
        oilChangeIntervalKm: body.oilChangeIntervalKm,
        vehicleValue: body.vehicleValue,
        annualDreciationRate: body.annualDepreciationRate,
      },
      variableCosts: {
        fuelPricePerLiter: body.fuelPricePerLiter,
        tireSetCost: body.tireCost,
        oilChangeCost: body.oilChangeCost,
      },
      ipva: {
        fipeValue: body.fipeValue,
        ipvaRate: body.ipvaRate,
      },
    });

    // calcular preco necessario por km
    const scenario = this.analizeVehicleScenarioUseCase.execute({
      kmPerMonth: body.kmPerMonth,
      variableCostPerKm: operationalCosts.costPerKm,
      fixedMonthlyCost: operationalCosts.fixedMonthlyCost,
      profitTarget: body.profitTarget,
      taxStrategy,
    });

    // verificar viabilidade
    const viability = this.viabilityUseCase.execute({
      kmPerMonth: body.kmPerMonth,
      pricePerKm: scenario.pricePerKm,
      variableCostPerKm: operationalCosts.costPerKm,
      fixedMonthlyCosts: operationalCosts.fixedMonthlyCost,
      taxStrategy,
      profitTarget: body.profitTarget,
    });

    return {
      operationalCosts,
      scenario,
      viability,
    };
  }
}
