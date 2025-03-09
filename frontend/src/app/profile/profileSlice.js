import { LOGIN } from '@app/auth/login/loginSlice';
import { standardApiCall } from '@utils/api';
export function editProfile(username, icon, firstname, lastname) {
  return standardApiCall(
    'post',
    '/api/account/edit',
    { username, icon_link: icon, first_name: firstname, last_name: lastname },
    LOGIN,
    { loadingComponent: 'Profile', noticeOfSuccess: 'successfully edited account!' },
  );
}
