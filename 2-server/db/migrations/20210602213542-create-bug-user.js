'use strict';
module.exports = {
	up: async (queryInterface, DataTypes) => {
		await queryInterface.createTable('bugs_users', {
			bugId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				references: {
					model: 'bugs',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
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
			}
		});
	},
	down: async (queryInterface, DataTypes) => {
		await queryInterface.dropTable('bugs_users');
	}
};
