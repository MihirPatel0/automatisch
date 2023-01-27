import type { IAuthenticationStepField } from '@automatischtest1/types';

type AuthenticationStep = {
  step: number;
  type: string;
  name: string;
  fields: IAuthenticationStepField[];
};

export default AuthenticationStep;
