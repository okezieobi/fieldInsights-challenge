/* eslint-disable camelcase */
import protocol from '../helpers/response';
import database from '../db/pgConnect';
import templateErrors from '../errors/templateLiterals';
import Queries from '../queries/products';

export default class Products {
  static async verifyProductName({ body }, res, next) {
    const { name } = body;
    const findProductQuery = Queries.findProductByName();
    const findProduct = await database.queryOneORNone(findProductQuery, name);
    if (findProduct) protocol.err404Res(res, templateErrors.dataFound('This item'));
    else next();
  }
}
