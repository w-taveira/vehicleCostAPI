import { Provider } from '@nestjs/common';
import { CalculateRequiredPricePerKmUseCase } from 'src/application/use-cases/CalculateRequiredPricePerKmUseCase';

export const RequiredPriceProvider: Provider = {
  provide: CalculateRequiredPricePerKmUseCase,
  useFactory: () => {
    return new CalculateRequiredPricePerKmUseCase();
  },
};
