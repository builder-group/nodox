const OFF = 0;
const WARNING = 1;
const ERROR = 2;

/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
	root: true,
	extends: [require.resolve('@blgc/config/eslint/react-internal')],
	rules: {
		'import/no-default-export': OFF
	}
};
