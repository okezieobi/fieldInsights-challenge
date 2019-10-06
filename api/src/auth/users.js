/* eslint-disable camelcase */
import protocol from '../helpers/response';
import database from '../db/pgConnect';
import literalErrors from '../errors/stringLiterals';
import templateErrors from '../errors/templateLiterals';
import test from '../helpers/regex';
import Queries from '../queries/users';
import jwt from '../helpers/jwt';
import bcrypt from '../helpers/bcrypt';

export default class AuthenticateUsers {
  static async authEmailUsername({ body }) {
    const { username, email } = body;
    const findUserQuery = Queries.findUserByEmailOrUsername();
    const user = await database.queryOneORNone(findUserQuery, [email, username]);
    return user;
  }

  static async signUp(req, res, next) {
    const user = await this.authEmailUsername(req);
    if (user) return protocol.err400Res(res, literalErrors.userExists());
    return next();
  }

  static async signIn(req, res, next) {
    this.verifyUser = await this.authEmailUsername(req);
    if (!this.verifyUser) return protocol.err404Res(res, literalErrors.userNotExists());
    return next();
  }

  static async verifyPassword({ body }, res, next) {
    const { password } = body;
    const { verifyUser } = this;
    const verifyPassword = await bcrypt.compare(verifyUser.password, password);
    if (!verifyPassword) protocol.err400Res(res, literalErrors.wrongPassword());
    else next();
  }

  static async authToken({ headers }, res, next) {
    const { token } = headers;
    if (!token) return protocol.err400Res(res, literalErrors.tokenIsRequired());
    const { userId, message, name } = await jwt.verify(token);
    if (name || message) return protocol.err400Res(res, { name, message }); // jwt error
    const checkId = await test.checkInteger(userId);
    if (!checkId) return protocol.err400Res(res, literalErrors.invalidToken());
    this.user_id = userId;
    return next();
  }

  static async authenticateAll(req, res, next) {
    this.findUser = await database.queryOneORNone(Queries.findUserById(), [this.user_id]);
    if (!this.findUser) return protocol.err404Res(res, literalErrors.wrongToken());
    return next();
  }

  static admin(req, res, next) {
    const { is_admin } = this.findUser;
    if (!is_admin) protocol.err403Res(res, templateErrors.restrictedAccess('admin'));
    else next();
  }
}
