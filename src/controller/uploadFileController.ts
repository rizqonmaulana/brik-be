import { Request, Response } from "express";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import config from "../config/firebase"
import { giveCurrentDateTime } from "../helper/currentDateTime"

import { successResponse, errorResponse } from '../helper/response';

//Initialize a firebase application
initializeApp(config.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

const UploadFileController = {
    async uploadFile(req: Request, res: Response) {
        try {
            if (!req.file || !req.file.buffer) {
                throw new Error('No file uploaded or buffer is missing.');
            }

            const dateTime = giveCurrentDateTime()

            const storageRef = ref(storage, `files/${req?.file?.originalname + " " + dateTime}`);

            const metadata = {
                contentType: req?.file?.mimetype,
            };
    
            // Upload the file in the bucket storage
            const snapshot = await uploadBytesResumable(storageRef, req?.file?.buffer, metadata);
            //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
    
            // Grab the public url
            const downloadURL = await getDownloadURL(snapshot.ref);

            const file = {
                name: req?.file?.originalname,
                type: req?.file?.mimetype,
                downloadURL: downloadURL
            }

            res.json(successResponse('File uploaded successfully', file))
        } catch (error: any) {
            console.log('error => ', error)
            res.status(500).json(errorResponse('An error occurred while uploading file', error.message));
        }
    }
}

export default UploadFileController