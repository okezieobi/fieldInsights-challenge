/* eslint-disable camelcase */
import protocol from '../helpers/response';
import checkRequest from '../helpers/requests';

export default class Products {
  static create({ body }, res, next) {
    const { name, price } = body;
    const nameErr = checkRequest.validateLetters(name, 'Product name');
    const priceErr = checkRequest.validateNumber(price, 'Product number');
    const findErr = checkRequest.findError(nameErr, priceErr);
    if (findErr) protocol.err400Res(res, findErr);
    else next();
  }
}
