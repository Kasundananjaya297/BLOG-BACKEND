import express from 'express';
const router = express.Router();
import * as aboutController from '../controllers/aboutController';
import { authMiddleware } from '../middleware/middleware';

/*
 POST api/v1/about/saveAbout
 save an about
*/
router.post('/saveAbout', authMiddleware, aboutController.saveAbout);

/*
 GET api/v1/about/getAllAbout
 Get all about
*/
router.get('/getAllAbout', aboutController.getAllAbout);

/*  
    GET api/v1/about/getLatestAbout
    Get the latest about
*/
router.get('/getLatestAbout', aboutController.getLatestAbout);

/* 
    PUT api/v1/about/updateAbout/:id
    Update an about
*/
router.put('/updateAbout/:id', authMiddleware, aboutController.updateAbout);
export default router;
