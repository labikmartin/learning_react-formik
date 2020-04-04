import { FieldProps } from 'formik';

export type InvestmentDetails = {
  fullName: string;
  investmentRisk: number[];
  investmentRiskComment: string;
  dependents: number;
  termsAndConditionsAccepted: boolean;
  initialInvestment?: number;
};

export type FormField<T extends keyof InvestmentDetails> = FieldProps<
  InvestmentDetails[T]
>;
