## Step 4: Add Structured Outputs

While your action provides good feedback, you want to make the data more structured and useful for potential integrations. You'll enhance the action to return JSON data with specific fields for ratings, humor types, and detailed feedback.

### 📖 Theory: Structured Outputs with AI Models

**Structured Outputs** with AI models provide consistent, parseable data:

- JSON Schema can define exact response format requirements
- Response format parameters enforce structured data from AI models
- Type validation ensures data integrity and prevents parsing errors

**JSON Schema Definition** for joke rating should include:

- `is_joke` (boolean): Whether input is actually a joke
- `score` (number|null): Rating from 1-10, null if not a joke
- `humor_type` (string|null): Category of humor (pun, wordplay, observational, etc.)
- `feedback` (string|null): Detailed feedback on joke quality

For more information, see:

- [OpenAI API - Structured outputs](https://platform.openai.com/docs/guides/structured-outputs)
- [JSON Schema documentation](https://json-schema.org/understanding-json-schema/)

### ⌨️ Activity: Implement Structured Response Format

1. Define JSON schema for joke rating response structure
1. Update AI prompt and response format configuration
1. Add response parsing and validation logic
1. Update action outputs to include structured data fields

### ⌨️ Activity: Test Structured Outputs Locally

1. Test structured output with various joke types and formats
1. Verify JSON parsing works correctly for all response scenarios
1. Test error handling when AI returns malformed JSON
1. Validate all defined fields are populated correctly

### ⌨️ Activity: Update Workflow with Conditional Logic

1. Modify workflow to use structured output data for decision making
1. Add conditional steps based on `is_joke` boolean value
1. Create different response templates for jokes vs non-jokes
1. Add formatted output display using structured data fields

<details>
<summary>Having trouble? 🤷</summary><br/>

- JSON Schema validation helps catch formatting errors early in development
- Always have a fallback for when structured output fails - provide a simple text response
- Test your conditional workflow logic with both joke and non-joke inputs
- Use `JSON.parse()` with try-catch blocks to handle malformed JSON gracefully

</details>
