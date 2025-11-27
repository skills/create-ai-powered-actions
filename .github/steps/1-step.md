## Step 1: Setup the action to rate your jokes!

You’re convinced every joke you tell is a comedic masterpiece 😂 Today an emotionless robot will weigh in 🤖.

In this exercise you’ll build a GitHub Action that lets AI score just how funny your jokes really are!

<img width="600" alt="two octocat share a science pun" src="https://github.com/user-attachments/assets/6ea16f47-5cf8-4448-9e4d-04283072822c" />

### ⌨️ Activity: Set up your development environment

Let's use **GitHub Codespaces** to set up a cloud-based development environment and work in it for the remainder of the exercise!

1. Right-click the below button to open the **Create Codespace** page in a new tab. Use the default configuration.

   [![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/{{full_repo_name}}?quickstart=1)

1. Confirm the **Repository** field is your copy of the exercise, not the original, then click the green **Create Codespace** button.

   - ✅ Your copy: `/{{full_repo_name}}`
   - ❌ Original: `/skills/create-ai-powered-actions`

1. Wait a moment for Visual Studio Code to load in your browser.

1. Verify that **Node.js** is available by opening a terminal and running:

   ```sh
   node --version
   npm --version
   ```

   <details>
   <summary>Having trouble? 🤷</summary><br/>

   - Make sure you selected your personal copy of the repository, not the original template.
   - If the Codespace fails to start, try refreshing the page and creating a new one.
   - Node.js and npm should be pre-installed in the development environment.

   </details>

### ⌨️ Activity: Install OpenAI SDK

Now that your Codespace is ready, let's install the OpenAI SDK, which you'll use to interact with GitHub Models.

1. Open the terminal in your Codespace.
1. Run the following command to install the OpenAI SDK:

   ```sh
   npm install openai
   ```

1. Verify the installation by checking the `package.json` file for the `openai` dependency.

### ⌨️ Activity: Create Metadata File

The action we will create today will accept a joke as input and return an AI-generated evaluation of that joke.

1. Create `action.yml` file at the repository root and define the action metadata as shown below.


   ```yml
   name: "Rate Joke Action"
   description: "Rates a joke using GitHub Models"

   inputs:
     joke:
       description: "The joke to be rated"
       required: true
     token:
       description: "Personal access token to be used for GitHub Models API call"
       default: {% raw %}${{ github.token }}{% endraw %}

   outputs:
     result:
       description: "AI-generated joke evaluation"

   runs:
     using: node24
     main: dist/index.js
   ```

1. Commit and push the changes to the `main` branch.
1. With the changes pushed to GitHub, Mona will check your work and share the next steps.
