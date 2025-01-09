import { join } from 'path';
import * as fs from 'fs-extra';

const copyStatic = async (suffix: string, target: string) => {
  const fileName = suffix.split('/').pop();

  const sourcePath = join(process.cwd(), 'static', suffix);

  const newSuffix = `${target}/${Date.now()}-${fileName}`;

  const targetPath = join(process.cwd(), 'static', newSuffix);

  try {
    await fs.copyFile(sourcePath, targetPath); // 复制文件
  } catch (err) {
    throw new Error(`Error copying file: ${err.message}`);
  }

  return newSuffix;
};

export default copyStatic;
