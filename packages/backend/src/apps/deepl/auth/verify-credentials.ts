import { IGlobalVariable } from '@automatischtest1/types';

const verifyCredentials = async ($: IGlobalVariable) => {
  await $.http.get('/v2/usage');

  await $.auth.set({
    screenName: $.auth.data.screenName,
  });
};

export default verifyCredentials;
