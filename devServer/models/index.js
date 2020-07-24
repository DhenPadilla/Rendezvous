require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'PRODUCTION';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    // host: isProduction ? psql_url : 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: true,
    // define: {
    //     underscored: true,
    // }
});

// Test DB
sequelize.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error: ' + err));

const models = {
	User: require('./User'),
    Group: require('./Group'),
    Friendship: require('./Friendship'),
    Membership: require('./Membership')
	// require('./Rendezvous'),
};

// We define all models according to their files.
Object.keys(models).forEach((model) => {
    models[model](sequelize);
    if('associate' in models[model]) {
        models[model].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;