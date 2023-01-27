import { IGlobalVariable } from '@automatischtest1/types';

const verifyCredentials = async ($: IGlobalVariable) => {
  await $.http.get('/v1/models');
};

export default verifyCredentials;
