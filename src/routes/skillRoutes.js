const {createSkill, getSkills,  deleteSkill} = require('../controllers/skillController');
const auth=require('../middleware/authMiddleware');
const router = require('express').Router();
const upload = require("../middleware/upload");

router.get('/', getSkills);
router.post('/', auth ,upload.single("image"), createSkill);
router.delete('/:id', auth, deleteSkill);

module.exports = router;
