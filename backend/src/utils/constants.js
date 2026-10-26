const LEAD_STATUS = {
  NEW: 'new',
  RESEARCHED: 'researched',
  GENERATED: 'generated',
  CONTACTED: 'contacted',
  REPLIED: 'replied',
};

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

module.exports = {
  LEAD_STATUS,
  HTTP_STATUS,
};
