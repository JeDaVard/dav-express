import request, { SuperTest, Test } from 'supertest';
import { app } from 'app';
import { env } from 'config/environment';

describe('Service API Routes', () => {
    let server: SuperTest<Test>;

    beforeAll(() => {
        server = request(app);
    });

    describe(`GET /${env.apiVersionUrl}/health`, () => {
        test('should return status message', async () => {
            const response = await server.get(`/${env.apiVersionUrl}/health`);

            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.body).toHaveProperty('status', 'OK');
            expect(response.body).toHaveProperty('date', expect.anything());
        });
    });
});
