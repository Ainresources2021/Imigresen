import React, { useState } from "react";
import { Briefcase, Factory, HardHat, ShieldCheck, Sprout, Home, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { migrationData } from "../data";

export default function WorkersTab() {
  const [activeSector, setActiveSector] = useState<string | null>("Pembuatan (Manufacturing)");
  const data = migrationData.foreignWorkers;

  const sectorIcons: Record<string, any> = {
    "Pembuatan (Manufacturing)": Factory,
    "Pembinaan (Construction)": HardHat,
    "Perkhidmatan (Services)": Briefcase,
    "Perladangan (Plantation)": Sprout,
    "Pertanian (Agriculture)": Sprout,
    "Pembantu Domestik (Domestic Help)": Home,
  };

  const activeSectorInfo = data.bySector.find((s) => s.sector === activeSector);

  return (
    <div className="space-y-6" id="workers-tab-container">
      {/* Introduction Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-display font-medium text-slate-100">
              Pekerja Asing Sah dengan Pas Lawatan Kerja Sementara (PLKS)
            </h4>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              Malaysia bergantung tinggi kepada tenaga kerja asing untuk mengisi jawatan di bawah kategori 3D (Dirty, Difficult, Dangerous) yang kurang mendapat tarikan pekerja warga tempatan. Jumlah terkini mencecah lebih 2.3 juta pekerja berdaftar aktif mengikut seliaan Jabatan Imigresen dan Kementerian Sumber Manusia, bertujuan mengekalkan kedudukan rantaian industri global negara.
            </p>
          </div>
        </div>

        {/* Highlight key stat */}
        <div className="mt-5 p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-lg flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            <strong className="text-slate-100">Kawalan Permit (PLKS):</strong> Setiap pas dikeluarkan bagi tempoh spesifik tertakluk kepada cukai levi majikan, saringan kesihatan (FOMEMA), serta caruman Pertubuhan Keselamatan Sosial (PERKESO) bermula tahun 2020.
          </p>
        </div>
      </div>

      {/* Grid: Sector breakdown vs Origin Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sectors list (Left - wider) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center mb-1">
            <h5 className="font-display font-medium text-slate-200">
              Pengedaran Mengikut Sektor Ekonomi (DOSM)
            </h5>
            <span className="text-[10px] font-mono text-slate-400">Klik sektor untuk butiran</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.bySector.map((sec) => {
              const Icon = sectorIcons[sec.sector] || Briefcase;
              const isSelected = activeSector === sec.sector;
              
              return (
                <button
                  key={sec.sector}
                  onClick={() => setActiveSector(sec.sector)}
                  className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-200 shadow-lg shadow-emerald-950/50"
                      : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-7050 hover:bg-slate-900/80"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-800/80">
                      <Icon className="w-4.5 h-4.5 text-emerald-400" />
                    </div>
                    <span className="text-xs font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-bold text-slate-300">
                      {sec.percentage}%
                    </span>
                  </div>

                  <h6 className="font-display font-medium text-sm mt-3 text-slate-100 truncate">
                    {sec.sector.split(" (")[0]}
                  </h6>
                  <p className="text-[11px] font-mono text-slate-400 mt-1">
                    {sec.count.toLocaleString("ms-MY")} Orang
                  </p>
                </button>
              );
            })}
          </div>

          {/* Expanded active sector info display */}
          {activeSectorInfo && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5"
              id="active-sector-detail-panel"
            >
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3 mb-3">
                <span className="text-xs font-mono uppercase bg-emerald-950 border border-emerald-900/60 text-emerald-400 px-3 py-1 rounded">
                  Analisis Sektor: {activeSectorInfo.sector}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Anggaran Sumbangan Levi: RM{(activeSectorInfo.count * 1500).toLocaleString("ms-MY")} / Tahun
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans mt-1">
                {activeSectorInfo.description}
              </p>
              <div className="mt-3 grid grid-cols-2 gap-4 text-[11px] font-mono p-3 bg-slate-950 rounded border border-slate-800/60">
                <div>
                  <span className="text-slate-400">Skim Levi Tahunan:</span>
                  <p className="text-slate-2050 mt-0.5">RM640 - RM1,850 diserap majikan</p>
                </div>
                <div>
                  <span className="text-slate-400">Purata Penggajian Asas:</span>
                  <p className="text-slate-2050 mt-0.5">RM1,500 - RM2,200 mengikut Akta Gaji Minimum</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Source countries (Right - narrower) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h5 className="font-display font-medium text-slate-200 mb-5 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-emerald-500 rounded" />
              Negara Sumber Utama Pekerja
            </h5>

            <div className="space-y-4">
              {data.byOrigin.map((origin) => {
                const totalLegal = data.total;
                const ratio = (origin.count / totalLegal) * 100;
                
                return (
                  <div key={origin.country}>
                    <div className="flex justify-between items-baseline mb-1 text-xs">
                      <span className="font-sans font-medium text-slate-2050">
                        {origin.country}
                      </span>
                      <span className="font-mono text-slate-400">
                        {origin.count.toLocaleString("ms-MY")} ({ratio.toFixed(0)}%)
                      </span>
                    </div>

                    <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${ratio}%` }}
                      />
                    </div>

                    <div className="flex gap-1.5 mt-1">
                      {origin.primarySectors.map((secName) => (
                        <span key={secName} className="text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                          {secName}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed italic mt-6 pt-3 border-t border-slate-800">
            * Nota: Bangladesh mengatasi Indonesia berikutan dasar pengambilan semula pasca pandemik yang agresif di sektor pembinaan dan perkilangan bermula pertengahan 2022.
          </p>
        </div>

      </div>

      {/* Bibliography citations */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="text-xs">
          <span className="font-mono text-slate-100 uppercase font-medium block mb-1">Sumber Sah Pekerja Asing Berpermit (PLKS):</span>
          <div className="space-y-1">
            {data.citations.map((cite, index) => (
              <p key={index} className="text-slate-400 flex items-center gap-1">
                • {cite.organization} – <span className="text-slate-300">"{cite.reportName}"</span> ({cite.publishLocalDate})
              </p>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          {data.citations.map((cite, index) => (
            <a
              key={index}
              href={cite.urlContext}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono text-emerald-400 bg-emerald-950/30 border border-emerald-950/40 rounded px-2.5 py-1.5 hover:bg-emerald-950/60 transition-transform active:scale-95 inline-flex items-center gap-1"
            >
              Rujuk {cite.organization.split(" ")[0]} <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
