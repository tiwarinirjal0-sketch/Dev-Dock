import bcrypt from 'bcrypt';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { readdirSync } from 'node:fs';

export async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

export async function comparePassword(password, hashed) {
    return await bcrypt.compare(password, hashed);
}

export async function searchFile(dir, fileName) {
               const files = readdirSync(dir);

               for (const file of files) {
                  const filePath = path.join(dir, file);

                  const fileCondition = await stat(filePath);

                  if (fileCondition.isDirectory()) {

                        const result = await searchFile(filePath, fileName);

                        if (result) {
                           return result;
                        }

                  } else if (file.endsWith(fileName)) {

                        
                        return filePath;
                  }
               }

               return null;
            }