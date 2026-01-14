import { Provider } from '@nestjs/common';
import { CalculateViabilityUseCase } from 'src/application/use-cases/CalculateViabilityUseCase';

export const ViabilityProvider: Provider = {
  provide: CalculateViabilityUseCase,
  useFactory: () => {
    return new CalculateViabilityUseCase();
  },
};
