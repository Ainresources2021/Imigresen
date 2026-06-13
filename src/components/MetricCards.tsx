import React from "react";
import { Users, Briefcase, ShieldAlert, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { migrationData } from "../data";

interface MetricCardsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function MetricCards({ activeTab, setActiveTab }: MetricCardsProps) {
  const cards = [
    {
      id: "refugees",
      title: "Pelarian UNHCR Berdaftar",
      count: migrationData.refugees.total.toLocaleString("ms-MY"),
      subText: "Warganegara Myanmar merangkumi sebahagian besar (~86%)",
      icon: Users,
      color: "border-blue-500/20 bg-blue-950/20 hover:bg-blue-950/30 text-blue-400",
      accent: "bg-blue-500",
      tabValue: "refugees",
      comparison: "0.56% daripada populasi Malaysia (34 juta orang)."
    },
    {
      id: "workers",
      title: "Pekerja Asing Berpermit (PLKS)",
      count: migrationData.foreignWorkers.total.toLocaleString("ms-MY"),
      subText: "Sektor Pembuatan & Pembinaan mendominasi pasaran",
      icon: Briefcase,
      color: "border-emerald-500/20 bg-emerald-950/20 hover:bg-emerald-950/30 text-emerald-400",
      accent: "bg-emerald-500",
      tabValue: "workers",
      comparison: "Kira-kira 15% daripada keseluruhan tenaga kerja negara."
    },
    {
      id: "pati",
      title: "Anggaran PATI (Tanpa Izin)",
      count: "1.2M - 2.0M",
      subText: "Mengikut rujukan Jabatan Imigresen & laporan KDN",
      icon: ShieldAlert,
      color: "border-rose-500/20 bg-rose-950/20 hover:bg-rose-950/30 text-rose-400",
      accent: "bg-rose-500",
      tabValue: "pati",
      comparison: "Hampir menyamai jumlah pekerja asing yang berdaftar sah."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5" id="metric-overview-cards">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = activeTab === card.tabValue;

        return (
          <motion.div
            key={card.id}
            onClick={() => setActiveTab(card.tabValue)}
            className={`cursor-pointer rounded-xl border p-6 transition-all duration-300 relative overflow-hidden group ${card.color} ${
              isActive ? "ring-2 ring-offset-2 ring-offset-slate-950 ring-indigo-500" : ""
            }`}
            whileHover={{ y: -3 }}
            id={`metric-card-${card.id}`}
          >
            {/* Top Indicator bar */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${card.accent}`} />
            
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono tracking-wider text-slate-400 uppercase">
                  {card.title}
                </p>
                <h3 className="text-3xl font-display font-bold text-slate-100 mt-2 font-mono">
                  {card.count}
                </h3>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <p className="text-sm text-slate-300 mt-3 font-sans">
              {card.subText}
            </p>

            <div className="mt-4 pt-4 border-t border-slate-800/60 block">
              <span className="text-xs font-mono text-slate-400 block mb-1">Konteks Skala:</span>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {card.comparison}
              </p>
            </div>

            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-xs font-mono text-slate-400 gap-0.5">
              Klik perincian <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
