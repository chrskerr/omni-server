module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
	"rules": {
		"indent": [ "error", "tab" ],
		"linebreak-style": [ "error", "unix" ],
		"quotes": [ "error", "double" ],
		"semi": [ "error", "always" ],
		"array-bracket-spacing": [ "error", "always", { "objectsInArrays": false, "arraysInArrays": false }],
		"object-curly-spacing": [ "error", "always", { "objectsInObjects": false, "arraysInObjects": false }],
		"space-in-parens": ["error", "always", { "exceptions": ["{}", "()", "[]"] }],
		"computed-property-spacing": [ "error", "always" ],
        "comma-dangle": [ "error", "always-multiline" ],
        "prefer-const": "error",
		"prefer-spread": "error",
        "func-call-spacing": [ "error", "never" ],
		"no-loop-func": "error"
	}
};