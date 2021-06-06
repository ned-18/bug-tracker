'use strict';

const PREDEFINED_ROLES = [
	{
		name: 'PROJECT_MANAGER',
		description: 'User is allowed to create, edit and delete projects and bugs and invite other users.'
	},
	{
		name: 'BASIC',
		description: 'User is allowed to create, edit and delete own bugs.'
	}
];

module.exports = {
	up: async (queryInterface, DataTypes) => {
		await queryInterface.sequelize.transaction(async transaction => {
			await queryInterface.createTable(
				'roles',
				{
					id: {
						allowNull: false,
						autoIncrement: true,
						primaryKey: true,
						type: DataTypes.INTEGER
					},
					name: {
						type: DataTypes.STRING,
						allowNull: false,
						unique: true
					},
					description: {
						type: DataTypes.STRING
					},
					createdAt: {
						allowNull: false,
						type: DataTypes.DATE
					},
					updatedAt: {
						allowNull: false,
						type: DataTypes.DATE
					}
				},
				{ transaction }
			);

			const insertRoleQuery = `
        		INSERT INTO roles (name, description, "createdAt", "updatedAt")
        		VALUES (:name, :description, :createdAt, :updatedAt);
      			`;

			await Promise.all(
				PREDEFINED_ROLES.map(ROLE => {
					return queryInterface.sequelize.query(insertRoleQuery, {
						replacements: {
							name: ROLE.name,
							description: ROLE.description,
							createdAt: new Date(),
							updatedAt: new Date()
						},
						type: queryInterface.sequelize.QueryTypes.INSERT,
						transaction
					});
				})
			);
		});
	},
	down: async (queryInterface, DataTypes) => {
		await queryInterface.dropTable('roles');
	}
};
