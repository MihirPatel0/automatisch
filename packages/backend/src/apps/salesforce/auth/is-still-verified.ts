import { IGlobalVariable } from '@automatischtest1/types';
import getCurrentUser from '../common/get-current-user';

const isStillVerified = async ($: IGlobalVariable) => {
  const user = await getCurrentUser($);
  return !!user;
};

export default isStillVerified;
