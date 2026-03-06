import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/mysql';

class MysqlUser extends Model {
    public id!: number;
    public fname!: string;
    public lname!: string;
    public gender!: string;
    public addressLine1!: string;
    public addressLine2!: string;
    public city!: string;
    public state!: string;
    public zipCode!: string;
    public country!: string;
    public email!: string;
    public role!: string;
    public contact!: string;
    public company!: string;
    public password!: string;
    public status!: 'pending' | 'active' | 'rejected';
}

MysqlUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        addressLine1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        addressLine2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        zipCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contact: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'active', 'rejected'),
            defaultValue: 'active',
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'User',
        timestamps: false,
    },
);

export default MysqlUser;
