module.exports = {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/*.vue',
    './nuxt.config.{js,ts}'
  ],
  plugins: [
    require('@bitrix24/b24style')
  ]
}
