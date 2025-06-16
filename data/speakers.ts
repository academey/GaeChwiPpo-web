export interface Speaker {
  id: string;
  name: string;
  company: string;
  position: string;
  topic: string;
  date: string;
  tags: string[];
  avatar: string;
  bio?: string;
  presentation?: {
    title: string;
    description: string;
    slides?: string;
    video?: string;
  };
  experience?: {
    company: string;
    position: string;
    period: string;
    description: string;
  }[];
  skills?: string[];
  contact?: {
    email?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface MeetupSession {
  sessionNumber: number;
  title: string;
  date: string;
  location: string;
  description: string;
  speakers: Speaker[];
  attendees: number;
  photos?: string[];
  video?: {
    thumbnail: string;
    url: string;
  };
}

// 실제 회차별 모임 데이터
export const meetupSessions: MeetupSession[] = [
  {
    sessionNumber: 1,
    title: '개취뽀 1회차 - 취업의 첫 걸음',
    date: '2024년 12월 1일 오후 12시 ~ 오후 5시 (D+194)',
    location: '서울 서대문구 연세로5다길 46 2층 공존 파티룸',
    description:
      '개취뽀의 첫 번째 모임으로, 코딩테스트부터 면접까지 취업 전반에 관한 이야기를 나누었습니다.',
    attendees: 60,
    speakers: [
      {
        id: 'airodo-backend',
        name: '아이로도',
        company: '스타트업',
        position: '백엔드 개발자 (1년차)',
        topic: '취업의 첫 관문 코딩테스트 통과하기',
        date: '2024년 12월 1일',
        tags: ['코딩테스트', '알고리즘', '신입'],
        avatar: '/speakers/default-avatar.png',
        bio: '1년차 백엔드 개발자로 이직에 성공한 경험을 바탕으로 코딩테스트 준비 노하우를 공유합니다.',
        presentation: {
          title: '취업의 첫 관문 코딩테스트 통과하기',
          description:
            '코딩테스트 준비 방법과 실전 팁, 문제 해결 전략을 실제 경험을 바탕으로 공유합니다.',
          slides:
            'https://docs.google.com/presentation/d/1aUghrg0xG_5G8xSPK4PxyW1S4K8paDCEK1o2HYpoEew/edit#slide=id.p',
        },
        skills: ['Java', 'Spring', '알고리즘', '자료구조'],
      },
      {
        id: 'yoo-seungwan',
        name: '유승완',
        company: '토스',
        position: '프론트엔드 개발자 (3년차)',
        topic: '수능 6등급에서 토스까지',
        date: '2024년 12월 1일',
        tags: ['이직', '토스', '성장'],
        avatar: '/speakers/default-avatar.png',
        bio: '수능 6등급에서 시작해 토스 프론트엔드 개발자가 되기까지의 여정을 공유합니다.',
        presentation: {
          title: '수능 6등급에서 토스까지',
          description:
            '학력과 상관없이 개발자로 성장할 수 있다는 것을 보여주는 실제 경험담입니다.',
          slides:
            'https://postechackr-my.sharepoint.com/:b:/g/personal/honeyjam_postech_ac_kr/EdkHCqn5TJ5DqK63HSSIfuUBlegIDZe03fpRlJ62oylODA?e=FdXx0O',
        },
        skills: ['JavaScript', 'React', 'TypeScript', 'Next.js'],
      },
      {
        id: 'tech-backend',
        name: 'Tech',
        company: 'IT 기업',
        position: '백엔드 개발자 (신입)',
        topic: '자기소개서? 면접? 너 누군데',
        date: '2024년 12월 1일',
        tags: ['자기소개서', '면접', '신입'],
        avatar: '/speakers/default-avatar.png',
        bio: '신입 개발자로 취업에 성공한 경험을 바탕으로 자기소개서와 면접 준비 방법을 공유합니다.',
        presentation: {
          title: '자기소개서? 면접? 너 누군데',
          description:
            '신입 개발자 관점에서 자기소개서 작성법과 면접 준비 노하우를 공유합니다.',
        },
        skills: ['Java', 'Spring Boot', 'MySQL'],
      },
      {
        id: 'nubi-ios',
        name: '누비',
        company: '로빈후드',
        position: 'iOS 개발자 (2년차)',
        topic: '일반 사무직에서 실리콘밸리 개발자로',
        date: '2024년 12월 1일',
        tags: ['커리어전환', '실리콘밸리', 'iOS'],
        avatar: '/speakers/nubi.jpeg',
        bio: '일반 사무직에서 개발자로 전향해 실리콘밸리 로빈후드까지 이직한 경험을 공유합니다.',
        presentation: {
          title: '일반 사무직에서 실리콘밸리 개발자로',
          description:
            '비전공자에서 실리콘밸리 개발자가 되기까지의 여정과 노하우를 공유합니다.',
          slides:
            'https://postechackr-my.sharepoint.com/:u:/g/personal/honeyjam_postech_ac_kr/Ea7p9aFjdoVBiMRM4FGj7YsBgBFDxDqG1adwnBySkkmE1g?e=OAzAZE',
        },
        skills: ['Swift', 'iOS', 'Objective-C'],
      },
      {
        id: 'min-toss',
        name: 'min',
        company: '토스',
        position: '개발자 (신입)',
        topic: '신입 취업에 대하여',
        date: '2024년 12월 1일',
        tags: ['신입', '토스', '취업'],
        avatar: '/speakers/default-avatar.png',
        bio: '토스 신입 개발자로서 취업 준비 과정과 실제 면접 경험, 그리고 현업에서의 적응기를 공유합니다.',
        presentation: {
          title: '신입 취업에 대하여',
          description: '토스 신입 개발자의 취업 경험과 조언을 공유합니다.',
        },
        skills: ['JavaScript', 'React', 'Node.js'],
      },
    ],
    video: {
      thumbnail:
        'https://i.ytimg.com/an_webp/EzBdmvk2Utk/mqdefault_6s.webp?du=3000&sqp=COv4usIG&rs=AOn4CLBqT1ugtYa-s1ybvCmAbkfduHtGlQ',
      url: 'https://www.youtube.com/watch?v=EzBdmvk2Utk',
    },
  },
  {
    sessionNumber: 2,
    title: '개취뽀 2회차 - 기술면접과 연봉협상',
    date: '2025.01.19 12:00 ~ 17:00 (한국 표준시)',
    location: '서울 광진구 중곡동 138-35 B1층 그린라운지',
    description:
      '기술면접 준비부터 연봉협상까지, 취업의 핵심 포인트들을 다룬 두 번째 모임입니다.',
    attendees: 60,
    speakers: [
      {
        id: 'jang-younghwan',
        name: '장영환',
        company: '빅테크',
        position: '개발자 (신입)',
        topic: '빅테크 기술면접 부수고 초봉 연봉협상한 썰 푼다',
        date: '2025.01.19',
        tags: ['빅테크', '기술면접', '연봉협상'],
        avatar: '/speakers/jang-younghwan.jpeg',
        bio: '빅테크 기업 기술면접을 통과하고 연봉협상까지 성공한 실제 경험을 공유합니다.',
        presentation: {
          title: '빅테크 기술면접 부수고 초봉 연봉협상한 썰 푼다',
          description:
            '빅테크 기업 면접 과정과 연봉협상 전략을 생생하게 공유합니다.',
          slides:
            'https://postechackr-my.sharepoint.com/:b:/g/personal/honeyjam_postech_ac_kr/ERL2cECv_KBKkrK8LdIwGZIBQ3nRCEEixpwU28FNXpbA3w?e=khSdyB',
        },
        skills: ['Java', 'Spring', '알고리즘', '시스템설계'],
      },
      {
        id: 'mona-jang',
        name: '모나(장우석)',
        company: '금융결제원',
        position: '개발자 (신입)',
        topic: '금융결제원,현대오토에버, SK C&C 동시 합격 노하우',
        date: '2025.01.19',
        tags: ['동시합격', '금융', '대기업'],
        avatar: '/speakers/default-avatar.png',
        bio: '여러 대기업에 동시 합격한 노하우와 전략을 공유합니다.',
        presentation: {
          title: '금융결제원,현대오토에버, SK C&C 동시 합격 노하우',
          description:
            '대기업 동시 합격을 위한 체계적인 준비 방법과 전략을 공유합니다.',
          slides:
            'https://postechackr-my.sharepoint.com/:b:/g/personal/honeyjam_postech_ac_kr/EThD0g7_TUBKlK4i29M1SOwBr0wZlO-vRAgYhk86RaOYLQ?e=DDbej5',
        },
        skills: ['Java', 'Spring', 'Oracle', '금융시스템'],
      },
      {
        id: 'khan-changmin',
        name: '칸(이창민)',
        company: '스타트업',
        position: '개발자 (1년차)',
        topic: '성장에 미친 주니어 개발자가 스타트업을 선택한 이유',
        date: '2025.01.19',
        tags: ['스타트업', '성장', '주니어'],
        avatar: '/speakers/khan.jpeg',
        bio: '성장을 위해 스타트업을 선택한 주니어 개발자의 경험과 인사이트를 공유합니다.',
        presentation: {
          title: '성장에 미친 주니어 개발자가 스타트업을 선택한 이유',
          description:
            '스타트업에서의 빠른 성장 경험과 선택 이유를 공유합니다.',
          slides:
            'https://postechackr-my.sharepoint.com/:b:/g/personal/honeyjam_postech_ac_kr/EWxY10Aes6NKuN4KextdxsAB3xPxTv1CUusgwdsLEJqtKg?e=b2OLel',
        },
        skills: ['TypeScript', 'NestJS', 'Node.js', 'AWS'],
      },
      {
        id: 'dokgol-yudojin',
        name: '독골(유도진)',
        company: 'IT 기업',
        position: '개발자 (3년차)',
        topic: '커뮤니티로 성장하기',
        date: '2025.01.19',
        tags: ['커뮤니티', '성장', '네트워킹'],
        avatar: '/speakers/default-avatar.png',
        bio: '개발자 커뮤니티 활동을 통한 성장 경험과 네트워킹의 중요성을 공유합니다.',
        presentation: {
          title: '커뮤니티로 성장하기',
          description:
            '개발자 커뮤니티 참여를 통한 성장 방법과 네트워킹 노하우를 공유합니다.',
          slides:
            'https://postechackr-my.sharepoint.com/:b:/g/personal/honeyjam_postech_ac_kr/EQq7I_ePZvtHuFr1fIpf2nwBes0l6k87UTXh38cuEF-sfg?e=rcEKaC',
        },
        skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
      },
    ],
    video: {
      thumbnail:
        'https://i.ytimg.com/an_webp/HjaAk4rZ0q0/mqdefault_6s.webp?du=3000&sqp=CKqJu8IG&rs=AOn4CLAOoFygGw2OePSkAN0ciLwmAOu-CA',
      url: 'https://www.youtube.com/watch?v=HjaAk4rZ0q0',
    },
  },
  {
    sessionNumber: 3,
    title: '개취뽀 3회차 - 2025 면접 전략과 이직 노하우',
    date: '6월 8일 오후 12시 ~ 오후 5시 30분 (D+5)',
    location: '서울 광진구 중곡동 138-35 B1층 그린라운지',
    description:
      '2025년 면접 트렌드와 이직 전략, 그리고 실패를 딛고 일어선 성공 스토리를 다룬 세 번째 모임입니다.',
    attendees: 60,
    speakers: [
      {
        id: 'purple-dingco',
        name: '퍼플딩코',
        company: 'IT 기업',
        position: '개발자',
        topic: '옆 면접자와 차별화 되는 2025 면접의 기술',
        date: '2024.06.08',
        tags: ['면접', '2025', '차별화'],
        avatar: '/speakers/purple-dingco.jpeg',
        bio: '2025년 면접 트렌드를 분석하고 차별화된 면접 전략을 제시합니다.',
        presentation: {
          title: '옆 면접자와 차별화 되는 2025 면접의 기술',
          description:
            '2025년 면접에서 차별화될 수 있는 전략과 기술을 공유합니다.',
          slides:
            'https://drive.google.com/file/d/19ghmPdMYhrAGbAd0rQDhYJSGCv1_t0wq/view?usp=sharing',
        },
        skills: ['면접전략', '커뮤니케이션', '기술면접'],
      },
      {
        id: 'rapo-choiwoochang',
        name: '라포(최우창)',
        company: 'IT 기업',
        position: '개발자',
        topic: '지극히 주관적인 기술 면접 합격을 위한 필수 준비 요소',
        date: '2024.06.08',
        tags: ['기술면접', '준비요소', '합격'],
        avatar: '/speakers/rapo.jpeg',
        bio: '기술 면접 합격을 위한 핵심 준비 요소들을 주관적 경험을 바탕으로 공유합니다.',
        presentation: {
          title: '지극히 주관적인 기술 면접 합격을 위한 필수 준비 요소',
          description:
            '실제 경험을 바탕으로 한 기술 면접 준비의 핵심 요소들을 공유합니다.',
          slides:
            'https://drive.google.com/file/d/1Tf4pufaQlMM4xI5aGKBNIw_h79FaOnpO/view?usp=drive_link',
        },
        skills: ['기술면접', '알고리즘', '시스템설계'],
        contact: {
          github:
            'https://drive.google.com/file/d/11BSbqkarp4L5TSXGSrkFslLQKWby0YDI/view?usp=drive_link',
        },
      },
      {
        id: 'choco-sorabread',
        name: '초코소라빵(최윤혜)',
        company: 'IT 기업',
        position: '개발자',
        topic: '이직 준비, 화분에 골고루 물 주기 전략을 추천하는 이유',
        date: '2024.06.08',
        tags: ['이직', '전략', '준비'],
        avatar: '/speakers/choco-sorabread.jpeg',
        bio: '이직 준비를 화분 관리에 비유하여 체계적인 이직 전략을 제시합니다.',
        presentation: {
          title: '이직 준비, 화분에 골고루 물 주기 전략을 추천하는 이유',
          description:
            '이직 준비를 위한 체계적이고 균형잡힌 접근 방법을 공유합니다.',
          slides:
            'https://drive.google.com/file/d/1uIc-xRKIYx37H_EcdkVh6jeH-34ztey1/view?usp=drive_link',
        },
        skills: ['이직전략', '커리어개발', '프로젝트관리'],
      },
      {
        id: 'oh-taeseok',
        name: '오태석',
        company: 'IT 기업',
        position: '개발자',
        topic:
          '1200번 떨어지고도 웃었다: 데이터로 만든 4개 동시합격. #1200Fail4Win',
        date: '2024.06.08',
        tags: ['실패', '성공', '데이터분석'],
        avatar: '/speakers/oh-taeseok.jpeg',
        bio: '1200번의 실패를 데이터로 분석해 4개 회사 동시 합격을 이뤄낸 놀라운 스토리를 공유합니다.',
        presentation: {
          title:
            '1200번 떨어지고도 웃었다: 데이터로 만든 4개 동시합격. #1200Fail4Win',
          description:
            '실패를 데이터로 분석하여 성공으로 이끈 체계적인 접근 방법을 공유합니다.',
          slides:
            'https://drive.google.com/file/d/1ebJhJlI7vzbPxF5AxVgMayZgZjooo-xQ/view?usp=sharing',
        },
        skills: ['데이터분석', '취업전략', '멘탈관리'],
      },
    ],
  },
];

// 기존 speakers 배열은 호환성을 위해 유지 (최신 회차 연사들)
export const speakers: Speaker[] = [
  ...meetupSessions[2].speakers, // 최신 회차 연사들을 기본으로 표시
];

// 통계 계산 함수들
export function getTotalSpeakers(): number {
  return meetupSessions.reduce(
    (total, session) => total + session.speakers.length,
    0,
  );
}

export function getTotalSessions(): number {
  return meetupSessions.length;
}

export function getTotalAttendees(): number {
  return meetupSessions.reduce(
    (total, session) => total + session.attendees,
    0,
  );
}

export function getSpeakerById(id: string): Speaker | undefined {
  // 모든 회차에서 연사 검색
  for (const session of meetupSessions) {
    const speaker = session.speakers.find(speaker => speaker.id === id);
    if (speaker) return speaker;
  }
  return undefined;
}

export function getSessionBySpeakerId(
  speakerId: string,
): MeetupSession | undefined {
  return meetupSessions.find(session =>
    session.speakers.some(speaker => speaker.id === speakerId),
  );
}
