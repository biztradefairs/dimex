import type { VisitorPass } from '@/lib/api/passes';

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Could not load QR code'));
    image.src = src;
  });
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let cursorY = y;

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY);
      line = word;
      cursorY += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, cursorY);
  return cursorY;
}

export async function downloadVisitorBadge(pass: VisitorPass) {
  const width = 680;
  const height = 1080;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not available');

  ctx.fillStyle = '#F3F5F9';
  ctx.fillRect(0, 0, width, height);

  roundRect(ctx, 40, 40, 600, 1000, 36);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  ctx.stroke();

  const header = ctx.createLinearGradient(40, 40, 640, 40);
  header.addColorStop(0, '#0F766E');
  header.addColorStop(1, '#16A34A');
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(76, 40);
  ctx.lineTo(604, 40);
  ctx.arcTo(640, 40, 640, 76, 36);
  ctx.lineTo(640, 128);
  ctx.lineTo(40, 128);
  ctx.lineTo(40, 76);
  ctx.arcTo(40, 40, 76, 40, 36);
  ctx.closePath();
  ctx.fillStyle = header;
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 22px Arial, sans-serif';
  ctx.fillText('VISITOR PASS', 72, 94);

  const initial = (pass.name || 'V').trim().charAt(0).toUpperCase();
  ctx.beginPath();
  ctx.arc(width / 2, 210, 48, 0, Math.PI * 2);
  const avatar = ctx.createLinearGradient(width / 2 - 48, 162, width / 2 + 48, 258);
  avatar.addColorStop(0, '#34D399');
  avatar.addColorStop(1, '#0F766E');
  ctx.fillStyle = avatar;
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 40px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(initial, width / 2, 224);

  ctx.fillStyle = '#0F172A';
  ctx.font = '800 36px Arial, sans-serif';
  ctx.fillText(pass.name, width / 2, 300);

  ctx.fillStyle = '#64748B';
  ctx.font = '600 22px Arial, sans-serif';
  wrapText(ctx, pass.company || '', width / 2, 338, 500, 28);

  if (pass.location) {
    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 18px Arial, sans-serif';
    ctx.fillText(pass.location, width / 2, 376);
  }

  const qr = await loadImage(pass.qrDataUrl);
  const qrSize = 320;
  const qrX = (width - qrSize) / 2;
  const qrY = 410;
  roundRect(ctx, qrX - 12, qrY - 12, qrSize + 24, qrSize + 24, 24);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.strokeStyle = '#E2E8F0';
  ctx.stroke();
  ctx.drawImage(qr, qrX, qrY, qrSize, qrSize);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 16px Arial, sans-serif';
  ctx.fillText('SCAN AT ENTRY', width / 2, 770);

  ctx.fillStyle = '#475569';
  ctx.font = '600 18px ui-monospace, Consolas, monospace';
  ctx.fillText(pass.registrationNumber, width / 2, 802);

  ctx.fillStyle = '#0F172A';
  ctx.font = '700 22px Arial, sans-serif';
  ctx.fillText(pass.event.name, width / 2, 860);
  ctx.fillStyle = '#64748B';
  ctx.font = '500 18px Arial, sans-serif';
  ctx.fillText(pass.event.venue, width / 2, 890);
  ctx.fillStyle = '#94A3B8';
  ctx.fillText(pass.event.dates, width / 2, 918);

  roundRect(ctx, width / 2 - 80, 948, 160, 36, 18);
  ctx.fillStyle = '#ECFDF5';
  ctx.fill();
  ctx.fillStyle = '#047857';
  ctx.font = '700 14px Arial, sans-serif';
  ctx.fillText('VISITOR', width / 2, 972);

  ctx.textAlign = 'left';

  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = `${pass.registrationNumber}.png`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
