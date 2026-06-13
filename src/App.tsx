import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Briefcase, 
  ShieldAlert, 
  BookOpen, 
  Scale, 
  Globe, 
  Calendar, 
  FileText, 
  Database,
  ExternalLink 
} from "lucide-react";

// Import modules
import MetricCards from "./components/MetricCards";
import RefugeesTab from "./components/RefugeesTab";
import WorkersTab from "./components/WorkersTab";
import PatiTab from "./components/PatiTab";
import TimelineSection from "./components/TimelineSection";
import AiConsultant from "./components/AiConsultant";
import { migrationData } from "./data";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("refugees");

  // Handle Tab render
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "refugees":
        return <RefugeesTab />;
      case "workers":
        return <WorkersTab />;
      case "pati":
        return <PatiTab />;
      default:
        return <RefugeesTab />;
    }
  };

  // Pre-load all citations to display in a dedicated bibliographic section
  const allCitations = [
    ...migrationData.refugees.citations.map(c => ({ ...c, category: "Pelarian UNHCR" })),
    ...migrationData.foreignWorkers.citations.map(c => ({ ...c, category: "Pekerja Asing (PLKS)" })),
    ...migrationData.pati.citations.map(c => ({ ...c, category: "PATI & Penguatkuasaan" }))
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-600 selection:text-white pb-20">
      
      {/* Visual Accent Top Bar */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 h-1.5 w-full" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10" id="main-portal-container">
        
        {/* Header Block */}
        <header className="border-b border-slate-900 pb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4" id="app-header-block">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
              <Database className="w-4 h-4 text-indigo-500" />
              Portal Visualisasi Data Migrasi Kebangsaan
            </div>
            <h1 className="text-3xl font-display font-extrabold text-slate-50 tracking-tight leading-none sm:text-4xl">
              Imigrasi<span className="text-indigo-500">MY</span>
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
              Analisis berkesan, komprehensif, dan neutral mengenai pelarian UNHCR, pekerja berpermit, dan pendatang tanpa izin (PATI) di Malaysia menggunakan statistik sahih rasmi.
            </p>
          </div>

          {/* Academic briefing tag */}
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg text-xs max-w-sm hidden md:block">
            <span className="font-mono text-slate-300 font-bold block mb-0.5">Klasifikasi Analitik</span>
            <span className="text-slate-450 leading-normal font-sans">Koleksi ringkasan penyelidikan sosiopolitik untuk kegunaan pengkajian awam dan makmal dasar.</span>
          </div>
        </header>

        {/* SECTION 1: Top Metrics Overview */}
        <section className="space-y-4" id="section-metric-overview">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
              Bahagian 1: Ringkasan Nilai Semasa (KPI Pelan Buruh)
            </h2>
            <div className="h-0.5 bg-slate-900 flex-1 ml-2" />
          </div>

          <MetricCards activeTab={activeTab} setActiveTab={setActiveTab} />
        </section>

        {/* SECTION 2: Filterable Detailed Core Pillars */}
        <section className="space-y-5" id="section-core-pillars">
          <div className="flex items-center justify-between border-b border-slate-850 pb-2.5">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
                Bahagian 2: Bedah Siasat Struktur Utama
              </h2>
            </div>
            
            {/* Modular custom sub-navigation buttons */}
            <div className="flex gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-850 shrink-0">
              <button
                onClick={() => setActiveTab("refugees")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                  activeTab === "refugees"
                    ? "bg-blue-600/10 text-blue-300 border border-blue-500/30"
                    : "text-slate-450 hover:text-slate-200 border border-transparent"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                Pelarian (UNHCR)
              </button>
              <button
                onClick={() => setActiveTab("workers")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                  activeTab === "workers"
                    ? "bg-emerald-600/10 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-450 hover:text-slate-2050 border border-transparent"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                Pekerja Sah (PLKS)
              </button>
              <button
                onClick={() => setActiveTab("pati")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                  activeTab === "pati"
                    ? "bg-rose-600/10 text-rose-300 border border-rose-500/30"
                    : "text-slate-450 hover:text-slate-2050 border border-transparent"
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                PATI & Depot
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderActiveTabContent()}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* SECTION 3: Dynamic Timeline Policy Explorer */}
        <section className="space-y-4 font-sans" id="section-timeline-trends">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
              Bahagian 3: Garis Masa & Pemangkin Trend
            </h2>
            <div className="h-0.5 bg-slate-900 flex-1 ml-2" />
          </div>

          <TimelineSection />
        </section>

        {/* SECTION 4: AI Intelligent Deep Dive Policy Assistant */}
        <section className="space-y-4" id="section-ai-intelligence">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
              Bahagian 4: Makmal Penyelidikan Dipacu AI (Gemini 3.5-Flash)
            </h2>
            <div className="h-0.5 bg-slate-900 flex-1 ml-2" />
          </div>

          <AiConsultant />
        </section>

        {/* SECTION 5: Comprehensive Bibliographical References Catalog */}
        <section className="space-y-4" id="section-bibliography-sources">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">
              Bahagian 5: Katalog Sumber Data Rasmi & Bibliografi
            </h2>
            <div className="h-0.5 bg-slate-900 flex-1 ml-2" />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex gap-3 items-center mb-4">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <h4 className="font-display font-semibold text-sm text-slate-2050 uppercase tracking-wide">
                Indeks Rujukan dan Kebolehpercayaan Data Terbuka
              </h4>
            </div>
            
            <p className="text-xs text-slate-350 leading-relaxed mb-5 font-sans">
              Bagi membina kefahaman umum yang telus dan serius tentang status pekerja asing dan golongan rentan, dashboard ini bergantung sepenuhnya kepada data-data bukan tekaan. Rantaian data ini diperoleh daripada laporan rasmi dari badan agensi kemanusiaan, kementerian negeri, dan statistik perangkaan persekutuan Malaysia berikut:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {allCitations.map((cite, index) => (
                <div key={index} className="bg-slate-950 p-4 rounded-lg border border-slate-850 flex flex-col justify-between hover:border-slate-800 transition-colors">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-indigo-400 bg-indigo-950/40 border border-indigo-900/30 px-2 py-0.5 rounded uppercase">
                      {cite.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-200 block mt-2.5 font-sans line-clamp-2">
                      {cite.reportName}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1 font-sans">
                      Diterbit oleh: <strong className="text-slate-300 font-medium">{cite.organization}</strong>
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono">
                    <span className="text-slate-500">Edisi: {cite.publishLocalDate}</span>
                    <a
                      href={cite.urlContext}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline inline-flex items-center gap-0.5"
                    >
                      Pautan Penuh <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-850 text-center">
              <p className="text-[11px] text-slate-400 leading-normal font-sans">
                Penafian: Portal ini dibangunkan sebagai wadah maklumat akademik. Data dibersihkan secara berkala mengikut kekerapan kemas kini penerbitan oleh pelbagai agensi pelapor.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
