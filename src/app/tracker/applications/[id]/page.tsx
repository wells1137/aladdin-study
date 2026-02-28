'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { trackerFetch } from '@/lib/trackerClient';

type ChecklistItem = {
  templateId: number;
  name: string;
  isRequired: boolean;
  uploaded: boolean;
  uploadId?: number;
  reviewStatus: string | null;
  fileUrl: string | null;
};

type Checklist = {
  applicationId: number;
  completionRate: number;
  requiredTotal: number;
  requiredUploaded: number;
  checklist: ChecklistItem[];
};

type AppDetail = {
  id: number;
  status: string;
  student: { name: string; email?: string };
  university: { name: string };
  materials: { id: number; templateId: number; fileName: string; fileUrl: string; reviewStatus: string }[];
};

const STATUS_LABEL: Record<string, string> = {
  draft: '草稿',
  uploading: '上传中',
  under_review: '审核中',
  revision_needed: '需修改',
  approved: '已通过',
  rejected: '已拒绝',
};

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [detail, setDetail] = useState<AppDetail | null>(null);
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingFor, setUploadingFor] = useState<number | null>(null);
  const [submitReviewLoading, setSubmitReviewLoading] = useState(false);

  const load = () => {
    if (Number.isNaN(id)) return;
    Promise.all([
      trackerFetch(`/api/tracker/applications/${id}`).then((r) => r.json()),
      trackerFetch(`/api/tracker/applications/${id}/checklist`).then((r) => r.json()),
    ])
      .then(([d, c]) => {
        setDetail(d);
        setChecklist(c);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleFileUpload = async (templateId: number, file: File) => {
    setUploadingFor(templateId);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const fileBase64 = (reader.result as string).split(',')[1];
        const res = await trackerFetch('/api/tracker/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            applicationId: id,
            templateId,
            fileName: file.name,
            fileBase64,
            mimeType: file.type,
            fileSize: file.size,
          }),
        });
        if (res.ok) load();
        else {
          const err = await res.json();
          alert(err.error || '上传失败');
        }
        setUploadingFor(null);
      };
      reader.readAsDataURL(file);
    } catch {
      setUploadingFor(null);
    }
  };

  const submitReview = async () => {
    setSubmitReviewLoading(true);
    try {
      const res = await trackerFetch(`/api/tracker/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'under_review' }),
      });
      if (res.ok) load();
      else {
        const err = await res.json();
        alert(err.error || '提交失败');
      }
    } finally {
      setSubmitReviewLoading(false);
    }
  };

  if (loading || !detail) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-slate-500">加载中…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/tracker/applications" className="text-slate-500 hover:text-slate-700 text-sm">
          ← 返回申请列表
        </Link>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            申请详情 #{detail.id} · {detail.student?.name} · {detail.university?.name}
          </h1>
          <p className="mt-1 text-slate-500">
            状态：<span className="font-medium text-slate-700">{STATUS_LABEL[detail.status] ?? detail.status}</span>
            {checklist && (
              <span className="ml-4">
                材料完成率：<span className="font-medium text-emerald-600">{checklist.completionRate}%</span>
                （{checklist.requiredUploaded}/{checklist.requiredTotal} 项必需）
              </span>
            )}
          </p>
        </div>
        {['draft', 'uploading', 'revision_needed'].includes(detail.status) && (
          <button
            type="button"
            onClick={submitReview}
            disabled={submitReviewLoading || (checklist?.requiredUploaded ?? 0) < (checklist?.requiredTotal ?? 1)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 text-sm font-medium"
          >
            {submitReviewLoading ? '提交中…' : '提交审核'}
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 font-medium text-slate-800">材料清单与上传</div>
        <ul className="divide-y divide-slate-200">
          {checklist?.checklist.map((item) => (
            <li key={item.templateId} className="px-4 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                    item.uploaded ? 'bg-emerald-100 text-emerald-700' : item.isRequired ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {item.uploaded ? '✓' : '—'}
                </span>
                <span className={item.uploaded ? 'text-slate-800' : item.isRequired ? 'text-slate-800 font-medium' : 'text-slate-500'}>
                  {item.name}
                  {item.isRequired && <span className="text-red-500 ml-1">*</span>}
                </span>
                {item.uploaded && item.reviewStatus && (
                  <span className="text-xs text-slate-500">
                    （审核：{item.reviewStatus === 'approved' ? '通过' : item.reviewStatus === 'rejected' ? '拒绝' : item.reviewStatus === 'reupload_needed' ? '需重传' : '待审'}）
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {item.uploaded && item.fileUrl && (
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-emerald-600 hover:text-emerald-700"
                  >
                    查看
                  </a>
                )}
                {item.uploaded && (
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="hidden"
                    id={`reupload-${item.templateId}`}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFileUpload(item.templateId, f);
                    }}
                  />
                )}
                <label
                  htmlFor={item.uploaded ? `reupload-${item.templateId}` : `upload-${item.templateId}`}
                  className="text-sm text-emerald-600 hover:text-emerald-700 cursor-pointer"
                >
                  {uploadingFor === item.templateId ? '上传中…' : item.uploaded ? '重传' : '上传'}
                </label>
                {!item.uploaded && (
                  <input
                    type="file"
                    id={`upload-${item.templateId}`}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFileUpload(item.templateId, f);
                    }}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
