export default class Queries {
  static findUserById() {
    return 'SELECT * FROM users WHERE id = $1';
  }

  static createClient() {
    return 'INSERT INTO users(id, full_name, email, password, username) VALUES ($1, $2, $3, $4, $5) RETURNING id, full_name, email, type, username';
  }

  static findUserByEmailOrUsername() {
    return 'SELECT * FROM users WHERE email = $1 OR username = $2';
  }

  static findProductByName() {
    return 'SELECT * FROM products WHERE name = $1';
  }

  static createProduct() {
    return 'INSERT INTO products(id, name, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *';
  }
}
