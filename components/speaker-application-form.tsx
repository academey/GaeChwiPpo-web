"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { submitSpeakerApplication } from "@/app/actions/speaker-application"
import { useActionState } from "react"
import { Loader2, User, Briefcase, Presentation, MessageSquare, CheckCircle, X, Database } from "lucide-react"

interface FormData {
  // 개인 정보
  name: string
  email: string
  phone: string
  // 회사/경력 정보
  company: string
  position: string
  experience: string
  // 발표 정보
  topic: string
  description: string
  duration: string
  format: string
  // 기술 스택
  skills: string[]
  // 발표 경험
  hasExperience: boolean
  previousTalks: string
  // 추가 정보
  motivation: string
  additionalInfo: string
  // 동의 사항
  agreements: {
    privacy: boolean
    recording: boolean
    materials: boolean
  }
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  position: "",
  experience: "",
  topic: "",
  description: "",
  duration: "",
  format: "",
  skills: [],
  hasExperience: false,
  previousTalks: "",
  motivation: "",
  additionalInfo: "",
  agreements: {
    privacy: false,
    recording: false,
    materials: false,
  },
}

const skillOptions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vue.js",
  "Angular",
  "Node.js",
  "Python",
  "Java",
  "Spring",
  "Kotlin",
  "Swift",
  "Flutter",
  "React Native",
  "AWS",
  "Docker",
  "Kubernetes",
  "GraphQL",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "Git",
  "CI/CD",
  "DevOps",
  "Machine Learning",
  "AI",
  "Blockchain",
  "기타",
]

