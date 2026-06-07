import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Standard initialization for full-stack build
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API: Health probe
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date() });
  });

  // API: Gemini Virtual Assistant Core Chat for PTA Babel PTSP
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "Pesan tidak boleh kosong" });
      return;
    }

    if (!ai) {
      res.json({
        reply: "Maaf, fitur Asisten Virtual bertenaga AI saat ini belum sepenuhnya terkonfigurasi (GEMINI_API_KEY kosong). Silakan gunakan Layanan WhatsApp atau Zoom Meeting/Google Meets langsung yang tersedia di bawah!"
      });
      return;
    }

    try {
      // Build standard chat format using the context of Pengadilan Tinggi Agama Kepulauan Bangka Belitung (PTA Babel)
      const systemInstruction = `Anda adalah "Asisten Virtual PTSP Online PTA Bangka Belitung" (SI-PINTAR Babel), sebuah AI asisten pelayanan ramah, sopan, dan profesional yang membantu masyarakat yang ingin mencari informasi hukum, layanan banding, biaya perkara, permohonan informasi PPID, pengaduan (SIWAS), dan tata kelola di Pengadilan Tinggi Agama Kepulauan Bangka Belitung.

PROFIL PTA BABEL:
- Nama: Pengadilan Tinggi Agama Kepulauan Bangka Belitung (PTA Babel).
- Alamat: Kompleks Perkantoran Pemerintah Daerah Provinsi Kepulauan Bangka Belitung, Jl. Pulau Bangka, Air Itam, Bukit Intan, Kota Pangkalpinang, Prov. Kepulauan Bangka Belitung 33149.
- Telepon/WhatsApp PTSP: +62 812-7412-0751 (Masyarakat dipersilakan mengklik tombol WhatsApp di halaman utama).
- Jam Operasional PTSP: Senin - Kamis (08.00 - 16.30 WIB), Jumat (08.00 - 17.00 WIB). Istirahat: 12.00 - 13.00 WIB (Jumat: 11.30 - 13.30 WIB).

YURISDIKSI PENGADILAN AGAMA DIBAWAHNYA (Pengadilan Tingkat Pertama):
1. PA Pangkalpinang (Kota Pangkalpinang)
2. PA Sungailiat (Kab. Bangka)
3. PA Tanjungpandan (Kab. Belitung & Belitung Timur)
4. PA Mentok (Kab. Bangka Barat)
5. PA Bangka Selatan (Kab. Bangka Selatan)

LAYANAN PTSP ONLINE YANG TERSEDIA DI WEBSITE INI:
1. Layanan Kepaniteraan (Banding, Keuangan Perkara, Salinan Putusan, Eksekusi).
2. Layanan Kesekretariatan (Magang/Riset, Surat-Menyurat, Umum).
3. Layanan PPID (Permohonan Informasi Publik).
4. Layanan Pengaduan (Melalui menu SIWAS atau pengaduan internal).
5. Layanan Konsultasi Tatap Muka Virtual via Zoom / Google Meet (tersedia setiap hari kerja pukul 09.00 - 15.00 WIB).
6. Layanan Obrolan Cepat via WhatsApp Chatbot dan WhatsApp PTSP Officer.

TATA CARA PENGAJUAN PERKARA BANDING (CONTOH INFORMASI PENTING):
1. Diajukan melalui Pengadilan Agama Tingkat Pertama yang memutus perkara tersebut (bukan langsung ke PTA).
2. Tenggang waktu banding adalah 14 hari sejak putusan dibacakan/diberitahukan secara sah.
3. Membayar biaya panjar banding melalui bank yang ditunjuk Pengadilan Agama pengaju.
4. Berkas banding (akta banding, memori banding, kontra memori, dll.) akan dikirimkan oleh PA ke PTA Babel melalui aplikasi e-Court atau secara fisik jika non e-Court.

Gaya Komunikasi:
- Gunakan Bahasa Indonesia yang resmi, sopan, santun, ramah, dan solutif.
- Awali sapaan yang hangat khas peradilan agama (seperti "Assalamu'alaikum Wr. Wb. Selamat datang di PTSP Online PTA Bangka Belitung. Ada yang bisa kami bantu?").
- Berikan poin-poin yang jelas dan mudah dipahami oleh masyarakat umum yang awam hukum.
- Jika pengguna menanyakan tentang bantuan langsung, arahkan mereka untuk menggunakan fitur "Layanan Telekonsultasi Zoom/Meet" atau "WhatsApp PTSP" yang tombolnya tersedia di dashboard utama halaman web kami!`;

      // Structure contents properly for generateContent
      // Check if there is history. Let's build a simple array of content
      const contents = [];
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          contents.push({
            role: turn.sender === "user" ? "user" : "model",
            parts: [{ text: turn.text }]
          });
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ reply: response.text });
    } catch (err: any) {
      console.error("Gemini Error:", err);
      res.status(500).json({ error: "Gagal memproses permintaan AI: " + err.message });
    }
  });

  // Handle Vite middleware
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
    console.log(`PTSP Online server running on http://localhost:${PORT}`);
  });
}

startServer();
