// @see: https://www.prettier.cn

module.exports = {
	// 一行的字符数，如果超过会进行换行，默认为 80
	printWidth: 120,
	// 一个缩进使用几个空格数
	tabWidth: 2,
	// 是否使用 tab 进行缩进，默认为 false，表示用空格进行缩减
	useTabs: false,
	// 是否在句尾使用分号
	semi: false,
	// 字符串是否强制使用单引号，默认为 false，使用双引号
	singleQuote: true,
	// 是否使用尾逗号，有三个可选值"<none|es5|all>"
	trailingComma: 'es5',
	// 对象大括号直接是否有空格，默认为 true，效果：{ foo: bar }
	bracketSpacing: true,
	// 处理换行符 lf,crlf,cr,auto
	endOfLine: 'auto',
	bracketSameLine: true,
};
