export default class Products {
  static findProductByName() {
    return 'SELECT * FROM products WHERE name = $1';
  }

  static createProduct() {
    return 'INSERT INTO products(id, name, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *';
  }
}
