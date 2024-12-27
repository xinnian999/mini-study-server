import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// 传入需要检查和创建的目录数组
const directories = ['userAvatar'];

// 假设 static 目录在服务器根目录下
const staticDir = join(process.cwd(), 'static'); 

// 检查并创建目录的函数
function staticDirInit() {
  try {
    // 检查 static 目录是否存在，如果不存在就创建它
    if (!existsSync(staticDir)) {
      console.log(`Static directory does not exist. Creating...`);
      mkdirSync(staticDir, { recursive: true }); // 创建 static 目录及其父目录（如果不存在）
      console.log(`Static directory created successfully.`);
    } else {
      console.log(`Static directory already exists.`);
    }

    // 接着检查并创建 a, b, c 子目录
    directories.forEach((dir) => {
      const dirPath = join(staticDir, dir);

      // 检查子目录是否存在
      if (!existsSync(dirPath)) {
        console.log(`Directory ${dir} does not exist. Creating...`);

        // 创建子目录
        mkdirSync(dirPath, { recursive: true });
        console.log(`Directory ${dir} created successfully.`);
      } else {
        console.log(`Directory ${dir} already exists.`);
      }
    });
  } catch (error) {
    console.error(`Error during directory creation: ${error.message}`);
  }
}

export default staticDirInit;
