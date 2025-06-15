"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

interface NewsletterResponse {
  success?: boolean
  error?: string
}

export async function subscribeToNewsletter(prevState: any, formData: FormData): Promise<NewsletterResponse> {
  try {
    const email = formData.get("email") as string

    // 이메일 유효성 검사
    if (!email || !email.includes("@")) {
      return { error: "유효한 이메일 주소를 입력해주세요." }
    }

    // Supabase 클라이언트 생성
    const supabase = createServerSupabaseClient()

    // 중복 구독 확인
    const { data: existingSubscriber } = await supabase
      .from("newsletter_subscribers")
      .select("id")
      .eq("email", email.toLowerCase())
      .single()

    if (existingSubscriber) {
      return { error: "이미 구독 중인 이메일입니다." }
    }

    // 데이터베이스에 저장
    const { error: insertError } = await supabase.from("newsletter_subscribers").insert([
      {
        email: email.toLowerCase(),
        subscribed_at: new Date().toISOString(),
        is_active: true,
      },
    ])

    if (insertError) {
      console.error("구독 저장 오류:", insertError)
      return { error: "구독 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." }
    }

    // 성공 로그
    console.log("뉴스레터 구독 완료:", {
      email: email,
      timestamp: new Date().toISOString(),
    })

    return { success: true }
  } catch (error) {
    console.error("뉴스레터 구독 처리 중 오류:", error)
    return { error: "구독 처리 중 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요." }
  }
}
