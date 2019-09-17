import database from '../db/pgConnect';
import token from '../helpers/jwt';
// import authenticateUsers from '../auth/users';
import protocol from '../helpers/response';
import models from '../models/users';
import Queries from '../helpers/queries';

export default class Users {
  static async signUp(req, res) {
    const createUserQuery = Queries.createClient();
    const arrayData = models.postgresData(req.body);
    const newUser = await database.queryOne(createUserQuery, arrayData);
    const signUpRes = await models.createUserDataResPostgre(newUser);
    const newToken = await token.generate(newUser.id);
    return protocol.auth201Res(res, signUpRes, newToken);
  }
}
