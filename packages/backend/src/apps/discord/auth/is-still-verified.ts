import { IGlobalVariable } from '@automatischtest1/types';
import getCurrentUser from '../common/get-current-user';

const isStillVerified = async ($: IGlobalVariable) => {
  await getCurrentUser($);

  return true;
};

export default isStillVerified;
