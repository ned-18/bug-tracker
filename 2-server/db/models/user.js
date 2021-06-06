'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate({ Role, Project, Bug, Project_User, Bug_User }) {
			this.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
			this.belongsToMany(Project, {
				through: Project_User,
				foreignKey: 'userId',
				otherKey: 'projectId',
				as: 'projects'
			});
			this.belongsToMany(Bug, {
				through: Bug_User,
				foreignKey: 'userId',
				otherKey: 'bugId',
				as: 'bugs'
			});
		}
	}
	User.init(
		{
			firstName: {
				type: DataTypes.STRING
			},
			lastName: {
				type: DataTypes.STRING
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			sequelize,
			tableName: 'users',
			modelName: 'User'
		}
	);
	return User;
};
