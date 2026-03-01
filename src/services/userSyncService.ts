import MysqlUser from '../models/mysqlUser';
import MongoUser from '../models/userModels';
import sequelize from '../config/mysql';

export const syncAllUsers = async () => {
    try {
        console.log('Starting one-time user sync from MySQL to MongoDB...');

        // Ensure connection is established
        await sequelize.authenticate();

        // Fetch all users from MySQL
        const mysqlUsers = await MysqlUser.findAll();

        if (!mysqlUsers || mysqlUsers.length === 0) {
            console.log('No users found in MySQL to sync.');
            return;
        }

        let syncedCount = 0;

        // Upsert each user to MongoDB
        for (const mysqlUser of mysqlUsers) {
            const userData = mysqlUser.get({ plain: true });
            const { id, ...restOfData } = userData;

            await MongoUser.updateOne(
                { mysqlId: id },
                {
                    $set: {
                        ...restOfData
                    }
                },
                { upsert: true }
            );
            syncedCount++;
        }

        console.log(`Successfully synced ${syncedCount} users from MySQL to MongoDB.`);
    } catch (error) {
        console.error('Error during one-time user sync:', error);
    }
};

import Article from '../models/articleModels';
import Comment from '../models/commentModels';

export const syncUserByEmail = async (email: string) => {
    try {
        // Ensure connection is established
        await sequelize.authenticate();

        const mysqlUser = await MysqlUser.findOne({ where: { email } });

        if (!mysqlUser) {
            return null;
        }

        const userData = mysqlUser.get({ plain: true });
        const { id, ...restOfData } = userData;

        const mongoUser = await MongoUser.findOneAndUpdate(
            { mysqlId: id },
            {
                $set: {
                    ...restOfData
                }
            },
            { upsert: true, new: true }
        );

        if (mongoUser) {
            const authorIds = [mongoUser.id || (mongoUser as any)._id.toString(), mongoUser.mysqlId.toString()];
            const fullName = `${mongoUser.fname} ${mongoUser.lname}`;

            // Sync the name to all of the user's articles
            await Article.updateMany(
                { authorId: { $in: authorIds } },
                { authorName: fullName }
            );

            // Sync the name to all of the user's comments
            await Comment.updateMany(
                { authorId: { $in: authorIds } },
                { authorName: fullName }
            );
        }

        return mongoUser;
    } catch (error) {
        console.error(`Error syncing individual user ${email} from MySQL:`, error);
        return null;
    }
};

export const syncUserById = async (id: number) => {
    try {
        // Ensure connection is established
        await sequelize.authenticate();

        const mysqlUser = await MysqlUser.findByPk(id);

        if (!mysqlUser) {
            return null;
        }

        const userData = mysqlUser.get({ plain: true });
        const { id: mysqlId, ...restOfData } = userData;

        const mongoUser = await MongoUser.findOneAndUpdate(
            { mysqlId },
            {
                $set: {
                    ...restOfData
                }
            },
            { upsert: true, new: true }
        );

        if (mongoUser) {
            const authorIds = [mongoUser.id || (mongoUser as any)._id.toString(), mongoUser.mysqlId.toString()];
            const fullName = `${mongoUser.fname} ${mongoUser.lname}`;

            // Sync the name to all of the user's articles
            await Article.updateMany(
                { authorId: { $in: authorIds } },
                { authorName: fullName }
            );

            // Sync the name to all of the user's comments
            await Comment.updateMany(
                { authorId: { $in: authorIds } },
                { authorName: fullName }
            );
        }

        return mongoUser;
    } catch (error) {
        console.error(`Error syncing individual user ID ${id} from MySQL:`, error);
        return null;
    }
};
