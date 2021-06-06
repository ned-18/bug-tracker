'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Bug_User extends Model {
		static associate(models) {}
	}
	Bug_User.init(
		{
			bugId: {
				type: DataTypes.INTEGER,
				primaryKey: true
			},
			userId: {
				type: DataTypes.INTEGER,
				primaryKey: true
			}
		},
		{
			sequelize,
			tableName: 'bugs_users',
			modelName: 'Bug_User',
			timestamps: false
		}
	);
	return Bug_User;
};
