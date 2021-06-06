'use strict';
module.exports = {
	up: async (queryInterface, DataTypes) => {
		await queryInterface.createTable('projects_users', {
			userId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				references: {
					model: 'users',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			projectId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				references: {
					model: 'projects',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			}
		});
	},
	down: async (queryInterface, DataTypes) => {
		await queryInterface.dropTable('projects_Uuers');
	}
};
