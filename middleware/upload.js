import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
 
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
 
  const blob = await put(filename, request.body, {
    access: 'public',
  });
 
  return NextResponse.json(blob);
}
// const multer = require('multer');

// const Storage = multer.diskStorage({
//     destination: 'uploads',
//     filename:(req,file,cb) =>{
//         cb(null,file.originalname);
//     },
// });

// const upload = multer({
//     storage:Storage
// }).single('testImage')

module.exports = upload;
