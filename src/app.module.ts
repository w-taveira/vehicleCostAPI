import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehicleController } from './infra/http/controllers/vehicle/vehicle.controller';
import { RequiredPriceProvider } from './infra/nest/providers/requiredPrice.provider';
import { OperationalCostsProvider } from './infra/nest/providers/operationalCosts.provider';
import { ViabilityProvider } from './infra/nest/providers/viability.provider';
import { AnalyzeVehicleScenarioProvider } from './infra/nest/providers/analizeVehicleScenario.provider';

@Module({
  imports: [],
  controllers: [AppController, VehicleController],
  providers: [
    AppService,
    RequiredPriceProvider,
    OperationalCostsProvider,
    ViabilityProvider,
    AnalyzeVehicleScenarioProvider,
  ],
})
export class AppModule {}
