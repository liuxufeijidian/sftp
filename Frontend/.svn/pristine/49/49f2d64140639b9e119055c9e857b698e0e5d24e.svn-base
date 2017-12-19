// 采用COMMONJS规范定义JS模块
fis.hook('commonjs');

fis.match('/components/{*,**/*}.{js,css}', {
	isMod : true,
	useHash : true,
	release : '/static/$0',
});

fis.match('/components/{*,**/*}.{eot,svg,ttf,woff,woff2,otf,json}', {
	domain : '${domain}',
	release : '/static/$0',
});

fis.match('/modules/{*,**/*}.{js,css,png,jpg}', {
	isMod : true,
	id : '$0',
	useHash : true,
	release : '/assets/$0',
});

fis.match('**.{html,jsp}', {
	useCache : true,
	release : '/templates/$0',
});

//线上发布将CSS中所用图片合并
fis.match("**.css", {
	useSprite: true
});

//线上发布将JS混淆发布
fis.match("**.js", {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});
fis.match('*.png', {
  // fis-optimizer-png-compressor 插件进行压缩，已内置
  optimizer: fis.plugin('png-compressor')
});

fis.match("**.{js,css,png,jpg,gif}", {
	domain: '${domain}'
});

fis.match('README.md', {
	release : false,
});

//线上发布
// --脚本占位符：<!--SCRIPT_PLACEHOLDER-->
// --样式占位符：<!--STYLE_PLACEHOLDER-->
fis.match('::package', {
	// npm install [-g] fis3-postpackager-loader
	// 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
	spriter: fis.plugin('csssprites'),
	postpackager : fis.plugin('loader', {
		resourceType : 'commonJs',
		useInlineMap : true // 资源映射表内嵌
	})
});

fis.media('deploy').match('*', {
	deploy : fis.plugin('ftp', {
		console : true,
		cache : true, // 是否开启上传列表缓存，开启后支持跳过未修改文件，默认：true
		remoteDir : '/weixin/', // 远程文件目录，注意！！！设置错误将导致文件被覆盖
		connect : {
			host : '139.129.16.229',
			port : '21',
			user : 'ftp',
			password : 'ftp@0518'
		}
	})
});

// fis.media('deploy').match('*', {
    // deploy: fis.plugin('ftp', {
        // console: true,
        // cache : true,           // 是否开启上传列表缓存，开启后支持跳过未修改文件，默认：true
        // remoteDir : '/heihuang',   // 远程文件目录，注意！！！设置错误将导致文件被覆盖
        // connect : {
            // host : '120.76.122.170',
            // port : '21',
            // user : 'ftpuser',
            // password : 'QRbtbg20131~!@#'
        // }
    // })
// });

fis.media('debug').match('*.{js,css}', {
	useHash : false,
	useSprite : false,
	optimizer : null
});

fis.set('domain', 'http://test.chejiache.net:8080/weixin/');
