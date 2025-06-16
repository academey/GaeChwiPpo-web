'use server';

import { createServerSupabaseClient } from '@/lib/supabase';
import type { SpeakerApplication } from '@/lib/supabase';

interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  experience: string;
  topic: string;
  description: string;
  duration: string;
  format: string;
  skills: string;
  hasExperience: string;
  previousTalks: string;
  motivation: string;
  additionalInfo: string;
  agreements: string;
}

export async function submitSpeakerApplication(
  _: unknown,
  formData: FormData,
): Promise<{ success?: boolean; error?: string; applicationId?: string }> {
  try {
    // 폼 데이터 추출
    const data: ApplicationFormData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
      position: formData.get('position') as string,
      experience: formData.get('experience') as string,
      topic: formData.get('topic') as string,
      description: formData.get('description') as string,
      duration: formData.get('duration') as string,
      format: formData.get('format') as string,
      skills: formData.get('skills') as string,
      hasExperience: formData.get('hasExperience') as string,
      previousTalks: formData.get('previousTalks') as string,
      motivation: formData.get('motivation') as string,
      additionalInfo: formData.get('additionalInfo') as string,
      agreements: formData.get('agreements') as string,
    };

    // 필수 필드 검증
    const requiredFields = [
      'name',
      'email',
      'phone',
      'company',
      'position',
      'topic',
      'description',
      'duration',
      'format',
      'motivation',
    ];

    for (const field of requiredFields) {
      if (!data[field as keyof ApplicationFormData]) {
        return { error: `${field} 필드는 필수입니다.` };
      }
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { error: '올바른 이메일 형식을 입력해주세요.' };
    }

    // 동의 사항 검증
    let agreements;
    try {
      agreements = JSON.parse(data.agreements);
    } catch {
      return { error: '동의 사항 데이터가 올바르지 않습니다.' };
    }

    if (!agreements.privacy || !agreements.recording || !agreements.materials) {
      return { error: '모든 동의 사항에 체크해주세요.' };
    }

    // 기술 스택 파싱
    let skills: string[];
    try {
      skills = JSON.parse(data.skills);
    } catch {
      skills = [];
    }

    // Supabase 클라이언트 생성
    const supabase = createServerSupabaseClient();

    // 중복 신청 확인 (같은 이메일로 24시간 내 신청)
    const { data: existingApplication } = await supabase
      .from('speaker_applications')
      .select('id, created_at')
      .eq('email', data.email)
      .gte(
        'created_at',
        new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      )
      .single();

    if (existingApplication) {
      return {
        error: '24시간 내에 이미 신청하셨습니다. 잠시 후 다시 시도해주세요.',
      };
    }

    // 데이터베이스에 저장할 객체 생성
    const applicationData: Omit<
      SpeakerApplication,
      'id' | 'created_at' | 'updated_at'
    > = {
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      phone: data.phone.trim(),
      company: data.company.trim(),
      position: data.position.trim(),
      experience: data.experience || undefined,
      topic: data.topic.trim(),
      description: data.description.trim(),
      duration: data.duration,
      format: data.format,
      skills: skills,
      has_experience: data.hasExperience === 'true',
      previous_talks: data.previousTalks?.trim() || undefined,
      motivation: data.motivation.trim(),
      additional_info: data.additionalInfo?.trim() || undefined,
      agreements: agreements,
      status: 'pending',
    };

    // Supabase에 데이터 삽입
    const { data: insertedData, error: insertError } = await supabase
      .from('speaker_applications')
      .insert([applicationData])
      .select('id')
      .single();

    if (insertError) {
      console.error('Supabase 삽입 오류:', insertError);
      return {
        error:
          '데이터베이스 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      };
    }

    // 성공 로그
    console.log('연사 신청 접수 완료:', {
      id: insertedData.id,
      name: data.name,
      email: data.email,
      company: data.company,
      topic: data.topic,
      timestamp: new Date().toISOString(),
    });

    // 관리자 알림 이메일 발송 시뮬레이션
    console.log('관리자 알림 이메일 발송:', {
      to: 'admin@gaechwibboo.com',
      subject: `[개취뽀] 새로운 연사 신청: ${data.name} - ${data.topic}`,
      applicationId: insertedData.id,
      applicant: data.name,
      company: data.company,
      topic: data.topic,
    });

    return {
      success: true,
      applicationId: insertedData.id,
    };
  } catch (error: unknown) {
    console.error('연사 신청 처리 중 오류:', error);
    return {
      error:
        '신청 처리 중 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    };
  }
}

// 연사 신청 목록 조회 (관리자용)
export async function getSpeakerApplications(status?: string) {
  try {
    const supabase = createServerSupabaseClient();

    let query = supabase
      .from('speaker_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('신청서 조회 오류:', error);
      return { error: '신청서를 불러오는 중 오류가 발생했습니다.' };
    }

    return { data };
  } catch (error) {
    console.error('신청서 조회 중 오류:', error);
    return { error: '신청서 조회 중 예상치 못한 오류가 발생했습니다.' };
  }
}

// 연사 신청 상태 업데이트 (관리자용)
export async function updateApplicationStatus(
  applicationId: string,
  status: 'pending' | 'approved' | 'rejected',
) {
  try {
    const supabase = createServerSupabaseClient();

    const { data, error } = await supabase
      .from('speaker_applications')
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', applicationId)
      .select()
      .single();

    if (error) {
      console.error('상태 업데이트 오류:', error);
      return { error: '상태 업데이트 중 오류가 발생했습니다.' };
    }

    return { data };
  } catch (error) {
    console.error('상태 업데이트 중 오류:', error);
    return { error: '상태 업데이트 중 예상치 못한 오류가 발생했습니다.' };
  }
}
