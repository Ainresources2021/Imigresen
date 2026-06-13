import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for incoming JSON
  app.use(express.json());

  // API Healthcheck
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Server-side AI analysis proxy to secure the API credentials
  app.post("/api/gemini/analyze", async (req, res) => {
    try {
      const { topic, customQuestion } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: "Kekunci API (GEMINI_API_KEY) tidak dikonfigurasikan. Sila semak tab Secrets di AI Studio." 
        });
      }

      let prompt = "";
      if (customQuestion) {
        prompt = `Sila huraikan dan jawab soalan penyelidikan berikut secara mendalam dan berpandukan fakta rasmi: "${customQuestion}"`;
      } else {
        prompt = `Sila berikan analisis komprehensif, objektif sosiopolitik, dan huraian dasar mengenai topik imigrasi ini: "${topic}"`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: `
Anda adalah penganalisis kanan, felo penyelidik utama dalam bidang sosiologi migrasi dan polisi ekonomi di think-tank utama Malaysia (seperti ISIS Malaysia atau Khazanah Research Institute).
Tugas anda adalah memberikan analisis akademik yang neutral, berpandukan fakta rasmi, bebas prasangka, dan sangat mendalam tentang isu-isu pelarian, pekerja asing berpermit (PLKS), dan pendatang tanpa izin (PATI) di Malaysia.

Sila gunakan hujah berfakta yang sejajar dengan statistik rasmi ini untuk mengekalkan kredibiliti data anda:
- Pelarian: ~191,550 orang berdaftar dengan UNHCR (Nov 2024). Daripada jumlah ini, ~165,000 adalah warga Myanmar (termasuk ~112,000 Rohingya, dan ~25,000 Chin). Selebihnya merangkumi warga Pakistan (~9.8k), Yaman (~3.6k), Somalia (~3.3k). Malaysia bukan penandatangan Konvensyen Pelarian 1951, maka tiada klasifikasi undang-undang rasmi melainkan sebagai pendatang haram yang memegang dokumen UNHCR sementara menunggu penempatan semula.
- Pekerja Asing Sah (PLKS): ~2.36 juta orang berdaftar aktif. Sektor utama: Pembuatan (35%), Pembinaan (25%), Perkhidmatan (15%), Perladangan (12%), Pertanian (10%), Pembantu Domestik (3%). Kebanyakan berasal dari Bangladesh (~856k), Indonesia (~684k), dan Nepal (~421k).
- Pendatang Tanpa Izin (PATI): Dianggarkan di antara 1.2 juta hingga 2.0 juta orang. Inisiatif kerajaan Program Rekalibrasi Tenaga Kerja (RTK) 2.0 (sehingga 2024) merekrut semula 1.12 juta PATI berdaftar, meluluskan ~765,000 orang untuk mengisi kekurangan pekerja domestik, dan menghasilkan hasil RM2.71 Bilion kutipan kerajaan.
- Isu Penahanan: Terdapat 18 depot tahanan imigresen di seluruh negara dengan isu kesesakan, perbelanjaan logistik tahunan kerajaan yang mencabar, dan dilema hak asasi manusia.

Format maklum balas anda mestilah mengandungi tajuk-tajuk berikut (gunakan subset tajuk Markdown yang sesuai):
- **PENGENALAN & KONTEKS**: Ringkasan senario imigrasi semasa.
- **ANALISIS IMPAK DAN CABARAN**: Kesan sosiopolitik, ekonomi (pergantungan pasaran buruh, produktiviti industri sawit/pembinaan, pelarian informal), perbelanjaan keselamatan serta kebajikan kemanusiaan.
- **ULASAN DASAR DAN CADANGAN SOLUSI**: Cadangan reformasi praktikal (e.g., penetapan skim kerja separa-sah untuk pelarian, automasi industri bagi mengurangkan kebergantungan pekerja asing, penstrukturan sistem penyaluran pekerja asing bersepadu).

Pastikan nada bahasa Melayu anda sangat formal, profesional, bernilai intelek tinggi, dan objektif. Gunakan rujukan visual Markdown dengan kemas (e.g. blockquotes, bullets).
`,
          temperature: 0.7,
        }
      });

      return res.json({ analysis: response.text });
    } catch (error: any) {
      console.error("Gemini API server proxy error:", error);
      return res.status(500).json({ error: error.message || "Ralat tidak dijangka sedang berkomunikasi dengan Gemini AI." });
    }
  });

  // Vite middleware setup for dev vs production build
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
