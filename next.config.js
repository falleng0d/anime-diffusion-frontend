// @ts-check
const { withBlitz } = require("@blitzjs/next")

const path = require("path")

/**
 * @type {import('@blitzjs/next').BlitzConfig}
 **/
const config = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
}

module.exports = withBlitz(config)
