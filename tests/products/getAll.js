import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoint at "/api/v1/products" to get all products as an authenticated User with GET', () => {
  before(async () => {
    await pool.queryNone(Test.deleteData());
  });

  before(async () => {
    await pool.queryAny(Test.users());
  });

  before(async () => {
    await pool.queryAny(Test.products());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });

  it('Should get all product data as an authenticated User with GET', async () => {
    const token = await Test.generateToken('5050505050505');
    const response = await chai.request(app).get('/api/v1/products').set('token', token);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('array');
    const { data } = response.body;
    const resData = Test.getRandomArrayIndex(data);
    if (data.length > 0) {
      expect(response.body.data[resData]).to.have.property('id').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('name').to.be.a('string');
      expect(response.body.data[resData]).to.have.property('price').to.be.a('number');
      expect(response.body.data[resData]).to.have.property('quantity').to.be.a('number');
    }
  });

  it('Should not get product data as an authenticated User with GET if token is an empty string', async () => {
    const token = '';
    const response = await chai.request(app).get('/api/v1/products').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not get product data as an authenticated User with GET if token is not sent', async () => {
    const response = await chai.request(app).get('/api/v1/products');
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token is required, please sign in or sign up');
  });

  it('Should not get product data as an authenticated User with GET if token is invalid', async () => {
    const token = 49440404944904;
    const response = await chai.request(app).get('/api/v1/products').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('object');
    expect(response.body.error).to.have.property('name').to.be.a('string');
    expect(response.body.error).to.have.property('message').to.be.a('string');
  });

  it('Should not get product data as an authenticated User with GET if token does not match any User', async () => {
    const token = await Test.generateToken('5050505050000');
    const response = await chai.request(app).get('/api/v1/products').set('token', token);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Token provided does not match any user');
  });

  it('Should not get product data as an authenticated User with GET if id from token is floating point number or a negative integer or floating point number', async () => {
    const token = await Test.generateToken(Test.returnRandomValue('505050.5050505', '-505050.5050505', '-5050505050505'));
    const response = await chai.request(app).get('/api/v1/products').set('token', token);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Id from token is not a positive integer');
  });
});
