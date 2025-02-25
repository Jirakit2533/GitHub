{
  "compilerOptions": {
    "target": "ES6",            // เลือกให้คอมไพล์เป็น ES6
    "module": "commonjs",       // ใช้ CommonJS เป็น module system
    "outDir": "./dist",         // ระบุให้ไฟล์ JS ที่คอมไพล์แล้วไปอยู่ในโฟลเดอร์ dist
    "rootDir": "./src",         // ระบุให้ TypeScript หาผลลัพธ์จากโฟลเดอร์ src
    "esModuleInterop": true,    // เปิดใช้งานการนำเข้า (import) โมดูลจาก ES6
    "strict": true,             // เปิดใช้งานการตรวจสอบข้อผิดพลาดอย่างเข้มงวด
    "skipLibCheck": true,       // ข้ามการตรวจสอบประเภทของไลบรารี
    "forceConsistentCasingInFileNames": true // ตรวจสอบการใช้ชื่อไฟล์ให้ตรงกัน
  },
  "include": [
    "src/**/*.ts"               // รวมไฟล์ .ts จากโฟลเดอร์ src ทั้งหมด
  ],
  "exclude": [
    "node_modules"              // ไม่รวมโฟลเดอร์ node_modules
  ]
}
