# Context System

Modular context files to avoid bloating CLAUDE.md. Load only what you need.

## Files
| File | When to Load |
|------|--------------|
| `project.md` | Starting work, need URLs/IDs/stack info |
| `design.md` | Working on styles, colors, animations |
| `decisions.md` | Before making choices (check what was decided) |
| `cms.md` | Working with Sanity, content, schemas |

## Usage Pattern
1. Read relevant context file(s) before starting task
2. Update context files when making significant decisions
3. Keep entries concise - bullet points, not paragraphs

## Adding New Context
Create new `.md` files for distinct domains (e.g., `seo.md`, `analytics.md`).
Update this README with the new file and when to load it.
