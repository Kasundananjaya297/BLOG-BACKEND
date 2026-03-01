import { Response } from 'express';
import { AuthRequest } from '../middleware/middleware';
import * as commentServices from '../services/commentServices';
import { responseDTO } from '../DTO/response';

export const postComment = async (req: AuthRequest, res: Response) => {
    const { articleId, content, image, parentId } = req.body;
    const user = req.user;

    if (!user) {
        res.status(401).json(responseDTO('false', [], 'Unauthorized'));
        return;
    }

    const userId = user._id ? user._id.toString() : user.mysqlId.toString();
    const authorName = `${user.fname} ${user.lname}`;
    const authorProfileImage = user.profileImage;

    try {
        const commentData = {
            articleId,
            content,
            image,
            parentId,
            authorId: userId,
            authorName,
            authorProfileImage,
        };

        const response = await commentServices.postCommentService(commentData);
        res.status(response.success === 'true' ? 201 : 400).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
    }
};

export const getCommentsByArticle = async (req: AuthRequest, res: Response) => {
    const { articleId } = req.params;
    const { parentId } = req.query;

    try {
        const response = await commentServices.getCommentsByArticleService(
            articleId,
            (parentId as string) || null,
        );
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
    }
};

export const updateComment = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { content, image } = req.body;
    const user = req.user;

    if (!user) {
        res.status(401).json(responseDTO('false', [], 'Unauthorized'));
        return;
    }

    const userId = user._id ? user._id.toString() : user.mysqlId.toString();

    try {
        const response = await commentServices.updateCommentService(id, userId, content, image);
        res.status(response.success === 'true' ? 200 : 400).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
    }
};

export const deleteComment = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    if (!user) {
        res.status(401).json(responseDTO('false', [], 'Unauthorized'));
        return;
    }

    const userId = user._id ? user._id.toString() : user.mysqlId.toString();
    const isAdmin = user.role === 'admin';

    try {
        const response = await commentServices.deleteCommentService(id, userId, isAdmin);
        res.status(response.success === 'true' ? 200 : 400).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
    }
};
