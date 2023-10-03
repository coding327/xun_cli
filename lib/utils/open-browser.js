const openBrowser = async (...args) => {
  const module = await import('open')
  module.default(...args)
}

module.exports = {
  openBrowser
}