# rush_algo

Algorithms course crash guide, built as a mobile-readable GitHub Pages site.

Live site after GitHub Pages deployment:

https://fendss.github.io/rush_algo/

The site is published from the `gh-pages` branch. The source Markdown and build
script live on `main`; the generated web output lives under `docs/` and is also
pushed to `gh-pages` as the site root.

## Files

- `algorithm_crash_guide_zh.md`: source Markdown guide.
- `docs/index.html`: GitHub Pages entry page.
- `docs/algorithm_crash_guide_zh.pdf`: exported PDF.
- `guide_assets/`: shared CSS and diagram enhancement script.
- `build_guide.py`: rebuilds HTML, PDF, and the `docs/` publishing folder.

## Build

```powershell
python .\build_guide.py
```

The build requires Pandoc and Playwright Chromium in the local environment.
