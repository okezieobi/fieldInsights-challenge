import protocol from '../helpers/response';
import checkRequest from '../helpers/requests';

export default class ValidateUserRequest {
  static signUp(req, res, next) {
    const {
      fullName, email, password, username,
    } = req.body;
    const fullNameErr = checkRequest.validateLetters(fullName, 'Full name');
    const emailErr = checkRequest.checkEmailFormat(email, 'Email');
    const passwordErr = checkRequest.checkPassword(password, 'Password');
    const usernameErr = checkRequest.validateUsername(username, 'Username');
    const findError = checkRequest.findError(fullNameErr, emailErr, passwordErr, usernameErr);
    if (findError) protocol.err400Res(res, findError);
    else next();
  }

  static signIn(req, res, next) {
    const { username, email, password } = req.body;
    let checkUserData;
    if (!username && !email) checkUserData = checkRequest.validateLetters(false, 'Username or email');
    else if (username) checkUserData = checkRequest.validateUsername(username, 'Username');
    else if (email) checkUserData = checkRequest.checkEmailFormat(email, 'Email');
    const checkPassword = checkRequest.checkPassword(password, 'Password');
    const findError = checkRequest.findError(checkUserData, checkPassword);
    if (findError) protocol.err400Res(res, findError);
    else next();
  }
}
