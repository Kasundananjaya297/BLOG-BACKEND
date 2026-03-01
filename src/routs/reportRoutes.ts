import express from 'express';
import { createReport, getAllReports, updateReportStatus } from '../controllers/reportController';
import { authMiddleware } from '../middleware/middleware';

const router = express.Router();

/*
  POST /api/v1/reports/createReport
  Submit a report for a post (auth required)
*/
router.post('/createReport', authMiddleware, createReport);

/*
  GET /api/v1/reports/getAllReports
  Fetch all reports (Admin auth required)
*/
router.get('/getAllReports', authMiddleware, getAllReports);

/*
  PUT /api/v1/reports/updateReportStatus/:id
  Update the status of a specific report (Admin auth required)
*/
router.put('/updateReportStatus/:id', authMiddleware, updateReportStatus);

export default router;
