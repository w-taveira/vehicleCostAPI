export class InsuranceCost {
  constructor(private readonly insuranceAnnualCost: number) {
    this.validate();
  }

  private validate() {
    if (this.insuranceAnnualCost <= 0) {
      throw new Error('Insurance annual cost must be greater than zero');
    }
  }

  getAnnualCost(): number {
    return this.insuranceAnnualCost;
  }
}
