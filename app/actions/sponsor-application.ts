'use server';

import { createServerSupabaseClient } from '@/lib/supabase';

interface SponsorApplicationData {
  companyName: string;
  companySize: string;
  industry: string;
  website: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactPosition: string;
  sponsorType: string;
  sponsorAmount: string;
  sponsorPeriod: string;
  motivation: string;
  additionalInfo: string;
  agreements: string;
}

export async function submitSponsorApplication(
  prevState: any,
  formData: FormData,
): Promise<{ success?: boolean; error?: string; applicationId?: string }> {
  try {
    // 폼 데이터 추출
    const data: SponsorApplicationData = {
      companyName: formData.get('companyName') as string,
      companySize: formData.get('companySize') as string,
      industry: formData.get('industry') as string,
      website: formData.get('website') as string,
      contactName: formData.get('contactName') as string,
      contactEmail: formData.get('contactEmail') as string,
      contactPhone: formData.get('contactPhone') as string,
      contactPosition: formData.get('contactPosition') as string,
      sponsorType: formData.get('sponsorType') as string,
      sponsorAmount: formData.get('sponsorAmount') as string,
      sponsorPeriod: formData.get('sponsorPeriod') as string,
      motivation: formData.get('motivation') as string,
      additionalInfo: formData.get('additionalInfo') as string,
      agreements: formData.get('agreements') as string,
    };

    // 필수 필드 검증
    const requiredFields = [
      'companyName',
      'contactName',
      'contactEmail',
      'contactPhone',
      'motivation',
    ];
    for (const field of requiredFields) {
      if (!data[field as keyof SponsorApplicationData]) {
        return { error: `${field} 필드는 필수입니다.` };
      }
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contactEmail)) {
      return { error: '올바른 이메일 형식을 입력해주세요.' };
    }

    // 후원 방식 검증
    let sponsorTypes: string[] = [];
    try {
      sponsorTypes = JSON.parse(data.sponsorType);
    } catch {
      return { error: '후원 방식을 선택해주세요.' };
    }

    if (sponsorTypes.length === 0) {
      return { error: '최소 하나의 후원 방식을 선택해주세요.' };
    }

    // 동의 사항 검증
    let agreements;
    try {
      agreements = JSON.parse(data.agreements);
    } catch {
      return { error: '동의 사항 데이터가 올바르지 않습니다.' };
    }

    if (!agreements.privacy || !agreements.promotion || !agreements.contact) {
      return { error: '모든 동의 사항에 체크해주세요.' };
    }

    // Supabase 클라이언트 생성
    const supabase = createServerSupabaseClient();

    // 중복 신청 확인 (같은 회사로 30일 내 신청)
    const { data: existingApplication } = await supabase
      .from('sponsor_applications')
      .select('id, created_at')
      .eq('company_name', data.companyName)
      .gte(
        'created_at',
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      )
      .single();

    if (existingApplication) {
      return {
        error: '30일 내에 이미 신청하신 회사입니다. 잠시 후 다시 시도해주세요.',
      };
    }

    // 데이터베이스에 저장할 객체 생성
    const applicationData = {
      company_name: data.companyName.trim(),
      company_size: data.companySize || null,
      industry: data.industry?.trim() || null,
      website: data.website?.trim() || null,
      contact_name: data.contactName.trim(),
      contact_email: data.contactEmail.toLowerCase().trim(),
      contact_phone: data.contactPhone.trim(),
      contact_position: data.contactPosition?.trim() || null,
      sponsor_types: sponsorTypes,
      sponsor_amount: data.sponsorAmount || null,
      sponsor_period: data.sponsorPeriod || null,
      motivation: data.motivation.trim(),
      additional_info: data.additionalInfo?.trim() || null,
      agreements: agreements,
      status: 'pending',
    };

    // Supabase에 데이터 삽입
    const { data: insertedData, error: insertError } = await supabase
      .from('sponsor_applications')
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
    console.log('후원 신청 접수 완료:', {
      id: insertedData.id,
      companyName: data.companyName,
      contactEmail: data.contactEmail,
      sponsorTypes: sponsorTypes,
      timestamp: new Date().toISOString(),
    });

    // 관리자 알림 이메일 발송 시뮬레이션
    console.log('관리자 알림 이메일 발송:', {
      to: 'admin@gaechwibboo.com',
      subject: `[개취뽀] 새로운 후원 신청: ${data.companyName}`,
      applicationId: insertedData.id,
      company: data.companyName,
      contact: data.contactName,
      sponsorTypes: sponsorTypes,
    });

    return {
      success: true,
      applicationId: insertedData.id,
    };
  } catch (error) {
    console.error('후원 신청 처리 중 오류:', error);
    return {
      error:
        '신청 처리 중 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    };
  }
}
