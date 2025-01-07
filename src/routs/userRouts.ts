import express from 'express';
const router = express.Router();
import * as userController from '../controllers/userController';
import { authMiddleware } from '../middleware/middleware';

/*  
    GET api/v1/users/login 
    Login a user
*/
router.post('/login', userController.loginUser);
/*  
    POST api/v1/users/register 
    Register a new user
*/
router.post('/register', authMiddleware, userController.registerUser);

export default router;
