'use strict';
module.exports = {
	up: async (queryInterface, DataTypes) => {
		await queryInterface.createTable('bugs', {
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
		await queryInterface.dropTable('bugs');
	}
};
