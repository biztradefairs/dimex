import type { ReactNode } from 'react';

// Render a small, documented Markdown subset as React nodes. Raw HTML is never executed.
function inline(text: string): ReactNode[] {
  const tokens = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return tokens.map((token, index) => {
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const href = link[2].trim();
      if (/^https?:\/\//i.test(href) || (/^\/(?!\/)/.test(href) && !href.includes('\\'))) {
        return <a key={index} href={href} className="font-medium text-[#004A96] underline underline-offset-4">{link[1]}</a>;
      }
      return link[1];
    }
    if (token.startsWith('**') && token.endsWith('**')) return <strong key={index}>{token.slice(2, -2)}</strong>;
    if (token.startsWith('*') && token.endsWith('*')) return <em key={index}>{token.slice(1, -1)}</em>;
    return token;
  });
}

export default function BlogContent({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const blocks: ReactNode[] = [];
  let cursor = 0;
  while (cursor < lines.length) {
    const line = lines[cursor].trim();
    if (!line) { cursor++; continue; }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const Tag = heading[1].length === 1 ? 'h2' : 'h3';
      blocks.push(<Tag key={cursor} className="mt-8 text-xl font-bold leading-snug text-[#082856] sm:text-2xl">{inline(heading[2])}</Tag>);
      cursor++;
      continue;
    }
    const list = line.match(/^([-*]|\d+\.)\s+/);
    if (list) {
      const ordered = /^\d/.test(list[1]);
      const items: ReactNode[] = [];
      const start = cursor;
      const pattern = ordered ? /^\d+\.\s+/ : /^[-*]\s+/;
      while (cursor < lines.length && pattern.test(lines[cursor].trim())) {
        items.push(<li key={cursor}>{inline(lines[cursor].trim().replace(pattern, ''))}</li>);
        cursor++;
      }
      const Tag = ordered ? 'ol' : 'ul';
      blocks.push(<Tag key={start} className={ordered ? 'list-decimal space-y-2 pl-6' : 'list-disc space-y-2 pl-6'}>{items}</Tag>);
      continue;
    }
    if (line.startsWith('> ')) {
      blocks.push(<blockquote key={cursor} className="border-l-4 border-[#004A96] bg-blue-50 px-5 py-3 italic">{inline(line.slice(2))}</blockquote>);
      cursor++;
      continue;
    }
    const start = cursor;
    const paragraph: string[] = [];
    while (cursor < lines.length && lines[cursor].trim() && !/^(#{1,3}\s|[-*]\s|\d+\.\s|>\s)/.test(lines[cursor].trim())) {
      paragraph.push(lines[cursor]);
      cursor++;
    }
    blocks.push(<p key={start} className="whitespace-pre-line">{inline(paragraph.join('\n'))}</p>);
  }
  return <div className="space-y-5 text-base leading-8 text-slate-700 sm:text-lg">{blocks}</div>;
}
