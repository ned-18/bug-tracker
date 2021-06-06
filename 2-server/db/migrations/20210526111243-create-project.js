'use strict';
module.exports = {
	up: async (queryInterface, DataTypes) => {
		await queryInterface.createTable('projects', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
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
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE
			},
			deletedAt: {
				type: DataTypes.DATE
			}
		});
	},
	down: async (queryInterface, DataTypes) => {
		await queryInterface.dropTable('projects');
	}
};
