// 采用COMMONJS规范定义JS模块
fis.hook('commonjs');

fis.match('/components/{*,**/*}.{js,css}', {
	isMod : true,
	useHash : true,
	domain : '${domain}',
	release : '/static/$0',
});

fis.match('/components/{*,**/*}.{eot,svg,ttf,woff,woff2,otf,json}', {
	domain : '${domain}',
	release : '/static/$0',
});

fis.match('/modules/{*,**/*}.{js,css}', {
	isMod : true,
	id : '$0',
	domain : '${domain}',
	release : '/assets/$0',
});

fis.match('**.{html,jsp}', {
	useCache : true,
	release : '/templates/$0',
});

fis.match('README.md', {
	release : false,
});

//测试环境发布
// --脚本占位符：<!--SCRIPT_PLACEHOLDER-->
// --样式占位符：<!--STYLE_PLACEHOLDER-->
fis.match('::package', {
	postpackager : fis.plugin('smart', {
		autopack: true
	})
});

fis.media('deploy').match('*', {
    deploy: fis.plugin('ftp', {
        console: true,
        cache : true,           // 是否开启上传列表缓存，开启后支持跳过未修改文件，默认：true
        remoteDir : '/temp/',   // 远程文件目录，注意！！！设置错误将导致文件被覆盖
        connect : {
            host : '127.0.0.1',
            port : '21',
            user : 'name',
            password : '****'
        }
    })
});

fis.media('debug').match('*.{js,css}', {
	useHash : false,
	useSprite : false,
	optimizer : null
});

fis.set('domain', 'http://test.agrivo.com');

