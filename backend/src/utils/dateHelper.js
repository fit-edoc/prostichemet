function formatIsoDate(date = new Date()) {
  return date.toISOString();
}

function daysBetween(d1, d2) {
  const diff = Math.abs(new Date(d1).getTime() - new Date(d2).getTime());
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

module.exports = {
  formatIsoDate,
  daysBetween,
};
