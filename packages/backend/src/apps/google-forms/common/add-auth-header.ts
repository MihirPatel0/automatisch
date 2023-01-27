import { TBeforeRequest } from '@automatischtest1/types';

const addAuthHeader: TBeforeRequest = ($, requestConfig) => {
  if (requestConfig.headers && $.auth.data?.accessToken) {
    requestConfig.headers.Authorization = `${$.auth.data.tokenType} ${$.auth.data.accessToken}`;
  }

  return requestConfig;
};

export default addAuthHeader;
