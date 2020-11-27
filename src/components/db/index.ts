import { readdirSync } from 'fs';
import path from 'path';
import sequelize, { Sequelize, ModelAttributes, ModelOptions, Model, DataTypes } from 'sequelize';

import { env } from 'config/environment';

const db: { [key: string]: Model } = {};

const client = new Sequelize(env.PG_DATABASE, env.PG_USER, env.PG_PASSWORD, {
    host: env.PG_HOST,
    port: env.PG_PORT,
    dialect: 'postgres',
    logging: env.POSTGRES_LOGGING === '1' ? console.log : false, // eslint-disable-line no-console
    define: {
        freezeTableName: true,
    },
});

const basename = path.basename(__filename);

readdirSync(__dirname)
    .filter((file) => {
        return (
            !file.startsWith('.') &&
            file !== basename &&
            file !== 'index.js' &&
            ['.js', '.ts'].includes(file.slice(-3))
        );
    })
    .forEach((file) => {
        const filePath = path.join(__dirname, file);
        const model = require(filePath)(client, DataTypes); // eslint-disable-line security/detect-non-literal-require
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].hasOwnProperty('associate')) {
        // @ts-ignore
        db[modelName].associate(db);
    }
});

function defineModel(
    modelName: string,
    attributes: ModelAttributes,
    options?: ModelOptions,
): typeof Model {
    return client.define(modelName, attributes, options);
}

export { db, client, defineModel, sequelize as Sequelize };
