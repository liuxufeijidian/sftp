// 采用COMMONJS规范定义JS模块
fis.hook('commonjs');

fis.match('/components/{*,**/*}.{js,css}', {
	isMod : true,
	useHash : true,
	release : '/assets/$0',
});

fis.match('/components/{*,**/*}.{eot,svg,ttf,woff,woff2,otf,json}', {
	release : '/assets/$0',
});

fis.match('/modules/{*,**/*}.{js,css,png,jpg}', {
	isMod : true,
	useHash: true,
	id : '$0',
	release : '/assets/$0',
});

fis.match('**.{html,jsp}', {
	useCache : true,
	release : '$0',
});

fis.match('README.md', {
	release : false,
});

fis.match("**.{js,css,png,jpg}", {
	domain: '${domain}'
});

fis.match('::package', {
	// npm install [-g] fis3-postpackager-loader
	// 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
	postpackager : fis.plugin('loader', {
		resourceType : 'commonJs',
		useInlineMap : true // 资源映射表内嵌
	})
});

fis.media('debug').match('*.{js,css}', {
	useHash : false,
	useSprite : false,
	optimizer : null
});

fis.set('domain', 'http://192.168.31.248:8080');

