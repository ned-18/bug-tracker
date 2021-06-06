'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Role extends Model {
		static associate({ User }) {
			this.hasMany(User, { foreignKey: 'roleId', as: 'users' });
		}
	}
	Role.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
			description: {
				type: DataTypes.STRING
			}
		},
		{
			sequelize,
			modelName: 'Role',
			tableName: 'roles'
		}
	);
	return Role;
};
