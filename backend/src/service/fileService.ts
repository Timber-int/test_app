import path from 'path';
import * as uuid from 'uuid';
import {PhotoFormat} from "../constants";

class FileService {
    public async saveFile(file: any, type: string): Promise<string> {
        try {
            let filePath;

            const fileName = `${uuid.v4()}.${type}`;

            if (type === PhotoFormat.jpg) {
                filePath = path.resolve(__dirname, '../', 'fileDirectory', 'photos', fileName);
            } else {
                filePath = path.resolve(__dirname, '../', 'fileDirectory', 'videos', fileName);
            }
            file.mv(filePath);
            return fileName;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }
}

export const fileService = new FileService();
