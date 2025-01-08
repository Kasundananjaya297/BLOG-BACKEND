import express from 'express';
const router = express.Router();
import * as aboutController from '../controllers/aboutController';

/*
 POST api/v1/about/saveAbout
 save an about
*/
router.post('/saveAbout', aboutController.saveAbout);

export default router;
