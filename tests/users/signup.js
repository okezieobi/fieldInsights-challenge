import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/auth/signup" to create a User with POST', () => {
  before(async () => {
    await pool.queryNone(Test.deleteData());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });

  it('Should create a User at "/api/v1/auth/signup" with POST if all request inputs are valid', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(201);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(201);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('number');
    expect(response.body.data).to.have.property('fullName').to.be.a('string').to.equal(testData.fullName);
    expect(response.body.data).to.have.property('userName').to.be.a('string').to.equal(testData.username);
    expect(response.body.data).to.have.property('email').to.be.a('string').to.equal(testData.email);
    expect(response.body.data).to.have.property('type').to.be.a('string').to.equal('Client');
    expect(response.body).to.have.property('token').to.be.a('string');
    expect(response.header).to.have.property('token').to.be.a('string');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username is undefined or an empty string or null', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.username = Test.returnRandomValue(undefined, '', null);
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username is not string type', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.username = 1000;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username must be string type');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username is not sent', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    delete testData.username;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username is not made up of letters and numbers', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.username = '$%^&*@#$$%';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username must be letters and numbers');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user first name is undefined or an empty string or null', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.fullName = Test.returnRandomValue(undefined, '', null);
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Full name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user first name is not type string', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.fullName = 1000;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Full name must be string type');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user first name does not exist', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    delete testData.fullName;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Full name is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user first name are not letters', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.fullName = '000@342';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Full name must be letters');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email is undefined or an empty string or null', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.email = Test.returnRandomValue(undefined, '', null);
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email is not string type', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.email = 1000;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email must be string type');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email does not exist', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    delete testData.email;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email format is wrong', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.email = 'haha@com';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email format is wrong');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user email has already been registered', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.email = 'mama@mail.com';
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('User exists, please sign in with email or username');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is undefined or null or an empty string', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.password = Test.returnRandomValue(undefined, '', null);
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is not string type', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.password = 1000;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be string type');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password does not exist', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    delete testData.password;
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user password is not a minimum of 8 characters and has at least one uppercase letter, lowercase letter,  number and one special character', async () => {
    const testData = {
      fullName: 'Frank',
      email: 'mama@mail.com',
      password: '1234AOdBcd!',
      username: 'Obiedere',
    };
    testData.password = Test.returnRandomValue('1OdBcd!', '1234aodbcd!', '1234AODBCD!', 'odedeAODBCD!', 'odedeAODBCD123');
    const response = await chai.request(app).post('/api/v1/auth/signup').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });
});
