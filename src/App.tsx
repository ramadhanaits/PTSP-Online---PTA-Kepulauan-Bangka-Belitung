import { useState } from "react";
import Header from "./components/Header";
import HomeTab from "./components/HomeTab";
import KepaniteraanTab from "./components/KepaniteraanTab";
import VirtualMeetTab from "./components/VirtualMeetTab";
import PpidTab from "./components/PpidTab";
import PengaduanTab from "./components/PengaduanTab";
import ChatWidget from "./components/ChatWidget";
import { 
  Building2, 
  Scale, 
  Video, 
  FileText, 
  ShieldAlert, 
  MessageSquareOff,
  MessageSquarePlus,
  HelpCircle
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [isAiWidgetVisible, setIsAiWidgetVisible] = useState(true);

  const tabs = [
    { id: "home", label: "Beranda", icon: <Building2 className="w-4 h-4" /> },
    { id: "kepaniteraan", label: "Kepaniteraan (Banding)", icon: <Scale className="w-4 h-4" /> },
    { id: "virtual", label: "V-Meet Telekonsultasi", icon: <Video className="w-4 h-4" /> },
    { id: "ppid", label: "PPID & Berkas", icon: <FileText className="w-4 h-4" /> },
    { id: "pengaduan", label: "Pengaduan (SIWAS)", icon: <ShieldAlert className="w-4 h-4" /> }
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab onTabChange={(tab: string) => setActiveTab(tab)} />;
      case "kepaniteraan":
        return <KepaniteraanTab />;
      case "virtual":
        return <VirtualMeetTab />;
      case "ppid":
        return <PpidTab />;
      case "pengaduan":
        return <PengaduanTab />;
      default:
        return <HomeTab onTabChange={(tab: string) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Royal Official Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        
        {/* Navigation & Tab selectors */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-gray-200 pb-4 mb-6 gap-4">
          <div className="flex flex-wrap gap-1 bg-gray-100 rounded-lg p-1.5 self-start shadow-xs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 text-xs font-bold py-2.5 px-4 rounded-md transition-all cursor-pointer ${
                  activeTab === tab.id 
                    ? "bg-court-green-900 text-white shadow-sm" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-gray-200/50"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Toggle AI Sidebar utility for client preference */}
          <button
            onClick={() => setIsAiWidgetVisible(!isAiWidgetVisible)}
            className="flex items-center justify-center gap-1.5 border border-gray-300 hover:border-court-green-900 bg-white hover:bg-emerald-50 text-slate-800 hover:text-court-green-950 font-bold text-xs py-2.5 px-4 rounded-lg shadow-xs transition-all cursor-pointer"
          >
            {isAiWidgetVisible ? (
              <>
                <MessageSquareOff className="w-4 h-4 text-red-600" />
                <span>Sembunyikan AI Asisten</span>
              </>
            ) : (
              <>
                <MessageSquarePlus className="w-4 h-4 text-court-gold-600 animate-bounce" />
                <span>Buka AI Asisten (SI-PINTAR)</span>
              </>
            )}
          </button>
        </div>

        {/* Content Splitter: Tabs on Left, Persistent AI on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Panel Column */}
          <div className={`${isAiWidgetVisible ? "lg:col-span-8" : "lg:col-span-12"} transition-all duration-300`}>
            {renderActiveTabContent()}
          </div>

          {/* Sidebar Chatbot Concierge Column */}
          {isAiWidgetVisible && (
            <div className="lg:col-span-4 lg:sticky lg:top-6 space-y-4 animate-fade-in sm:w-full">
              
              {/* Bot Info card info */}
              <div className="bg-gradient-to-br from-court-green-950 to-court-green-900 p-4 rounded-xl text-white shadow-md border border-court-green-800">
                <span className="text-[9px] font-bold text-court-gold-400 tracking-wider block uppercase mb-1">
                  LAYANAN ASISTENSI 24 JAM
                </span>
                <p className="text-xs text-emerald-100 leading-relaxed font-sans">
                  Ada kendala berkas perkara atau ingin konsultasi prosedur hukum dini? Sapa asisten virtual kami di bawah ini untuk respon kilat tanpa antre.
                </p>
              </div>

              {/* Chat Widget component */}
              <ChatWidget />
              
              {/* Internal service info */}
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-[10px] text-amber-900 leading-relaxed">
                <strong>Ingat Hukum:</strong> Segala isi saran pelayanan virtual dari robot AI SI-PINTAR Babel bersifat panduan administratif prosedural dini. Validitas hukum utama tetap mengikat pada berkas resmi di panitera pengadilan agama pengaju.
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Official Foot-seal of PTA Kepulauan Bangka Belitung */}
      <footer className="bg-court-green-950 text-gray-400 text-xs py-10 mt-16 border-t-2 border-court-gold-500">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-3">
            <h5 className="font-display font-bold text-sm text-white tracking-wide">
              PTA KEPULAUAN BANGKA BELITUNG
            </h5>
            <p className="leading-relaxed text-[11px] text-gray-400 font-sans">
              Pengadilan Tinggi Agama Kepulauan Bangka Belitung berkomitmen memberikan pelayanan hukum banding perdata agama secara prima, adil, transparan, serta anti suap demi mewujudkan zona integritas WBK/WBBM.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="font-display font-bold text-sm text-white tracking-wide">
              Yurisdiksi Hukum PA Pengaju
            </h5>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <a href="https://www.pa-pangkalpinang.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-court-gold-400 transition-colors">PA Pangkalpinang</a>
              <a href="https://www.pa-sungailiat.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-court-gold-400 transition-colors">PA Sungailiat</a>
              <a href="https://www.pa-mentok.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-court-gold-400 transition-colors">PA Mentok</a>
              <a href="https://www.pa-bangkaselatan.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-court-gold-400 transition-colors">PA Bangka Selatan</a>
              <a href="https://www.pa-tanjungpandan.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-court-gold-400 transition-colors">PA Tanjungpandan</a>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="font-display font-bold text-sm text-white tracking-wide">
              Kontak Utama & Alamat Fisik
            </h5>
            <address className="not-italic text-[11px] leading-relaxed space-y-1">
              <p>Kompleks Perkantoran Pemerintah Daerah Provinsi Kepulauan Bangka Belitung</p>
              <p>Jl. Pulau Bangka, Air Itam, Bukit Intan, Pangkalpinang, Babel 33149.</p>
              <p className="font-mono text-emerald-400 pt-1">Telpon: (0717) 439222 | Email: info@pta-bangka-belitung.go.id</p>
            </address>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 border-t border-court-green-900 mt-8 pt-4 text-center text-[10px] flex flex-col sm:flex-row justify-between items-center gap-3 text-gray-500">
          <span>Hak Cipta © 2026 Pengadilan Tinggi Agama Kepulauan Bangka Belitung. Lindungan Undang-Undang.</span>
          <span className="text-court-gold-500 font-bold uppercase tracking-wider bg-court-gold-500/5 px-2 py-0.5 rounded border border-court-gold-500/10">
            MAHKAMAH AGUNG REPUBLIK INDONESIA
          </span>
        </div>
      </footer>
    </div>
  );
}
