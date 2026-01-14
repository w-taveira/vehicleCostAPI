import { Provider } from '@nestjs/common';
import { CalculateOperacionalCostsUseCase } from 'src/application/use-cases/CalculateOperationalCostsUseCase';

export const OperationalCostsProvider: Provider = {
  provide: CalculateOperacionalCostsUseCase,
  useFactory: () => {
    return new CalculateOperacionalCostsUseCase();
  },
};
