import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

export interface UserAttributes {
    id: number;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UserStatics {
    associate(models: { [key: string]: typeof Model }): void;
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

type CustomModelCtor<M extends Model> = typeof Model & UserStatics & { new (): M }; // eslint-disable-line

function UserFactory(client: Sequelize) {
    const users = client.define<UserInstance>(
        'Users',
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
        },
    ) as CustomModelCtor<UserInstance>;

    // Associations
    // users.associate = (models) => {
    //       users.belongsTo()
    // };

    return users;
}

export { UserFactory };
