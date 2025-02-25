import fs from 'fs';
import path from 'path';


export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

export function readFilesFromDirectory(dirPath: string, extensions: string[]): string[] {
  if (!fs.existsSync(dirPath)) {
    throw new Error(`Directory not found: ${dirPath}`);
  }

  const files = fs.readdirSync(dirPath);
  return files.filter(file => extensions.includes(path.extname(file).toLowerCase()));
}

export function createDirectory(dirPath: string): void {
  fs.mkdirSync(dirPath, { recursive: true });
}
export function createDirectoryIfNotExist(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}
