'use strict';

module.exports = appInfo => {
  const config = exports = {}
  // console.log(appInfo);
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "2468260248"
  config.security = {
    csrf: false,
  }
  // add your config here
  config.middleware = []

  // config.view = {
  //   mapping: {
  //     ".nj": "nunjucks",
  //   },
  // }

  config.jwt = {
    secret: "2468260248",
    enable: false,
  }

  config.sequelize = {
    dialect: "mysql",
    host: "localhost",
    // host: "119.45.133.126",
    // 端口号
    port: "3306",
    // 用户名
    // username: "egg_music",
    username: "root",
    // 密码
    password: "123456",
    // 数据库名
    database: "egg_music"
  };

  config.multipart = {
    // will append to whilelist
    fileExtensions: [
      '.lrc'
    ],
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ["*"],
    // domainWhiteList: ["http://49.235.188.111"],
  }
  config.cors = {
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
  }

  // console.log(config, 'modelmodel')
  return config
}

