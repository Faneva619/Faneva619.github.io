import QRCode from "qrcode";

export interface QRStyleConfig {
  primaryColor: string;
  secondaryColor: string;
  bgColor: string;
  dotShape: "circle" | "rounded-square" | "square" | "diamond";
  cornerShape: "circle" | "rounded-square" | "square";
  iconSvg: string;
  iconColor: string;
  size: number;
}

export const ICONS = {
  ia: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62.8 61.5" width="48" height="48"><path fill="currentColor" d="M24.9 43.8c0-5.3-3.5-6.9-3.5-6.9-1.8-.8-4.8-1.1-7.9-1.2h-.1c-3.1 0-6.2.4-7.9 1.2 0 0-3.5 1.6-3.5 6.9 0 1.2 0 2.7 0 4.2.1 5.2 1 10.3 5.8 11.6 2.2.6 4.1.7 5.7.6 2.8-.2 4.3-1 4.3-1l-.1-2c0 0-2 .6-4.2.6-2.2-.1-4.5-.2-4.9-3 0-.3-.1-.5 0-.8 0 0 2.2.5 4.9.7 1.7.1 3.3-.1 4.9-.3 3.1-.4 5.8-2.3 6.1-4 .5-2.5.4-6.4.4-6.4zm-4.1 6.9h-2.6v-6.3c0-1.3-.6-2-1.7-2-1.2 0-1.8.8-1.8 2.4v3.4h-2.5v-3.4c0-1.6-.6-2.4-1.8-2.4-1.1 0-1.7.7-1.7 2v6.3H6.2v-6.4c0-1.3.3-2.4 1-3.1.7-.8 1.6-1.2 2.7-1.2 1.3 0 2.3.5 3 1.5l.6 1.1.6-1.1c.7-1 1.6-1.5 3-1.5 1.1 0 2 .4 2.7 1.2.7.8 1 1.8 1 3.1v6.4z"/><g><path fill="currentColor" d="M49.3 35.3c2.5 0 5 .8 7.1 2.2 2 1.4 3.6 3.3 4.6 5.6 1.7 4 1.2 8.5-1.2 12-1.4 2-3.3 3.6-5.6 4.6-4 1.7-8.5 1.2-12-1.2-2-1.4-3.6-3.3-4.6-5.6-1.7-4-1.2-8.5 1.2-12 1.4-2 3.3-3.6 5.6-4.6 1.6-.6 3.3-1 4.9-1zm0-.8c-7.5 0-13.5 6-13.5 13.5 0 7.5 6 13.5 13.5 13.5 7.5 0 13.5-6 13.5-13.5 0-7.5-6-13.5-13.5-13.5z"/><path fill="currentColor" d="M38.5 48c0 4.3 2.5 8.2 6.3 10.1l-5.4-14.7c-.5 1.5-.9 3-.9 4.6zm18.9-.6c0-1.4-.5-2.3-.9-3.1-.4-.8-1.1-1.7-1.1-2.6s.8-2 1.9-2h.1c-4.6-4.2-11.7-3.9-15.9.7-.4.4-.8.9-1.1 1.4h.7c1.2 0 3-.1 3-.1.6 0 .7.9.1.9 0 0-.6.1-1.3.1l4.1 12.1 2.5-7.4-1.8-4.8c-.6 0-1.2-.1-1.2-.1-.6 0-.5-1 .1-.9 0 0 1.9.1 3 .1s3-.1 3-.1c.6 0 .7.9.1.9 0 0-.6.1-1.3.1l4.1 12.1 1.2-3.7c.4-1.1.7-2.2.7-3.2zm-7.4 1.5l-3.4 9.8c2.3.7 4.7.6 6.9-.2l-.1-.1-3.4-9.5zm9.6-6.3c.1.4.1.8.1 1.2 0 1.1-.2 2.4-.9 4l-3.4 9.9c5.3-3 7.2-9.7 4.2-15.1z"/></g><path fill="currentColor" d="M60.3 9.3c0-5.3-3.5-6.9-3.5-6.9-1.8-.8-4.8-1.1-7.9-1.2h-.1c-3.1 0-6.2.4-7.9 1.2 0 0-3.5 1.6-3.5 6.9 0 1.2 0 2.7 0 4.2.1 5.2 1 10.3 5.8 11.6 2.2.6 4.1.7 5.7.6 2.8-.2 4.3-1 4.3-1l-.1-2c0 0-2 .6-4.2.6-2.2-.1-4.5-.2-4.9-3 0-.3-.1-.5 0-.8 0 0 2.2.5 4.9.7 1.7.1 3.3-.1 4.9-.3 3.1-.4 5.8-2.3 6.1-4 .5-2.5.4-6.4.4-6.4zm-4.1 6.9h-2.6V9.9c0-1.3-.6-2-1.7-2-1.2 0-1.8.8-1.8 2.4v3.4h-2.5v-3.4c0-1.6-.6-2.4-1.8-2.4-1.1 0-1.7.7-1.7 2v6.3h-2.6V9.7c0-1.3.3-2.4 1-3.1.7-.8 1.6-1.2 2.7-1.2 1.3 0 2.3.5 3 1.5l.6 1.1.6-1.1c.7-1 1.6-1.5 3-1.5 1.1 0 2 .4 2.7 1.2.7.8 1 1.8 1 3.1v6.4z"/><g><path fill="currentColor" d="M13.5.8c2.5 0 5 .8 7.1 2.2 2 1.4 3.6 3.3 4.6 5.6 1.7 4 1.2 8.5-1.2 12-1.4 2-3.3 3.6-5.6 4.6-4 1.7-8.5 1.2-12-1.2-2-1.4-3.6-3.3-4.6-5.6-1.7-4-1.2-8.5 1.2-12 1.4-2 3.3-3.6 5.6-4.6 1.6-.6 3.3-1 4.9-1zm0-.8C6 0 0 6 0 13.5 0 21 6 27 13.5 27 21 27 27 21 27 13.5 27 6 21 0 13.5 0z"/><path fill="currentColor" d="M2.7 13.5c0 4.3 2.5 8.2 6.3 10.1L3.7 8.9c-.6 1.5-1 3-1 4.6zm18.9-.6c0-1.4-.5-2.3-.9-3.1-.4-.8-1.1-1.7-1.1-2.6s.8-2 1.9-2h.1c-4.6-4.2-11.7-3.9-15.9.7-.4.4-.8.9-1.1 1.4h.7c1.2 0 3-.1 3-.1.6 0 .7.9.1.9 0 0-.6.1-1.3.1l4.1 12.2 2.5-7.4-1.8-4.8c-.6 0-1.2-.1-1.2-.1-.6 0-.5-1 .1-.9 0 0 1.9.1 3 .1s3-.1 3-.1c.6 0 .7.9.1.9 0 0-.6.1-1.3.1l4.1 12.1 1.2-3.7c.4-1.1.7-2.2.7-3.2zm-7.4 1.5l-3.4 9.8c2.3.7 4.7.6 6.9-.2l-.1-.1-3.4-9.5zm9.6-6.3c.1.4.1.8.1 1.2 0 1.1-.2 2.4-.9 4l-3.4 9.9c5.3-3 7.2-9.7 4.2-15.1z"/></svg>`,

  mastodon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16"><path d="M11.19 12.195c2.016-.24 3.77-1.475 3.99-2.603.348-1.778.32-4.339.32-4.339 0-3.47-2.286-4.488-2.286-4.488C12.062.238 10.083.017 8.027 0h-.05C5.92.017 3.942.238 2.79.765c0 0-2.285 1.017-2.285 4.488l-.002.662c-.004.64-.007 1.35.011 2.091.083 3.394.626 6.74 3.78 7.57 1.454.383 2.703.463 3.709.408 1.823-.1 2.847-.647 2.847-.647l-.06-1.317s-1.303.41-2.767.36c-1.45-.05-2.98-.156-3.215-1.928a4 4 0 0 1-.033-.496s1.424.346 3.228.428c1.103.05 2.137-.064 3.188-.189zm1.613-2.47H11.13v-4.08c0-.859-.364-1.295-1.091-1.295-.804 0-1.207.517-1.207 1.541v2.233H7.168V5.89c0-1.024-.403-1.541-1.207-1.541-.727 0-1.091.436-1.091 1.296v4.079H3.197V5.522q0-1.288.66-2.046c.456-.505 1.052-.764 1.793-.764.856 0 1.504.328 1.933.983L8 4.39l.417-.695c.429-.655 1.077-.983 1.934-.983.74 0 1.336.259 1.791.764q.662.757.661 2.046v4.079z"/></svg>`,

  physique: `<svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 256 229" enable-background="new 0 0 256 229" xml:space="preserve"><path d="M129.593,64.314c23.543-30.833,44.788-45.063,54.751-45.063c1.37,0,2.507,0.258,3.386,0.775c5.324,3.076,6.332,16.619,2.766,34.505c5.686,1.086,11.14,2.326,16.335,3.722c5.583-26.958,1.861-45.619-10.649-52.856c-12.716-7.34-30.498-1.318-51.434,17.42c-12.018,10.754-24.622,25.416-36.339,42.062c-11.687,0.676-23.237,1.953-34.188,3.813c-7.913-26.6-7.343-44.886-0.783-48.667c0.879-0.517,2.016-0.775,3.386-0.775c7.289,0,19.255,7.237,32.023,19.385c3.618-4.471,7.263-8.736,10.907-12.742C97.657,5.036,78.246-2.253,65.013,5.397C52.297,12.712,48.626,31.114,54.39,58.64c0.901,4.301,2.036,8.788,3.376,13.409C25.626,79.809,2,93.278,2,111.935c0,15.378,16.231,28.637,45.696,37.322l1.241,0.362l0.362-1.215c1.344-4.42,2.869-8.917,4.523-13.388l0.465-1.292l-1.318-0.388c-20.392-5.97-34.065-14.577-34.065-21.4c0-7.721,16.139-17.594,44.084-24.042c3.821,10.43,8.516,21.254,13.893,32.034c-8.08,17.761-14.137,35.252-17.321,50.473c-5.764,27.5-2.094,45.903,10.623,53.217c3.463,2.016,7.366,3.024,11.605,3.024c10.571,0,23.468-6.384,37.606-18.532c-3.851-3.929-7.625-8.064-11.295-12.38c-10.519,8.891-19.979,14.06-26.105,14.06c-1.344,0-2.481-0.259-3.386-0.776c-8.213-4.751-7.064-32.19,8.403-70.244c24.572,42.417,63.859,87.871,92.371,87.871c4.239,0,8.141-1.008,11.605-3.024h0.026c26.285-15.146,10.054-73.998-16.516-123.493c-6.306-1.008-13.207-1.835-20.729-2.43l0.853,1.447c33.316,57.689,38.795,103.592,27.94,109.872c-0.905,0.517-2.042,0.776-3.386,0.776c-13.13,0-45.98-24.787-77.797-79.891c-2.015-3.492-3.924-6.939-5.738-10.338c3.243-6.601,6.866-13.421,10.907-20.419c3.659-6.338,7.331-12.256,10.986-17.8c3.423-0.101,6.903-0.163,10.466-0.163c66.606,0,109.122,18.222,109.122,30.757c0,6.436-12.199,14.448-30.731,20.367c2.042,5.324,3.903,10.623,5.531,15.843c27.164-8.684,42.078-21.452,42.078-36.21C254,81.266,190.199,64.601,129.593,64.314z M91.919,90.689c-1.915,3.32-3.771,6.67-5.566,10.036c-2.506-5.53-4.744-10.887-6.695-16.017c5.395-0.837,11.099-1.547,17.094-2.107C95.11,85.272,93.492,87.964,91.919,90.689z M111.783,114.85c0,10.231,8.324,18.555,18.555,18.555c10.231,0,18.555-8.324,18.555-18.555s-8.324-18.555-18.555-18.555C120.107,96.294,111.783,104.618,111.783,114.85z"/></svg>`,

  bluesky: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6 2 2 6 2 12s4 10 10 10 10-4 10-10S18 2 12 2z"/><path d="M8 12l3 3 5-5"/></svg>`,
};

