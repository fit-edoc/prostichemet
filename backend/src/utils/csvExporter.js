function escapeCsvField(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

function generateLeadsCsv(leads) {
  const headers = ['ID', 'Name', 'Title', 'Company', 'Email', 'Location', 'Status', 'Created At'];
  const rows = leads.map(lead => [
    lead.id,
    lead.name,
    lead.title,
    lead.company,
    lead.email,
    lead.location,
    lead.status,
    lead.createdAt,
  ]);

  const csvLines = [
    headers.map(escapeCsvField).join(','),
    ...rows.map(r => r.map(escapeCsvField).join(',')),
  ];

  return csvLines.join('\n');
}

module.exports = { generateLeadsCsv };
