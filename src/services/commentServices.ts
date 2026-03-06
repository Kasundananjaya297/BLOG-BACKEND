import * as commentRepo from '../repos/commentRepo';
import { IComment } from '../models/commentModels';

export const postCommentService = async (commentData: Partial<IComment>) => {
    try {
        const comment = await commentRepo.saveCommentRepo(commentData);
        return { success: 'true', data: comment, message: 'Comment posted successfully' };
    } catch (error) {
        return { success: 'false', data: [], message: 'Error posting comment' };
    }
};

export const getCommentsByArticleService = async (articleId: string, parentId: string | null = null) => {
    try {
        const comments = await commentRepo.getCommentsByArticleRepo(articleId, parentId);
        return { success: 'true', data: comments, message: 'Comments fetched successfully' };
    } catch (error) {
        return { success: 'false', data: [], message: 'Error fetching comments' };
    }
};

export const updateCommentService = async (id: string, userId: string, content: string, image?: string) => {
    try {
        const comment = await commentRepo.getCommentByIdRepo(id);
        if (!comment) {
            return { success: 'false', data: [], message: 'Comment not found' };
        }

        if (comment.authorId !== userId) {
            return { success: 'false', data: [], message: 'Unauthorized to edit this comment' };
        }

        const updatedComment = await commentRepo.updateCommentRepo(id, { content, image });
        return { success: 'true', data: updatedComment, message: 'Comment updated successfully' };
    } catch (error) {
        return { success: 'false', data: [], message: 'Error updating comment' };
    }
};

export const deleteCommentService = async (id: string, userId: string, isAdmin: boolean = false) => {
    try {
        const comment = await commentRepo.getCommentByIdRepo(id);
        if (!comment) {
            return { success: 'false', data: [], message: 'Comment not found' };
        }

        if (comment.authorId !== userId && !isAdmin) {
            return { success: 'false', data: [], message: 'Unauthorized to delete this comment' };
        }

        await commentRepo.deleteCommentRepo(id);
        return { success: 'true', data: [], message: 'Comment deleted successfully' };
    } catch (error) {
        return { success: 'false', data: [], message: 'Error deleting comment' };
    }
};
