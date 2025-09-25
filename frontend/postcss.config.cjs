// postcss.config.cjs
module.exports = {
    plugins: {
      // new adapter package required by Tailwind v4+ for PostCSS usage
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    }
  };
  