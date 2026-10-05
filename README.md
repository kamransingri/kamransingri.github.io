# Kamran Singri: personal website

Static site (HTML, CSS, vanilla JS). No build step.

## Preview locally
```
python -m http.server 8000
```
Then open http://localhost:8000

## Deploy to GitHub Pages
1. Create a GitHub repo named `<your-username>.github.io`.
2. Push the contents of this folder to the `main` branch.
3. In the repo: Settings → Pages → Deploy from branch → `main` / root.
4. Your site will be live at `https://<your-username>.github.io`.

## Things to add
- **Resume:** put a PDF at `assets/Kamran_Singri_Resume.pdf`; the "Resume (PDF)" button appears automatically.
- **GitHub / LinkedIn:** uncomment the links at the bottom of the Contact section in `index.html`.
- **Project data:** edit the `PROJECTS` array at the top of `js/main.js`.
- **Screenshots:** drop images in `assets/img/` and add an `images: [...]` list to a project.
