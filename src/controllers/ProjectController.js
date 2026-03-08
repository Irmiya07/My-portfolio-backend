const Project = require('../models/Project');
const cloudinary = require('../config/cloudinary');

exports.createProject = async (req, res) => {
  try {
    const { title, description, githubLink, liveLink } = req.body;

    let imageUrl = "";

    if (req.file) {
      const uploadFromBuffer = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "projects" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
      };

      const result = await uploadFromBuffer(req.file.buffer);
      imageUrl = result.secure_url;
    }

    const newProject = new Project({
      title,
      description,
      githubLink,
      liveLink,
      imageUrl
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);

  } catch (error) {
    console.error(error); // VERY IMPORTANT
    res.status(500).json({ message: "Error creating project" });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

exports.deleteProjects = async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
};