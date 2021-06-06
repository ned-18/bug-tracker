'use strict';
module.exports = {
	up: (queryInterface, DataTypes) => {
		return queryInterface.addColumn('bugs', 'projectId', {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'projects',
				key: 'id'
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE'
		});
	},
	down: (queryInterface, DataTypes) => {
		return queryInterface.removeColumn('bugs', 'projectId');
	}
};
