require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'PRODUCTION';
const Sequelize = require('sequelize');
const UserModel = require('./User');
const FriendshipModel = require('./Friendship');
const GroupModel = require('./Group');
const GroupMembershipModel = require('./GroupMembership');
const RendezvousModel = require('./Rendezvous');
const RendezvousMembershipModel = require('./RendezvousMembership');

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
    // logging: true,
    logging: false,
    define: {
        underscored: true,
    }
});

// Test DB
sequelize.authenticate()
.then(() => console.log('Database connected...'))
.catch(err => console.log('Error: ' + err));

const models = {
	User: UserModel(sequelize),
    Friendship: FriendshipModel(sequelize),
    Group: GroupModel(sequelize),
    GroupMembership: GroupMembershipModel(sequelize),
    Rendezvous: RendezvousModel(sequelize),
    RendezvousMembership: RendezvousMembershipModel(sequelize)
    // Add after:
    // Message: require('./Message')
};

// We define all models according to their files.
Object.keys(models).forEach((model) => {
    if('associate' in models[model]) {
        console.log(`-- RUNNING ASSOCIATE ON: ${model}! --`);
        models[model].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;