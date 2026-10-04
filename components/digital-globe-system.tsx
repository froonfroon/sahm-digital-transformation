export function DigitalGlobeSystem() {
  return (
    <div className="digital-globe-system" aria-hidden="true">
      <svg
        className="digital-globe-fallback"
        viewBox="0 0 600 600"
        fill="none"
        focusable="false"
      >
        <defs>
          <radialGradient id="sahm-globe-fill" cx="0" cy="0" r="1" gradientTransform="matrix(0 250 -250 0 270 245)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#164d7b" />
            <stop offset="0.74" stopColor="#0b2b49" />
            <stop offset="1" stopColor="#071a2e" />
          </radialGradient>
          <linearGradient id="sahm-globe-stroke" x1="100" x2="510" y1="140" y2="450" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3c9cff" />
            <stop offset="0.52" stopColor="#83caff" />
            <stop offset="1" stopColor="#2471cd" />
          </linearGradient>
        </defs>
        <circle cx="300" cy="300" r="224" fill="url(#sahm-globe-fill)" />
        <g className="digital-globe-fallback-lines">
          <circle cx="300" cy="300" r="224" stroke="url(#sahm-globe-stroke)" strokeWidth="2" />
          <ellipse cx="300" cy="300" rx="112" ry="224" />
          <ellipse cx="300" cy="300" rx="184" ry="224" />
          <ellipse cx="300" cy="300" rx="224" ry="91" />
          <ellipse cx="300" cy="300" rx="224" ry="166" />
          <path d="M130 192h58v-34h65v46h46v-26h48v64h-35v35h-56v42h-46v52h-51v-40h-38v-52h-30z" />
          <path d="M303 314h42v-35h54v31h38v45h-26v38h-49v45h-37v-54h-30v-34h28z" />
          <path d="M152 393h43v28h62v31h42M337 164h45v31h37M213 269h40v-28h56M365 424h42v-28h45" />
        </g>
        <g className="digital-globe-fallback-nodes">
          <circle cx="188" cy="158" r="5" />
          <circle cx="299" cy="241" r="5" />
          <circle cx="391" cy="310" r="5" />
          <circle cx="258" cy="371" r="5" />
          <circle cx="337" cy="444" r="5" />
          <circle cx="152" cy="393" r="5" />
        </g>
        <ellipse className="digital-globe-fallback-orbit" cx="300" cy="300" rx="268" ry="93" transform="rotate(-24 300 300)" />
      </svg>
    </div>
  );
}
