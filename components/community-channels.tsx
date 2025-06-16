'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MessageCircle, MessageSquare, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function CommunityChannels() {
  const [activeTab, setActiveTab] = useState<'kakao' | 'discord'>('kakao');

  const KAKAO_LINK = 'https://open.kakao.com/o/gPI6kTUg';
  const DISCORD_LINK = 'https://discord.gg/X74q5Yw3Sv';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          개취뽀 커뮤니티 채널
        </h2>
        <p className="text-xl text-blue-100">
          다양한 채널에서 개발자들과 소통하고 정보를 공유하세요
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md p-1 bg-blue-700/30 backdrop-blur-sm">
          <button
            onClick={() => setActiveTab('kakao')}
            className={`px-6 py-3 rounded-md font-medium transition-all ${
              activeTab === 'kakao'
                ? 'bg-white text-blue-600'
                : 'text-blue-100 hover:bg-blue-700/50'
            }`}
          >
            카카오톡 오픈채팅
          </button>
          <button
            onClick={() => setActiveTab('discord')}
            className={`px-6 py-3 rounded-md font-medium transition-all ${
              activeTab === 'discord'
                ? 'bg-white text-blue-600'
                : 'text-blue-100 hover:bg-blue-700/50'
            }`}
          >
            디스코드 채널
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {activeTab === 'kakao' ? (
          <>
            <Card className="bg-gray-800/50 border-gray-700 shadow-xl overflow-hidden">
              <div className="h-48 bg-yellow-400 flex items-center justify-center relative">
                <Image
                  src="/kakao-chat.jpeg"
                  alt="카카오톡 오픈채팅방"
                  fill
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold">
                    개발자 취업 뽀개기 - 딩코딩코
                  </h3>
                  <p className="text-sm text-gray-200">
                    오픈채팅방에서 실시간으로 소통하세요
                  </p>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-white">
                  개취뽀 카카오톡 오픈채팅방
                </CardTitle>
                <CardDescription className="text-gray-400">
                  실시간으로 취업 정보와 개발 질문을 나누는 공간
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  개발자 취업 준비생들과 현직자들이 함께 정보를 공유하고
                  네트워킹하는 오픈채팅방입니다. 실시간 채용 정보, 코딩 테스트
                  팁, 면접 경험 등을 나눌 수 있습니다.
                </p>
                <Button
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                  onClick={() => window.open(KAKAO_LINK, '_blank')}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  오픈채팅방 참여하기
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <div className="flex flex-col justify-center space-y-6 text-white">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    실시간 채용 정보
                  </h3>
                  <p className="text-gray-300">
                    최신 채용 공고와 추천 정보를 실시간으로 공유합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">현직자 Q&A</h3>
                  <p className="text-gray-300">
                    현직 개발자들에게 직접 질문하고 조언을 구할 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">스터디 모집</h3>
                  <p className="text-gray-300">
                    알고리즘, CS 지식, 프로젝트 스터디 등 함께 공부할 멤버를
                    모집합니다.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <Card className="bg-gray-800/50 border-gray-700 shadow-xl overflow-hidden">
              <div className="h-48 bg-indigo-600 flex items-center justify-center relative">
                <Image
                  src="/discord-invite.jpeg"
                  alt="디스코드 채널"
                  fill
                  className="object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold">
                    개발자 취업 뽀개기 - 딩코딩코
                  </h3>
                  <p className="text-sm text-gray-200">
                    534 온라인 · 2,833 멤버
                  </p>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-white">
                  개취뽀 디스코드 서버
                </CardTitle>
                <CardDescription className="text-gray-400">
                  체계적인 채널로 구성된 개발자 커뮤니티
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">
                  주제별로 나뉜 채널에서 개발 지식과 취업 정보를 공유하는
                  디스코드 서버입니다. 음성 채널을 통한 스터디, 코드 리뷰,
                  멘토링 세션도 진행됩니다.
                </p>
                <Button
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => window.open(DISCORD_LINK, '_blank')}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  디스코드 서버 참여하기
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <div className="flex flex-col justify-center space-y-6 text-white">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">주제별 채널</h3>
                  <p className="text-gray-300">
                    프론트엔드, 백엔드, 알고리즘 등 주제별로 나뉜 채널에서
                    정보를 공유합니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">음성 스터디</h3>
                  <p className="text-gray-300">
                    음성 채널을 통해 실시간 스터디와 코딩 세션에 참여할 수
                    있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">이벤트 알림</h3>
                  <p className="text-gray-300">
                    오프라인 모임, 웨비나, 코딩 대회 등 다양한 이벤트 소식을
                    받아볼 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
