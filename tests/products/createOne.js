import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoint at "/api/v1/products/" to create a product as an authenticated Admin with POST', () => {
  before(async () => {
    await pool.queryNone(Test.deleteData());
  });

  before(async () => {
    await pool.queryAny(Test.users());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });

  it('Should create a product at "/api/v1/products" as an authenticated Admin with POST if all inputs are valid', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(201);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('number');
    expect(response.body.data).to.have.property('name').to.be.a('string').to.equal(testData.name);
    expect(response.body.data).to.have.property('price').to.be.a('number').to.equal(parseFloat(testData.price));
    expect(response.body.data).to.have.property('quantity').to.be.a('number').to.equal(parseInt(testData.quantity, 10));
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product name is undefined', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    testData.name = undefined;
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Product name is required');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product name is an empty string', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    testData.name = '';
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Product name is required');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product name is null', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    testData.name = null;
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Product name is required');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product name is not sent', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    delete testData.name;
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Product name is required');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product name is not a string', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    testData.name = 404040;
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Product name must be string type');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product name is does not contain only letters', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    testData.name = '$%^&*@#$$%';
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Product name must be letters and numbers');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product name already exists', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('This item already exists');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product price is undefined', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    testData.price = undefined;
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Product price is required');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product price is null', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    testData.price = null;
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Product price is required');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product price is an empty string', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    testData.price = '';
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Product price is required');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product price is not sent', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    delete testData.price;
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Product price is required');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product price is neither a positive integer nor floating point number', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    testData.price = '01dDsjflsW#fdd99949949';
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Product price must be a positive number');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product price is not a string data type', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    testData.price = 1000;
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Product price must be string type');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product quantity is undefined', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    testData.quantity = undefined;
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Product quantity is required');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product quantity is null', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    testData.quantity = null;
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Product quantity is required');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product quantity is not sent', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    delete testData.quantity;
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Product quantity is required');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product quantity is an empty string', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    testData.quantity = '';
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Product quantity is required');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product quantity is not a strong data type', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    testData.quantity = 2000;
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Product quantity must be string type');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with Post if product quantity not a positive integer', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    testData.quantity = Test.returnRandomValue('2.03', '-3', '-3.4');
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Product quantity must be a positive integer');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with POST if token is an empty string', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    const token = '';
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with POST if token is not sent', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    const response = await chai.request(app).post('/api/v1/products').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with POST if token is an invalid', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    const token = 3445676566;
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('object');
    expect(response.body.error).to.have.property('name').to.be.a('string');
    expect(response.body.error).to.have.property('message').to.be.a('string');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with POST if token does not match any user', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    const token = await Test.generateToken('5050505050000');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any user');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with POST if token does not match the Admin', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    const token = await Test.generateToken('1010101010101');
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(403);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(403);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Only admin can access this resource');
  });

  it('Should not create a product at "/api/v1/products" as an authenticated Admin with POST if id from token is a floating point or negative integer or floating point number', async () => {
    const testData = {
      name: 'Playstation 5',
      price: '1500.00',
      quantity: '20',
    };
    const token = await Test.generateToken(Test.returnRandomValue('505050.5050505', '-505050.5050505', '-5050505050505'));
    const response = await chai.request(app).post('/api/v1/products').set('token', token).send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });
});
