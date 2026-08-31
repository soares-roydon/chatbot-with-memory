import fs from 'fs';

export const read_file = (file: string): string => {
   return fs.readFileSync(file, 'utf-8');
};
