/* eslint-disable camelcase */
import numbers from '../helpers/uniqueNos';
import commonModel from './model';

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

  static responseDataArray(array) {
    if (array) return commonModel.modifyArray(array, Products.responseData);
    return array;
  }
}
