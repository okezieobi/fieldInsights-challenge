/* eslint-disable camelcase */
import numbers from '../helpers/uniqueNos';
import bcrypt from '../helpers/bcrypt';
import model from './model';

export default class Users {
  static userDataPostgre(data) {
    const {
      fullName, email, password, username,
    } = data;
    return {
      id: numbers.uniqueIds(),
      email,
      username,
      fullName,
      hashedPassword: bcrypt.hash(password),
    };
  }

  static postgresData(userData) {
    const {
      id, fullName,
      email, hashedPassword, username,
    } = this.userDataPostgre(userData);
    return model.postgreValues(id, fullName, email, hashedPassword, username);
  }

  static createUserDataResPostgre(data) {
    const {
      id, full_name, username, email, type,
    } = data;
    return {
      id: parseInt(id, 10),
      fullName: String(full_name),
      userName: String(username),
      email: String(email),
      type: String(type),
    };
  }
}
