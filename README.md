# quiz-cinema

Cinema quiz web application: guess the movie from its poster tagline!

- **Live page**: [https://rochejul.github.io/quiz-cinema/](https://rochejul.github.io/quiz-cinema/)

---

## 🛠️ Development

### Installation

```bash
npm install
```

### Available Scripts

- `npm run format`: Automatically formats project files using [Prettier](https://prettier.io/).
- `npm run format:check`: Checks that all files adhere to Prettier formatting rules.

---

## 🤖 Development with Antigravity CLI (`agy`)

This project can be developed and maintained using the **Antigravity CLI** (`agy`) AI assistant.

### Usage

Run `agy` directly at the root of the repository to interact with the agent:

```bash
agy
```

### Workspace Skills

The repository includes custom workspace skills in `.agents/skills/`:

#### [`new-tagline`](.agents/skills/new-tagline/SKILL.md)

Adds a new movie tagline question to the quiz. It collects or prompts for the movie title and poster image URL, generates 3 plausible distractors from the same genre/era, inserts the question into `index.html`, and formats the codebase.

You can trigger it in three ways:

1. **Slash Command** (inside `agy` session):

   ```text
   /new-tagline
   ```

2. **Natural Language** (in chat with `agy`):

   ```text
   Ajoute une nouvelle tagline pour le quiz
   ```

   _or:_

   ```text
   Add a new movie tagline to the quiz
   ```

3. **Direct CLI Script**:
   ```bash
   node .agents/skills/new-tagline/scripts/add_tagline.js \
     --tagline "Il a fallu 65 millions d'années pour que cette aventure devienne possible." \
     --answer "Jurassic Park" \
     --poster "https://media.senscritique.com/media/000018579963/300/jurassic_park.jpg" \
     --choices "Jurassic Park,King Kong,Le Monde Perdu,Godzilla"
   ```
