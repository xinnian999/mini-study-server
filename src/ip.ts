import { networkInterfaces } from 'os';

const ip = () => {
  const getLocalIP = () => {
    const interfaces = networkInterfaces();
    for (const key in interfaces) {
      const iface = interfaces[key];
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (
          alias.family === 'IPv4' &&
          alias.address !== '127.0.0.1' &&
          !alias.internal
        ) {
          return alias.address;
        }
      }
    }
    return null;
  };

  global.host = `http://${getLocalIP()}:3000`;
};

export default ip;  