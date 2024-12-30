import { join } from "path";
import * as fs from 'fs-extra';

const deleteStatic = async (url: string) => {
  const fileName = url.split('/').pop();

  const filePath = url.replace(global.host, '');

  const dir = join(process.cwd(), 'static');

  const target = join(dir, filePath);

  try {
    await fs.remove(target); // 删除文件
    return `File ${fileName} deleted successfully`;
  } catch (err) {
    throw new Error(`Error deleting file: ${err.message}`);
  }
};

export default deleteStatic