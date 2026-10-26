function buildIcpPrompt({ companyName, industry, targetMarket, valueProp }) {
  return `Analyze this company and generate an Ideal Customer Profile (ICP):
Company: ${companyName}
Industry: ${industry}
Target Market: ${targetMarket}
Value Proposition: ${valueProp}
`;
}

module.exports = { buildIcpPrompt };
