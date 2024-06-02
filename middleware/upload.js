import {v2 as cloudinary} from 'cloudinary';
import exp from 'constants';

cloudinary.config({ 
  cloud_name: 'den0yuoe6', 
  api_key: '397545497667879', 
  api_secret: '1csBksDBE-8LbITNqkrcBvCVOLY' 
});

// Image uploader to cloudbinary
async function uploader(imageData) {
    try {
        const uploadResult = await cloudinary.uploader.upload(imageData, { folder: 'products' ,width:300
        });
        return uploadResult; 
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports= uploader