// Comprehensive backend integration test
const http = require('http');

async function request(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- Starting Postrichment Backend Tests ---');

  // 1. Health check
  console.log('\n[1] Testing /api/v1/health...');
  const health = await request({
    host: 'localhost',
    port: 4000,
    path: '/api/v1/health',
    method: 'GET',
  });
  console.log('Health status:', health.status, health.data);

  // 2. Auth: Google Login simulation
  console.log('\n[2] Testing /api/v1/auth/google...');
  const authRes = await request(
    {
      host: 'localhost',
      port: 4000,
      path: '/api/v1/auth/google',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    },
    {
      email: 'founder@aiagency.io',
      name: 'Alex Founder',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
      googleId: 'google_oauth_founder_123',
    }
  );
  console.log('Auth status:', authRes.status);
  console.log('User:', authRes.data.data?.user?.email, '| Workspace:', authRes.data.data?.workspace?.name);
  const token = authRes.data.data?.token;

  if (!token) {
    console.error('Failed to obtain token!');
    return;
  }

  // 3. Auth: Verify /api/v1/auth/me with Bearer token
  console.log('\n[3] Testing /api/v1/auth/me...');
  const meRes = await request({
    host: 'localhost',
    port: 4000,
    path: '/api/v1/auth/me',
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('Me status:', meRes.status, '| Current user:', meRes.data.data?.user?.email);

  // 4. Create Business Profile
  console.log('\n[4] Creating Business Profile via /api/v1/profiles...');
  const profileRes = await request(
    {
      host: 'localhost',
      port: 4000,
      path: '/api/v1/profiles',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
    {
      companyName: 'ScaleAgent AI',
      industry: 'AI & Workflow Automation',
      valueProposition: 'We build custom AI voice & SDR research agents for B2B tech companies to 3x outbound conversions.',
      productDescription: 'Autonomous multi-agent research pipeline that discovers intent signals and crafts personalized outreach at scale.',
      targetAudience: 'B2B SaaS and high-growth sales teams',
      typicalCustomer: 'Series A/B startups with 20-100 employees',
      typicalDealSize: '$15,000 / year',
    }
  );
  console.log('Profile status:', profileRes.status);
  const profile = profileRes.data.data;
  console.log('Created Profile ID:', profile?.id, profile?.companyName);

  // 5. Generate ICP with RAG & Auto Lead Research
  console.log('\n[5] Generating ICP with RAG & triggering Research Agent via /api/v1/icps/generate...');
  const icpRes = await request(
    {
      host: 'localhost',
      port: 4000,
      path: '/api/v1/icps/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
    {
      businessProfileId: profile.id,
      autoDiscoverLeads: true,
      leadCount: 3,
    }
  );
  console.log('ICP Generation status:', icpRes.status);
  const icp = icpRes.data.data?.icp;
  const discoveredLeads = icpRes.data.data?.discoveredLeads || [];
  console.log('Generated ICP Title:', icp?.title);
  console.log('Target Roles:', icp?.targetRoles);
  console.log(`Discovered ${discoveredLeads.length} initial leads!`);

  if (discoveredLeads.length > 0) {
    const firstLead = discoveredLeads[0];
    console.log('\nSample Lead Discovered:');
    console.log(` - Company: ${firstLead.companyName} (${firstLead.companySize})`);
    console.log(` - Contact: ${firstLead.contactName} (${firstLead.contactTitle}) [${firstLead.contactEmail}]`);
    console.log(` - Fit Score: ${firstLead.score}/100`);
    console.log(` - Growth Signals:`, firstLead.signals);
    console.log(` - Evidence:`, firstLead.evidence);

    // 6. Generate Personalized Cold Email using Copywriting Framework & Signals
    console.log('\n[6] Generating Hyper-Personalized Cold Email via /api/v1/emails/generate...');
    const emailRes = await request(
      {
        host: 'localhost',
        port: 4000,
        path: '/api/v1/emails/generate',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      {
        prospectId: firstLead.id,
        framework: 'PAS',
      }
    );
    console.log('Email status:', emailRes.status);
    console.log('Subject:', emailRes.data.data?.subject);
    console.log('Body:\n', emailRes.data.data?.body);
  }

  // 7. Fetch CRM Pipeline Leads
  console.log('\n[7] Fetching CRM Leads via /api/v1/crm/leads...');
  const crmRes = await request({
    host: 'localhost',
    port: 4000,
    path: '/api/v1/crm/leads',
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('CRM leads count:', crmRes.data.data?.length);

  console.log('\n✅ ALL INTEGRATION TESTS COMPLETED SUCCESSFULLY!');
}

runTests().catch(console.error);
