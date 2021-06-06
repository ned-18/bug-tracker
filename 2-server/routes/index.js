const express = require('express');
const router = express.Router();

const authController = require('../controller/auth');
const projectController = require('../controller/project');
const newUserController = require('../controller/addNewUserToProject');
const userController = require('../controller/user');
const bugController = require('../controller/bug');
const verify = require('../middleware/verify');

// AUTH CONTROLLER
router
	.post('/auth/signup', authController.registerUser) // Register project manager
	.post('/auth/login', authController.loginUser) // Login user
	.get('/auth/check-auth', authController.checkAuth); // Check auth

// PROJECTS CONTROLLER
router
	.post('/project', verify.token, verify.isProjectManager, projectController.createProject) // Create new project
	.get('/projects', verify.token, projectController.getAllProjects) // Get all users projects
	.get('/project/:projectId', verify.token, projectController.getProject) // Get one project
	.patch('/project/:projectId', verify.token, verify.isProjectManager, projectController.updateProject) // Update project
	.delete('/project/:projectId', verify.token, verify.isProjectManager, projectController.deleteProject); // Delete project --> paranoid

// USER CONTROLLER
router
	.get('/user', verify.token, userController.getUsersData) // Get users data
	.patch('/user', verify.token, userController.updateUsersProfile); // Update users profile

// BUG CONTROLLER
router
	.post('/bug', verify.token, bugController.createBug) // Create new bug --> url/bug?project=projectId
	.get('/bugs', verify.token, bugController.getAllBugs) // Get all bugs for project --> url/bugs?project=projectId
	.get('/bug/:bugId', verify.token, bugController.getBug) // Get one bugs --> url/bugs?project=projectId
	.patch('/bug/:bugId', verify.token, bugController.updateBug) // Update bug
	.delete('/bug/:bugId', verify.token, bugController.deleteBug); // Delete bug --> paranoid

// Invite user to your project
router.post('/add-user/:projectId', verify.token, verify.isProjectManager, newUserController.addNewUserToProject);

module.exports = router;
