import { IGlobalVariable } from '@automatischtest1/types';

const isStillVerified = async ($: IGlobalVariable) => {
  await $.http.get('/projects');
  return true;
};

export default isStillVerified;
