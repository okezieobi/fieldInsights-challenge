/* eslint-disable camelcase */
import protocol from '../helpers/response';
import database from '../db/pgConnect';
import Errors from '../helpers/errors';
import Queries from '../queries/products';

export default class Products {
  static async verifyProductName({ body }, res, next) {
    const { name } = body;
    const findProductQuery = Queries.findProductByName();
    const findProduct = await database.queryOneORNone(findProductQuery, name);
    if (findProduct) protocol.err404Res(res, Errors.dataFound('This item'));
    else next();
  }
}
