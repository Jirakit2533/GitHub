"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExists = fileExists;
exports.readFilesFromDirectory = readFilesFromDirectory;
exports.createDirectory = createDirectory;
exports.createDirectoryIfNotExist = createDirectoryIfNotExist;
var fs_1 = require("fs");
var path_1 = require("path");
function fileExists(filePath) {
    return fs_1.default.existsSync(filePath);
}
function readFilesFromDirectory(dirPath, extensions) {
    if (!fs_1.default.existsSync(dirPath)) {
        throw new Error("Directory not found: ".concat(dirPath));
    }
    var files = fs_1.default.readdirSync(dirPath);
    return files.filter(function (file) { return extensions.includes(path_1.default.extname(file).toLowerCase()); });
}
function createDirectory(dirPath) {
    fs_1.default.mkdirSync(dirPath, { recursive: true });
}
function createDirectoryIfNotExist(dirPath) {
    if (!fs_1.default.existsSync(dirPath)) {
        fs_1.default.mkdirSync(dirPath, { recursive: true });
    }
}
