import database from '../db/pgConnect';
import models from '../models/products';
import Queries from '../queries/products';
import protocol from '../helpers/response';
import mainController from './controller';

export default class Products {
  static async create({ body }, res) {
    const createProductQuery = Queries.createProduct();
    const arrayData = models.requestData(body);
    const createProduct = await database.queryOne(createProductQuery, arrayData);
    const createProductRes = models.responseData(createProduct);
    return protocol.success201Res(res, createProductRes);
  }

  static async getAll(req, res) {
    const getAllProductsQuery = Queries.getAllProducts();
    await mainController.getAll(req, res, getAllProductsQuery, models.responseDataArray);
  }
}
