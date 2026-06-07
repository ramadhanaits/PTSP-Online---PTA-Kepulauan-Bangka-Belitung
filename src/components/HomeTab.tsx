import React, { useState } from "react";
import { 
  Building2, 
  HelpCircle, 
  Scale, 
  Users, 
  BookOpen, 
  ChevronRight, 
  PhoneCall, 
  Send, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Ticket,
  Video
} from "lucide-react";

interface HomeTabProps {
  onTabChange: (tabName: string) => void;
}

export default function HomeTab({ onTabChange }: HomeTabProps) {
  // Live Queue simulator states
  const [createdTicket, setCreatedTicket] = useState<{
    number: string;
    desk: string;
    time: string;
    code: string;
  } | null>(null);
  const [ticketDesk, setTicketDesk] = useState("Kepaniteraan Banding");
  const [currentQueue, setCurrentQueue] = useState({
    banding: "B-03",
    ppid: "C-08",
    konsultasi: "K-02"
  });

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = ticketDesk === "Kepaniteraan Banding" ? "B" : ticketDesk === "PPID & Informasi" ? "C" : ticketDesk === "Telekonsultasi Virtual" ? "K" : "A";
    const randomNumber = Math.floor(Math.random() * 20) + 5;
    const ticketNo = `${prefix}-${String(randomNumber).padStart(2, '0')}`;
    const now = new Date();
    const timeString = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    const codeStr = `PTSP-BABEL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    setCreatedTicket({
      number: ticketNo,
      desk: ticketDesk,
      time: `${timeString} WIB`,
      code: codeStr
    });

    // Slightly increment mock current queue
    if (prefix === "B") setCurrentQueue(prev => ({ ...prev, banding: "B-04" }));
    if (prefix === "C") setCurrentQueue(prev => ({ ...prev, ppid: "C-09" }));
    if (prefix === "K") setCurrentQueue(prev => ({ ...prev, konsultasi: "K-03" }));
  };

  const desksData = [
    {
      title: "Layanan Kepaniteraan (Banding)",
      idName: "kepaniteraan",
      desc: "Layanan permohonan banding, penyerahan memori/kontra memori, verifikasi biaya panjar perkara pasca-putusan tingkat PA.",
      color: "border-l-4 border-court-green-900 bg-emerald-50/50",
      icon: <Scale className="w-5 h-5 text-court-green-900" />,
      actionLabel: "Periksa Berkas & Biaya",
      tab: "kepaniteraan"
    },
    {
      title: "Telekonsultasi Virtual (Zoom / Meet)",
      idName: "virtual",
      desc: "Konsultasi tatap muka online video secara langsung dengan petugas piket PTSP Pengadilan Tinggi Agama Babel.",
      color: "border-l-4 border-sky-500 bg-sky-50/50",
      icon: <Video className="w-5 h-5 text-sky-600" />,
      actionLabel: "Masuk Ruang Konsultasi",
      tab: "virtual"
    },
    {
      title: "Layanan Informasi Publik (PPID)",
      idName: "ppid",
      desc: "Hak akses informasi publik pengadilan, dokumen LHKPN, LHKASN, laporan tahunan, dan kebijakan strategis.",
      color: "border-l-4 border-amber-500 bg-amber-50/50",
      icon: <FileText className="w-5 h-5 text-amber-600" />,
      actionLabel: "Ajukan Permohonan Info",
      tab: "ppid"
    },
    {
      title: "Pengaduan Masyarakat (SIWAS)",
      idName: "pengaduan",
      desc: "Pedoman pelaporan pelanggaran disiplin aparatur sipil negara pengadilan, pungli atau penyalahgunaan jabatan.",
      color: "border-l-4 border-red-500 bg-red-50/50",
      icon: <Building2 className="w-5 h-5 text-red-600" />,
      actionLabel: "Laporkan Pelanggaran",
      tab: "pengaduan"
    }
  ];

  const quickContacts = [
    { name: "Desk Banding Perkara", wa: "+62 812-7412-0751", desc: "Konsultasi Berkas e-Court & Banding" },
    { name: "Desk Sekretariat & Umum", wa: "+62 812-7412-0751", desc: "Magang/Riset, Pengadaan, Surat Keluar/Masuk" },
    { name: "Pos Bakum (Layanan Advis)", wa: "+62 812-7412-0751", desc: "Bantuan Hukum Gratis Masyarakat Kurang Mampu" }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Welcome Unit */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-court-green-950 via-court-green-900 to-court-green-800 text-white p-6 md:p-8 shadow-xl border border-court-green-800">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden md:block">
          <Building2 className="w-64 h-64 text-white" />
        </div>
        <div className="max-w-3xl relative z-10">
          <span className="text-xs font-bold uppercase tracking-widest text-court-gold-400 bg-court-gold-500/15 py-1 px-3 rounded-full border border-court-gold-500/20">
            Pusat Pelayanan Digital Terintegrasi
          </span>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white mt-3 leading-tight">
            Selamat Datang di Pelayanan Terpadu Satu Pintu (PTSP) Online PTA Babel
          </h2>
          <p className="text-sm md:text-base text-emerald-100 mt-3 leading-relaxed">
            Menghadirkan pelayanan prima yang transparan, profesional, dan akuntabel tanpa batas jarak. Kini Anda dapat berkonsultasi secara tatap muka lewat panggilan video Zoom/Meet, berdiskusi instan via WhatsApp, atau menanyakan prosedur langsung kepada Asisten Virtual cerdas kami.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button 
              onClick={() => onTabChange("virtual")} 
              className="bg-court-gold-500 hover:bg-court-gold-600 text-court-green-950 px-5  py-2.5 rounded-lg font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              <Video className="w-4 h-4" /> Mulai Telekonsultasi Zoom/Meet
            </button>
            <a 
              href="https://wa.me/6281274120751?text=Halo%20PTSP%20Online%20PTA%20Bangka%20Belitung%2C%20saya%20ingin%20berkonsultasi..."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm shadow-md transition-all flex items-center gap-2 border border-emerald-500/30"
            >
              <PhoneCall className="w-4 h-4" /> Chat Utama WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Grid: 2 columns (Queue Machine & Desks Menu) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column (Desks Menu) - 8 span */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-display font-bold text-gray-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-court-green-900" />
                Materi & Pilihan Layanan PTSP
              </h3>
              <p className="text-xs text-gray-500">Pilih meja pelayanan sesuai keperluan informasi hukum Anda</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {desksData.map((desk) => (
              <div 
                key={desk.title}
                className={`p-5 rounded-xl border border-gray-200/85 hover:border-court-green-800/30 shadow-sm transition-all duration-300 flex flex-col justify-between hover:shadow-md ${desk.color}`}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="p-2 rounded-lg bg-white shadow-sm border border-gray-150">
                      {desk.icon}
                    </div>
                    <h4 className="font-semibold text-sm text-gray-950 font-display">
                      {desk.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {desk.desc}
                  </p>
                </div>
                
                <button
                  onClick={() => onTabChange(desk.tab)}
                  className="mt-4 flex items-center justify-between text-xs font-bold text-court-green-900 hover:text-court-gold-600 underline cursor-pointer w-full text-left"
                >
                  <span>{desk.actionLabel}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Quick WA Channels list */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
            <h4 className="font-display font-bold text-sm text-gray-900 flex items-center gap-1.5 border-b border-gray-100 pb-2">
              <PhoneCall className="w-4 h-4 text-emerald-600" /> WhatsApp Hotlines Resmi PTA Babel
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {quickContacts.map((contact) => (
                <div key={contact.name} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col justify-between">
                  <div>
                    <span className="block text-xs font-bold text-slate-800">{contact.name}</span>
                    <span className="block text-[11px] text-slate-500 mt-1">{contact.desc}</span>
                  </div>
                  <a
                    href={`https://wa.me/${contact.wa.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(contact.name)}%2C%20saya%20menghubungi%20via%20PTSP%20Online%20PTA%20Babel.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center gap-1.5 bg-white border border-emerald-300 hover:bg-emerald-50 text-emerald-700 text-xs py-1.5 px-3 rounded-md font-semibold font-mono transition-all text-center"
                  >
                    <span>{contact.wa}</span>
                    <Send className="w-3 h-3 text-emerald-600" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column (Queue Ticker + Live Stats Selector) - 4 span */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Live Queue Machine */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-court-green-900 p-4 text-white">
              <h4 className="font-display font-bold text-sm flex items-center gap-1.5">
                <Ticket className="w-4.5 h-4.5 text-court-gold-400" />
                Sistem Tiket Antrean Online
              </h4>
              <p className="text-[10px] text-emerald-200 mt-0.5">Pantau status antrean aktif PTSP Pengadilan hari ini</p>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Monitors */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                  <span className="block text-[9px] font-bold text-emerald-800 uppercase">Meja Banding</span>
                  <span className="block text-lg font-mono font-bold text-court-green-900 mt-0.5">{currentQueue.banding}</span>
                </div>
                <div className="p-2 bg-amber-50 rounded-lg border border-amber-100">
                  <span className="block text-[9px] font-bold text-amber-800 uppercase">PPID/Info</span>
                  <span className="block text-lg font-mono font-bold text-amber-700 mt-0.5">{currentQueue.ppid}</span>
                </div>
                <div className="p-2 bg-sky-50 rounded-lg border border-sky-100">
                  <span className="block text-[9px] font-bold text-sky-800 uppercase">V-Consult</span>
                  <span className="block text-lg font-mono font-bold text-sky-700 mt-0.5">{currentQueue.konsultasi}</span>
                </div>
              </div>

              {/* Take ticket form */}
              <form onSubmit={handleCreateTicket} className="border-t border-gray-100 pt-4 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Pilih Keperluan Loket:
                  </label>
                  <select 
                    value={ticketDesk}
                    onChange={(e) => setTicketDesk(e.target.value)}
                    className="w-full text-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-court-green-900 bg-white"
                  >
                    <option value="Kepaniteraan Banding">Kepaniteraan (Banding Perkara)</option>
                    <option value="PPID & Informasi">PPID / Permohonan Berkas & Informasi</option>
                    <option value="Telekonsultasi Virtual">Virtual Consultation (Zoom / Meet)</option>
                    <option value="Umum & Sekretariat">Administrasi Kesekretariatan / Magang</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-court-green-900 hover:bg-court-green-950 text-white font-bold text-xs py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Ticket className="w-3.5 h-3.5 text-court-gold-400" /> Ambil Nomor Antrean Virtual
                </button>
              </form>

              {/* Generated Ticket Display */}
              {createdTicket && (
                <div className="relative border-2 border-dashed border-court-gold-500 bg-court-gold-100/30 rounded-lg p-3 text-center space-y-2 animate-fade-in">
                  <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs">
                    <CheckCircle2 className="w-2.5 h-2.5" /> SUKSES
                  </div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">TIKET ANTRIAN DIGITAL</span>
                  <h5 className="text-3xl font-mono font-extrabold text-court-green-950 tracking-wider">
                    {createdTicket.number}
                  </h5>
                  <div className="text-[11px] font-medium text-slate-800">
                    <p className="font-semibold">{createdTicket.desk}</p>
                    <p className="text-gray-500 font-mono text-[10px] mt-0.5">Dibuat: {createdTicket.time}</p>
                    <p className="text-[9px] bg-white border border-gray-200 mt-2 p-1 rounded font-mono text-court-green-800">
                      CODE: {createdTicket.code}
                    </p>
                  </div>
                  <span className="block text-[9px] text-emerald-800 italic font-medium leading-tight">
                    *Tunjukkan nomor ini pada petugas saat telekonsultasi Zoom/Meet aktif berjalan!
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Opening Schedule Metrics Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-3">
            <h4 className="font-display font-bold text-sm text-gray-900 flex items-center gap-1.5 border-b border-gray-100 pb-2">
              <Calendar className="w-4 h-4 text-court-gold-600" /> Jam Kerja Pelayanan PTSP
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Senin s/d Kamis:</span>
                <span>08.00 - 16.30 WIB</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span className="font-medium">Hari Jumat:</span>
                <span>08.00 - 17.00 WIB</span>
              </div>
              <div className="border-t border-gray-100 my-2 pt-2 text-[11px] text-gray-500">
                <p className="font-semibold text-slate-700">Waktu Istirahat Petugas:</p>
                <p>Senin-Kamis: 12.00 - 13.00 WIB</p>
                <p>Jumat: 11.30 - 13.30 WIB (Shalat Jumat)</p>
              </div>
              <div className="bg-rose-50 border border-rose-100 p-3 rounded-lg text-rose-800 text-[11px] leading-relaxed">
                <strong>Ingat:</strong> Pendaftaran perkara e-Court dapat dilakukan secara mandiri 24 jam penuh di portal e-court Mahkamah Agung. Layanan manual via PTSP diproses sesuai jam operasional di atas.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
