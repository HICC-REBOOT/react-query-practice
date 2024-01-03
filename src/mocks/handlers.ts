import authHandler from './handlers/auth';
import userHandler from './handlers/user';

const handlers = [...userHandler, ...authHandler];

export default handlers;
