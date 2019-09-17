export default class Errors {
  static isRequired(title) {
    return `${title} is required`;
  }

  static isStringType(title) {
    return `${title} must be string type`;
  }

  static notLetters(title) {
    return `${title} must be letters`;
  }

  static notLettersAndNumbers(title) {
    return `${title} must be letters and numbers`;
  }

  static notNumbers(title) {
    return `${title} must be a positive number`;
  }

  static notInteger(title) {
    return `${title} must be a positive integer`;
  }

  static restrictedAccess(title) {
    return `Only ${title} can access this resource`;
  }

  static dataNotFound(title) {
    return `${title} not found`;
  }


  static dataFound(title) {
    return `${title} already exists`;
  }

  static userNotExists() {
    return 'User does not exist, please sign up';
  }

  static userExists() {
    return 'User exists, please sign in with email or username';
  }

  static notEmail() {
    return 'Email format is wrong';
  }

  static notPassword() {
    return 'Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character';
  }

  static tokenIsRequired() {
    return 'Token is required, please sign in or sign up';
  }

  static wrongToken() {
    return 'Token provided does not match any user';
  }

  static invalidToken() {
    return 'Id from token is not a positive integer';
  }

  static wrongPassword() {
    return 'Password does not match user';
  }
}
