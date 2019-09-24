import validateProductData from '../data/products';
import authenticateUsers from './users';
import authenticateProductData from '../auth/products';
import middleware from './middleware';

export default class Products {
  static create() {
    const { authToken, authAll, authAdmin } = authenticateUsers.authUsers();
    const validateData = validateProductData.create.bind(validateProductData);
    const authenticateData = authenticateProductData.verifyProductName
      .bind(authenticateProductData);
    return middleware.routeCallbacks(validateData, authToken, authAll, authAdmin, authenticateData);
  }
}
