const Certificate=require('../models/Certificate');
const cloudinary = require('../config/cloudinary');


exports.createCertificate = async (req, res) => {
  try {
    const { title, description } = req.body;

    let imgUrl = "";

    if (req.file) {
      const uploadFromBuffer = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "certificates" },
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

    const newCertificate = new Certificate({
      title,
      description,
      imgUrl
    });

    const savedCertificate = await newCertificate.save();
    res.status(201).json(savedCertificate);

  } catch (error) {
    console.error(error);  // VERY IMPORTANT
    res.status(500).json({ message: "Error creating certificate" });
  }
};

exports.getCertificates= async(req,res)=>{
  try{
    const certificates=await Certificate.find();
    res.status(200).json(certificates);
  }catch(error){
    res.status(500).json({message:'Error fetching certificates',error});
  }
};

exports.deleteCertificate= async(req,res)=>{
  try{
    const {id}=req.params;
    await Certificate.findByIdAndDelete(id);
    res.status(200).json({message:'Certificate deleted successfully'});
  }catch(error){
    res.status(500).json({message:'Error deleting certificate',error});
  }
};