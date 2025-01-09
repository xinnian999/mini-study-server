import { join } from 'path';
import * as fs from 'fs-extra';

const deleteStatic = async (suffix: string) => {
  const filePath = join(process.cwd(), 'static', suffix);

  try {
    await fs.remove(filePath); // 删除文件
  } catch (err) {
    throw new Error(`Error deleting file: ${err.message}`);
  }
};

export default deleteStatic;
