import { config } from 'dotenv';

const environment = process.env.NODE_ENV?.toLowerCase() || 'development';

config({ path: '.env.public' });

config();

if (environment === 'development') config({ path: '.env.development' });
if (environment === 'test') config({ path: '.env.test' });

const envVars = { ...process.env };

export { envVars, environment };
