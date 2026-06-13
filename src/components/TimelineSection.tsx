import React, { useState } from "react";
import { TrendingUp, RefreshCw, Calendar, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { migrationData } from "../data";

export default function TimelineSection() {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const timeline = migrationData.timelineData;

  // Retrieve selected year details
  const activeYearData = timeline.find((t) => t.year === selectedYear) || timeline[timeline.length - 1];

  // Specific historical event summaries for each year to make people understand the structural context
  const yearNotes: Record<number, { title: string; desc: string; impact: string }> = {
    2018: {
      title: "Puncak Pembinaan & Industri",
      desc: "Pertumbuhan ekonomi Malaysia yang stabil memacu keperluan tinggi pekerja buruh kasar terutamanya bagi projek LRT3, MRT2, dan lebuh raya Pan Borneo, menarik rekod tertinggi PLKS sah melebihi 2 juta orang.",
      impact: "Kestabilan pengambilan buruh asing; anggaran PATI stabil pada julat pertengahan."
    },
    2019: {
      title: "Kempen Pulang Sukarela (Program B4G)",
      desc: "Kementerian Dalam Negeri melancarkan inisiatif 'Back for Good' (B4G) bagi pendatang asing tanpa izin untuk kembali ke negara asal secara sukarela demi membersihkan isu lambakan buruh haram.",
      impact: "Hampir 190,000 PATi dihantar pulang secara sah, memberi nafas baharu kepada sempadan udara & darat."
    },
    2020: {
      title: "Pandemik COVID-19 & Sekatan Sempadan",
      desc: "Langkah mengekang virus rantaian COVID-19 bermula daripada pengisytiharan Perintah Kawalan Pergerakan (PKP). Sektor pembinaan lumpuh seketika, permit kerja tidak diperbaharui akibat kekangan pendaftaran fizikal.",
      impact: "Penurunan ketara pekerja sah aktif disebabkan pembekuan kemasukan baru; peningkatan status undocumented (PATI) mendadak akibat permit luput semasa sekatan PKP."
    },
    2021: {
      title: "Puncak Kemelesetan Pasaran Buruh Sah",
      desc: "Pembekuan kemasukan buruh asing diteruskan sepanjang tahun. Banyak kilang mengalami kekurangan tenaga kerja kritikal. Kebanyakan pekerja asing yang tinggal tamat permit terpaksa bekerja di sektor tidak rasmi.",
      impact: "Jumlah permit PLKS aktif jatuh menjunam ke paras terendah ~1.1 juta. Sentimen ketakutan kesihatan & serbuan JIM."
    },
    2022: {
      title: "Pembukaan Semula Sempadan Fizikal",
      desc: "Fasa endemik menyaksikan sempadan Malaysia dibuka sepenuhnya pada April 2022. Kerajaan meluluskan kemasukan semula kuota pekerja asing secara besar-besaran untuk menyelamatkan industri pembuatan sarung tangan, pembinaan, dan pertanian.",
      impact: "Angka permit sah meningkat semula kepada 1.45 juta untuk mengatasi jurang kekurangan bekalan herotan buruh."
    },
    2023: {
      title: "Pelancaran Pemutihan RTK 2.0 & Serbuan",
      desc: "Pemeteraian inisiatif Rekalibrasi Tenaga Kerja (RTK 2.0) membekalkan saluran rasmi bagai pengabsahan kelayakan PATI terdahulu. Kerajaan menguatkuasakan kawalan ketat pintu sempadan udara (e.g. KLIA) bagi menghalang kemasukan modus operandi pelancong bekerja.",
      impact: "Legalisation yang meluas mengecilkan populasi anggaran PATI. Peningkatan hasil dari levi & kompaun mendadak."
    },
    2024: {
      title: "Pembekuan Kuota Pengambilan Baharu & Penguatkuasaan",
      desc: "Mulai suku kedua 2024, kerajaan membekukan kelulusan kuota pekerja asing baharu memandangkan siling had pekerja asing 15% dari guna tenaga domestik hampir dicapai. Sektor perladangan kelapa sawit dan pertanian diberi fokus automasi mekanikal.",
      impact: "Penstabilan bilangan pekerja sah aktif pada 2.36 juta orang. Serangan proaktif Ops Kutipan PATI dilakukan berterusan demi keselamatan."
    }
  };

  const activeNotes = yearNotes[selectedYear];

  // Maximum value for bar scaling calculation (use max value in database to normalize heights)
  const maxBarValue = 2500000;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6" id="timeline-comparison-section">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h4 className="text-lg font-display font-medium text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            Kronologi & Trend Dinamik Migrasi (2018 - 2024)
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            Bagaimana dasar imigrasi, pandemik, dan kempen pemutihan kerajaan membentuk demografi negara.
          </p>
        </div>
        <div className="flex gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800/80 overflow-x-auto max-w-full">
          {timeline.map((item) => (
            <button
              key={item.year}
              onClick={() => setSelectedYear(item.year)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all uppercase ${
                selectedYear === item.year
                  ? "bg-indigo-600 text-slate-100 font-bold"
                  : "text-slate-400 hover:text-slate-2050 hover:bg-slate-900"
              }`}
            >
              {item.year}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Animated Comparative Charts (7 cols) */}
        <div className="lg:col-span-7 space-y-6 bg-slate-950 p-5 rounded-xl border border-slate-800/80">
          <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-850 pb-2 mb-2 font-mono">
            <span>PERBANDINGAN POPULASI TAHUN {selectedYear}</span>
            <span>Skala Maksimum: 2.5 Juta</span>
          </div>

          <div className="space-y-5">
            {/* 1. Legal Workers Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-sans">
                <span className="text-emerald-400 font-medium">1. Pekerja Asing Berpermit (PLKS)</span>
                <span className="font-mono text-slate-300 font-bold">
                  {activeYearData.legalCount.toLocaleString("ms-MY")} Orang
                </span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-8 overflow-hidden relative border border-slate-800 flex items-center">
                <motion.div
                  className="bg-emerald-500/20 border-r-2 border-emerald-500 h-full rounded-l-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${(activeYearData.legalCount / maxBarValue) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <span className="absolute left-3 text-[11px] font-mono text-emerald-200">
                  Kemasukan Sah Melalui Sektor Formal
                </span>
              </div>
            </div>

            {/* 2. Undocumented PATI Estimates Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-sans">
                <span className="text-rose-400 font-medium">2. Anggaran Pendatang Tanpa Izin (PATI)</span>
                <span className="font-mono text-slate-3050 font-bold flex items-center gap-1">
                  ~{activeYearData.patiEstimate.toLocaleString("ms-MY")} Orang
                </span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-8 overflow-hidden relative border border-slate-800 flex items-center">
                <motion.div
                  className="bg-rose-500/20 border-r-2 border-rose-500 h-full rounded-l-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${(activeYearData.patiEstimate / maxBarValue) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <span className="absolute left-3 text-[11px] font-mono text-rose-200">
                  Anggaran Mengikut Siasatan Lapangan & JIM
                </span>
              </div>
            </div>

            {/* 3. Refugees Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5 font-sans">
                <span className="text-blue-400 font-medium">3. Pelarian Berdaftar (UNHCR)</span>
                <span className="font-mono text-slate-300 font-bold">
                  {activeYearData.refugeeCount.toLocaleString("ms-MY")} Orang
                </span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-8 overflow-hidden relative border border-slate-800 flex items-center">
                <motion.div
                  className="bg-blue-500/20 border-r-2 border-blue-500 h-full rounded-l-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${(activeYearData.refugeeCount / maxBarValue) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <span className="absolute left-3 text-[11px] font-mono text-blue-200">
                  Berdaftar Bawah Mandat Sementara UNHCR Malaysia
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-850 flex justify-between text-[10px] font-mono text-slate-450">
            <span>* Sumber Kompilasi: DOSM, UNHCR, Laporan Tahunan Parlimen (JIM)</span>
            <span>Nilai dikira berdasarkan unjuran rasmi tahunan</span>
          </div>
        </div>

        {/* Narrative & Policy Impact (5 cols) */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-medium tracking-wider uppercase">
              <Calendar className="w-4 h-4" />
              Impak Polisi Tahun {selectedYear}
            </div>

            <h5 className="text-md font-display font-semibold text-slate-100 leading-tight">
              {activeNotes.title}
            </h5>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {activeNotes.desc}
            </p>

            <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800/60">
              <span className="text-[10px] font-mono text-indigo-300 block font-bold uppercase tracking-wide">
                Implikasi Kepada Struktur Imigrasi:
              </span>
              <p className="text-xs text-slate-300 mt-1 leading-snug font-sans">
                {activeNotes.impact}
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-950/40 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
            <span className="text-slate-400 font-sans">Ingin analisis lanjut mengenai tahun ini?</span>
            <span className="text-indigo-400 font-mono flex items-center gap-0.5 group cursor-pointer hover:underline">
              Guna AI di bawah <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
