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
  
  const selfIp = getLocalIP()
  
  if(selfIp === '172.17.237.169'){
      
      global.host = `http://8.141.86.20:3000`

  }else{
      
      global.host = `http://${selfIp}:3000`;
  }


};

export default ip;  