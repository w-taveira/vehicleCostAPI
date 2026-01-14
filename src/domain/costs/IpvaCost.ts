export class IpvaCost {
  constructor(
    private readonly fipeValue: number,
    private readonly ipvaRate: number,
  ) {
    this.validate();
  }

  private validate() {
    if (this.fipeValue <= 0) {
      throw new Error('FIPE value must be greater than zero');
    }

    if (this.ipvaRate <= 0) {
      throw new Error('IPVA rate must be greater than zero');
    }
  }

  getAnnualCost(): number {
    return this.fipeValue * this.ipvaRate;
  }
}
