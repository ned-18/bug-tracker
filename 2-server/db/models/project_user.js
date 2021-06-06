'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Project_User extends Model {
		static associate(models) {}
	}
	Project_User.init(
		{
			userId: {
				type: DataTypes.INTEGER,
				primaryKey: true
			},
			projectId: {
				type: DataTypes.INTEGER,
				primaryKey: true
			}
		},
		{
			sequelize,
			tableName: 'projects_users',
			modelName: 'Project_User',
			timestamps: false
		}
	);
	return Project_User;
};