export default function SpeakerApplicationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [state, formAction, isPending] = useActionState(submitSpeakerApplication, null)

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateNestedFormData = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof FormData],
        [field]: value,
      },
    }))
  }

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.company &&
      formData.position &&
      formData.topic &&
      formData.description &&
      formData.motivation &&
      formData.agreements.privacy &&
      formData.agreements.recording &&
      formData.agreements.materials
    )
  }

  if (state?.success) {
    return (
      <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
        <CardContent className="p-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <Database className="h-6 w-6 text-blue-400 absolute -bottom-1 -right-1 bg-gray-800 rounded-full p-1" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">신청이 완료되었습니다!</h2>
          <p className="text-gray-300 mb-2">
            연사 신청해주셔서 감사합니다. <br />
            신청 내용이 데이터베이스에 안전하게 저장되었습니다.
          </p>
          {state.applicationId && <p className="text-sm text-gray-400 mb-6">신청 ID: {state.applicationId}</p>}
          <p className="text-gray-300 mb-6">검토 후 1주일 내에 연락드리겠습니다.</p>
          <Button
            onClick={() => {
              setFormData(initialFormData)
              window.location.href = "/"
            }}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
          >
            홈으로 돌아가기
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form action={formAction}>
      <div className="space-y-8">
        {/* 개인 정보 */}
        <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-white">개인 정보</CardTitle>
            </div>
            <CardDescription className="text-gray-400">기본적인 개인 정보를 입력해주세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">
                  이름 *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                  placeholder="홍길동"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">
                  이메일 *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                  placeholder="hong@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone" className="text-gray-300">
                연락처 *
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white"
                placeholder="010-1234-5678"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* 회사/경력 정보 */}
        <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-white">회사/경력 정보</CardTitle>
            </div>
            <CardDescription className="text-gray-400">현재 소속과 경력 정보를 입력해주세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company" className="text-gray-300">
                  회사명 *
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={(e) => updateFormData("company", e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                  placeholder="네이버"
                  required
                />
              </div>
              <div>
                <Label htmlFor="position" className="text-gray-300">
                  직책 *
                </Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={(e) => updateFormData("position", e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                  placeholder="프론트엔드 개발자"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="experience" className="text-gray-300">
                경력 기간
              </Label>
              <Select name="experience" onValueChange={(value) => updateFormData("experience", value)}>
                <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue placeholder="경력을 선택해주세요" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600 text-white">
                  <SelectItem value="신입" className="text-white hover:bg-gray-700">
                    신입 (1년 미만)
                  </SelectItem>
                  <SelectItem value="1-2년" className="text-white hover:bg-gray-700">
                    1-2년
                  </SelectItem>
                  <SelectItem value="3-5년" className="text-white hover:bg-gray-700">
                    3-5년
                  </SelectItem>
                  <SelectItem value="5-10년" className="text-white hover:bg-gray-700">
                    5-10년
                  </SelectItem>
                  <SelectItem value="10년+" className="text-white hover:bg-gray-700">
                    10년 이상
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 발표 정보 */}
        <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Presentation className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-white">발표 정보</CardTitle>
            </div>
            <CardDescription className="text-gray-400">발표하고 싶은 주제와 내용을 상세히 작성해주세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="topic" className="text-gray-300">
                발표 주제 *
              </Label>
              <Input
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={(e) => updateFormData("topic", e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white"
                placeholder="React에서 Next.js로 마이그레이션 경험담"
                required
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-gray-300">
                발표 내용 설명 *
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white min-h-[120px]"
                placeholder="발표 내용을 상세히 설명해주세요. 어떤 경험을 공유하고 싶으신지, 청중이 얻을 수 있는 인사이트는 무엇인지 등을 포함해주세요."
                required
              />
            </div>
            <input type="hidden" name="duration" value="20분 이내" />
            <input type="hidden" name="format" value="오프라인 모임" />
          </CardContent>
        </Card>

        {/* 기술 스택 */}
        <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">기술 스택</CardTitle>
            <CardDescription className="text-gray-400">발표와 관련된 기술 스택을 선택해주세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {skillOptions.map((skill) => (
                <Button
                  key={skill}
                  type="button"
                  variant={formData.skills.includes(skill) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSkill(skill)}
                  className={
                    formData.skills.includes(skill)
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border-gray-600 text-gray-300 hover:bg-gray-700"
                  }
                >
                  {skill}
                </Button>
              ))}
            </div>
            {formData.skills.length > 0 && (
              <div>
                <Label className="text-gray-300 mb-2 block">선택된 기술 스택:</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)} className="ml-2 hover:text-red-400">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <input type="hidden" name="skills" value={JSON.stringify(formData.skills)} />
          </CardContent>
        </Card>

        {/* 발표 경험 */}
        <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-white">발표 경험</CardTitle>
            </div>
            <CardDescription className="text-gray-400">이전 발표 경험이 있다면 공유해주세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasExperience"
                checked={formData.hasExperience}
                onCheckedChange={(checked) => updateFormData("hasExperience", checked)}
                className="border-gray-600"
              />
              <Label htmlFor="hasExperience" className="text-gray-300">
                이전에 발표 경험이 있습니다
              </Label>
            </div>
            {formData.hasExperience && (
              <div>
                <Label htmlFor="previousTalks" className="text-gray-300">
                  이전 발표 경험
                </Label>
                <Textarea
                  id="previousTalks"
                  name="previousTalks"
                  value={formData.previousTalks}
                  onChange={(e) => updateFormData("previousTalks", e.target.value)}
                  className="bg-gray-700/50 border-gray-600 text-white"
                  placeholder="언제, 어디서, 어떤 주제로 발표했는지 간단히 설명해주세요."
                />
              </div>
            )}
            <input type="hidden" name="hasExperience" value={formData.hasExperience.toString()} />
          </CardContent>
        </Card>

        {/* 추가 정보 */}
        <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">추가 정보</CardTitle>
            <CardDescription className="text-gray-400">
              발표 동기와 추가로 전달하고 싶은 내용을 작성해주세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="motivation" className="text-gray-300">
                발표 동기 *
              </Label>
              <Textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={(e) => updateFormData("motivation", e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white"
                placeholder="개취뽀에서 발표하고 싶은 이유와 청중들에게 전달하고 싶은 메시지를 작성해주세요."
                required
              />
            </div>
            <div>
              <Label htmlFor="additionalInfo" className="text-gray-300">
                기타 사항
              </Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => updateFormData("additionalInfo", e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white"
                placeholder="추가로 전달하고 싶은 내용이나 요청사항이 있다면 작성해주세요."
              />
            </div>
          </CardContent>
        </Card>

        {/* 동의 사항 */}
        <Card className="bg-gray-800/50 border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">동의 사항</CardTitle>
            <CardDescription className="text-gray-400">아래 사항에 동의해주세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacy"
                  checked={formData.agreements.privacy}
                  onCheckedChange={(checked) => updateNestedFormData("agreements", "privacy", checked)}
                  className="border-gray-600 mt-1"
                />
                <Label htmlFor="privacy" className="text-gray-300 leading-relaxed">
                  개인정보 수집 및 이용에 동의합니다. (연사 선정 및 행사 진행 목적으로만 사용됩니다)
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="recording"
                  checked={formData.agreements.recording}
                  onCheckedChange={(checked) => updateNestedFormData("agreements", "recording", checked)}
                  className="border-gray-600 mt-1"
                />
                <Label htmlFor="recording" className="text-gray-300 leading-relaxed">
                  발표 영상 촬영 및 온라인 공유에 동의합니다. (커뮤니티 발전 및 지식 공유 목적)
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="materials"
                  checked={formData.agreements.materials}
                  onCheckedChange={(checked) => updateNestedFormData("agreements", "materials", checked)}
                  className="border-gray-600 mt-1"
                />
                <Label htmlFor="materials" className="text-gray-300 leading-relaxed">
                  발표 자료 공유에 동의합니다. (참석자들에게 발표 자료를 공유할 수 있습니다)
                </Label>
              </div>
            </div>
            <input type="hidden" name="agreements" value={JSON.stringify(formData.agreements)} />
          </CardContent>
        </Card>

        {/* 제출 버튼 */}
        <div className="text-center">
          {state?.error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400">{state.error}</p>
            </div>
          )}
          <Button
            type="submit"
            disabled={!isFormValid() || isPending}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                두근두근 연사 신청하는 중..!!
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                연사 신청하기
              </>
            )}
          </Button>
          <p className="text-gray-400 text-sm mt-2">* 표시된 항목은 필수 입력 사항입니다</p>
        </div>
      </div>
    </form>
  )
}
