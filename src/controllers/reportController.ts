import { Response, NextFunction } from 'express';
import { responseDTO } from '../DTO/response';
import { AuthRequest } from '../middleware/middleware';
import Report from '../models/reportModel';

export const createReport = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const user = req.user;

    if (!user || (!user._id && !user.mysqlId)) {
        res.status(401).json(responseDTO('false', [], 'Unauthorized'));
        return;
    }

    const { articleId, reason, details } = req.body;

    if (!articleId || !reason) {
        res.status(400).json(responseDTO('false', [], 'articleId and reason are required'));
        return;
    }

    const reporterId = user._id ? user._id.toString() : user.mysqlId.toString();
    const reporterName = `${user.fname || ''} ${user.lname || ''}`.trim() || 'Anonymous';

    try {
        // Check for duplicate report
        const existing = await Report.findOne({ articleId, reporterId });
        if (existing) {
            res.status(409).json(responseDTO('false', [], 'You have already reported this post'));
            return;
        }

        const report = await Report.create({
            articleId,
            reporterId,
            reporterName,
            reason,
            details: details || '',
        });

        res.status(201).json(responseDTO('true', report, 'Post reported successfully'));
    } catch (err) {
        console.error('Error creating report:', err);
        res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
    }
};
export const getAllReports = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const user = req.user;

    if (!user || user.role !== 'admin') {
        res.status(401).json(responseDTO('false', [], 'Unauthorized: Admin access required'));
        return;
    }

    try {
        const reports = await Report.find().sort({ createdAt: -1 });
        res.status(200).json(responseDTO('true', reports, 'Reports fetched successfully'));
    } catch (err) {
        console.error('Error fetching reports:', err);
        res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
    }
};

export const updateReportStatus = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const user = req.user;
    const { id } = req.params;
    const { status } = req.body;

    if (!user || user.role !== 'admin') {
        res.status(401).json(responseDTO('false', [], 'Unauthorized: Admin access required'));
        return;
    }

    if (!['pending', 'reviewed', 'dismissed'].includes(status)) {
        res.status(400).json(responseDTO('false', [], 'Invalid status'));
        return;
    }

    try {
        const report = await Report.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!report) {
            res.status(404).json(responseDTO('false', [], 'Report not found'));
            return;
        }

        res.status(200).json(responseDTO('true', report, 'Report status updated successfully'));
    } catch (err) {
        console.error('Error updating report status:', err);
        res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
    }
};
