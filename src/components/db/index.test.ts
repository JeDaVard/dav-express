import { connectMongo } from './';

describe('DB component tests', () => {
    it('To check if connectMongo function exists', async () => {
        expect(typeof connectMongo).toEqual('function');
    });
});
