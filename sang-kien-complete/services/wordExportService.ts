import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { ReportData } from '../types';

/**
 * Xuất báo cáo ra file Word (.docx)
 */
export async function exportToWord(data: ReportData): Promise<void> {
  try {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Tiêu đề chính
            new Paragraph({
              text: data.title || 'SÁNG KIẾN KINH NGHIỆM',
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),

            // Thông tin tác giả
            new Paragraph({
              children: [
                new TextRun({ text: 'Người thực hiện: ', bold: true }),
                new TextRun(data.author || ''),
              ],
              spacing: { after: 200 },
            }),

            new Paragraph({
              children: [
                new TextRun({ text: 'Đơn vị: ', bold: true }),
                new TextRun(data.unit || ''),
              ],
              spacing: { after: 200 },
            }),

            new Paragraph({
              children: [
                new TextRun({ text: 'Thời gian thực hiện: ', bold: true }),
                new TextRun(`${data.startDate} - ${data.endDate}`),
              ],
              spacing: { after: 400 },
            }),

            // I. ĐẶT VẤN ĐỀ
            new Paragraph({
              text: 'I. ĐẶT VẤN ĐỀ',
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 },
            }),

            new Paragraph({
              text: data.problemStatement.necessity || '',
              spacing: { after: 400 },
              alignment: AlignmentType.JUSTIFIED,
            }),

            // II. THỰC TRẠNG & NGUYÊN NHÂN
            new Paragraph({
              text: 'II. THỰC TRẠNG & NGUYÊN NHÂN',
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 },
            }),

            new Paragraph({
              text: '1. Thuận lợi',
              heading: HeadingLevel.HEADING_2,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: data.content.status.advantages || '',
              spacing: { after: 300 },
              alignment: AlignmentType.JUSTIFIED,
            }),

            new Paragraph({
              text: '2. Khó khăn',
              heading: HeadingLevel.HEADING_2,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: data.content.status.disadvantages || '',
              spacing: { after: 300 },
              alignment: AlignmentType.JUSTIFIED,
            }),

            new Paragraph({
              text: '3. Nguyên nhân',
              heading: HeadingLevel.HEADING_2,
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: data.content.causes || '',
              spacing: { after: 400 },
              alignment: AlignmentType.JUSTIFIED,
            }),

            // III. CÁC BIỆN PHÁP THỰC HIỆN
            new Paragraph({
              text: 'III. CÁC BIỆN PHÁP THỰC HIỆN',
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 },
            }),

            new Paragraph({
              text: data.content.solutions || '',
              spacing: { after: 400 },
              alignment: AlignmentType.JUSTIFIED,
            }),

            // IV. ĐÁNH GIÁ
            new Paragraph({
              text: 'IV. ĐÁNH GIÁ',
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 },
            }),

            new Paragraph({
              text: data.evaluation.efficiency || '',
              spacing: { after: 400 },
              alignment: AlignmentType.JUSTIFIED,
            }),

            // V. KẾT LUẬN
            new Paragraph({
              text: 'V. KẾT LUẬN',
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 },
            }),

            new Paragraph({
              text: data.conclusion || '',
              alignment: AlignmentType.JUSTIFIED,
            }),
          ],
        },
      ],
    });

    // Generate file
    const blob = await Packer.toBlob(doc);
    const fileName = `Sang_Kien_${data.title.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}.docx`;
    saveAs(blob, fileName);

    console.log('✅ Đã xuất file Word thành công:', fileName);
  } catch (error) {
    console.error('❌ Lỗi khi xuất Word:', error);
    throw error;
  }
}
