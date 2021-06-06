'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Bug extends Model {
		static associate({ Project, User, Bug_User }) {
			this.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
			this.belongsToMany(User, {
				through: Bug_User,
				foreignKey: 'bugId',
				otherKey: 'userId',
				as: 'users'
			});
		}
	}
	Bug.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			priority: {
				type: DataTypes.STRING,
				allowNull: false
			},
			status: {
				type: DataTypes.STRING,
				allowNull: false
			},
			assignTo: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: null
			}
		},
		{
			sequelize,
			paranoid: true,
			tableName: 'bugs',
			modelName: 'Bug'
		}
	);
	return Bug;
};
