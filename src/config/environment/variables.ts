import { config } from 'dotenv';

const environment = process.env.NODE_ENV?.toLowerCase() || 'development';

if (environment === 'development') config({ path: '.env.development' });
if (environment === 'test') config({ path: '.env.test' });

config();

config({ path: '.env.public' });

const envVars = { ...process.env };

export { envVars, environment };
