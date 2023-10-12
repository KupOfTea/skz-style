import saveAs from "file-saver";
import html2canvas from "html2canvas";

export const handleImageDownload = (id: string) => {
  try {
    const element = document.getElementById(id);

    html2canvas(element as HTMLElement, {
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: false,
    }).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob as Blob, "skz.png");
      });
    });
  } catch (_) {}
};
