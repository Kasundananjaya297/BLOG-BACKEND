import express from 'express';
const router = express.Router();
import * as userController from '../controllers/userController';

router.get('/users', async (req, res) => {
  res.send('Users route');
});
/*  
    GET api/v1/users/login 
    Login a user
*/

router.post('/users/login', userController.loginUser);
/*  
    POST api/v1/users/register 
    Register a new user
*/
router.post('/users/register', userController.registerUser);

export default router;
