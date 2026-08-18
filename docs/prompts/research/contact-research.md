# Contact Research Prompt

**Purpose**: Determine if a specific contact is relevant to the user's ICP based on their title and role.

**Variables**:
- {{contact_title}}, {{contact_bio}}, {{icp_buyer_personas}}

**Expected Output**:
- is_match: boolean
- elevance_score: integer (0-10)
- eason: string
