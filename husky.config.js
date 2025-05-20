/**
 * Husky configuration file
 */
export default {
  hooks: {
    'pre-commit': 'npx lint-staged --config lint-staged.config.js',
    'commit-msg': 'npx --no -- commitlint --edit ${1}',
  },
};
