/* eslint-disable camelcase */
import numbers from '../helpers/uniqueNos';

export default class Products {
  static requestData({ name, price, quantity }) {
    return [numbers.uniqueIds(), String(name), parseFloat(price), parseInt(quantity, 10)];
  }

  static responseData({
    id, name, price, quantity,
  }) {
    return {
      id: parseInt(id, 10),
      name: String(name),
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
    };
  }
}
