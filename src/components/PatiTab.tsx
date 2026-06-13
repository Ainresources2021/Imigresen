import React from "react";
import { ShieldAlert, AlertTriangle, Landmark, Scale, Building, ExternalLink } from "lucide-react";
import { migrationData } from "../data";

export default function PatiTab() {
  const data = migrationData.pati;

  return (
    <div className="space-y-6" id="pati-tab-container">
      {/* Introduction Row */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-lg font-display font-medium text-slate-100">
              Analisis Pendatang Asing Tanpa Izin (PATI) di Malaysia
            </h4>
            <p className="text-sm text-slate-300 mt-1 leading-relaxed">
              Kewujudan PATI di Malaysia merupakan isu struktur pasaran buruh yang kompleks. Sebilangan besar PATI memasuki negara melalui permit sah tetapi terjerumus ke status "tidak berdokumen" (irregular) disebabkan tamat tempoh pas, eksploitasi agensi, pertukaran majikan unilateral yang melanggar kontrak standard imigresen, atau kegagalan majikan menyambung permit bekerja tahunan. Isu ini ditangani melalui kombinasi penguatkuasaan operasi ketenteraan/undang-undang serta skim pemutihan (rehab).
            </p>
          </div>
        </div>

        {/* Breakdown of causes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/60">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-left">
            <span className="text-[10px] font-mono text-rose-400 block font-bold uppercase">Sebab 1: Tinggal Lebih Masa</span>
            <p className="text-xs text-slate-300 mt-1 leading-snug">Pasport/Visa melawat tamat tempoh tetapi tidak pulang ke negara asal.</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-left">
            <span className="text-[10px] font-mono text-rose-400 block font-bold uppercase">Sebab 2: Lari Dari Majikan</span>
            <p className="text-xs text-slate-300 mt-1 leading-snug">Meninggalkan majikan asal berdaftar berikutan isu penindasan, tidak dibayar gaji, lalu pas pekerja terbatal otomatis.</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-left">
            <span className="text-[10px] font-mono text-rose-400 block font-bold uppercase">Sebab 3: Penipuan Agensi</span>
            <p className="text-xs text-slate-300 mt-1 leading-snug">Kemasukan ejen palsu berjanji pekerjaan tetap, namun tiada permit sah disediakan semasa mendarat.</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-left">
            <span className="text-[10px] font-mono text-rose-400 block font-bold uppercase">Sebab 4: Sempadan Bolos</span>
            <p className="text-xs text-slate-300 mt-1 leading-snug font-sans">Penyelundupan rentas laut atau sempadan darat (e.g. pesisir Sabah, sempadan utara hutan Kedah/Perlis).</p>
          </div>
        </div>
      </div>

      {/* Main Breakdown: RTK 2.0 Regularisation vs Detention Depots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* RTK 2.0 Regularization Results */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h5 className="font-display font-medium text-slate-200 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-rose-400" />
                Program Rekalibrasi Tenaga Kerja (RTK) 2.0
              </h5>
              <span className="text-[10px] font-mono bg-rose-950 text-rose-400 border border-rose-900 px-2 py-0.5 rounded">
                Keputusan Rasmi Akhir
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Skim pemutihan RTK 2.0 memberi peluang kepada majikan mendaftarkan PATI sedia ada secara legal untuk menyerap buruh tidak formal semula ke dalam industri pembuatan, pembersihan, pembinaan, perladangan, dan pertanian.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/60 text-center">
                <span className="text-[10px] font-mono text-slate-400 block">Jumlah Berdaftar</span>
                <div className="text-lg font-bold font-mono text-slate-100 mt-1">1,122,424</div>
                <p className="text-[10px] text-slate-400 mt-0.5">Pemohon PATI</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/60 text-center">
                <span className="text-[10px] font-mono text-slate-400 block">Jumlah Diluluskan</span>
                <div className="text-lg font-bold font-mono text-emerald-400 mt-1">~765,411</div>
                <p className="text-[10px] text-emerald-500/80 mt-0.5">Berjaya dilegalkankan</p>
              </div>
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/60 text-center">
                <span className="text-[10px] font-mono text-rose-300 block">Kutipan Hasil</span>
                <div className="text-lg font-bold font-mono text-rose-400 mt-1">RM2.71 Bilion</div>
                <p className="text-[10px] text-slate-400 mt-0.5">Denda & Kelulusan</p>
              </div>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                <strong className="text-slate-100 text-xs font-semibold block mb-1">Impak Hasil Perbendaharaan:</strong>
                {data.rtk2Recalibration.description}
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-center gap-1.5 font-sans">
            <Scale className="w-4 h-4 text-rose-400 shrink-0" />
            Polisi terkini menumpukan pengusiran sukarela (B1G) bagi baki PATi yang tidak layak menyertai RTK, dengan bayaran kompaun tetap denda RM500.
          </div>
        </div>

        {/* Depot Imigresen (Detention centers) list */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h5 className="font-display font-medium text-slate-200 flex items-center gap-2">
              <Building className="w-5 h-5 text-rose-400" />
              Sistem Depot Tahanan Imigresen Malaysia
            </h5>
            <span className="text-[10px] font-mono text-slate-400">Enforcement 2024</span>
          </div>

          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            PATI yang tertangkap dalam pemeriksaan diletakkan di bawah pengawasan depot tahanan sementara sementara pasport, pengesahan konsulat, tiket pulang, dan kelulusan pengusiran selesai diproses.
          </p>

          <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
            {data.depots.map((depot) => {
              const isCrowded = depot.status.includes("Sangat Padat") || depot.status.includes("Padat");
              
              return (
                <div key={depot.name} className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-sans font-medium text-slate-200 block">{depot.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">{depot.state} | Had Muatan: {depot.capacity.toLocaleString("ms-MY")}</span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    isCrowded 
                      ? "bg-rose-950/40 text-rose-400 border-rose-900/60 font-semibold"
                      : "bg-slate-900 text-slate-400 border-slate-800"
                  }`}>
                    {depot.status}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-rose-950/10 border border-rose-900/30 rounded-lg flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-350 leading-relaxed font-sans">
              <strong>Cabaran Pengurusan Depot:</strong> Kos penyelenggaraan harian per banduan (makanan, kemudahan kesihatan dasar, logistik) ditanggung kerajaan Malaysia, mengundang isu fiskal berpanjangan sekiranya proses penghantaran pulang terbantut.
            </p>
          </div>
        </div>

      </div>

      {/* Citations block */}
      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="text-xs">
          <span className="font-mono text-slate-100 uppercase font-medium block mb-1">Punca Data & Rujukan Isu PATI:</span>
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
              className="text-[11px] font-mono text-rose-400 bg-rose-950/30 border border-rose-950/40 rounded px-2.5 py-1.5 hover:bg-rose-950/60 transition-transform active:scale-95 inline-flex items-center gap-1"
            >
              Rujuk {cite.organization.split(" ")[0]} <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
