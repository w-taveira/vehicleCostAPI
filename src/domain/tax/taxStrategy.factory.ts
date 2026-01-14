import { PFTaxStrategy } from './PFTaxStrategy';
import { PJTaxStrategy } from './PJTaxStrategy';
import { TaxStrategy } from './TaxStrategy.interface';

export type TaxType = 'PF' | 'PJ';

export class TaxStrategyFactory {
  static create(type: TaxType): TaxStrategy {
    switch (type) {
      case 'PF':
        return new PFTaxStrategy();
      case 'PJ':
        return new PJTaxStrategy();
      default:
        throw new Error(`Tax type not supported`);
    }
  }
}
