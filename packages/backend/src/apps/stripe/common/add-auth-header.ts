import { TBeforeRequest } from '@automatischtest1/types';

const addAuthHeader: TBeforeRequest = ($, requestConfig) => {
  requestConfig.headers['Authorization'] = `Bearer ${$.auth.data?.secretKey}`;
  return requestConfig;
};

export default addAuthHeader;
