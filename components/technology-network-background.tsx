export function TechnologyNetworkBackground() {
  return (
    <svg
      className="technology-network-background"
      viewBox="0 0 1440 820"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="network-flow-blue" x1="0" y1="0" x2="1440" y2="820" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4F93FF" stopOpacity="0" />
          <stop offset=".48" stopColor="#77B5FF" stopOpacity=".8" />
          <stop offset="1" stopColor="#55C9DD" stopOpacity=".12" />
        </linearGradient>
        <linearGradient id="network-flow-cyan" x1="250" y1="820" x2="1260" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#55C9DD" stopOpacity=".08" />
          <stop offset=".52" stopColor="#8FC0FF" stopOpacity=".72" />
          <stop offset="1" stopColor="#4F93FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="technology-network-lines">
        <path className="technology-network-line technology-network-line--one" d="M-80 580C140 580 155 376 355 376S590 630 786 630 1010 280 1200 280 1370 424 1520 424" stroke="url(#network-flow-blue)" />
        <path className="technology-network-line technology-network-line--two" d="M-80 700C115 700 180 512 340 512S560 264 744 264 980 476 1120 476 1335 176 1520 176" stroke="url(#network-flow-cyan)" />
        <path className="technology-network-line technology-network-line--three" d="M-80 244C100 244 190 398 330 398S520 158 690 158 898 346 1066 346 1282 550 1520 550" stroke="url(#network-flow-blue)" />
        <path className="technology-network-line technology-network-line--four" d="M140 900C140 730 332 690 332 520S480 340 610 340 810 464 810 278 980 86 1120 86 1288 164 1320 -40" stroke="url(#network-flow-cyan)" />
        <path className="technology-network-line technology-network-line--five" d="M-60 106C120 106 204 232 374 232S582 432 730 432 916 602 1094 602 1308 402 1510 402" stroke="url(#network-flow-blue)" />
        <path className="technology-network-line technology-network-line--six" d="M84 -50C84 110 264 122 264 276S432 440 562 440 734 304 884 304 1052 488 1052 654 1220 744 1400 744" stroke="url(#network-flow-cyan)" />
      </g>
      <g className="technology-network-nodes">
        <circle cx="355" cy="376" r="3" />
        <circle cx="786" cy="630" r="3.5" />
        <circle cx="1200" cy="280" r="3" />
        <circle cx="340" cy="512" r="3.5" />
        <circle cx="744" cy="264" r="3" />
        <circle cx="1120" cy="476" r="3.5" />
        <circle cx="330" cy="398" r="3" />
        <circle cx="690" cy="158" r="3.5" />
        <circle cx="1066" cy="346" r="3" />
        <circle cx="610" cy="340" r="3" />
        <circle cx="810" cy="278" r="3.5" />
        <circle cx="1120" cy="86" r="3" />
        <circle cx="374" cy="232" r="3.5" />
        <circle cx="730" cy="432" r="3" />
        <circle cx="1094" cy="602" r="3.5" />
        <circle cx="562" cy="440" r="3" />
        <circle cx="884" cy="304" r="3.5" />
        <circle cx="1052" cy="654" r="3" />
      </g>
    </svg>
  );
}
