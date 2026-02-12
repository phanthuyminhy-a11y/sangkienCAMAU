import React from 'react';
import { ReportData } from '../types';

interface ReportPreviewProps {
  data: ReportData;
}

export function ReportPreview({ data }: ReportPreviewProps) {
  return (
    <div className="bg-white min-h-screen p-16 report-font">
      {/* Header */}
      <div className="text-center mb-12 border-b-2 border-slate-300 pb-8">
        <h1 className="text-3xl font-bold mb-6 uppercase">{data.title || 'Tiêu đề sáng kiến'}</h1>
        <div className="space-y-2 text-sm">
          <p><strong>Người thực hiện:</strong> {data.author || '...'}</p>
          <p><strong>Đơn vị:</strong> {data.unit || '...'}</p>
          <p><strong>Cộng tác viên:</strong> {data.collaborators || 'Không'}</p>
          <p><strong>Thời gian:</strong> {data.startDate || '...'} - {data.endDate || '...'}</p>
        </div>
      </div>

      {/* I. ĐẶT VẤN ĐỀ */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">I. ĐẶT VẤN ĐỀ</h2>
        <div className="whitespace-pre-wrap text-justify leading-relaxed">
          {data.problemStatement.necessity || 'Chưa có nội dung...'}
        </div>
      </section>

      {/* II. THỰC TRẠNG */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">II. THỰC TRẠNG & NGUYÊN NHÂN</h2>
        
        <h3 className="text-lg font-semibold mb-2">1. Thuận lợi</h3>
        <div className="whitespace-pre-wrap text-justify leading-relaxed mb-4">
          {data.content.status.advantages || 'Chưa có nội dung...'}
        </div>

        <h3 className="text-lg font-semibold mb-2">2. Khó khăn</h3>
        <div className="whitespace-pre-wrap text-justify leading-relaxed mb-4">
          {data.content.status.disadvantages || 'Chưa có nội dung...'}
        </div>

        <h3 className="text-lg font-semibold mb-2">3. Nguyên nhân</h3>
        <div className="whitespace-pre-wrap text-justify leading-relaxed">
          {data.content.causes || 'Chưa có nội dung...'}
        </div>
      </section>

      {/* III. BIỆN PHÁP */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">III. CÁC BIỆN PHÁP THỰC HIỆN</h2>
        <div className="whitespace-pre-wrap text-justify leading-relaxed">
          {data.content.solutions || 'Chưa có nội dung...'}
        </div>
      </section>

      {/* IV. ĐÁNH GIÁ */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">IV. ĐÁNH GIÁ</h2>
        <div className="whitespace-pre-wrap text-justify leading-relaxed">
          {data.evaluation.efficiency || 'Chưa có nội dung...'}
        </div>
      </section>

      {/* V. KẾT LUẬN */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">V. KẾT LUẬN</h2>
        <div className="whitespace-pre-wrap text-justify leading-relaxed">
          {data.conclusion || 'Chưa có nội dung...'}
        </div>
      </section>

      {/* Footer */}
      <div className="mt-16 text-center text-sm text-slate-500">
        <p>Ngày {data.day} tháng {data.month} năm {data.year}</p>
        <p className="mt-4 font-semibold">NGƯỜI THỰC HIỆN</p>
        <p className="mt-8">{data.author || '...'}</p>
      </div>
    </div>
  );
}
