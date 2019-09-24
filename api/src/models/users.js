/* eslint-disable camelcase */
import numbers from '../helpers/uniqueNos';
import bcrypt from '../helpers/bcrypt';

export default class Users {
  static requestData({
    fullName, email, password, username,
  }) {
    return [numbers.uniqueIds(), String(fullName), String(email),
      bcrypt.hash(password), String(username)];
  }

  static responseData({
    id, full_name, username, email, type,
  }) {
    return {
      id: parseInt(id, 10),
      fullName: String(full_name),
      userName: String(username),
      email: String(email),
      type: String(type),
    };
  }
}
