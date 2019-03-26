module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        targets: {
          browsers: '> 0.25%, not ie11, not op_mini all, not dead',
          node: 10,
        },
      },
    ],
    '@babel/preset-react',
  ],
}
