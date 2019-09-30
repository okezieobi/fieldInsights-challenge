import database from '../db/pgConnect';
import token from '../helpers/jwt';
import authenticateUsers from '../auth/users';
import protocol from '../helpers/response';
import models from '../models/users';
import Queries from '../helpers/queries';

export default class Users {
  static async signUp({ body }, res) {
    const createUserQuery = Queries.createClient();
    const arrayData = models.requestData(body);
    const newUser = await database.queryOne(createUserQuery, arrayData);
    const signUpRes = await models.responseData(newUser);
    const newToken = await token.generate(newUser.id);
    return protocol.auth201Res(res, signUpRes, newToken);
  }

  static async signIn(req, res) {
    const { verifyUser } = authenticateUsers;
    const signInRes = await models.responseData(verifyUser);
    const newToken = await token.generate(verifyUser.id);
    return protocol.auth200Res(res, signInRes, newToken);
  }
}
