import 'core-js/stable';
import 'regenerator-runtime/runtime';
import chai, {
  expect,
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/src';
import pool from '../api/src/db/pgConnect';
import seeder from '../api/src/seeders/seeder';
import token from '../api/src/helpers/jwt';

export default class Test {
  static deleteData() {
    return seeder.deleteAll;
  }

  static users() {
    return seeder.users.insertData;
  }

  static products() {
    return seeder.products.insertData;
  }

  static generateToken(id) {
    return token.generate(id);
  }
}

require('./users/signup');

export {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
};
