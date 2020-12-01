import { client } from '../components/db';
import { UserFactory } from './user';
import { VideoFactory } from './videos';
import { DataTypes } from 'sequelize';

/* eslint-disable */
export const User = UserFactory(client, DataTypes);
export const Video = VideoFactory(client, DataTypes);

Object.values(client.models).forEach((model: any) => {
    if ('associate' in model) {
        model.associate(client.models);
    }
});
/* eslint-enable */
