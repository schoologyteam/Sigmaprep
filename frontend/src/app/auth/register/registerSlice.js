import { standardApiCall } from '@utils/api';

const REGISTER = 'app/auth/register/REGISTER';

export function register(username, email, password) {
  return standardApiCall('post', '/api/auth/register', { username, email, password }, REGISTER, {
    loadingComponent: ['AuthPopup', 'Register'],
    noticeOfSuccess: 'successfully created account! you can now sign in.',
  });
}
