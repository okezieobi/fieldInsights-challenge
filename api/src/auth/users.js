import protocol from '../helpers/response';
import database from '../db/pgConnect';
import Errors from '../helpers/errors';
// import test from '../helpers/regex';
import Queries from '../helpers/queries';
// import jwt from '../helpers/jwt';
// import bcrypt from '../helpers/bcrypt';

export default class AuthenticateUsers {
  static async authEmailUsername(req) {
    const { username, email } = req.body;
    const findUserQuery = Queries.findUserByEmailOrUsername();
    const user = await database.queryOneORNone(findUserQuery, [email, username]);
    return user;
  }

  static async signUp(req, res, next) {
    const user = await this.authEmailUsername(req);
    if (user) return protocol.err400Res(res, Errors.userExists());
    return next();
  }
}
