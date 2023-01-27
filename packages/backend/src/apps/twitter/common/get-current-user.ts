import { IGlobalVariable, IJSONObject } from '@automatischtest1/types';

const getCurrentUser = async ($: IGlobalVariable): Promise<IJSONObject> => {
  const response = await $.http.get('/2/users/me');
  const currentUser = response.data.data;

  return currentUser;
};

export default getCurrentUser;
