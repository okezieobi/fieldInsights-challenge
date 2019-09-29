/* eslint-disable camelcase */
import protocol from '../helpers/response';
import checkRequest from '../helpers/requests';

export default class Products {
  static create({ body }, res, next) {
    const { name, price, quantity } = body;
    const nameErr = checkRequest.validateUsername(name, 'Product name');
    const priceErr = checkRequest.validateNumber(price, 'Product price');
    const quantityErr = checkRequest.validateInteger(quantity, 'Product quantity');
    const findErr = checkRequest.findError(nameErr, priceErr, quantityErr);
    if (findErr) protocol.err400Res(res, findErr);
    else next();
  }
}
