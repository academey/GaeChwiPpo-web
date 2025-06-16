'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { subscribeToNewsletter } from '@/app/actions/newsletter';
import { useActionState } from 'react';
import { Bell, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    null,
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          다음 발표 소식 받기
        </h2>
        <p className="text-xl text-blue-100">
          이메일로 다음 모임과 발표 소식을 받아보세요
        </p>
      </div>

      {state?.success ? (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center max-w-md mx-auto">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            구독이 완료되었습니다!
          </h3>
          <p className="text-gray-300">
            개취뽀의 다음 모임과 발표 소식을 이메일로 받아보실 수 있습니다.
            감사합니다!
          </p>
        </div>
      ) : (
        <form
          action={formAction}
          className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
        >
          <div className="flex-1">
            <Input
              type="email"
              name="email"
              placeholder="이메일 주소를 입력하세요"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-gray-700/50 border-gray-600 text-white h-12"
              required
              disabled={isPending}
            />
            {state?.error && (
              <div className="mt-2 flex items-center text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                {state.error}
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white h-12"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                처리 중...
              </>
            ) : (
              <>
                <Bell className="mr-2 h-4 w-4" />
                구독하기
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
