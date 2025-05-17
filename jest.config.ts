export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json"
    }
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

};
