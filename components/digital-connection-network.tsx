export function DigitalConnectionNetwork() {
  return (
    <div className="digital-connection-network">
      <svg
        className="digital-connection-network-fallback"
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <g className="digital-connection-lines">
          <path d="M120 70C290 70 330 250 510 250H930" />
          <path d="M0 178H410C470 178 495 250 555 250H930" />
          <path d="M70 390C260 390 345 250 520 250H930" />
          <path d="M350 0V92C350 164 480 166 535 250" />
          <path d="M660 500V400C660 320 715 306 755 250" />
          <path d="M1200 118H1080C1010 118 1000 250 930 250" />
          <path d="M1200 390H1070C1000 390 995 250 930 250" />
        </g>
        <g className="digital-connection-nodes">
          <circle cx="120" cy="70" r="3" />
          <circle cx="350" cy="178" r="3" />
          <circle cx="70" cy="390" r="3" />
          <circle cx="350" cy="92" r="3" />
          <circle cx="660" cy="400" r="3" />
          <circle cx="1080" cy="118" r="3" />
          <circle cx="1070" cy="390" r="3" />
          <circle className="digital-connection-core" cx="930" cy="250" r="5" />
        </g>
        <circle className="digital-connection-core-halo" cx="930" cy="250" r="16" />
      </svg>
    </div>
  );
}
