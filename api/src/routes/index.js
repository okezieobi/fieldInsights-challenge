import userRouter from './users';
import productRouter from './products';

const versionNumber = '/api/v1';

export default (app) => {
  app.use(versionNumber, userRouter);
  app.use(versionNumber, productRouter);
};
