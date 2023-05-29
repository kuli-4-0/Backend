const db = require('../models');
const path = require('path');
const fs = require('fs');

module.exports = {
  createAuditionRegistration: async (req, res) => {
    const { description, status } = req.body;
    const { auditionEventId } = req.params;
    const userId = req.user.id;

    try {
      let photo = null;
      if (req.file) {
        // Handle the uploaded photo file
        const photoFile = req.file;
        const allowedFormats = ['.jpg', '.jpeg', '.png'];
        const fileExt = path.extname(photoFile.originalname).toLowerCase();
        if (!allowedFormats.includes(fileExt)) {
          return res.status(400).json({ error: 'Invalid photo file format' });
        }
        const timestamp = Date.now();
        const uniqueId = Math.round(Math.random() * 1e9);
        const destinationDir = path.join(
          __dirname,
          '../public/photos_audition'
        );
        const newFileName = `photo-${timestamp}-${uniqueId}${fileExt}`;
        const newPath = path.join(destinationDir, newFileName);

        if (!fs.existsSync(destinationDir)) {
          fs.mkdirSync(destinationDir, { recursive: true });
        }

        fs.renameSync(photoFile.path, newPath);

        photo = newFileName;
      }

      const auditionRegistration = await db.AuditionRegistration.create({
        userId,
        auditionEventId,
        description,
        photo,
        status,
      });

      res.status(201).json({ data: auditionRegistration });
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create AuditionRegistration');
    }
  },
  getAuditionRegistrationById: async (id) => {
    try {
      const auditionRegistration = await db.AuditionRegistration.findByPk(id);
      return auditionRegistration;
    } catch (error) {
      throw new Error('Failed to get AuditionRegistration');
    }
  },
  updateAuditionRegistration: async (id, data) => {
    try {
      const auditionRegistration = await db.AuditionRegistration.findByPk(id);
      if (!auditionRegistration) {
        throw new Error('AuditionRegistration not found');
      }

      await auditionRegistration.update(data);
      return auditionRegistration;
    } catch (error) {
      throw new Error('Failed to update AuditionRegistration');
    }
  },
  deleteAuditionRegistration: async (id) => {
    try {
      const auditionRegistration = await db.AuditionRegistration.findByPk(id);
      if (!auditionRegistration) {
        throw new Error('AuditionRegistration not found');
      }

      await auditionRegistration.destroy();
      return 'AuditionRegistration deleted successfully';
    } catch (error) {
      throw new Error('Failed to delete AuditionRegistration');
    }
  },
};
