module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["<rootDir>/tests"],
	collectCoverageFrom: ["src/**/*.ts", "!src/app.ts", "!src/config/**"],
	coverageThreshold: { global: { lines: 50 } },
};
