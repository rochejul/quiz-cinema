---
name: new-tagline
description: >-
  Use this skill when the user wants to add a new movie tagline question to the cinema quiz.
  Collects or asks for the movie title, poster URL, and tagline, generates 3 plausible
  incorrect choices from the same genre or theme, appends the question to quizData in index.html,
  and formats the project with Prettier.
---

# Add New Movie Tagline Skill

This skill guides the agent in adding a new movie question to the cinema quiz (`index.html`).

## Workflow

### 1. Collect Question Details

Ensure you have all required fields. If any are missing, ask the user:

- **Movie title** (`answer`): Official French or localized release title.
- **Poster URL** (`poster`): Valid direct image URL of the official movie poster.
- **Tagline** (`tagline`): Official French poster tagline (catchphrase). If not provided, ask the user or propose the verified tagline for the movie.

### 2. Generate 3 Plausible Distractors (Choices)

Generate 3 incorrect choices that:

- Share the same genre, era, tone, or director/actors with the answer.
- Are plausible distractors so the question is engaging and not trivial.
- Are not already the answer or duplicated.

Combine the answer with the 3 distractors into an array of 4 `choices`.

### 3. Add to `index.html`

Insert the new object into the `quizData` array in `index.html`:

```javascript
{
  tagline: "...",
  answer: "...",
  poster: "...",
  choices: [
    "...",
    "...",
    "...",
    "...",
  ],
},
```

You can either:

- Use the provided helper script:
  ```bash
  node .agents/skills/new-tagline/scripts/add_tagline.js \
    --tagline "Tagline text" \
    --answer "Movie Title" \
    --poster "https://.../poster.jpg" \
    --choices "Choice 1,Choice 2,Choice 3,Movie Title"
  ```
- Or use `edit_file` to append directly before the closing bracket of `const quizData = [ ... ];`.

### 4. Format and Validate

Always format the codebase after adding the entry:

```bash
npm run format && npm run format:check
```

Confirm to the user that the new question has been successfully added with the generated choices.
