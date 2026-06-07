import React, { useState } from "react";
import { 
  Building2, 
  ShieldAlert, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  Mail, 
  Phone,
  MessageSquare,
  Lock,
  ChevronDown,
  AlertCircle
} from "lucide-react";

export default function PengaduanTab() {
  const [complaintName, setComplaintName] = useState("");
  const [phone, setPhone] = useState("");
  const [officerName, setOfficerName] = useState("");
  const [chronology, setChronology] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({
    0: true,
    1: false
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintName || !phone || !chronology) {
      alert("Harap lengkapi semua isian wajib formulir");
      return;
    }
    setSubmitted(true);
  };

  const toggleFaq = (idx: number) => {
    setFaqOpen(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const faqData = [
    {
      q: "Bagaimana jaminan keamanan identitas saya selaku Pelapor (Whistleblower)?",
      a: "Sesuai SK KMA No. 245/KMA/SK/XII/2014, Pengadilan Tinggi Agama Babel sangat menjaga kerahasiaan data pribadi Anda. Nama Anda disamarkan dng algoritma perlindungan saksi, dan pelaporan langsung dilimpahkan ke Badan Pengawasan Mahkamah Agung RI tanpa melibatkan oknum setempat."
    },
    {
      q: "Apa saja jenis laporan yang ditolak atau tidak ditindaklanjuti?",
      a: "Laporan yang tidak memiliki kronologi yang logis, tidak menunjukkan nama pejabat terlapor/satker yang bersangkutan, atau sekadar ketidakpuasan subjektif atas hasil putusan sidang (ketidakpuasan putusan diajukan melalui mekanisme Banding/Kasasi, bukan lewat Pengaduan)."
    },
    {
      q: "Berapa lama laporan dugaan pelanggaran integritas diselidiki?",
      a: "Maksimal dalam waktu 21 hari kerja, laporan tervalidasi akan dinaikkan statusnya ke tahap Surat Tugas Audit Pemeriksa Bawas MA RI untuk pembuktian di lapangan."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-50 rounded-lg text-red-600 border border-red-100">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-gray-950">Layanan Pengaduan Masyarakat (SIWAS / Whistleblowing)</h3>
            <p className="text-xs text-gray-500">Laporkan segala bentuk penyimpangan kode etik, pungli, gratifikasi, atau kelalaian tugas aparatur peradilan di lingkungan PTA Babel</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Complaint lodgement simulation - 7 span */}
        <div className="lg:col-span-12 xl:col-span-7 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
            <h4 className="font-display font-bold text-sm text-gray-900 flex items-center gap-1.5 border-b border-gray-100 pb-2">
              <ShieldAlert className="w-4.5 h-4.5 text-red-600" />
              Sistem Pelaporan Internal (Amad-Pengaduan)
            </h4>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 text-center space-y-3.5 animate-fade-in text-emerald-950 font-sans">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h5 className="font-bold text-sm">Aduan Terkirim Secara Rahasia</h5>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Laporan Anda berhasil dimasukkan ke sistem rekam aman pengawasan. Tim Satuan Kerja Pengawasan Internal PTA Babel akan menghubungi Anda di nomor <strong>{phone}</strong> untuk melakukan klarifikasi rahasia. Keamanan privasi Anda dilindungi pengetatan hukum.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setComplaintName("");
                    setPhone("");
                    setOfficerName("");
                    setChronology("");
                  }}
                  className="bg-white border text-court-green-900 font-semibold text-xs py-1.5 px-3 rounded-md hover:bg-emerald-100/50 transition-all"
                >
                  Kirim Aduan Lainnya
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <p className="text-xs text-gray-500">
                  Formulir ini diawasi langsung oleh Mahkamah Agung Bidang Pengawasan. Silakan isi peristiwa hukum yang menyimpang dengan data valid demi penegakan hukum prima.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Nama Pelapor (Boleh Anonim/Samaran):
                    </label>
                    <input
                      type="text"
                      required
                      value={complaintName}
                      onChange={(e) => setComplaintName(e.target.value)}
                      placeholder="Contoh: Warga Peduli / Nama Asli"
                      className="w-full text-xs p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-court-green-900 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Nomor WA / Kontak Klarifikasi:
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Contoh: 0812XXXXXXXX"
                      className="w-full text-xs p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-court-green-900 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nama Oknum Petugas / Satker Pengadilan yang Dilaporkan:
                  </label>
                  <input
                    type="text"
                    value={officerName}
                    onChange={(e) => setOfficerName(e.target.value)}
                    placeholder="Sebutkan nama terlapor, panitera, hakim, jurusita atau staf loket..."
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-court-green-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Kronologi Lengkap Peristiwa (Kapan, Dimana, Apa yang Terjadi):
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={chronology}
                    onChange={(e) => setChronology(e.target.value)}
                    placeholder="Tuliskan peristiwa secara urut misalnya: Petugas X meminta biaya tambahan di luar taksiran formulir pada tanggal..."
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-court-green-900 bg-white"
                  />
                </div>

                <div className="flex items-center gap-2 text-[10px] text-gray-500 bg-slate-50 p-3 rounded border border-slate-200">
                  <Lock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>Kripsi Aman: Jalur transmisi ini dilengkapi standar enkripsi SSL 256-bit guna menjamin perlindungan privasi.</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" /> Unggah Aduan Secara Rahasia
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Whistleblowing procedures FAQ - 5 span */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          
          {/* Official SIWAS MA button */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-3">
            <h4 className="font-display font-semibold text-sm text-gray-900">Aplikasi Pengaduan SIWAS MA RI</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Anda juga dapat menyampaikan pengaduan resmi secara eksternal yang diawasi langsung oleh Mahkamah Agung Republik Indonesia melalui portal SIWAS:
            </p>
            <a 
              href="https://siwas.mahkamahagung.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center justify-center gap-1.5 w-full bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs py-2.5 rounded-lg transition-colors shadow-sm"
            >
              <span>Buka SIWAS Mahkamah Agung</span>
              <ExternalLink className="w-3.5 h-3.5 text-court-gold-500" />
            </a>
          </div>

          {/* FAQS */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
            <h4 className="font-display font-bold text-sm text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-1.5">
              <MessageSquare className="w-4.5 h-4.5 text-court-gold-600" />
              Tanya Jawab Seputar Pengaduan
            </h4>

            <div className="space-y-3">
              {faqData.map((faq, idx) => (
                <div key={idx} className="border border-gray-150 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full bg-slate-50 p-3 text-left flex justify-between items-center text-xs font-bold text-gray-800 focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${faqOpen[idx] ? "transform rotate-180" : ""}`} />
                  </button>
                  {faqOpen[idx] && (
                    <div className="p-3 text-[11px] text-gray-600 bg-white border-t border-gray-100 leading-relaxed font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
