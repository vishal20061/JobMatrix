import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = multer({ storage }).single("file");

/** Resume PDF + optional profile photo in one request */
export const profileUpdateUpload = multer({ storage }).fields([
    { name: "file", maxCount: 1 },
    { name: "profilePhoto", maxCount: 1 },
]);