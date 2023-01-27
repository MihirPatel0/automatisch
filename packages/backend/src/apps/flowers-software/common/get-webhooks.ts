import type { IGlobalVariable } from '@automatischtest1/types';

export default async function getWebhooks($: IGlobalVariable) {
  return await $.http.get('/v2/public/api/webhooks');
}
