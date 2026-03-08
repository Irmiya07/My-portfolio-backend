const express = require('express');
const router = express.Router();
const { createProject, getProjects, deleteProjects } = require('../controllers/ProjectController');
const auth = require('../middleware/authMiddleware');
const upload = require("../middleware/upload");

router.get('/', getProjects);
router.post('/', auth, upload.single("image"), createProject);
router.delete('/:id', auth, deleteProjects);

module.exports = router;