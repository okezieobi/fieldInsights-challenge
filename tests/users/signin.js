import Test, {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
} from '../test';

chai.use(chaiHttp);

describe('Test endpoints at "/api/v1/auth/signin" to sign in a User with POST', () => {
  before(async () => {
    await pool.queryNone(Test.deleteData());
  });

  before(async () => {
    await pool.queryAny(Test.users());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });

  it('Should signin in a User at "/api/v1/auth/signin" with POST if all request inputs are valid', async () => {
    const testData = {
      email: 'foobar@mail.com',
      password: 'AbcDFer123*@is!',
    };
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('number');
    expect(response.body.data).to.have.property('fullName').to.be.a('string');
    expect(response.body.data).to.have.property('userName').to.be.a('string');
    expect(response.body.data).to.have.property('email').to.be.a('string').to.equal(testData.email);
    expect(response.body.data).to.have.property('type').to.be.a('string').to.equal('Client');
    expect(response.body).to.have.property('token').to.be.a('string');
    expect(response.header).to.have.property('token').to.be.a('string');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email is undefined or null or an empty string', async () => {
    const testData = {
      email: 'foobar@mail.com',
      password: 'AbcDFer123*@is!',
    };
    testData.email = Test.returnRandomValue(undefined, '', null);
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username or email is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email is not string type', async () => {
    const testData = {
      email: 'foobar@mail.com',
      password: 'AbcDFer123*@is!',
    };
    testData.email = 1000;
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Email must be string type');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email does not exist', async () => {
    const testData = {
      email: 'foobar@mail.com',
      password: 'AbcDFer123*@is!',
    };
    delete testData.email;
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username or email is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user email has not been registered', async () => {
    const testData = {
      email: 'foobar@mail.com',
      password: 'AbcDFer123*@is!',
    };
    testData.email = 'haha@mail.com';
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('User does not exist, please sign up');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password is undefined or null or an empty string', async () => {
    const testData = {
      email: 'foobar@mail.com',
      password: 'AbcDFer123*@is!',
    };
    testData.password = Test.returnRandomValue(undefined, '', null);
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password is not string type', async () => {
    const testData = {
      email: 'foobar@mail.com',
      password: 'AbcDFer123*@is!',
    };
    testData.password = 1000;
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be string type');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password does not exist', async () => {
    const testData = {
      email: 'foobar@mail.com',
      password: 'AbcDFer123*@is!',
    };
    delete testData.password;
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password is not a minimum of 8 characters and has at least one uppercase letter, lowercase letter, number and one special character', async () => {
    const testData = {
      email: 'foobar@mail.com',
      password: 'AbcDFer123*@is!',
    };
    testData.password = Test.returnRandomValue('dBcd!', '1234aodbcd!', '1234AODBCD!', 'odedeAODBCD!@', 'odedeAODBCD123');
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });

  it('Should NOT sign in a User at "/api/v1/auth/signin" if user password does not not match with input password', async () => {
    const testData = {
      email: 'foobar@mail.com',
      password: 'AbcDFer123*@is!',
    };
    testData.password = 'AbcDFer123*@is!90';
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password does not match user');
  });
});


describe('Test endpoints at "/api/v1/auth/signin/admin" to sign in an Admin with POST', () => {
  before(async () => {
    await pool.queryNone(Test.deleteData());
  });

  before(async () => {
    await pool.queryAny(Test.users());
  });

  after(async () => {
    await pool.queryNone(Test.deleteData());
  });

  it('Should sign in an Admin at "/api/v1/auth/signin" with POST if all request inputs are valid', async () => {
    const testData = {
      username: 'Ekemezie',
      password: 'AbcDFer123*@is!',
    };
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(200);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(200);
    expect(response.body).to.have.property('data').to.be.an('object');
    expect(response.body.data).to.have.property('id').to.be.a('number');
    expect(response.body.data).to.have.property('fullName').to.be.a('string');
    expect(response.body.data).to.have.property('email').to.be.a('string');
    expect(response.body.data).to.have.property('userName').to.be.a('string').to.equal(testData.username);
    expect(response.body.data).to.have.property('type').to.be.a('string').to.equal('Admin');
    expect(response.body).to.have.property('token').to.be.a('string');
    expect(response.header).to.have.property('token').to.be.a('string');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if user name is an empty string', async () => {
    const testData = {
      username: 'Ekemezie',
      password: 'AbcDFer123*@is!',
    };
    testData.username = Test.returnRandomValue('', undefined, null);
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username or email is required');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if user name is not string type', async () => {
    const testData = {
      username: 'Ekemezie',
      password: 'AbcDFer123*@is!',
    };
    testData.username = 1000;
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username must be string type');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if user name is not sent in request', async () => {
    const testData = {
      username: 'Ekemezie',
      password: 'AbcDFer123*@is!',
    };
    delete testData.username;
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Username or email is required');
  });


  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if user name does not exist', async () => {
    const testData = {
      username: 'Ekemezie',
      password: 'AbcDFer123*@is!',
    };
    testData.username = 'okbobo';
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.has.status(404);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(404);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('User does not exist, please sign up');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if password is undefined or null or an empty string', async () => {
    const testData = {
      username: 'Ekemezie',
      password: 'AbcDFer123*@is!',
    };
    testData.password = Test.returnRandomValue('', undefined, null);
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if password is not a string type', async () => {
    const testData = {
      username: 'Ekemezie',
      password: 'AbcDFer123*@is!',
    };
    testData.password = 1000;
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be string type');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if password is not sent', async () => {
    const testData = {
      username: 'Ekemezie',
      password: 'AbcDFer123*@is!',
    };
    delete testData.password;
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password is required');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if password does not match', async () => {
    const testData = {
      username: 'Ekemezie',
      password: 'AbcDFer123*@is!',
    };
    testData.password = 'AbcDFer123*@is!0wT';
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.has.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password does not match user');
  });

  it('Should not sign in an Admin at "/api/v1/auth/signin/admin" with Post if password is not a minimum of 8 characters and has at least one uppercase letter, lowercase letter, number and one special character', async () => {
    const testData = {
      username: 'Ekemezie',
      password: 'AbcDFer123*@is!',
    };
    testData.password = Test.returnRandomValue('dBcd!', '1234aodbcd!', '1234AODBCD!', 'odedeAODBCD!@', 'odedeAODBCD123');
    const response = await chai.request(app).post('/api/v1/auth/signin').send(testData);
    expect(response).to.have.status(400);
    expect(response.body).to.be.an('object');
    expect(response.body).to.have.property('status').to.be.a('number').to.equal(400);
    expect(response.body).to.have.property('error').to.be.a('string').to.equal('Password must be eight characters minimum, at least one uppercase letter, one lowercase letter, one number and one special character');
  });
});
