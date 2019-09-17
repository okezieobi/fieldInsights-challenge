import validateUserRequest from '../data/users';
import authenticateUsers from '../auth/users';
import middleware from './middleware';

export default class Users {
  static middleware(method) {
    const validateAll = validateUserRequest[method].bind(validateUserRequest);
    const authAll = authenticateUsers[method].bind(authenticateUsers);
    return { validateAll, authAll };
  }

  static signup() {
    const { validateAll, authAll } = Users.middleware('signUp');
    return middleware.routeCallbacks(validateAll, authAll);
  }
}
