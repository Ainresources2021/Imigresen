import React, { useState } from "react";
import { Users, Info, ChevronRight, MapPin, Globe, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { migrationData } from "../data";

export default function RefugeesTab() {
  const [selectedState, setSelectedState] = useState<string | null>("Selangor");
  const data = migrationData.refugees;

  // Find selected state details
  const activeStateInfo = data.byState.find((s) => s.state === selectedState);

  return (
    <div className="space-y-6" id="refugees-tab-container">
      {/* Top Introduction Row */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex gap-4 items-start col-span-3">
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-display font-medium text-slate-100">
              Pelarian & Pencari Suaka Berdaftar di Malaysia
            </h4>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              Malaysia bukan penandatangan Konvensyen Pelarian 1951 atau Protokol 1967. Oleh itu, pelarian bertauliah tidak diklasifikasikan dari segi perundangan rasmi tempatan (diposisikan bawah Akta Imigresen 1959/63). Walau bagaimanapun, kerajaan membenarkan keberadaan sementara pemegang kad UNHCR atas perkiraan kemanusiaan sementara menanti penempatan semula ke negara ketiga.
            </p>
          </div>
        </div>

        {/* Quick Demographic breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 text-center">
            <span className="text-xs font-mono text-slate-400 block uppercase">Demografi Dewasa Lelaki</span>
            <div className="text-2xl font-bold font-mono text-blue-400 mt-1">{data.menPercentage}%</div>
            <p className="text-xs text-slate-400 mt-1 font-sans">Kira-kira 124,500 individu lelaki berdaftar</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 text-center">
            <span className="text-xs font-mono text-slate-400 block uppercase">Demografi Dewasa Wanita</span>
            <div className="text-2xl font-bold font-mono text-pink-400 mt-1">{data.womenPercentage}%</div>
            <p className="text-xs text-slate-400 mt-1 font-sans">Kira-kira 67,000 individu wanita berdaftar</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 text-center">
            <span className="text-xs font-mono text-slate-400 block uppercase">Kanak-kanak Bawah 18</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{data.childrenPercentage}%</div>
            <p className="text-xs text-slate-400 mt-1 font-sans">Sekitar 49,800 kanak-kanak tanpa akses sekolah rasmi</p>
          </div>
        </div>
      </div>

      {/* Main Breakdown: Origin Country vs State Concentration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Nationality Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h5 className="font-display font-medium text-slate-200 flex items-center gap-2">
                <Globe className="w-4.5 h-4.5 text-blue-400" />
                Negara Asal Pelarian (Pecahan Kad UNHCR)
              </h5>
              <span className="text-[10px] font-mono bg-blue-950/40 text-blue-400 px-2.5 py-1 rounded border border-blue-900/40">
                Data UNHCR 2024
              </span>
            </div>

            <div className="space-y-4">
              {data.byOrigin.map((origin) => {
                const pct = (origin.count / data.total) * 100;
                return (
                  <div key={origin.country} className="group">
                    <div className="flex justify-between items-baseline mb-1 text-xs">
                      <span className="font-sans font-medium text-slate-200 group-hover:text-blue-300 transition-colors">
                        {origin.country}
                      </span>
                      <span className="font-mono text-slate-400">
                        {origin.count.toLocaleString("ms-MY")} ({pct.toFixed(1)}%)
                      </span>
                    </div>
                    {/* Visual Bar */}
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800/60">
                      <div
                        className="bg-blue-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    {/* Subgroups details for Myanmar */}
                    {origin.subGroups && (
                      <div className="mt-2 pl-3 border-l border-slate-800 space-y-1">
                        {origin.subGroups.map((sub) => {
                          const subPct = (sub.estimate / origin.count) * 100;
                          return (
                            <div key={sub.name} className="flex justify-between items-center text-[11px] text-slate-400">
                              <span>• {sub.name}</span>
                              <span className="font-mono">{sub.estimate.toLocaleString("ms-MY")} ({subPct.toFixed(0)}%)</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800/60">
            <p className="text-[11px] text-slate-400 leading-relaxed italic flex items-start gap-1">
              <Info className="w-3.5 h-3.5 shrink-0 text-blue-400 mt-0.5" />
              Sebab Utama: Konflik bersenjata, sekatan hak komuniti minoriti (terutama Rohingya di wilayah Rakhine), serta rampasan kuasa tentera di Myanmar.
            </p>
          </div>
        </div>

        {/* State Concentrations */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h5 className="font-display font-medium text-slate-200 flex items-center gap-2">
              <MapPin className="w-4.5 h-4.5 text-blue-400" />
              Kepadatan Pelarian Mengikut Negeri
            </h5>
            <span className="text-[10px] font-mono text-slate-400">Sila pilih negeri bawah</span>
          </div>

          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            Majoriti pelarian menyerap masuk ke komuniti bandar dan sub-bandar untuk mencari peluang ekonomi informal (memandangkan mereka tidak boleh bekerja secara sah).
          </p>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {data.byState.map((st) => {
              const isSelected = selectedState === st.state;
              return (
                <button
                  key={st.state}
                  onClick={() => setSelectedState(st.state)}
                  className={`text-left text-xs p-2.5 rounded-lg border transition-all duration-200 flex justify-between items-center ${
                    isSelected
                      ? "bg-blue-950/40 border-blue-500/50 text-blue-200 font-medium"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  <span className="truncate">{st.state}</span>
                  <span className="font-mono text-[11px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-300 border border-slate-800">
                    {st.estimate.toLocaleString("ms-MY")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active state display section */}
          {activeStateInfo && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-950 border border-slate-800 rounded-lg p-4"
              id="refugee-active-state-panel"
            >
              <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
                <span className="text-xs font-mono text-blue-400 font-medium uppercase tracking-wide">
                  Butiran Komuniti: {activeStateInfo.state}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Anggaran: ~{activeStateInfo.estimate.toLocaleString("ms-MY")} orang
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {activeStateInfo.description}
              </p>
            </motion.div>
          )}
        </div>

      </div>

      {/* Citations Footer badge */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="text-xs">
          <span className="font-mono text-slate-100 uppercase font-medium block mb-1">Rujukan & Kredibiliti Data Pelarian:</span>
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
              className="text-[11px] font-mono text-blue-400 bg-blue-950/30 border border-blue-900/40 rounded px-2.5 py-1.5 hover:bg-blue-950/60 transition-transform active:scale-95 inline-flex items-center gap-1"
            >
              Rujuk {cite.organization.split(" ")[0]} <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
