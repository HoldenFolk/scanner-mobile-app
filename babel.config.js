module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
	  '@babel/plugin-proposal-export-namespace-from',
	  [
		"module-resolver",
		{
		  extensions: [
			'.js',
			'.jsx',
			'.ts',
			'.tsx',
			'.android.js',
			'.android.tsx',
			'.ios.js',
			'.ios.tsx'
		  ],
		  root: ['./src'],
		  alias: {
		    '@': './src',
		  },
		}
	  ],
	  ['@babel/plugin-transform-private-methods', { loose: true }],
	  "module:react-native-dotenv",
	  'react-native-reanimated/plugin',
	],
  };