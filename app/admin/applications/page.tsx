'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  getSpeakerApplications,
  updateApplicationStatus,
} from '@/app/actions/speaker-application';
import type { SpeakerApplication } from '@/lib/supabase';
import {
  Calendar,
  User,
  Building,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<SpeakerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    const result = await getSpeakerApplications();
    if (result.error) {
      setError(result.error);
    } else {
      setApplications(result.data || []);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (
    applicationId: string,
    status: 'approved' | 'rejected',
  ) => {
    setUpdatingStatus(applicationId);
    const result = await updateApplicationStatus(applicationId, status);
    if (result.error) {
      setError(result.error);
    } else {
      // 상태 업데이트 후 목록 새로고침
      await loadApplications();
    }
    setUpdatingStatus(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-500/20 text-yellow-300"
          >
            대기중
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="secondary" className="bg-green-500/20 text-green-300">
            승인됨
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="secondary" className="bg-red-500/20 text-red-300">
            거절됨
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filterApplications = (status?: string) => {
    if (!status) return applications;
    return applications.filter(app => app.status === status);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-300">신청서를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <img
                  src="/logo.png"
                  alt="개취뽀"
                  className="w-10 h-10 rounded-lg"
                />
              </Link>
              <span className="text-xl font-bold text-white">
                개취뽀 관리자
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">연사 신청 관리</h1>
          <p className="text-gray-400">
            Supabase에 저장된 연사 신청서를 관리할 수 있습니다.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-gray-800/50 border-gray-700 mb-6">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-blue-600"
            >
              전체 ({applications.length})
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-blue-600"
            >
              대기중 ({filterApplications('pending').length})
            </TabsTrigger>
            <TabsTrigger
              value="approved"
              className="data-[state=active]:bg-blue-600"
            >
              승인됨 ({filterApplications('approved').length})
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              className="data-[state=active]:bg-blue-600"
            >
              거절됨 ({filterApplications('rejected').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ApplicationList
              applications={applications}
              onStatusUpdate={handleStatusUpdate}
              updatingStatus={updatingStatus}
            />
          </TabsContent>

          <TabsContent value="pending">
            <ApplicationList
              applications={filterApplications('pending')}
              onStatusUpdate={handleStatusUpdate}
              updatingStatus={updatingStatus}
            />
          </TabsContent>

          <TabsContent value="approved">
            <ApplicationList
              applications={filterApplications('approved')}
              onStatusUpdate={handleStatusUpdate}
              updatingStatus={updatingStatus}
            />
          </TabsContent>

          <TabsContent value="rejected">
            <ApplicationList
              applications={filterApplications('rejected')}
              onStatusUpdate={handleStatusUpdate}
              updatingStatus={updatingStatus}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface ApplicationListProps {
  applications: SpeakerApplication[];
  onStatusUpdate: (id: string, status: 'approved' | 'rejected') => void;
  updatingStatus: string | null;
}

function ApplicationList({
  applications,
  onStatusUpdate,
  updatingStatus,
}: ApplicationListProps) {
  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">신청서가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {applications.map(application => (
        <Card
          key={application.id}
          className="bg-gray-800/50 border-gray-700 shadow-xl"
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <User className="h-5 w-5 text-blue-400" />
                  <CardTitle className="text-white">
                    {application.name}
                  </CardTitle>
                  {getStatusBadge(application.status || 'pending')}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Building className="h-4 w-4" />
                    <span>
                      {application.company} · {application.position}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(application.created_at!).toLocaleDateString(
                        'ko-KR',
                      )}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{application.duration}</span>
                  </div>
                </div>
              </div>
              {application.status === 'pending' && (
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => onStatusUpdate(application.id!, 'approved')}
                    disabled={updatingStatus === application.id}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {updatingStatus === application.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onStatusUpdate(application.id!, 'rejected')}
                    disabled={updatingStatus === application.id}
                  >
                    {updatingStatus === application.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-white mb-1">발표 주제</h4>
                <p className="text-gray-300">{application.topic}</p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">발표 내용</h4>
                <p className="text-gray-300 text-sm">
                  {application.description}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">기술 스택</h4>
                <div className="flex flex-wrap gap-2">
                  {application.skills.map(skill => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-blue-500/20 text-blue-300 border-blue-500/30"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-white mb-1">연락처</h4>
                <p className="text-gray-300 text-sm">
                  {application.email} · {application.phone}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
