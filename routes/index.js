const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const FilesController = require('../controllers/FilesController');

// Existing routes
router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
});

router.get('/connect', (req, res) => {
    AuthController.getConnect(req, res);
});

router.get('/disconnect', (req, res) => {
    AuthController.getDisconnect(req, res);
});

router.get('/users/me', (req, res) => {
    UserController.getMe(req, res);
});

router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
});

router.post('/users', (req, res) => {
    UserController.postNew(req, res);
});

router.post('/users', (req, res) => {
    AppController.postNew(req, res);
});

router.post('/files', (req, res) => {
    FilesController.postUpload(req, res);
});

router.get('/files/:id', (req, res) => {
    FilesController.getShow(req, res);
});

router.get('/files', (req, res) => {
    FilesController.getIndex(req, res);
});

router.put('/files/:id/publish', (req, res) => {
    FilesController.putPublish(req, res);
});

router.put('/files/:id/unpublish', (req, res) => {
    FilesController.putUnpublish(req, res);
});

router.get('/files/:id/data', (req, res) => {
    FilesController.getFile(req, res);
});

module.exports = router;
