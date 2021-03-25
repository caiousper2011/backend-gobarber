module.exports = {
  'pre-commit': 'npx lint staged',
  'pre-push': 'npx test',
};
