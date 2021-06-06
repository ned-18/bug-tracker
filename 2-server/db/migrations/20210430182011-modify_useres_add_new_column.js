'use strict';
module.exports = {
	up: (queryInterface, DataTypes) => {
		return queryInterface.addColumn('users', 'roleId', {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'roles',
				key: 'id'
			},
			onDelete: 'SET NULL'
		});
	},
	down: (queryInterface, DataTypes) => {
		return queryInterface.removeColumn('users', 'roleId');
	}
};
