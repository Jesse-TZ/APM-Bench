# APM-Bench Website

Project website: <https://jianguo-huang11.github.io/APM-Bench/>.

The `web` branch is published through GitHub Pages. It contains the paper's authors, affiliations, abstract, and teaser. The teaser is embedded directly from `static/images/teaser.pdf`, copied from the arXiv paper's `figs/teaser_cropped.pdf`; no raster image is used.

## Local preview

From the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open <http://127.0.0.1:8000/>. The page also links to the original teaser PDF for browsers that do not support inline PDF display.

## Template and license

Adapted from the [Nerfies website template](https://github.com/nerfies/nerfies.github.io).
The template is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
