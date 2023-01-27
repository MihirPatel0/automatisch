import { IGlobalVariable } from '@automatischtest1/types';

const isStillVerified = async ($: IGlobalVariable) => {
  await $.http.get('/me');

  return true;
};

export default isStillVerified;
