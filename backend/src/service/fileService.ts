import path from 'path';
import * as uuid from 'uuid';

class FileService {
    public async saveFile(file: any): Promise<string> {
        try {
            const fileName = `${uuid.v4()}.jpg`;
            const filePath = path.resolve(__dirname, '../', 'fileDirectory', fileName);
            file.mv(filePath);
            return fileName;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }
}

export const fileService = new FileService();
