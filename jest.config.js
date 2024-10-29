// jest.config.mjs
export default {
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
};

