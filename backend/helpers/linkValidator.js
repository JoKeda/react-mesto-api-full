const linkValidator = (v) => {
  const linkRegex = /^https?:\/\/(www\.)?\S+\.[a-z]\/?\??\S+/i;
  return linkRegex.test(v);
};

module.exports = linkValidator;
