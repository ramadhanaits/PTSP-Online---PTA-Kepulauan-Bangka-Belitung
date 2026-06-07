import { Scale, ShieldCheck, Clock, Phone, Video } from "lucide-react";
import { useState, useEffect } from "react";
// @ts-expect-error - image asset for official court logo
import ptaBabelLogo from "../assets/images/pta_babel_logo_1780832327203.png";

export default function Header() {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-court-green-950 text-white shadow-md">
      {/* Top utility bar */}
      <div className="w-full bg-[#021f18] px-4 py-2 text-xs border-b border-court-green-900 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-emerald-300">
            <Clock className="w-3.5 h-3.5 text-court-gold-500 animate-pulse" />
            <span className="font-mono">{timeStr || "WIB"}</span>
          </span>
          <span className="hidden sm:inline text-gray-400">|</span>
          <span className="text-gray-300 hidden sm:inline">
            Status PTSP: <span className="bg-emerald-800 text-emerald-200 px-1.5 py-0.5 rounded font-bold text-[10px]">AKTIF</span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-gray-300">
          <span className="flex items-center gap-1 hover:text-court-gold-400 transition-colors cursor-pointer">
            <Phone className="w-3.5 h-3.5" />
            <span>Krisis Center: +62 812-7412-0751</span>
          </span>
          <span className="hidden sm:inline text-gray-400">|</span>
          <span className="flex items-center gap-1 hover:text-court-gold-400 transition-colors cursor-pointer">
            <Video className="w-3.5 h-3.5" />
            <span>ID Room Meet: ptababel-ptsp</span>
          </span>
        </div>
      </div>

      {/* Main Branding Section */}
      <div className="max-w-7xl mx-auto px-4 py-5 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center md:text-left">
          {/* Custom Royal Logo Image */}
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center border-2 border-court-gold-500 shadow-lg relative flex-shrink-0">
            <img 
              src={ptaBabelLogo} 
              alt="Logo PTA Kepulauan Bangka Belitung" 
              className="w-11 h-11 md:w-13 md:h-13 object-contain rounded-full"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-court-gold-500 border border-white flex items-center justify-center">
              <ShieldCheck className="w-3 h-3 text-court-green-950" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start flex-wrap">
              <span className="text-xs bg-court-gold-500/20 text-court-gold-400 border border-court-gold-500/30 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Mahkamah Agung RI
              </span>
              <span className="text-xs bg-emerald-900/40 text-emerald-300 border border-emerald-800/20 font-semibold px-2 py-0.5 rounded">
                E-PTSP Terpadu
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-display font-bold tracking-tight text-white mt-1">
              PENGADILAN TINGGI AGAMA KEPULAUAN BANGKA BELITUNG
            </h1>
            <p className="text-xs md:text-sm text-emerald-300 font-sans tracking-wide">
              Layanan Terpadu Satu Pintu (PTSP) Online & Telekonsultasi Virtual
            </p>
          </div>
        </div>

        {/* Commitment Seal */}
        <div className="hidden lg:flex items-center gap-3 bg-court-green-900/40 border border-court-gold-500/20 rounded-lg p-3">
          <div className="text-right">
            <span className="block text-[10px] text-court-gold-400 uppercase tracking-widest font-bold">KOMITMEN UTAMA</span>
            <span className="block text-xs font-semibold text-white">Wilayah Bebas Korupsi (WBK)</span>
            <span className="block text-[10px] text-emerald-300">Clean & Fair Court Pelayanan Terbaik</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-court-gold-500/10 flex items-center justify-center border border-court-gold-500/40">
            <Scale className="w-5 h-5 text-court-gold-500" />
          </div>
        </div>
      </div>

      {/* Marquee Info Bar */}
      <div className="w-full bg-court-green-900 border-t border-b border-court-green-800 py-1.5 overflow-hidden flex items-center text-xs">
        <span className="bg-court-gold-500 text-court-green-950 px-3 py-1 font-bold rounded-r-full uppercase tracking-wider text-[10px] flex-shrink-0 flex items-center gap-1 z-10 shadow">
          <ShieldCheck className="w-3.5 h-3.5" /> INFO PENTING:
        </span>
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex gap-8 select-none py-0.5 text-emerald-100 font-medium font-sans">
            <span>⚖️ Selamat datang di PTSP Online PTA Bangka Belitung. Layanan panitera jaminan kepastian hukum terpercaya.</span>
            <span>Hubungi Desk Kepaniteraan langsung via WhatsApp Hub di +62 812-7412-0751 untuk konsultasi berkas banding yang cepat dan aman.</span>
            <span>🎥 Layanan Tatap Muka Online via Zoom Meeting dan Google Meet aktif setiap hari kerja (Senin s/d Jumat) jam 09:00 s/d 15:00 WIB tanpa biaya!</span>
            <span>🏢 PTA Bangka Belitung menjaga integritas suap dan gratifikasi, adukan segala kecurangan melalui sistem SIWAS Mahkamah Agung RI.</span>
            <span>📄 Pengambilan salinan putusan banding dapat divalidasi secara online dan dikirimkan berkasnya secara elektronik terpecaya.</span>
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: inline-flex;
            animation: marquee 35s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>
    </header>
  );
}
