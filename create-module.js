const { exec } = require('child_process');

// 获取传入的模块名
const moduleName = process.argv[2];

if (!moduleName) {
  console.error('Please provide a module name as an argument.');
  process.exit(1);
}

// 创建模块、控制器、服务和实体
const commands = [
  `nest g mo ${moduleName}`,  // 创建模块
  `nest g co ${moduleName}`,  // 创建控制器
  `nest g s ${moduleName}`,   // 创建服务
];

// 执行每个命令
commands.forEach((command) => {
  console.log(`Running command: ${command}`);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command "${command}": ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});
