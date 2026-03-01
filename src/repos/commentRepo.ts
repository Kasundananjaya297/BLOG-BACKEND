import Comment, { IComment } from '../models/commentModels';
import Article from '../models/articleModels';
import mongoose from 'mongoose';

export const saveCommentRepo = async (commentData: Partial<IComment>) => {
    const newComment = new Comment(commentData);
    const savedComment = await newComment.save();

    // Increment article's comment count only for top-level comments
    if (!savedComment.parentId) {
        await Article.findByIdAndUpdate(savedComment.articleId, {
            $inc: { commentsCount: 1 }
        });
    }

    // If it's a reply, increment the parent's repliesCount
    if (savedComment.parentId) {
        await Comment.findByIdAndUpdate(savedComment.parentId, {
            $inc: { repliesCount: 1 }
        });
    }

    return savedComment;
};

export const getCommentsByArticleRepo = async (articleId: string, parentId: string | null = null) => {
    return await Comment.find({
        articleId,
        parentId,
        status: 'active'
    }).sort({ createdAt: -1 });
};

export const getCommentByIdRepo = async (id: string) => {
    return await Comment.findById(id);
};

export const updateCommentRepo = async (id: string, updateData: Partial<IComment>) => {
    return await Comment.findByIdAndUpdate(id, updateData, { new: true });
};

// Helper to recursively find and delete children
const deleteCommentAndChildren = async (commentId: string): Promise<number> => {
    const comment = await Comment.findById(commentId);
    if (!comment || comment.status === 'deleted') return 0;

    let deletedCount = 1;
    comment.status = 'deleted';
    await comment.save();

    const children = await Comment.find({ parentId: commentId, status: 'active' });
    for (const child of children) {
        deletedCount += await deleteCommentAndChildren(child._id as string);
    }

    return deletedCount;
};

export const deleteCommentRepo = async (id: string) => {
    const comment = await Comment.findById(id);
    if (!comment) return null;

    const articleId = comment.articleId;
    const parentId = comment.parentId;

    // Perform recursive delete
    const totalDeleted = await deleteCommentAndChildren(id);

    // Decrement article's total comment count only if the deleted comment was top-level
    if (!parentId) {
        await Article.findByIdAndUpdate(articleId, {
            $inc: { commentsCount: -1 }
        });
    }

    // If it was a reply, decrement the immediate parent's repliesCount by 1
    if (parentId) {
        await Comment.findByIdAndUpdate(parentId, {
            $inc: { repliesCount: -1 }
        });
    }

    return comment;
};
