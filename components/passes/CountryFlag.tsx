import React from 'react';

type CountryFlagProps = {
  code: string;
  className?: string;
};

export default function CountryFlag({
  code,
  className = 'h-3.5 w-5 rounded-[2px] shadow-xs object-cover border border-slate-200/60 inline-block shrink-0',
}: CountryFlagProps) {
  switch (code) {
    case '+91': // India
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="India">
          <path fill="#FF9933" d="M0 0h640v160H0z" />
          <path fill="#FFFFFF" d="M0 160h640v160H0z" />
          <path fill="#128807" d="M0 320h640v160H0z" />
          <circle cx="320" cy="240" r="40" fill="none" stroke="#000080" strokeWidth="6" />
          <circle cx="320" cy="240" r="8" fill="#000080" />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={320}
                y1={240}
                x2={320 + 40 * Math.cos(angle)}
                y2={240 + 40 * Math.sin(angle)}
                stroke="#000080"
                strokeWidth="2.5"
              />
            );
          })}
        </svg>
      );

    case '+971': // UAE
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="UAE">
          <path fill="#00732F" d="M0 0h640v160H0z" />
          <path fill="#FFFFFF" d="M0 160h640v160H0z" />
          <path fill="#000000" d="M0 320h640v160H0z" />
          <path fill="#FF0000" d="M0 0h160v480H0z" />
        </svg>
      );

    case '+1': // USA
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="USA">
          <path fill="#B22234" d="M0 0h640v480H0z" />
          <path stroke="#FFFFFF" strokeWidth="37" d="M0 55h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640" />
          <path fill="#3C3B6E" d="M0 0h260v260H0z" />
          <g fill="#FFFFFF">
            {[35, 80, 125, 170, 215].map((x) =>
              [35, 75, 115, 155, 195, 235].map((y) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="6" />
              ))
            )}
          </g>
        </svg>
      );

    case '+44': // UK
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="UK">
          <clipPath id="uk-flag-clip">
            <path d="M0 0v480h640V0z" />
          </clipPath>
          <g clipPath="url(#uk-flag-clip)">
            <path fill="#012169" d="M0 0v480h640V0z" />
            <path stroke="#FFFFFF" strokeWidth="60" d="M0 0l640 480M640 0L0 480" />
            <path stroke="#C8102E" strokeWidth="40" d="M0 0l640 480M640 0L0 480" />
            <path stroke="#FFFFFF" strokeWidth="100" d="M320 0v480M0 240h640" />
            <path stroke="#C8102E" strokeWidth="60" d="M320 0v480M0 240h640" />
          </g>
        </svg>
      );

    case '+65': // Singapore
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="Singapore">
          <path fill="#ED2939" d="M0 0h640v240H0z" />
          <path fill="#FFFFFF" d="M0 240h640v240H0z" />
          <circle cx="150" cy="120" r="70" fill="#FFFFFF" />
          <circle cx="170" cy="120" r="62" fill="#ED2939" />
          <g fill="#FFFFFF">
            <circle cx="180" cy="85" r="7" />
            <circle cx="210" cy="105" r="7" />
            <circle cx="200" cy="140" r="7" />
            <circle cx="165" cy="140" r="7" />
            <circle cx="155" cy="105" r="7" />
          </g>
        </svg>
      );

    case '+60': // Malaysia
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="Malaysia">
          <path fill="#CC0000" d="M0 0h640v480H0z" />
          <path stroke="#FFFFFF" strokeWidth="34" d="M0 51h640M0 119h640M0 187h640M0 255h640M0 323h640M0 391h640M0 459h640" />
          <path fill="#000066" d="M0 0h320v274H0z" />
          <circle cx="160" cy="137" r="75" fill="#FFCC00" />
          <circle cx="180" cy="137" r="65" fill="#000066" />
          <circle cx="215" cy="137" r="30" fill="#FFCC00" />
        </svg>
      );

    case '+49': // Germany
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="Germany">
          <path fill="#000000" d="M0 0h640v160H0z" />
          <path fill="#DD0000" d="M0 160h640v160H0z" />
          <path fill="#FFCE00" d="M0 320h640v160H0z" />
        </svg>
      );

    case '+86': // China
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="China">
          <path fill="#DE2910" d="M0 0h640v480H0z" />
          <polygon points="120,40 135,85 180,85 145,110 160,155 120,130 80,155 95,110 60,85 105,85" fill="#FFDE00" />
          <circle cx="200" cy="60" r="12" fill="#FFDE00" />
          <circle cx="240" cy="100" r="12" fill="#FFDE00" />
          <circle cx="240" cy="160" r="12" fill="#FFDE00" />
          <circle cx="200" cy="200" r="12" fill="#FFDE00" />
        </svg>
      );

    default:
      return null;
  }
}
