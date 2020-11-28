import { Sequelize } from 'sequelize';

import { env } from 'config/environment';

// const db: { [key: string]: Model } = {};

const client = new Sequelize(env.PG_DATABASE, env.PG_USER, env.PG_PASSWORD, {
    host: env.PG_HOST,
    port: env.PG_PORT,
    dialect: 'postgres',
    logging: env.POSTGRES_LOGGING === '1' ? console.log : false, // eslint-disable-line no-console
    define: {
        freezeTableName: true,
    },
});

// const basename = path.basename(__filename);
//
// readdirSync(__dirname)
//     .filter((file) => {
//         return (
//             !file.startsWith('.') &&
//             file !== basename &&
//             file !== 'index.js' &&
//             ['.js', '.ts'].includes(file.slice(-3))
//         );
//     })
//     .forEach(async (file) => {
//         const filePath = path.join(__dirname, file);
//         const modelPath = await import(filePath);
//         const model = modelPath(client, DataTypes);
//         db[model.name] = model;
//     });
//
// Object.keys(db).forEach((modelName) => {
//     if (db[modelName].hasOwnProperty('associate')) {
//         // @ts-ignore
//         db[modelName].associate(db);
//     }
// });

export { client };
