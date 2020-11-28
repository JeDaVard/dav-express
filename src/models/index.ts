import { client } from '../components/db';
import { UserFactory } from './user';

/* eslint-disable */
export const User = UserFactory(client);

Object.values(client.models).forEach((model: any) => {
    if ('associate' in model) {
        model.associate(client.models);
    }
});
/* eslint-enable */
