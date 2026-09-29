import { getDocument, GlobalWorkerOptions } from '../vendor/pdfjs/pdf.mjs';

GlobalWorkerOptions.workerSrc = new URL('../vendor/pdfjs/pdf.worker.mjs', import.meta.url).href;

const vendorUrl = new URL('../vendor/pdfjs/', import.meta.url);

async function showPdfFigure(container) {
  const canvas = container.querySelector('canvas');
  const status = container.querySelector('.pdf-status');
  let page;
  let renderTask;
  let lastWidth = 0;
  let lastPixelRatio = 0;
  let requestedRender = 0;
  let renderSequence = 0;

  async function render() {
    const width = Math.round(container.getBoundingClientRect().width);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 3);
    if (!page || !width || (width === lastWidth && pixelRatio === lastPixelRatio)) return;

    lastWidth = width;
    lastPixelRatio = pixelRatio;
    const sequence = ++renderSequence;
    if (renderTask) {
      renderTask.cancel();
      try { await renderTask.promise; } catch (error) {
        if (error.name !== 'RenderingCancelledException') throw error;
      }
    }
    if (sequence !== renderSequence) return;

    const viewport = page.getViewport({ scale: width / page.getViewport({ scale: 1 }).width });
    canvas.width = Math.ceil(viewport.width * pixelRatio);
    canvas.height = Math.ceil(viewport.height * pixelRatio);
    renderTask = page.render({
      canvasContext: canvas.getContext('2d'),
      viewport,
      transform: [pixelRatio, 0, 0, pixelRatio, 0, 0],
      background: '#ffffff',
    });
    await renderTask.promise;
    if (sequence !== renderSequence) return;
    canvas.hidden = false;
    status.hidden = true;
    container.setAttribute('aria-busy', 'false');
  }

  function showError(error) {
    if (error.name === 'RenderingCancelledException') return;
    status.textContent = 'The teaser could not be loaded. Please refresh the page.';
    status.hidden = false;
    container.setAttribute('aria-busy', 'false');
    console.error('Unable to render teaser PDF:', error);
  }

  try {
    const pdf = await getDocument({
      url: new URL(container.dataset.pdf, document.baseURI).href,
      standardFontDataUrl: new URL('standard_fonts/', vendorUrl).href,
      wasmUrl: new URL('wasm/', vendorUrl).href,
    }).promise;
    page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1 });
    container.style.aspectRatio = `${viewport.width} / ${viewport.height}`;
    await render();

    function scheduleRender() {
      cancelAnimationFrame(requestedRender);
      requestedRender = requestAnimationFrame(() => render().catch(showError));
    }

    new ResizeObserver(scheduleRender).observe(container);
    window.addEventListener('resize', scheduleRender, { passive: true });
  } catch (error) {
    showError(error);
  }
}

document.querySelectorAll('[data-pdf]').forEach(showPdfFigure);
