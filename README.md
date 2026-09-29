# APM-Bench Website

Project website: <https://jianguo-huang11.github.io/APM-Bench/>.

The `web` branch is published through GitHub Pages. It contains the paper's authors, affiliations, abstract, and teaser. PDF.js renders `static/images/teaser.pdf`, copied from the arXiv paper's `figs/teaser_cropped.pdf`, directly to a responsive canvas. No separate raster image is used, and the browser's built-in PDF viewer is not embedded.

## Local preview

From the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open <http://127.0.0.1:8000/>. JavaScript is required to display the teaser.

## Template and license

Adapted from the [Nerfies website template](https://github.com/nerfies/nerfies.github.io).
The template is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

The bundled PDF.js library is licensed under Apache-2.0. Version and source details are in `static/vendor/pdfjs/README.md`.
