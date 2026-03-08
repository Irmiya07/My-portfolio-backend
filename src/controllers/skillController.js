const Skill = require('../models/Skill');
const cloudinary = require('../config/cloudinary');

exports.getSkills = async (req, res) => {
  try {
    const Skills = await Skill.find();
    res.json(Skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSkill = async (req, res) => {
  try {
    const { name, description } = req.body;
    let imgUrl = "";

    if (req.file) {
      const uploadFromBuffer = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "skills" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
      };

      const result = await uploadFromBuffer(req.file.buffer);
      imgUrl = result.secure_url;
    }

    const newSkill = new Skill({   
      name,
      description,
      imgUrl
    });

    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};