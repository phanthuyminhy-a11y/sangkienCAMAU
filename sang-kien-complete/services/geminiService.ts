// Lấy API key từ environment variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('⚠️ CẢNH BÁO: Thiếu GEMINI_API_KEY trong environment variables!');
  console.log('Hướng dẫn: Thêm VITE_GEMINI_API_KEY vào Vercel Environment Variables');
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

interface GenerateContentResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

/**
 * Gọi Gemini API để generate nội dung
 */
async function callGeminiAPI(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('Chưa cấu hình GEMINI_API_KEY. Vui lòng thêm vào Vercel Environment Variables.');
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data: GenerateContentResponse = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || '';
  } catch (error) {
    console.error('Lỗi khi gọi Gemini API:', error);
    throw error;
  }
}

/**
 * Generate nội dung cho một section cụ thể
 */
export async function generateSectionContent(section: string, title: string): Promise<string> {
  const prompts: Record<string, string> = {
    'Phần đặt vấn đề cực kỳ sâu sắc và học thuật': `
Bạn là chuyên gia giáo dục với 20 năm kinh nghiệm viết sáng kiến kinh nghiệm.
Hãy viết phần "LÝ DO CHỌN ĐỀ TÀI" cho sáng kiến: "${title}"

Yêu cầu:
- Độ dài: 400-600 từ
- Cấu trúc: 3-4 đoạn văn mạch lạc
- Nội dung bao gồm:
  1. Bối cảnh giáo dục hiện nay (xu hướng, chính sách)
  2. Thực trạng tại đơn vị (vấn đề cụ thể cần giải quyết)
  3. Mục tiêu của sáng kiến
  4. Ý nghĩa thực tiễn và lý luận

Viết bằng tiếng Việt, giọng văn học thuật nhưng dễ hiểu.
    `,

    'Mô tả hệ thống 5-7 biện pháp sư phạm chi tiết': `
Bạn là chuyên gia sư phạm. Hãy viết phần "CÁC BIỆN PHÁP THỰC HIỆN" cho sáng kiến: "${title}"

Yêu cầu:
- Liệt kê 5-7 biện pháp cụ thể
- Mỗi biện pháp gồm:
  * Tên biện pháp (ngắn gọn, rõ ràng)
  * Mô tả chi tiết cách thực hiện (200-300 từ)
  * Ví dụ minh họa cụ thể
  * Kết quả mong đợi

Format:
BIỆN PHÁP 1: [Tên]
- Mô tả: ...
- Ví dụ: ...
- Kết quả: ...

(Lặp lại cho 5-7 biện pháp)

Viết bằng tiếng Việt, giọng văn chuyên nghiệp.
    `,
  };

  const prompt = prompts[section] || `Viết nội dung ${section} cho sáng kiến: "${title}" (300-500 từ, tiếng Việt)`;
  
  return await callGeminiAPI(prompt);
}

/**
 * Generate toàn bộ báo cáo từ tiêu đề
 */
export async function generateFullReportAI(title: string): Promise<{
  necessity: string;
  advantages: string;
  disadvantages: string;
  causes: string;
  solutions: string;
  novelty: string;
  efficiency: string;
  scope: string;
  conclusion: string;
}> {
  const mainPrompt = `
Bạn là chuyên gia giáo dục với 20 năm kinh nghiệm viết sáng kiến kinh nghiệm.
Hãy soạn thảo báo cáo SÁNG KIẾN KINH NGHIỆM hoàn chỉnh cho đề tài: "${title}"

YÊU CẦU QUAN TRỌNG:
- Phản hồi PHẢI là JSON hợp lệ
- KHÔNG thêm markdown, code block, hoặc text ngoài JSON
- Format chính xác như sau:

{
  "necessity": "Lý do chọn đề tài (400-600 từ, 3-4 đoạn văn)",
  "advantages": "Thuận lợi hiện tại (150-200 từ, 2-3 điểm)",
  "disadvantages": "Khó khăn, hạn chế (150-200 từ, 2-3 điểm)",
  "causes": "Nguyên nhân của khó khăn (200-300 từ)",
  "solutions": "5-7 biện pháp chi tiết (1000-1500 từ, format: BIỆN PHÁP 1: [Tên]\\n- Mô tả...\\n- Ví dụ...)",
  "novelty": "Tính mới, hiệu quả, khả thi (300-400 từ)",
  "efficiency": "Đánh giá hiệu quả (200-300 từ)",
  "scope": "Phạm vi áp dụng (150-200 từ)",
  "conclusion": "Kết luận và đề xuất (200-300 từ)"
}

NỘI DUNG CẦN BAO GỒM:
1. necessity: Bối cảnh giáo dục → Thực trạng → Mục tiêu → Ý nghĩa
2. advantages: Điều kiện thuận lợi tại đơn vị
3. disadvantages: Khó khăn cần vượt qua
4. causes: Phân tích nguyên nhân sâu xa
5. solutions: 5-7 biện pháp cụ thể, chi tiết, có ví dụ
6. novelty: Điểm mới so với các nghiên cứu trước
7. efficiency: Kết quả đạt được (có số liệu nếu có thể)
8. scope: Đối tượng, phạm vi áp dụng
9. conclusion: Tổng kết + Đề xuất

Viết bằng tiếng Việt, giọng văn học thuật, chuyên nghiệp.
CHỈ TRẢ VỀ JSON, KHÔNG CÓ TEXT NÀO KHÁC!
`;

  try {
    const response = await callGeminiAPI(mainPrompt);
    
    // Remove markdown code blocks if present
    let cleanedResponse = response.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/^```\n/, '').replace(/\n```$/, '');
    }
    
    const parsed = JSON.parse(cleanedResponse);
    return parsed;
  } catch (error) {
    console.error('Lỗi parse JSON từ Gemini:', error);
    throw new Error('Không thể generate báo cáo. Vui lòng thử lại.');
  }
}
