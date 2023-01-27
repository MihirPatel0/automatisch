import { IGlobalVariable } from '@automatischtest1/types';

const verifyCredentials = async ($: IGlobalVariable) => {
  console.log('VERIFY CRED', $);
  await $.auth.set({
    screenName: `${$.auth.data.method} : ${$.auth.data.endpoint}`,
  });
};

export default verifyCredentials;
