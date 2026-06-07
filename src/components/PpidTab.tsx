import React, { useState } from "react";
import { 
  FileText, 
  Download, 
  Search, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  Mail, 
  Building2, 
  ArrowRight 
} from "lucide-react";

export default function PpidTab() {
  const [docSearch, setDocSearch] = useState("");
  const [requestName, setRequestName] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const [requestPurpose, setRequestPurpose] = useState("");
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const publicDocs = [
    { title: "Daftar Informasi Publik (DIP) PTA Babel 2025", category: "Rencana & Regulasi", size: "1.2 MB", date: "Jan 2025" },
    { title: "Laporan Kinerja Instansi Pemerintah (LKjIP) PTA Babel 2024", category: "Laporan Kinerja", size: "4.5 MB", date: "Feb 2025" },
    { title: "Rencana Strategis (Renstra) PTA Babel 2020-2025", category: "Rencana & Regulasi", size: "2.8 MB", date: "Maret 2020" },
    { title: "Laporan Akses Informasi Publik Triwulan II 2025", category: "Laporan Keuangan", size: "850 KB", date: "Mei 2025" },
    { title: "Rencana Kerja & Anggaran (RKA/KL) DIPA 01 & 04 PTA Babel", category: "Laporan Anggaran", size: "3.1 MB", date: "Nov 2024" },
    { title: "Buku Saku Sengketa Hukum Ekonomi Syariah Tingkat Banding", category: "Yudisial", size: "5.4 MB", date: "April 2025" }
  ];

  const filteredDocs = publicDocs.filter(doc => 
    doc.title.toLowerCase().includes(docSearch.toLowerCase()) ||
    doc.category.toLowerCase().includes(docSearch.toLowerCase())
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestName || !requestEmail || !requestPurpose) {
      alert("Harap lengkapi semua isian formulir");
      return;
    }
    setRequestSubmitted(true);
  };

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-50 rounded-lg text-amber-600 border border-amber-100">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-gray-950">Layanan Informasi Publik (PPID)</h3>
            <p className="text-xs text-gray-500">Amanah Transparency UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik (KIP) di Pengadilan Tinggi Agama Babel</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Public Documentation Library - 7 span */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
              <h4 className="font-display font-bold text-sm text-gray-900 flex items-center gap-1.5">
                <Search className="w-4.5 h-4.5 text-court-gold-600" />
                Perpustakaan Informasi & Dokumen PPID
              </h4>
              
              <div className="relative">
                <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari laporan/dokumen..."
                  value={docSearch}
                  onChange={(e) => setDocSearch(e.target.value)}
                  className="text-xs pl-8 pr-3 py-1.5 w-full sm:w-48 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-court-green-900 bg-white"
                />
              </div>
            </div>

            <p className="text-xs text-gray-600">
              Silakan unduh secara langsung dokumen penting di bawah ini yang terintegrasi secara publik. Apabila dokumen yang Anda butuhkan tidak tertera, silakan ajukan Formulir PPID Online di sebelah kanan.
            </p>

            <div className="divide-y divide-gray-100">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="block text-xs font-semibold text-gray-900 leading-tight">
                        {doc.title}
                      </span>
                      <div className="flex flex-wrap items-center gap-2 text-[10px] text-gray-500">
                        <span className="bg-slate-100 px-2 py-0.5 rounded font-medium text-slate-700">
                          {doc.category}
                        </span>
                        <span>•</span>
                        <span>{doc.date}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => alert(`Mengunduh berkas: ${doc.title}`)}
                      className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-court-green-900 p-2 rounded-lg transition-all"
                      title="Download File"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-center py-6 text-gray-400 italic">Dokumen tidak ditemukan</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Information Request Form - 5 span */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
            <h4 className="font-display font-bold text-sm text-gray-900 flex items-center gap-1.5 border-b border-gray-100 pb-2">
              <Mail className="w-4.5 h-4.5 text-court-gold-600" />
              Formulir Pengajuan PPID Online
            </h4>

            {requestSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 text-center space-y-3.5 animate-fade-in text-emerald-950 font-sans">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h5 className="font-bold text-sm">Permohonan Informasi Berhasil Diunggah</h5>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Terima kasih, <strong>{requestName}</strong>. PPID PTA Bangka Belitung sudah menerima pengajuan Anda. Surat balasan pemenuhan informasi hukum akan dikirimkan ke email <strong>{requestEmail}</strong> paling lambat 10 hari kerja.
                </p>
                <button
                  onClick={() => {
                    setRequestSubmitted(false);
                    setRequestName("");
                    setRequestEmail("");
                    setRequestPurpose("");
                  }}
                  className="bg-white border text-court-green-900 font-semibold text-xs py-1.5 px-3 rounded-md hover:bg-emerald-100/50 transition-all"
                >
                  Ajukan Permohonan Baru
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <p className="text-xs text-gray-500">
                  Ajukan laporan data non-klasifikasi khusus seperti riset hukum, data banding tahunan, atau verifikasi publik instansi di bawah ini.
                </p>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nama Pemohon Sesuai KTP:
                  </label>
                  <input
                    type="text"
                    required
                    value={requestName}
                    onChange={(e) => setRequestName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-court-green-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Alamat Surat Elektronik (Email):
                  </label>
                  <input
                    type="email"
                    required
                    value={requestEmail}
                    onChange={(e) => setRequestEmail(e.target.value)}
                    placeholder="budisantoso@domain.com"
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-court-green-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Deskripsi Rinci Data & Tujuan Penggunaan:
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={requestPurpose}
                    onChange={(e) => setRequestPurpose(e.target.value)}
                    placeholder="Sebutkan jenis informasi, dasar pengajuan (skripsi, sengketa pribadi, riset akademik) secara runtut..."
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-court-green-900 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-court-green-900 hover:bg-court-green-950 text-white font-bold text-xs py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow"
                >
                  <Send className="w-3.5 h-3.5" /> Ajukan Dokumen Legalitas
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
