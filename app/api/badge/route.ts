import { flow } from 'lodash-es';
import { NextRequest, NextResponse } from 'next/server';

const MAX_TITLE_LENGTH = 14;
const MAX_DURATION_LENGTH = 30;

export async function GET(request: NextRequest) {
  const params = parseBadgeParams(request.nextUrl.searchParams);

  if (!validateBadgeParams(params)) {
    return createErrorResponse('Missing required parameters', [
      'title',
      'duration',
    ]);
  }

  return flow(
    sanitizeBadgeParams,
    truncateBadgeParams,
    generateBadgeSVG,
    createSVGResponse,
  )(params);
}

type BadgeParams = {
  title: string | null;
  duration: string | null;
  isLeader: boolean;
};

function parseBadgeParams(searchParams: URLSearchParams): BadgeParams {
  return {
    title: searchParams.get('title'),
    duration: searchParams.get('duration'),
    isLeader: searchParams.get('leader') === 'true',
  };
}

type ValidatedBadgeParams = {
  title: string;
  duration: string;
  isLeader: boolean;
};

function validateBadgeParams(
  params: BadgeParams,
): params is ValidatedBadgeParams {
  return params.title !== null && params.duration !== null;
}

function sanitizeBadgeParams(params: ValidatedBadgeParams) {
  return {
    title: params.title.trim(),
    duration: params.duration.trim(),
    isLeader: params.isLeader,
  };
}

function truncateBadgeParams(params: ValidatedBadgeParams) {
  return {
    title: truncateText(params.title, MAX_TITLE_LENGTH),
    duration: truncateText(params.duration, MAX_DURATION_LENGTH),
    isLeader: params.isLeader,
  };
}

function createErrorResponse(error: string, required: string[]) {
  return NextResponse.json({ error, required }, { status: 400 });
}

function createSVGResponse(svg: string) {
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

const ANIMATION_STYLES = `
  <style>
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-10px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes glowPulse {
      0%, 100% { filter: drop-shadow(0 0 2px rgba(59, 130, 246, 0.5)); }
      50% { filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.8)); }
    }
    .title {
      animation: slideIn 0.5s ease-out 0.2s forwards;
      opacity: 0;
    }
    .crown {
      animation: fadeIn 0.5s ease-out 0.4s forwards;
      opacity: 0;
    }
    .duration {
      animation: fadeIn 0.5s ease-out 0.4s forwards;
      opacity: 0;
    }
    .logo-rect {
      animation: glowPulse 2s infinite;
    }
  </style>
`;

const LOGO_PATH =
  'M 300 94.2 L 300 79.2 L 263.5 79.2 L 263.5 61.2 L 300 61.2 L 300 3 L 281 3 L 281 18 L 263.5 18 L 263.5 3 L 244.5 3 L 244.5 18 L 228 18 L 228 3 L 209 3 L 209 43.2 C 209 54 216.2 61.2 227 61.2 L 244.5 61.2 L 244.5 79.2 L 208 79.2 L 208 94.2 L 300 94.2 Z M 73 94.2 L 91 94.2 L 91 3 L 73 3 L 73 37.7 L 65.2 37.7 L 65.2 3 L 47.2 3 L 47.2 94.2 L 65.2 94.2 L 65.2 53.7 L 73 53.7 L 73 94.2 Z M 164 7 L 144.5 7 L 144.5 0 L 124.5 0 L 124.5 7 L 105 7 L 105 21 L 124.5 21 C 124.4 35 114.8 38.4 105 39.2 L 105 54.2 C 116 53.6 127.9 49.1 134.5 40.8 C 141.1 49.1 153 53.6 164 54.2 L 164 39.2 C 154.2 38.4 144.6 35 144.5 21 L 164 21 L 164 7 Z M 40.2 42.9 L 40.2 3 L 1 3 L 1 19 L 22.2 19 L 22.2 42.9 C 22.2 60.1 11.4 73.6 0 76.2 L 0 94.2 C 23.4 90.2 40.2 71 40.2 42.9 Z M 175 94.2 L 194 94.2 L 194 3 L 175 3 L 175 94.2 Z M 124.6 94.2 L 143.6 94.2 L 143.6 73.2 L 165.2 73.2 L 165.2 58.2 L 105 58.2 L 105 73.2 L 124.6 73.2 L 124.6 94.2 Z M 281 46.2 L 263.5 46.2 L 263.5 33 L 281 33 L 281 46.2 Z M 228 33 L 244.5 33 L 244.5 46.2 L 232 46.2 C 229.6 46.2 228 44.6 228 42.2 L 228 33 Z';

const LOGO_SVG = `
  <g>
    <rect class="logo-rect" x="20" y="24" width="40" height="40" rx="8" fill="#0052CC"/>
    <g transform="translate(25, 40) scale(0.1)">
      <path d="${LOGO_PATH}" fill="white" stroke="none"/>
    </g>
  </g>
`;

function generateBadgeSVG(badgeData: ValidatedBadgeParams): string {
  return `
<svg width="320" height="120" xmlns="http://www.w3.org/2000/svg">
  ${ANIMATION_STYLES}
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e293b"/>
      <stop offset="100%" style="stop-color:#0f172a"/>
    </linearGradient>
  </defs>

  <rect width="320" height="120" fill="url(#bg)" rx="12" stroke="#334155" stroke-width="1"/>

  ${LOGO_SVG}

  <text class="title" x="72" y="50" fill="white" font-size="16" font-family="system-ui, -apple-system, sans-serif" font-weight="500">
    ${escapeHtml(badgeData.title)}
  </text>

  ${badgeData.isLeader ? createCrownSVG() : ''}

  <text class="duration" x="20" y="90" fill="#94a3b8" font-size="13" font-family="system-ui, -apple-system, sans-serif">
    ${escapeHtml(badgeData.duration)}
  </text>
</svg>
  `.trim();
}

const CROWN_PATH = 'M2 4l3 12h14l3-12-6 4-4-8-4 8-6-4z';

function createCrownSVG(): string {
  return `
  <g class="crown" transform="translate(274, 76)">
    <path d="${CROWN_PATH}" fill="#facc15" stroke="#facc15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="scale(0.9)"/>
  </g>
`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function truncateText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}
