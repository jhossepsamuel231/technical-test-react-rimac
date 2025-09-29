// commitlint.config.cjs (con emoji OBLIGATORIO)
module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern:
        /^((?:[\p{Emoji_Presentation}\p{Emoji}\uFE0F]\s?)+)\s*([a-z]+)(?:\(([^)]+)\))?:\s(.+)$/u,
      headerCorrespondence: ['emoji', 'type', 'scope', 'subject'],
    },
  },
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'init',
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
    'header-max-length': [2, 'always', 150],
    'subject-case': [0],
    'scope-empty': [0],
    'header-case': [0],
  },
}
