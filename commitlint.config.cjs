/** commitlint.config.cjs
 * Exige: <emoji> <type>(<scope>): <subject>
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],

  parserPreset: {
    parserOpts: {
      headerPattern:
        /^((?:[\p{Emoji_Presentation}\p{Emoji}\uFE0F]\s?)*)\s*([a-z]+)(?:\(([^)]+)\))?:\s(.+)$/u,
      headerCorrespondence: ['emoji', 'type', 'scope', 'subject'],
    },
  },

  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'chore',
        'docs',
        'refactor',
        'test',
        'perf',
        'ci',
        'build',
        'revert',
        'style',
      ],
    ],
    'header-max-length': [2, 'always', 100],
    'subject-case': [0],
    'scope-empty': [0],
    'header-case': [0],
  },
}
