import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import { Password } from '../libs/passwords';

export interface UserAttributes {
    id: number;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserCreationAttributes
    extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
// export interface UserCreationAttributes {
//     email: string;
//     password: string;
// }

export interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
        UserAttributes {}

function UserFactory(client: Sequelize) {
    const user = client.define<UserInstance>(
        'User',
        {
            id: {
                allowNull: false,
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING(50),
                unique: true,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING(255),
            },
        },
        {
            timestamps: true,
            tableName: 'users',
        },
    ) as ModelCtor<UserInstance>;

    // Associations
    // user.associate = (models) => {
    // users.belongsTo()
    // };

    // Hooks
    user.addHook('beforeSave', async (user) => {
        if (user.changed() && (user.changed() as string[]).includes('password')) {
            const hashed = await Password.toHash(user.getDataValue('password'));
            user.setDataValue('password', hashed);
        }
    });

    return user;
}

export { UserFactory };
