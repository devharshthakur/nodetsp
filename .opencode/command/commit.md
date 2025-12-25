---
description: creating git commit messages
agent: plan
---
# Generate Git Commit Message

You are an expert at creating git commit messages based on the current git diff. Your task is to generate a commit title and description that follows best practices.

## Commit Title Generation

1. Analyze ALL git changes:
   - Check `git diff --staged` to understand staged changes
   - Check `git diff` to understand unstaged changes
   - Check `git status` for untracked files that may inform the commit message
   - Analyze both staged and unstaged changes together to generate a comprehensive commit message

2. Generate the commit title following Conventional Commits specification:
   - Format: `<type>(<scope>): <subject>`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`
   - Scope is optional but recommended
   - Subject should be imperative mood, lowercase (unless proper noun), no period
   - Keep title concise: ideally ≤72 characters, max 100 characters

## Commit Description Generation

Generate a meaningful commit description body:
- Analyze the actual code changes to write a clear description
- Include context about what changed and why (if not obvious from the diff)
- Use bullet points for multiple changes
- Reference related issues or PRs if applicable (e.g., "Fixes #123")
- At the very top of the commit description, insert `--ai(personely verified)` followed by a blank line before the main content
- Keep body lines under 72 characters per line for readability

## Output Format

Display the generated commit message:
- Show the title clearly labeled as "Title:"
- Show the body clearly labeled as "Description:"
- Format as separate plain text snippets for easy copy-paste