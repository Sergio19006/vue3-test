module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  moduleFileExtensions: ["js", "ts", "json", "vue"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testURL: "http://localhost/",
};
