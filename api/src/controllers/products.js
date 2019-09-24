import database from '../db/pgConnect';
import models from '../models/products';
import Queries from '../helpers/queries';
import protocol from '../helpers/response';

export default class Products {
  static async create({ body }, res) {
    const createProductQuery = Queries.createProduct();
    const arrayData = models.requestData(body);
    const createProduct = await database.queryOne(createProductQuery, arrayData);
    const createProductRes = models.responseData(createProduct);
    return protocol.success201Res(res, createProductRes);
  }
}
