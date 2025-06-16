import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '개취뽀 - 개발자 취업을 뽀개는 커뮤니티',
  description:
    '개발자 취업 준비생과 이직 준비생들이 모여 실무 경험과 노하우를 공유하는 오프라인 모임. 네이버, 카카오, 토스 등 현직자들의 생생한 경험담을 들어보세요.',
  keywords:
    '개발자 취업, 개발자 커뮤니티, 코딩 면접, 개발자 이직, 프로그래밍 스터디, 개발자 네트워킹, 신입 개발자, 개발자 멘토링',
  authors: [{ name: '개취뽀 운영진' }],
  creator: '개취뽀',
  publisher: '개취뽀',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gaechwibboo.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '개취뽀 - 개발자 취업을 뽀개는 커뮤니티',
    description:
      '개발자 취업 준비생과 이직 준비생들이 모여 실무 경험과 노하우를 공유하는 오프라인 모임',
    url: 'https://gaechwibboo.com',
    siteName: '개취뽀',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '개취뽀 - 개발자 취업을 뽀개는 커뮤니티',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '개취뽀 - 개발자 취업을 뽀개는 커뮤니티',
    description:
      '개발자 취업 준비생과 이직 준비생들이 모여 실무 경험과 노하우를 공유하는 오프라인 모임',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    other: {
      'naver-site-verification': 'your-naver-verification-code',
    },
  },
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: '개취뽀',
              description: '개발자 취업을 뽀개는 커뮤니티',
              url: 'https://gaechwibboo.com',
              logo: 'https://gaechwibboo.com/logo.png',
              sameAs: [
                'https://open.kakao.com/o/gPI6kTUg',
                'https://discord.gg/X74q5Yw3Sv',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                email: 'academey@gmail.com',
              },
              event: {
                '@type': 'Event',
                name: '개취뽀 정기 모임',
                description: '개발자 취업 준비생을 위한 정기 오프라인 모임',
                location: {
                  '@type': 'Place',
                  name: '강남역 인근 세미나실',
                  address: '서울특별시 강남구',
                },
                organizer: {
                  '@type': 'Organization',
                  name: '개취뽀',
                },
              },
            }),
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/og-image.png" />
        <GoogleAnalytics gaId="G-3XSN32BG5T" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3XSN32BG5T');
          `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
