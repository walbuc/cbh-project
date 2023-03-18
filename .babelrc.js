const isTest = String(process.env.NODE_ENV) === 'test'

module.exports = {
  presets: [
    // transform to common js
    ['@babel/preset-env', {modules: 'commonjs'}],
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-transform-runtime'],
}
