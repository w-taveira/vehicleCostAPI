import { Provider } from '@nestjs/common';
import { AnalyzeVehicleScenarioUseCase } from 'src/application/use-cases/AnalyzeVehicleScenarioUseCase';

export const AnalyzeVehicleScenarioProvider: Provider = {
  provide: AnalyzeVehicleScenarioUseCase,
  useFactory: () => {
    return new AnalyzeVehicleScenarioUseCase();
  },
};
