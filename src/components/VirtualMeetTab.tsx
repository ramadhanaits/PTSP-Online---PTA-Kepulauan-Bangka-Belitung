import React, { useState, useEffect } from "react";
import { 
  Video, 
  Clock, 
  FileText, 
  User, 
  HelpCircle, 
  Copy, 
  CheckCircle2, 
  ExternalLink,
  Info,
  Calendar,
  AlertTriangle,
  Users
} from "lucide-react";

export default function VirtualMeetTab() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("Banding Perdata");
  const [originPa, setOriginPa] = useState("PA Pangkalpinang");
  const [customDraft, setCustomDraft] = useState("");
  const [agendaGenerated, setAgendaGenerated] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  
  // Simulated room status
  const [roomStatus, setRoomStatus] = useState({
    zoom: "Tersambung (Piket Aktif)",
    meet: "Tersambung (Piket Aktif)",
    waitingCount: 2
  });

  // Mock Zoom and Google Meet Room Links
  const ZOOM_URL = "https://zoom.us/j/9876543210?pwd=PTA_BABEL_ONLINE_MEET";
  const MEET_URL = "https://meet.google.com/ais-ptsb-babel";

  const handleGenerateAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Nama lengkap wajib diisi.");
      return;
    }
    const draftText = `=== AGENDA KONSULTASI PTSP VIRTUAL PTA BABEL ===
No. Sesi: V-MEET-${Math.floor(Math.random() * 900) + 100}
Waktu Sesi: ${new Date().toLocaleDateString("id-ID")} - Sesi Live
Pemohon: ${name}
Asal Satuan Kerja: ${originPa}
Keperluan Konsultasi: ${topic}
--------------------------------------------------
Pertanyaan Utama:
1. Mohon penjelasan berkas fisik administrasi perkara untuk ${topic} asal ${originPa}.
2. Berapa estimasi penyelesaian perkara pemutusan di PTA Bangka Belitung tingkat banding?
--------------------------------------------------
Harap tunjukkan draft agenda ini kepada petugas hukum PTSP di Room Zoom atau Google Meet.`;

    setCustomDraft(draftText);
    setAgendaGenerated(true);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(customDraft);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-50 rounded-lg text-sky-600 border border-sky-100">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-gray-950">Telekonsultasi Tatap Muka Virtual Online</h3>
            <p className="text-xs text-gray-500">Berdiskusi tatap muka secara langsung dengan Petugas Piket PTSP Pengadilan Tinggi Agama Babel via panggilan nirkabel</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Meeting Rooms Entrance - 7 span */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Zoom Meeting Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div className="bg-sky-50 text-sky-600 p-2.5 rounded-lg border border-sky-100">
                    <Video className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-150 text-emerald-800 uppercase tracking-wider font-mono">
                    ONLINE
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-gray-900 mt-4">Tatap Muka via Zoom Meeting</h4>
                <p className="text-xs text-gray-600 mt-1 pb-4 leading-relaxed border-b border-gray-100">
                  Konsultasi menggunakan aplikasi Zoom. Mengajukan banding, pemantauan berkas, e-Court, dan advis hukum panitera.
                </p>
                <div className="my-3 text-xs flex justify-between text-gray-500">
                  <span>Status Piket:</span>
                  <span className="font-semibold text-emerald-800">Sedia Melayani</span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border-t border-gray-150 flex items-center gap-2">
                <a 
                  href={ZOOM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-2.5 px-3 rounded-lg text-center transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Masuk Room Zoom Meeting
                </a>
              </div>
            </div>

            {/* Google Meet Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-lg border border-emerald-100">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-150 text-emerald-800 uppercase tracking-wider font-mono">
                    ONLINE
                  </span>
                </div>
                <h4 className="font-display font-bold text-base text-gray-900 mt-4">Tatap Muka via Google Meets</h4>
                <p className="text-xs text-gray-600 mt-1 pb-4 leading-relaxed border-b border-gray-100">
                  Gunakan browser / mobile Google Meet Anda tanpa perlu install aplikasi mendalam. Langsung klik dan terhubung.
                </p>
                <div className="my-3 text-xs flex justify-between text-gray-500">
                  <span>Status Piket:</span>
                  <span className="font-semibold text-emerald-800">Sedia Melayani</span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 border-t border-gray-150 flex items-center gap-2">
                <a 
                  href={MEET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-700 hover:bg-emerald-850 text-white font-bold text-xs py-2.5 px-3 rounded-lg text-center transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Hubungkan Google Meets
                </a>
              </div>
            </div>
          </div>

          {/* Operational guidelines info block */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
            <h4 className="font-display font-bold text-sm text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <Info className="w-4.5 h-4.5 text-sky-600" /> Aturan Penggunaan Telekonsultasi Online
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700 leading-relaxed">
              <ul className="list-disc pl-4 space-y-1.5">
                <li>Gunakan pakaian yang formal, sopan, dan rapi demi ketertiban pengadilan.</li>
                <li>Siapkan KTP / Identitas diri yang sah untuk proses validasi oleh panitera.</li>
                <li>Gunakan koneksi internet yang stabil dan pastikan mikrofon & kamera berfungsi dengan baik.</li>
              </ul>
              <ul className="list-disc pl-4 space-y-1.5">
                <li>Dilarang merekam video konsultasi tanpa izin atau menyebarluaskan sesi pengadilan demi regulasi Undang-Undang ITE.</li>
                <li>Siapkan draft nomor panjar perkara yang diperoleh dari menu kalkulator apabila berkonsultasi dana perkara.</li>
              </ul>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-100 text-[11px] text-amber-900 leading-relaxed flex gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <p>Sistem ini tidak mengenakan biaya layanan sepeser pun. Segala pemungutan uang tip atau gratifikasi oleh petugas sangat dilarang dan dapat dilaporkan!</p>
            </div>
          </div>
        </div>

        {/* Right Column: Pre-consultation Docket Builder - 5 span */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
            <h4 className="font-display font-bold text-sm text-gray-900 flex items-center gap-1.5 border-b border-gray-100 pb-2">
              <FileText className="w-4.5 h-4.5 text-court-gold-600" />
              Penyiapan Agenda Konsultasi (Pre-Meet)
            </h4>
            
            <p className="text-xs text-gray-600">
              Isi data Anda di bawah untuk mengkompilasi draf doking agenda. Anda dapat menyalin draf ini ke kolom obrolan petugas atau membacakannya saat sesi telekonsultasi berjalan agar konsultasi berjalan efisien.
            </p>

            <form onSubmit={handleGenerateAgenda} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Nama Lengkap Pemohon:
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukan nama lengkap Anda..."
                    className="w-full text-xs pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-court-green-900 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Pengadilan Satker Asal:
                  </label>
                  <select
                    value={originPa}
                    onChange={(e) => setOriginPa(e.target.value)}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-court-green-900 bg-white"
                  >
                    <option value="PA Pangkalpinang">PA Pangkalpinang</option>
                    <option value="PA Sungailiat">PA Sungailiat</option>
                    <option value="PA Mentok">PA Mentok</option>
                    <option value="PA Bangka Selatan">PA Bangka Selatan</option>
                    <option value="PA Tanjungpandan">PA Tanjungpandan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Tema Konsultasi:
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-court-green-900 bg-white"
                  >
                    <option value="Perkara Banding Cerai">Banding Perceraian</option>
                    <option value="Perkara Banding Waris">Banding Waris / Hibah</option>
                    <option value="Pengembalian Sisa Biaya">Kelebihan Sisa Panjar</option>
                    <option value="Masalah e-Court Banding">e-Court Banding / e-Summons</option>
                    <option value="Pengambilan Salinan Putusan">Salinan Putusan Banding</option>
                    <option value="Pengaduan Pelayanan">Kecurangan / Pelayanan Buruk</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-court-green-900 hover:bg-court-green-950 text-white font-bold text-xs py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-court-gold-400" />
                Kompilasi Draf Agenda
              </button>
            </form>

            {/* Generated Docket Textbox */}
            {agendaGenerated && (
              <div className="mt-4 border border-dashed border-court-gold-500 bg-court-gold-100/20 rounded-lg p-3.5 space-y-3.5 animate-fade-in font-sans">
                <span className="block text-[10px] font-bold text-court-green-900 tracking-wider">KOMPILASI AGENDA ANDA:</span>
                <textarea
                  readOnly
                  rows={8}
                  value={customDraft}
                  className="w-full p-2 bg-white rounded border border-gray-300 font-mono text-[10px] text-gray-800 focus:outline-none"
                />
                
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyToClipboard}
                    className="flex-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-semibold py-2 px-3 rounded flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-600" /> 
                    {copiedNotification ? "Tersalin!" : "Salin Draf Agenda"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
