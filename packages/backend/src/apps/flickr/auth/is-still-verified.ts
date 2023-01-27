import { IGlobalVariable } from '@automatischtest1/types';

const isStillVerified = async ($: IGlobalVariable) => {
  const params = {
    method: 'flickr.test.login',
    format: 'json',
    nojsoncallback: 1,
  };
  const response = await $.http.get('/rest', { params });
  return !!response.data.user.id;
};

export default isStillVerified;
