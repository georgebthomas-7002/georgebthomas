/**
 * HubSpot Phase 2 Setup Script
 *
 * This script creates:
 * 1. Contact lists for segmentation
 * 2. Workflows for form submission automation
 *
 * Run with: npx tsx scripts/hubspot-phase2-setup.ts
 */

const HUBSPOT_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;

if (!HUBSPOT_TOKEN) {
  console.error('Error: HUBSPOT_PRIVATE_APP_TOKEN environment variable is required');
  process.exit(1);
}

// Form IDs from Phase 1
const FORM_IDS = {
  contact: '89a45e40-c255-4d52-9a07-72b75cc18505',
  speaking: '9d652842-ecf5-49fa-b843-7178d6a38a46',
  coaching: 'e6a87411-2fac-4a91-9f2d-8b911656b0d1',
};

// Pipeline IDs
const PIPELINE_IDS = {
  speaking: '853766152',
  coaching: '853766153',
};

// Helper function for API calls
async function hubspotAPI(endpoint: string, method: string = 'GET', body?: object) {
  const response = await fetch(`https://api.hubapi.com${endpoint}`, {
    method,
    headers: {
      'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`HubSpot API error: ${response.status} - ${JSON.stringify(data)}`);
  }

  return data;
}

// ============================================================================
// SECTION 1: Contact Lists
// ============================================================================

// Helper to create filter branch with correct OR > AND structure
function createFilterBranch(values: string[]) {
  return {
    filterBranchType: 'OR',
    filterBranches: [
      {
        filterBranchType: 'AND',
        filterBranches: [],
        filters: [
          {
            filterType: 'PROPERTY',
            property: 'inquiry_type',
            operation: {
              operationType: 'ENUMERATION',
              operator: 'IS_ANY_OF',
              values: values,
            },
          },
        ],
      },
    ],
    filters: [],
  };
}

interface ListDefinition {
  name: string;
  processingType: 'DYNAMIC' | 'MANUAL' | 'SNAPSHOT';
  objectTypeId: string;
  filterBranch?: object;
}

const contactLists: ListDefinition[] = [
  {
    name: 'GBT - Speaking Inquiries',
    processingType: 'DYNAMIC',
    objectTypeId: '0-1',
    filterBranch: createFilterBranch(['speaking_inquiry']),
  },
  {
    name: 'GBT - Coaching Applications',
    processingType: 'DYNAMIC',
    objectTypeId: '0-1',
    filterBranch: createFilterBranch(['coaching_application']),
  },
  {
    name: 'GBT - General Contact Submissions',
    processingType: 'DYNAMIC',
    objectTypeId: '0-1',
    filterBranch: createFilterBranch(['general_inquiry']),
  },
  {
    name: 'GBT - All Website Leads',
    processingType: 'DYNAMIC',
    objectTypeId: '0-1',
    filterBranch: createFilterBranch(['speaking_inquiry', 'coaching_application', 'general_inquiry']),
  },
];

async function createContactLists() {
  console.log('\n📋 Creating Contact Lists...\n');

  // First, get existing lists to avoid duplicates
  const existingLists = await hubspotAPI('/crm/v3/lists');
  const existingNames = new Set(existingLists.lists?.map((l: any) => l.name) || []);

  for (const list of contactLists) {
    if (existingNames.has(list.name)) {
      console.log(`  ⏭️  List "${list.name}" already exists, skipping`);
      continue;
    }

    try {
      const result = await hubspotAPI('/crm/v3/lists', 'POST', list);
      console.log(`  ✅ Created list: ${list.name} (ID: ${result.list.listId})`);
    } catch (error: any) {
      console.log(`  ❌ Failed to create list "${list.name}": ${error.message}`);
    }
  }
}

// ============================================================================
// SECTION 2: Workflows (using v3 Legacy API)
// ============================================================================

interface WorkflowDefinition {
  name: string;
  type: string;
  onlyEnrollsManually: boolean;
  enabled: boolean;
  segmentCriteria: object[][];
  actions: object[];
}

const workflows: WorkflowDefinition[] = [
  {
    name: 'GBT - Speaking Inquiry Automation',
    type: 'DRIP_DELAY',
    onlyEnrollsManually: false,
    enabled: false,
    segmentCriteria: [
      [
        {
          operator: 'SET_ANY',
          value: 'speaking_inquiry',
          property: 'inquiry_type',
          type: 'enumeration',
        },
      ],
    ],
    actions: [
      {
        type: 'SET_CONTACT_PROPERTY',
        propertyName: 'hs_lead_status',
        newValue: 'NEW',
      },
    ],
  },
  {
    name: 'GBT - Coaching Application Automation',
    type: 'DRIP_DELAY',
    onlyEnrollsManually: false,
    enabled: false,
    segmentCriteria: [
      [
        {
          operator: 'SET_ANY',
          value: 'coaching_application',
          property: 'inquiry_type',
          type: 'enumeration',
        },
      ],
    ],
    actions: [
      {
        type: 'SET_CONTACT_PROPERTY',
        propertyName: 'hs_lead_status',
        newValue: 'NEW',
      },
    ],
  },
  {
    name: 'GBT - Contact Form Automation',
    type: 'DRIP_DELAY',
    onlyEnrollsManually: false,
    enabled: false,
    segmentCriteria: [
      [
        {
          operator: 'SET_ANY',
          value: 'general_inquiry',
          property: 'inquiry_type',
          type: 'enumeration',
        },
      ],
    ],
    actions: [
      {
        type: 'SET_CONTACT_PROPERTY',
        propertyName: 'hs_lead_status',
        newValue: 'NEW',
      },
    ],
  },
];

async function createWorkflows() {
  console.log('\n⚡ Creating Workflows...\n');

  // Get existing workflows
  const existingWorkflows = await hubspotAPI('/automation/v3/workflows');
  const existingNames = new Set(existingWorkflows.workflows?.map((w: any) => w.name) || []);

  for (const workflow of workflows) {
    if (existingNames.has(workflow.name)) {
      console.log(`  ⏭️  Workflow "${workflow.name}" already exists, skipping`);
      continue;
    }

    try {
      const result = await hubspotAPI('/automation/v3/workflows', 'POST', workflow);
      console.log(`  ✅ Created workflow: ${workflow.name} (ID: ${result.id})`);
      console.log(`     ⚠️  Note: Enable manually in HubSpot UI`);
    } catch (error: any) {
      console.log(`  ❌ Failed to create workflow "${workflow.name}": ${error.message}`);
    }
  }
}

// ============================================================================
// SECTION 3: Instructions
// ============================================================================

function displayInstructions() {
  console.log('\n📝 Manual Steps Required:\n');
  console.log('  1. Go to HubSpot > Automation > Workflows');
  console.log('  2. Find the "GBT -" workflows and enable them');
  console.log('  3. Optionally add more actions to each workflow:');
  console.log('     - Create deal in appropriate pipeline');
  console.log('     - Send internal notification email');
  console.log('     - Add to static list');
  console.log('');
  console.log('  Contact Lists Created:');
  console.log('     - GBT - Speaking Inquiries');
  console.log('     - GBT - Coaching Applications');
  console.log('     - GBT - General Contact Submissions');
  console.log('     - GBT - All Website Leads');
  console.log('');
  console.log('  Workflows Created (need to be enabled):');
  console.log('     - GBT - Speaking Inquiry Automation');
  console.log('     - GBT - Coaching Application Automation');
  console.log('     - GBT - Contact Form Automation');
  console.log('');
}

// ============================================================================
// Main Execution
// ============================================================================

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  HubSpot Phase 2 Setup - Automation & Segmentation');
  console.log('═══════════════════════════════════════════════════════════════');

  try {
    await createContactLists();
    await createWorkflows();
    displayInstructions();

    console.log('═══════════════════════════════════════════════════════════════');
    console.log('  Phase 2 Setup Complete!');
    console.log('═══════════════════════════════════════════════════════════════\n');
  } catch (error) {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  }
}

main();
