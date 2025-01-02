import express from "express";
const router = express.Router();
import * as userController from '../controllers/userController';

router.get('/users', async(req, res) => {
   
    res.send('Users route');
});

router.post('/login', async(req, res) => {
    res.send('Login route');
});

router.post('/register',userController.registerUser);

export default router;