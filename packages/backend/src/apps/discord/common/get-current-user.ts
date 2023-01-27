import { IGlobalVariable, IJSONObject } from '@automatischtest1/types';

const getCurrentUser = async ($: IGlobalVariable): Promise<IJSONObject> => {
  const response = await $.http.get('/users/@me');
  const currentUser = response.data;

  return currentUser;
};

export default getCurrentUser;
