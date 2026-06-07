import { useState } from "react";
import { 
  Scale, 
  HelpCircle, 
  CheckCircle2, 
  ChevronRight, 
  Calculator, 
  Clock, 
  FileCheck, 
  Info,
  DollarSign,
  AlertCircle
} from "lucide-react";

export default function KepaniteraanTab() {
  const [originPa, setOriginPa] = useState("PA Pangkalpinang");
  const [caseType, setCaseType] = useState("Cerai Gugat / Cerai Talak");
  const [docChecklist, setDocChecklist] = useState({
    aktaBanding: false,
    salinanPutusan: false,
    memoriBanding: false,
    buktiBayar: false,
    suratKuasa: false,
  });

  const paFees: Record<string, { transport: number; mailing: number; label: string }> = {
    "PA Pangkalpinang": { transport: 50000, mailing: 100000, label: "Pangkalpinang (Dalam Kota)" },
    "PA Sungailiat": { transport: 150000, mailing: 120000, label: "Kabupaten Bangka (Sungailiat)" },
    "PA Mentok": { transport: 250000, mailing: 150000, label: "Kabupaten Bangka Barat (Mentok)" },
    "PA Bangka Selatan": { transport: 200000, mailing: 130000, label: "Kabupaten Bangka Selatan (Toboali)" },
    "PA Tanjungpandan": { transport: 450000, mailing: 250000, label: "Pulau Belitung (Tanjungpandan - Butuh pengiriman udara)" },
  };

  const getCalculatedFees = () => {
    const base = paFees[originPa] || { transport: 100000, mailing: 100000 };
    const pendaftaranFee = 50000;
    const redaksiFee = 10000;
    const meteraiFee = 10000;
    const penyelesaianBerkas = 150000;
    
    // Total calculation
    const total = pendaftaranFee + redaksiFee + meteraiFee + penyelesaianBerkas + base.transport + base.mailing;
    
    return {
      pendaftaran: pendaftaranFee,
      redaksi: redaksiFee,
      meterai: meteraiFee,
      penyelesaian: penyelesaianBerkas,
      transport: base.transport,
      pengiriman: base.mailing,
      total: total
    };
  };

  const fees = getCalculatedFees();

  const handleToggleCheck = (key: keyof typeof docChecklist) => {
    setDocChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const completedCount = Object.values(docChecklist).filter(Boolean).length;
  const totalCount = Object.keys(docChecklist).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const stepsBanding = [
    { title: "Pengajuan Permohonan", desc: "Pemohon mengajukan pernyataan banding secara lisan atau tertulis di kepaniteraan Pengadilan Agama Pengaju dalam waktu 14 hari sejak putusan dibacakan." },
    { title: "Pembayaran Panjar", desc: "Membayar panjar biaya banding melalui Bank yang ditentukan oleh PA Pengaju sesuai taksiran SKUM Panjar." },
    { title: "Pembuatan Akta Banding", desc: "Panitera PA Pengaju membuat Akta Pernyataan Banding dan mencatat permohonan dalam buku register perkara banding." },
    { title: "Pemberitahuan & Memori", desc: "Pembanding berhak mengajukan Memori Banding. Panitera memberitahukan pernyataan banding dan mengirimkan salinan memori kepada Terbanding." },
    { title: "Inzage (Pemeriksaan Berkas)", desc: "Kedua belah pihak diberi kesempatan memeriksa berkas perkara (inzage) sebelum dikirimkan ke Pengadilan Tinggi Agama Babel." },
    { title: "Pengiriman Berkas (Bundel A & B)", desc: "PA Pengaju mengirimkan berkas lengkap (fisi / e-Court) ke PTA Babel paling lambat 1 bulan sejak diterimanya biaya panjar." },
    { title: "Penyelesaian Perkara", desc: "Majelis Hakim PTA Babel memeriksa berkas, menggelar sidang musyawarah, memutus perkara, dan mengirimkan salinan putusan ke PA Pengaju untuk diberitahukan." }
  ];

  return (
    <div className="space-y-8">
      {/* Intro section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 rounded-lg text-court-green-900 border border-emerald-100">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-gray-950">Layanan Kepaniteraan Tingkat Banding</h3>
            <p className="text-xs text-gray-500">Panduan lengkap prosedur, pelacakan kelengkapan, dan perkiraan biaya banding perkara perdata agama</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Cost calculator & Checklist validation - 7 span */}
        <div className="lg:col-span-7 space-y-6">

          {/* Dynamic Calculator Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-court-green-900 to-court-green-800 p-4 text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-court-gold-400" />
              <div>
                <h4 className="font-display font-semibold text-sm">Simulasi Panjar Perkara Banding</h4>
                <p className="text-[10px] text-emerald-200">Estimasi berdasarkan Peraturan MA RI & Geografis Kepulauan Babel</p>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Pengadilan Agama Pengaju (Asal Berkas):
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
                  <span className="block text-[10px] text-gray-500 italic mt-1 font-mono">
                    Lokasi: {paFees[originPa]?.label}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Jenis Masalah Hukum / Perkara:
                  </label>
                  <select
                    value={caseType}
                    onChange={(e) => setCaseType(e.target.value)}
                    className="w-full text-xs p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-court-green-900 bg-white"
                  >
                    <option value="Cerai Gugat / Cerai Talak">Cerai Gugat / Cerai Talak</option>
                    <option value="Waris & Harta Bersama">Waris & Harta Bersama / Gono-Gini</option>
                    <option value="Ekonomi Syariah">Perkara Ekonomi Syariah (Bisnis Islam)</option>
                    <option value="Dispnikah / Izin Poligami">Dispensasi Nikah / Izin Poligami</option>
                    <option value="Lainnya">Pengesahan Nikah / Hibah / Wakaf</option>
                  </select>
                </div>
              </div>

              {/* Bill Output breakdown */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/90 space-y-2 font-sans">
                <span className="block text-[10px] font-bold text-slate-500 tracking-wider uppercase border-b border-slate-200 pb-1.5 mb-2">Rincian Komponen Biaya Panjar</span>
                
                <div className="flex justify-between text-xs text-gray-700">
                  <span>1. Biaya Pendaftaran Banding (Kepaniteraan)</span>
                  <span className="font-mono text-gray-900">Rp {fees.pendaftaran.toLocaleString("id-ID")}</span>
                </div>

                <div className="flex justify-between text-xs text-gray-700">
                  <span>2. Biaya Redaksi Putusan PTA Babel</span>
                  <span className="font-mono text-gray-900">Rp {fees.redaksi.toLocaleString("id-ID")}</span>
                </div>

                <div className="flex justify-between text-xs text-gray-700">
                  <span>3. Biaya Meterai Negara (E-Meterai)</span>
                  <span className="font-mono text-gray-900">Rp {fees.meterai.toLocaleString("id-ID")}</span>
                </div>

                <div className="flex justify-between text-xs text-gray-700">
                  <span>4. Biaya Pemberkasan & Pengolahan Dokumen</span>
                  <span className="font-mono text-gray-900">Rp {fees.penyelesaian.toLocaleString("id-ID")}</span>
                </div>

                <div className="flex justify-between text-xs text-gray-700">
                  <span>5. Estimasi Pengiriman Berkas Fisik (Pos Kilat)</span>
                  <span className="font-mono text-gray-900">Rp {fees.pengiriman.toLocaleString("id-ID")}</span>
                </div>

                <div className="flex justify-between text-xs text-gray-700">
                  <span>6. Transportasi Pemberitahuan Wilayah PA</span>
                  <span className="font-mono text-gray-900">Rp {fees.transport.toLocaleString("id-ID")}</span>
                </div>

                <div className="border-t border-slate-300 my-3.5 pt-2 flex justify-between items-center bg-emerald-100/40 p-2.5 rounded-lg border border-emerald-200/40">
                  <span className="text-xs font-bold text-court-green-950 uppercase">TOTAL TAKSIRAN PANJAR:</span>
                  <span className="text-lg font-mono font-extrabold text-court-green-900">
                    Rp {fees.total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 items-start bg-amber-50 p-3 rounded-lg border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Catatan Penting:</strong> Nominal di atas merupakan kalkulasi taksiran awal (panjar). Jika sewaktu-waktu terdapat kelebihan sisa biaya banding, PA Pengaju wajib mengembalikannya kepada Pemohon secara e-banking (Sisa Panjar Perkara). Sebaliknya, bila terjadi kekurangan, Pemohon wajib menambahkannya.
                </p>
              </div>
            </div>
          </div>

          {/* Doc Checklist Validation */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
              <h4 className="font-display font-bold text-sm text-gray-900 flex items-center gap-1.5">
                <FileCheck className="w-4.5 h-4.5 text-emerald-600" /> Checklist Kelengkapan Dokumen Banding
              </h4>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {progressPercent}% Siap
              </span>
            </div>

            <p className="text-xs text-gray-600">
              Centang dokumen yang sudah Anda persiapkan secara fisik maupun digital sebelum melakukan proses upload ke e-Court atau diserahkan langsung ke pengadilan pengaju.
            </p>

            <div className="space-y-2.5">
              {[
                { key: "aktaBanding", label: "Akta Pernyataan Banding", desc: "Diterbitkan panitera PA Pengaju setelah menyatakan banding" },
                { key: "salinanPutusan", label: "Salinan Putusan Tingkat Pertama", desc: "Putusan resmi yang dikeluarkan oleh majelis hakim PA asal" },
                { key: "memoriBanding", label: "Memori Banding (Sangat Disarankan)", desc: "Dokumen keberatan hukum/alasan pengajuan banding" },
                { key: "buktiBayar", label: "Bukti Setoran Bayar Panjar Biaya Banding", desc: "Slip setor bank / bukti transfer e-banking panjar perkara" },
                { key: "suratKuasa", label: "Surat Kuasa Khusus Terdaftar", desc: "Hanya apabila menggunakan jasa penasihat hukum / advokat resmi" }
              ].map((item) => (
                <div 
                  key={item.key}
                  onClick={() => handleToggleCheck(item.key as keyof typeof docChecklist)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 select-none ${
                    docChecklist[item.key as keyof typeof docChecklist] 
                      ? "bg-slate-50 border-court-green-800 text-slate-900" 
                      : "bg-white border-gray-200 text-gray-500 hover:bg-slate-50/50"
                  }`}
                >
                  <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center flex-shrink-0 ${
                    docChecklist[item.key as keyof typeof docChecklist] 
                      ? "bg-court-green-900 border-court-green-900 text-white" 
                      : "border-gray-300 bg-white"
                  }`}>
                    {docChecklist[item.key as keyof typeof docChecklist] && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-800">{item.label}</span>
                    <span className="block text-[10px] text-gray-500 mt-0.5">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic Status block based on progress */}
            {progressPercent === 100 ? (
              <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-lg text-emerald-900 text-xs flex gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <p>
                  <strong>Semua Dokumen Lengkap!</strong> Berkas Anda siap diajukan. Silakan lakukan proses sinkronisasi lewat portal e-Court atau buat janji temu dengan WhatsApp desk banding untuk validasi berkas fisik lebih lanjut.
                </p>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-slate-700 text-[11px] flex gap-2">
                <AlertCircle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <p>Silakan centang berkas-berkas di atas untuk mengonformasi dokumen kesiapan banding perkara Anda.</p>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: 7 Appellate steps list - 5 span */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-5">
            <h4 className="font-display font-bold text-sm text-gray-900 flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
              <Clock className="w-4.5 h-4.5 text-court-gold-600" /> Alur 7 Tahapan Perkara Banding PTA Babel
            </h4>

            <div className="relative border-l border-emerald-100 pl-4 space-y-5 ml-2.5">
              {stepsBanding.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Step ball */}
                  <div className="absolute -left-[24.5px] top-0 w-4 h-4 rounded-full bg-white border-2 border-court-green-900 flex items-center justify-center text-[10px] font-bold text-court-green-900 font-mono shadow-xs">
                    {idx + 1}
                  </div>
                  <div className="space-y-1">
                    <span className="block text-xs font-bold text-gray-800">{step.title}</span>
                    <p className="text-[11px] text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
