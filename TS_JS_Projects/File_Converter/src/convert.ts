import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileExists, readFilesFromDirectory, createDirectoryIfNotExist } from './utilities';

// กำหนดที่อยู่ของโฟลเดอร์ input และ output
const inputDirectory = 'C:/Users/jirak/Documents/GitHub/GitHub/TS_JS_Projects/File_Converter/src/input';
const outputDirectory = 'C:/Users/jirak/Documents/GitHub/GitHub/TS_JS_Projects/File_Converter/src/output';

// ประเภทไฟล์ที่รองรับ
const supportedExtensions = ['.jpeg', '.jpg', '.png', '.pdf', '.webp', '.bmp'];

// ประเภทไฟล์ที่ต้องการแปลงเป็น
const targetFormat: 'jpeg' | 'jpg' | 'png' | 'pdf' | 'webp' | 'bmp' = 'png';

// ฟังก์ชันสำหรับแปลงไฟล์
async function convertImage(inputPath: string, outputPath: string, format: 'jpeg' | 'jpg' | 'png' | 'pdf' | 'webp' | 'bmp') {
  try {
    await sharp(inputPath).toFormat(format).toFile(outputPath);
    console.log(`✅ แปลงไฟล์สำเร็จ: ${outputPath}`);
  } catch (error) {
    console.error(`❌ เกิดข้อผิดพลาดในการแปลงไฟล์: ${inputPath}`, error);
  }
}

// ฟังก์ชันสำหรับแปลงไฟล์ทั้งหมดในโฟลเดอร์ input
async function convertAllImages() {
  try {
    // ตรวจสอบว่าโฟลเดอร์ input และ output มีอยู่หรือไม่
    if (!fileExists(inputDirectory)) {
      throw new Error(`โฟลเดอร์ต้นฉบับไม่พบ: ${inputDirectory}`);
    }

    createDirectoryIfNotExist(outputDirectory); // สร้างโฟลเดอร์ output หากยังไม่มี

    // อ่านไฟล์จากโฟลเดอร์ input และกรองตามประเภทที่รองรับ
    const files = readFilesFromDirectory(inputDirectory, supportedExtensions);
    console.log(`ไฟล์ที่พบในโฟลเดอร์ input:`, files);

    for (const file of files) {
      const inputPath = path.join(inputDirectory, file);
      const outputPath = path.join(outputDirectory, path.parse(file).name + '.' + targetFormat);
      await convertImage(inputPath, outputPath, targetFormat);
    }

    console.log('✅ แปลงไฟล์ทั้งหมดเสร็จสิ้น');
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error);
  }
}

// เรียกใช้งานฟังก์ชัน convertAllImages
convertAllImages();
