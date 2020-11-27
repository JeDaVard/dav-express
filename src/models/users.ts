import { client, Sequelize } from 'components/db';

const Users: any = client.define(
    'Users',
    {
        id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            allowNull: true,
            type: Sequelize.STRING(50),
            unique: true,
        },
        password: {
            allowNull: true,
            type: Sequelize.STRING(255),
        },
    },
    {
        timestamps: true,
    },
);

export default Users;
