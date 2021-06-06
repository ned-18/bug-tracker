'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Project extends Model {
		static associate({ User, Project_User, Bug }) {
			this.belongsToMany(User, {
				through: Project_User,
				foreignKey: 'projectId',
				otherKey: 'userId',
				as: 'users'
			});
			this.hasMany(Bug, { foreignKey: 'projectId', as: 'bugs' });
		}
	}
	Project.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			category: {
				type: DataTypes.STRING,
				allowNull: false
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			status: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			sequelize,
			paranoid: true,
			tableName: 'projects',
			modelName: 'Project'
		}
	);
	return Project;
};

// sequelize db:migrate &&