export async function generateCustomQR(
  url: string,
  style: QRStyleConfig
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const qrSize = style.size;
  canvas.width = qrSize;
  canvas.height = qrSize;

  // Générer la matrice QR
  const qrData = await QRCode.create(url, {
    errorCorrectionLevel: "H",
    margin: 2,
  });

  const modules = qrData.modules.data;
  const moduleCount = qrData.modules.size;
  const moduleSize = qrSize / moduleCount;

  // Fond
  ctx.fillStyle = style.bgColor;
  ctx.fillRect(0, 0, qrSize, qrSize);

  // Dessiner les modules
  for (let y = 0; y < moduleCount; y++) {
    for (let x = 0; x < moduleCount; x++) {
      if (modules[y * moduleCount + x]) {
        const px = x * moduleSize;
        const py = y * moduleSize;
        const padding = moduleSize * 0.1;
        const size = moduleSize - padding * 2;

        // Déterminer la couleur (coins vs dots)
        const isCorner =
          (x < 7 && y < 7) ||
          (x >= moduleCount - 7 && y < 7) ||
          (x < 7 && y >= moduleCount - 7);

        ctx.fillStyle = isCorner ? style.secondaryColor : style.primaryColor;

        // Dessiner selon la forme
        if (style.dotShape === "circle" && !isCorner) {
          ctx.beginPath();
          ctx.arc(px + moduleSize / 2, py + moduleSize / 2, size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (style.dotShape === "diamond" && !isCorner) {
          ctx.beginPath();
          ctx.moveTo(px + moduleSize / 2, py + padding);
          ctx.lineTo(px + moduleSize - padding, py + moduleSize / 2);
          ctx.lineTo(px + moduleSize / 2, py + moduleSize - padding);
          ctx.lineTo(px + padding, py + moduleSize / 2);
          ctx.closePath();
          ctx.fill();
        } else if (style.dotShape === "rounded-square" && !isCorner) {
          const radius = size * 0.3;
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(px + padding, py + padding, size, size, radius);
          } else {
            ctx.rect(px + padding, py + padding, size, size);
          }
          ctx.fill();
        } else {
          // Carré simple (coins ou square)
          ctx.fillRect(px + padding, py + padding, size, size);
        }
      }
    }
  }

  // Ajouter l'icône centrale
  const iconSize = qrSize * 0.2;
  const iconX = (qrSize - iconSize) / 2;
  const iconY = (qrSize - iconSize) / 2;

  // Fond blanc pour l'icône
  ctx.fillStyle = style.bgColor;
  ctx.fillRect(iconX - 5, iconY - 5, iconSize + 10, iconSize + 10);

  // Bordure
  ctx.strokeStyle = style.primaryColor;
  ctx.lineWidth = 2;
  ctx.strokeRect(iconX - 5, iconY - 5, iconSize + 10, iconSize + 10);

  // Dessiner l'icône SVG
  const img = new Image();
  const svgBlob = new Blob([style.iconSvg.replace("currentColor", style.iconColor)], {
    type: "image/svg+xml",
  });
  const urlObj = URL.createObjectURL(svgBlob);

  await new Promise<void>((resolve) => {
    img.onload = () => {
      ctx.drawImage(img, iconX, iconY, iconSize, iconSize);
      URL.revokeObjectURL(urlObj);
      resolve();
    };
    img.src = urlObj;
  });

  return canvas;
}
