function personalizeTemplate(template, vars = {}) {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    const pattern = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'gi');
    result = result.replace(pattern, value || '');
  }
  return result;
}

module.exports = { personalizeTemplate };
