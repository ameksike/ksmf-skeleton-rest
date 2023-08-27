/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/03/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * @description Server application, for more information see: https://github.com/ameksike/ksmf/wiki  
 * */
try {
    const KsMf = require('ksmf');
    const path = require('path');
    const dir = path.resolve(__dirname + "/../");
    const app = (new KsMf.app.WEB(dir)).initConfig();
    const opt = app.cfg.srv.db;
    opt.directory = path.join(dir, "db/models");
    KsMf.dao.Sequelize.process(opt, app.helper?.get("logger"));
}
catch (error) {
    console.log({
        level: 1,
        src: "bin.db",
        error
    });
}