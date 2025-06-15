"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  User,
  Clock,
  Users,
  Presentation,
  CheckCircle,
  Lightbulb,
  FileText,
  Video,
  MessageSquare,
  MapPin,
  Coffee,
  Award,
  Target,
  BookOpen,
} from "lucide-react"
import Link from "next/link"

export default function SpeakerGuidePage() {
  const speakerBenefits = [
    {
      icon: Award,
      title: "개발자 브랜딩",
      description: "업계 내 전문성을 인정받고 개인 브랜드를 구축할 수 있습니다.",
    },
    {
      icon: Users,
      title: "네트워킹 확장",
      description: "다양한 회사의 개발자들과 네트워크를 형성할 수 있습니다.",
    },
    {
      icon: Target,
      title: "발표 경험 쌓기",
      description: "안전한 환경에서 발표 경험을 쌓고 스피킹 스킬을 향상시킬 수 있습니다.",
    },
    {
      icon: BookOpen,
      title: "지식 정리",
      description: "발표 준비 과정에서 본인의 지식을 체계적으로 정리할 수 있습니다.",
    },
  ]

  const presentationTopics = [
    {
      category: "기술 경험담",
      topics: [
        "React에서 Next.js로 마이그레이션 경험",
        "대규모 서비스 성능 최적화 사례",
        "MSA 도입 과정과 시행착오",
        "레거시 코드 리팩토링 전략",
        "새로운 기술 스택 도입 경험",
      ],
    },
    {
      category: "커리어 & 취업",
      topics: [
        "신입 개발자 첫 직장 적응기",
        "스타트업에서 대기업으로 이직하기",
        "개발자 면접 준비와 실전 경험",
        "포트폴리오 작성 노하우",
        "개발자 커리어 로드맵",
      ],
    },
    {
      category: "개발 문화 & 협업",
      topics: [
        "효과적인 코드 리뷰 문화 만들기",
        "애자일 개발 프로세스 경험담",
        "원격 근무 환경에서의 협업",
        "개발팀 문화 개선 사례",
        "주니어 개발자 멘토링 경험",
      ],
    },
    {
      category: "학습 & 성장",
      topics: [
        "개발자 학습법과 성장 전략",
        "사이드 프로젝트 성공 사례",
        "오픈소스 기여 경험담",
        "개발 컨퍼런스 참여 후기",
        "개발자 커뮤니티 활동 경험",
      ],
    },
  ]

  const applicationProcess = [
    {
      step: 1,
      title: "신청서 작성",
      description: "온라인 신청 폼을 통해 발표 주제와 내용을 상세히 작성해주세요.",
      duration: "10-15분",
    },
    {
      step: 2,
      title: "1차 검토",
      description: "운영진이 신청 내용을 검토하고 발표 적합성을 판단합니다.",
      duration: "3-5일",
    },
    {
      step: 3,
      title: "연사 인터뷰",
      description: "화상 또는 전화 인터뷰를 통해 발표 내용을 구체화합니다.",
      duration: "30분",
    },
    {
      step: 4,
      title: "발표 확정",
      description: "최종 승인 후 발표 일정과 세부 사항을 조율합니다.",
      duration: "1-2일",
    },
    {
      step: 5,
      title: "발표 준비",
      description: "발표 자료 준비와 리허설을 진행합니다.",
      duration: "2-3주",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <img src="/logo.png" alt="개취뽀" className="w-10 h-10 rounded-lg" />
              </Link>
              <span className="text-xl font-bold text-white">개취뽀</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/#speakers" className="text-gray-300 hover:text-white transition-colors">
                연사 정보
              </Link>
              <Link href="/#activities" className="text-gray-300 hover:text-white transition-colors">
                활동 소개
              </Link>
              <Link href="/#community" className="text-gray-300 hover:text-white transition-colors">
                커뮤니티 채널
              </Link>
              <Link href="/apply">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                >
                  연사 신청
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/">
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            홈으로 돌아가기
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
            연사 신청 가이드
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            개취뽀 연사가 되어 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              경험을 나누세요
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            여러분의 소중한 개발 경험과 취업 노하우를 후배 개발자들과 공유해주세요. <br />
            개취뽀 연사가 되는 과정부터 발표까지, 모든 것을 안내해드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
              >
                <User className="mr-2 h-4 w-4" />
                지금 신청하기
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              문의하기
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-gray-800/50 border-gray-700 mb-8 grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
              개요
            </TabsTrigger>
            <TabsTrigger value="topics" className="data-[state=active]:bg-blue-600">
              발표 주제
            </TabsTrigger>
            <TabsTrigger value="process" className="data-[state=active]:bg-blue-600">
              신청 과정
            </TabsTrigger>
            <TabsTrigger value="preparation" className="data-[state=active]:bg-blue-600">
              발표 준비
            </TabsTrigger>
            <TabsTrigger value="faq" className="data-[state=active]:bg-blue-600">
              FAQ
            </TabsTrigger>
          </TabsList>

          {/* 개요 탭 */}
          <TabsContent value="overview" className="space-y-8">
            {/* 연사 혜택 */}
            <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-white">연사가 되면 얻을 수 있는 것들</CardTitle>
                <CardDescription className="text-gray-400">
                  개취뽀 연사 활동을 통해 얻을 수 있는 다양한 혜택들을 소개합니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {speakerBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="bg-blue-500/20 p-3 rounded-lg">
                        <benefit.icon className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                        <p className="text-gray-300 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 발표 환경 */}
            <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-white">발표 환경 및 조건</CardTitle>
                <CardDescription className="text-gray-400">
                  편안하고 안전한 환경에서 발표할 수 있도록 최선을 다해 지원합니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-blue-400" />
                      <div>
                        <h3 className="font-medium text-white">장소</h3>
                        <p className="text-gray-300 text-sm">강남역 인근 세미나실 (지하철 접근 용이)</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-blue-400" />
                      <div>
                        <h3 className="font-medium text-white">시간</h3>
                        <p className="text-gray-300 text-sm">분기별로 한 번씩 진행되는 오프라인 정기모임</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-blue-400" />
                      <div>
                        <h3 className="font-medium text-white">참석자</h3>
                        <p className="text-gray-300 text-sm">20-40명 (취업 준비생 및 주니어 개발자)</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Presentation className="h-5 w-5 text-blue-400" />
                      <div>
                        <h3 className="font-medium text-white">발표 시간</h3>
                        <p className="text-gray-300 text-sm">20분 (Q&A 포함)</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Coffee className="h-5 w-5 text-blue-400" />
                      <div>
                        <h3 className="font-medium text-white">제공 사항</h3>
                        <p className="text-gray-300 text-sm">간단한 다과, 발표 장비, 촬영 서비스</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-blue-400" />
                      <div>
                        <h3 className="font-medium text-white">연사 혜택</h3>
                        <p className="text-gray-300 text-sm">발표 영상 제공</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 발표 주제 탭 */}
          <TabsContent value="topics" className="space-y-8">
            <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-white">추천 발표 주제</CardTitle>
                <CardDescription className="text-gray-400">
                  개취뽀 참가자들이 가장 관심 있어하는 주제들을 카테고리별로 정리했습니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {presentationTopics.map((category, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        {category.category}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {category.topics.map((topic, topicIndex) => (
                          <div
                            key={topicIndex}
                            className="bg-gray-700/30 p-3 rounded-lg border border-gray-600/50 hover:border-blue-500/50 transition-colors"
                          >
                            <p className="text-gray-300 text-sm">{topic}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-300 mb-1">나만의 주제도 환영합니다!</h4>
                      <p className="text-gray-300 text-sm">
                        위 주제 외에도 여러분만의 독특한 경험이나 인사이트가 있다면 언제든 제안해주세요. 참신하고 유익한
                        주제라면 적극 환영합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 신청 과정 탭 */}
          <TabsContent value="process" className="space-y-8">
            <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-white">연사 신청 과정</CardTitle>
                <CardDescription className="text-gray-400">
                  신청부터 발표까지의 전체 과정을 단계별로 안내해드립니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {applicationProcess.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                          <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                            {step.duration}
                          </Badge>
                        </div>
                        <p className="text-gray-300">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Link href="/apply">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                    >
                      <User className="mr-2 h-4 w-4" />
                      연사 신청하기
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 발표 준비 탭 */}
          <TabsContent value="preparation" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-blue-400" />
                    발표 자료 준비
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">권장 슬라이드 구성</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• 자기소개 (2-3분)</li>
                      <li>• 주제 소개 및 배경 (3분)</li>
                      <li>• 핵심 내용 (10-12분)</li>
                      <li>• 결론 및 교훈 (2-3분)</li>
                      <li>• Q&A (5분)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">발표 자료 팁</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• 코드는 큰 폰트로 작성</li>
                      <li>• 실제 경험 위주로 구성</li>
                      <li>• 구체적인 수치나 결과 포함</li>
                      <li>• 시행착오와 해결 과정 강조</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Video className="mr-2 h-5 w-5 text-blue-400" />
                    발표 스킬
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">발표 전 준비</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• 발표 연습 (최소 3회 이상)</li>
                      <li>• 시간 체크 및 조절</li>
                      <li>• 예상 질문 준비</li>
                      <li>• 기술적 용어 설명 준비</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-2">발표 중 팁</h4>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• 청중과 아이컨택 유지</li>
                      <li>• 적절한 속도로 말하기</li>
                      <li>• 실습이나 데모 활용</li>
                      <li>• 질문 유도 및 상호작용</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">운영진 지원 사항</CardTitle>
                <CardDescription className="text-gray-400">
                  연사님들이 최고의 발표를 할 수 있도록 다양한 지원을 제공합니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <MessageSquare className="h-6 w-6 text-blue-400" />
                    </div>
                    <h4 className="font-medium text-white mb-2">발표 컨설팅</h4>
                    <p className="text-gray-300 text-sm">발표 구성과 내용에 대한 1:1 컨설팅 제공</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Video className="h-6 w-6 text-blue-400" />
                    </div>
                    <h4 className="font-medium text-white mb-2">리허설 지원</h4>
                    <p className="text-gray-300 text-sm">발표 전 리허설 기회와 피드백 제공</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <FileText className="h-6 w-6 text-blue-400" />
                    </div>
                    <h4 className="font-medium text-white mb-2">자료 검토</h4>
                    <p className="text-gray-300 text-sm">발표 자료에 대한 전문적인 검토와 개선 제안</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ 탭 */}
          <TabsContent value="faq" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-white">자주 묻는 질문</CardTitle>
                <CardDescription className="text-gray-400">
                  연사 신청과 관련해 자주 문의하시는 질문들을 정리했습니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-white mb-2">Q. 발표 경험이 없어도 신청할 수 있나요?</h4>
                    <p className="text-gray-300 text-sm">
                      네, 발표 경험이 없어도 괜찮습니다. 오히려 개취뽀는 발표 경험을 쌓을 수 있는 좋은 기회입니다.
                      운영진이 발표 준비부터 실제 발표까지 전 과정을 지원해드립니다.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-white mb-2">Q. 어느 정도 경력이 있어야 연사가 될 수 있나요?</h4>
                    <p className="text-gray-300 text-sm">
                      경력보다는 공유할 만한 경험이나 인사이트가 있는지가 중요합니다. 신입 개발자라도 취업 과정에서의
                      경험이나 학습 방법 등을 공유할 수 있습니다. 1년 이상의 실무 경험이 있으면 더욱 좋습니다.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-white mb-2">Q. 발표 주제는 어떻게 정해야 하나요?</h4>
                    <p className="text-gray-300 text-sm">
                      본인의 실제 경험을 바탕으로 한 주제가 가장 좋습니다. 기술적인 도전과 해결 과정, 커리어 전환 경험,
                      특정 도구나 프레임워크 사용 경험 등이 인기가 높습니다. 운영진과 상담을 통해 주제를 구체화할 수
                      있습니다.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-white mb-2">Q. 발표 영상이 온라인에 공개되나요?</h4>
                    <p className="text-gray-300 text-sm">
                      연사님의 동의 하에 발표 영상을 촬영하고, 유튜브 등에 업로드합니다. 개인정보나 회사 기밀이 포함된
                      부분은 편집을 통해 제거하며, 공개를 원하지 않으시면 촬영하지 않을 수도 있습니다.
                    </p>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-white mb-2">Q. 연사료는 얼마나 받을 수 있나요?</h4>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-white mb-2">Q. 발표 후 피드백을 받을 수 있나요?</h4>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-300 mb-1">추가 문의사항이 있으신가요?</h4>
                      <p className="text-gray-300 text-sm mb-3">
                        위에서 답변을 찾지 못하셨다면 언제든 문의해주세요. 카카오톡 오픈채팅이나 디스코드를 통해
                        실시간으로 답변해드립니다.
                      </p>
                      <div className="flex space-x-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-500/50 text-green-300 hover:bg-green-500/20"
                          onClick={() => window.open("https://open.kakao.com/o/gPI6kTUg", "_blank")}
                        >
                          카카오톡 문의
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-500/50 text-green-300 hover:bg-green-500/20"
                          onClick={() => window.open("https://discord.gg/X74q5Yw3Sv", "_blank")}
                        >
                          디스코드 문의
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-800/50">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">지금 바로 연사 신청하세요</h2>
            <p className="text-xl text-gray-300 mb-8">
              여러분의 소중한 경험이 누군가에게는 큰 도움이 될 수 있습니다. <br />
              개취뽀와 함께 개발자 커뮤니티의 성장에 기여해주세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                >
                  <User className="mr-2 h-4 w-4" />
                  연사 신청하기
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                onClick={() => window.open("https://open.kakao.com/o/gPI6kTUg", "_blank")}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                사전 문의하기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src="/logo.png" alt="개취뽀" className="w-8 h-8 rounded-lg" />
                <span className="text-xl font-bold">개취뽀</span>
              </div>
              <p className="text-gray-400">개발자 취업을 뽀개는 커뮤니티</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">커뮤니티</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/#speakers" className="hover:text-white transition-colors">
                    연사 정보
                  </Link>
                </li>
                <li>
                  <Link href="/#activities" className="hover:text-white transition-colors">
                    활동 소개
                  </Link>
                </li>
                <li>
                  <Link href="/#community" className="hover:text-white transition-colors">
                    커뮤니티 채널
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">참여하기</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/apply" className="hover:text-white transition-colors">
                    연사 신청
                  </Link>
                </li>
                <li>
                  <Link href="/speaker-guide" className="hover:text-white transition-colors">
                    연사 가이드
                  </Link>
                </li>
                <li>
                  <a
                    href="https://open.kakao.com/o/gPI6kTUg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    카카오톡 오픈채팅
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/X74q5Yw3Sv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    디스코드 채널
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">문의</h3>
              <ul className="space-y-2 text-gray-400">
                <li>academey@gmail.com</li>
                <li>카카오톡 오픈채팅</li>
                <li>디스코드 커뮤니티</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 개취뽀. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
