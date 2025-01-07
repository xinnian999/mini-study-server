import { join } from 'path';
import * as fs from 'fs-extra';

const copyStatic = async (url: string, target: string) => {
  const fileName = url.split('/').pop();

  const filePath = url.replace(global.host, '');

  const dir = join(process.cwd(), 'static');

  const staticUrl = join(dir, filePath);

  const targetPath = `${target}/${Date.now()}-${fileName}`

  const targetUrl = join(dir, targetPath);

  try {
    await fs.copyFile(staticUrl, targetUrl); // 复制文件
  } catch (err) {
    throw new Error(`Error copying file: ${err.message}`);
  }

  return `${global.host}/${targetPath}`;
};

export default copyStatic;
