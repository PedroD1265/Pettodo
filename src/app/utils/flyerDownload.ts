import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export async function downloadFlyerPNG(element: HTMLElement, filename = 'pettodo-flyer.png'): Promise<void> {
  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#ffffff',
  });
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function downloadFlyerPDF(element: HTMLElement, filename = 'pettodo-flyer.pdf'): Promise<void> {
  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#ffffff',
  });

  const img = new Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = dataUrl;
  });

  const pxW = img.width;
  const pxH = img.height;
  const orientation = pxH > pxW ? 'portrait' : 'landscape';
  const pdf = new jsPDF({ orientation, unit: 'px', format: [pxW, pxH] });
  pdf.addImage(dataUrl, 'PNG', 0, 0, pxW, pxH);
  pdf.save(filename);
}
