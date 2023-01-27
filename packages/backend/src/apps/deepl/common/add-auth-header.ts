import { TBeforeRequest } from '@automatischtest1/types';

const addAuthHeader: TBeforeRequest = ($, requestConfig) => {
  if ($.auth.data?.authenticationKey) {
    const authorizationHeader = `DeepL-Auth-Key ${$.auth.data.authenticationKey}`;
    requestConfig.headers.Authorization = authorizationHeader;
  }

  return requestConfig;
};

export default addAuthHeader;
