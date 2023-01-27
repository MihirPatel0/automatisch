import { TBeforeRequest } from '@automatischtest1/types';

const addAuthHeader: TBeforeRequest = ($, requestConfig) => {
  if ($.auth.data?.apiKey) {
    requestConfig.headers.Authorization = `Bearer ${$.auth.data.apiKey}`;
  }

  return requestConfig;
};

export default addAuthHeader;
