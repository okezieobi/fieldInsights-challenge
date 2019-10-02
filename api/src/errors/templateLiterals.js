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
}
