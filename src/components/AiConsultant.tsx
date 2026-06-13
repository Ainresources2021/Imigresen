import React, { useState } from "react";
import { Sparkles, Send, Brain, FileText, RefreshCw, Copy, Check, Download, BookOpen, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function AiConsultant() {
  const [topic, setTopic] = useState<string>("Impak kemerosotan buruh asing ke atas industri perladangan kelapa sawit Malaysia.");
  const [customQuestion, setCustomQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [analysisReport, setAnalysisReport] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Suggested serious topics
  const suggestTopics = [
    {
      title: "Impak Automasi Sektor Sawit",
      query: "Analisis kemerosotan buruh asing ke atas industri perladangan kelapa sawit Malaysia dan peranan automasi mekanik.",
      description: "Bagaimanakah kekurangan pekerja menjejaskan kutipan buah sawit dan impak cukai levi."
    },
    {
      title: "Pendidikan Anak Pelarian",
      query: "Dilema ketiadaan pendidikan formal bagi anak-anak pelarian (Rohingya & Chin) bawah umur di Malaysia dan implikasinya.",
      description: "Cabaran sosial jangka panjang akibat ketiadaan akses sekolah rasmi kebangsaan."
    },
    {
      title: "Analisis Fiskal RTK 2.0",
      query: "Penilaian impak kewangan dan kutipan hasil RM2.71 Bilion dari rekalibrasi PATI (RTK 2.0) kepada Jabatan Imigresen.",
      description: "Sumbangan denda dan yuran pemrosesan kepada perbendaharaan negara."
    },
    {
      title: "Implikasi Konvensyen 1951",
      query: "Sebab konkrit mengapakah Malaysia tidak menandatangani Konvensyen Pelarian 1951, serta implikasi ruang keselamatan & geopolitik.",
      description: "Pertimbangan kedaulatan negara berbanding aspek bantuan perlindungan kemanusiaan."
    }
  ];

  const handlePresetSelect = (query: string) => {
    setTopic(query);
    setCustomQuestion("");
  };

  const executeAiAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setAnalysisReport(null);

    const activeQuestion = customQuestion.trim() ? customQuestion : topic;

    try {
      const response = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: customQuestion.trim() ? undefined : topic,
          customQuestion: customQuestion.trim() ? customQuestion : undefined
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Ralat semasa meminta pelaporan AI.");
      }

      setAnalysisReport(result.analysis);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Gagal menghubungi penjana analisis. Sila cuba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Safe and super clean bespoke Markdown-to-HTML formatter to render academic reports gracefully
  const renderFormattedReportHtml = (mdText: string) => {
    if (!mdText) return "";

    // Split into paragraphs/blocks and parse simple markdown elements
    const lines = mdText.split("\n");
    let html = "";
    let inList = false;

    lines.forEach((line) => {
      let l = line.trim();
      if (!l) {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        return;
      }

      // Headers
      if (l.startsWith("### ")) {
        if (inList) { html += "</ul>"; inList = false; }
        html += `<h4 class="text-sm font-display font-bold text-indigo-400 mt-5 mb-2 font-mono tracking-wide uppercase border-b border-indigo-950 pb-1">${l.replace("### ", "")}</h4>`;
      } else if (l.startsWith("## ")) {
        if (inList) { html += "</ul>"; inList = false; }
        html += `<h3 class="text-md font-display font-bold text-slate-100 mt-6 mb-3 uppercase tracking-wider">${l.replace("## ", "")}</h3>`;
      } else if (l.startsWith("# ")) {
        if (inList) { html += "</ul>"; inList = false; }
        html += `<h2 class="text-lg font-display font-extrabold text-slate-50 mt-6 mb-4 border-l-4 border-indigo-500 pl-3 leading-tight">${l.replace("# ", "")}</h2>`;
      }
      // Blockquotes
      else if (l.startsWith("> ")) {
        if (inList) { html += "</ul>"; inList = false; }
        html += `<blockquote class="border-l-2 border-slate-7050 bg-slate-950/50 p-3 italic text-xs text-slate-400 rounded-r my-3 leading-relaxed">${l.replace("> ", "")}</blockquote>`;
      }
      // Bullets
      else if (l.startsWith("- ") || l.startsWith("* ")) {
        if (!inList) {
          html += `<ul class="list-disc pl-4 space-y-1.5 my-3 text-xs text-slate-300">`;
          inList = true;
        }
        const cleanContent = l.substring(2);
        html += `<li>${parseInlineBoldAndItalic(cleanContent)}</li>`;
      }
      // Normal Line
      else {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        html += `<p class="text-xs text-slate-300 leading-relaxed mb-3.5">${parseInlineBoldAndItalic(l)}</p>`;
      }
    });

    if (inList) {
      html += "</ul>";
    }

    return html;
  };

  // Helper inside renderer to parse **bold** and `code`
  const parseInlineBoldAndItalic = (text: string) => {
    let t = text;
    // bold (**something**)
    t = t.replace(/\*\*(.*?)\*\*/g, `<strong class="text-slate-100 font-semibold">$1</strong>`);
    // single asteriskt (*)
    t = t.replace(/\*(.*?)\*/g, `<em class="italic">$1</em>`);
    // Inline code (`something`)
    t = t.replace(/`(.*?)`/g, `<code class="bg-slate-950 px-1.5 py-0.5 rounded text-[10px] text-indigo-400 font-mono font-bold border border-slate-800">$1</code>`);
    return t;
  };

  const copyToClipboard = () => {
    if (!analysisReport) return;
    navigator.clipboard.writeText(analysisReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadReportTxt = () => {
    if (!analysisReport) return;
    const element = document.createElement("a");
    const file = new Blob([analysisReport], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `migration_briefing_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6" id="ai-research-brief-portal">
      <div className="flex gap-3 mb-6 items-start">
        <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl shrink-0">
          <Brain className="w-5.5 h-5.5" />
        </div>
        <div>
          <h4 className="text-lg font-display font-medium text-slate-100 flex items-center gap-1.5">
            Pusat Analisis & Taklimat Dasar Pintar (Gemini AI)
            <span className="text-[10px] font-mono font-semibold bg-indigo-950 text-indigo-400 border border-indigo-900 px-2 py-0.5 rounded uppercase">
              Model: Gemini 3.5-Flash
            </span>
          </h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Pilih topik penyelidikan disediakan di bawah atau ajukan soalan dasar tersendiri untuk menjana kertas taklimat (Research Briefing) yang komprehensif, akademik, dan berpandukan data nyata.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Input panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-mono text-slate-2050 tracking-wider uppercase mb-1">
            Bahagian A: Preskripsi Topik Penyelidikan
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {suggestTopics.map((option, idx) => {
              const isSelected = topic === option.query && !customQuestion;
              return (
                <button
                  key={idx}
                  onClick={() => handlePresetSelect(option.query)}
                  className={`text-left p-3 rounded-lg border transition-all duration-200 text-xs ${
                    isSelected
                      ? "bg-indigo-950/40 border-indigo-500/50 text-slate-100"
                      : "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-2050 hover:border-slate-800"
                  }`}
                >
                  <span className="font-display font-semibold block">{option.title}</span>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug truncate">
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>

          <form onSubmit={executeAiAnalysis} className="space-y-4 pt-4 border-t border-slate-800">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-250 uppercase tracking-wide block">
                Bahagian B: Ajukan Soalan Tersendiri (Pilihan)
              </label>
              <textarea
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="Contoh: Apakah cabaran keselamatan utama berkaitan PATI di sempadan perairan Sabah, dan bagaimana inisiatif ESSCOM membantu mengatasi masalah ini?"
                className="w-full min-h-[90px] bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider flex justify-center items-center gap-2 transition-all active:scale-95 text-slate-100 ${
                loading
                  ? "bg-slate-800 border border-slate-750 text-slate-400 cursor-not-allowed"
                  : "bg-indigo-600 border border-indigo-500 hover:bg-indigo-500 shadow-md shadow-indigo-950/50"
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-400" />
                  Menganalisis Rantaian Data Semasa...
                </>
              ) : (
                <>
                  <Sparkles className="w-4.5 h-4.5 text-yellow-300" />
                  Jana Taklimat Dasar AI
                </>
              )}
            </button>
          </form>

          {/* Quick Disclaimer */}
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-850 flex items-start gap-2 text-[10px] text-slate-400">
            <AlertCircle className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5" />
            <p className="leading-snug">
              Analisis dijana secara dinamik melalui model Gemini dengan merujuk terus kepada set data penunjuk rasmi (UNHCR & DOSM) Malaysia yang disimpan dalam sistem kami untuk mengurangkan ralat maklumat.
            </p>
          </div>
        </div>

        {/* Output Area (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-slate-950 border border-slate-800 rounded-xl min-h-[400px] flex flex-col justify-between relative overflow-hidden" id="research-memo-rendered-card">
            
            {/* Header border style */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500" />

            {/* Top Bar actions */}
            <div className="flex justify-between items-center px-5 py-3 border-b border-slate-900 bg-slate-900/40">
              <span className="text-xs font-mono text-slate-400 uppercase flex items-center gap-1.5 font-bold">
                <FileText className="w-4 h-4 text-indigo-400" />
                Draf Nota Taklimat Penyelidikan
              </span>

              {analysisReport && (
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-1.5 rounded hover:bg-slate-800 border border-transparent hover:border-slate-800 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1 text-[10px] font-mono"
                    title="Salin ke Papan Klip"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Disalin" : "Salin"}
                  </button>
                  <button
                    onClick={downloadReportTxt}
                    className="p-1.5 rounded hover:bg-slate-800 border border-transparent hover:border-slate-800 text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1 text-[10px] font-mono"
                    title="Muat Turun .txt"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Muat Turun
                  </button>
                </div>
              )}
            </div>

            {/* Main content viewport */}
            <div className="p-6 overflow-y-auto max-h-[450px] flex-1">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20 space-y-4"
                  >
                    <RefreshCw className="w-10 h-10 animate-spin text-indigo-500" />
                    <div>
                      <p className="text-xs font-mono text-slate-300">Menyusun Struktur Penyelidikan Kebangsaan...</p>
                      <p className="text-[11px] text-slate-500 mt-1 font-sans">Gemini 3.5-Flash tgh membuat rujukan silang statistik dan menilai dasar semasa kerajaan</p>
                    </div>
                  </motion.div>
                ) : errorMsg ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 bg-rose-950/20 border border-rose-900/40 rounded-lg text-rose-300 text-xs flex items-start gap-3 my-4"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    <div>
                      <span className="font-bold font-mono uppercase block mb-1">Gagal Menjana Analisis</span>
                      <p className="leading-snug">{errorMsg}</p>
                    </div>
                  </motion.div>
                ) : analysisReport ? (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-slate-300 space-y-2 select-text"
                  >
                    {/* Memo metadata header */}
                    <div className="border-b border-dashed border-slate-800 pb-4 mb-4 text-xs font-mono grid grid-cols-2 gap-y-1.5 text-slate-400">
                      <div><span className="font-bold text-slate-300">KEPADA:</span> Pelawat Portal ImigrasiMY</div>
                      <div><span className="font-bold text-slate-300">TARIKH:</span> {new Date().toLocaleDateString("ms-MY", { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                      <div className="col-span-2"><span className="font-bold text-slate-300">SUBJEK:</span> Pelaporan Polisi dan Analisis Migrasi Kebangsaan</div>
                    </div>

                    <div
                      className="markdown-body text-xs leading-relaxed text-slate-300"
                      dangerouslySetInnerHTML={{ __html: renderFormattedReportHtml(analysisReport) }}
                    />

                    {/* Official signature footer */}
                    <div className="mt-8 pt-4 border-t border-dashed border-slate-800 text-[10px] text-slate-500 font-mono text-right">
                      <span>Draf Dijana Sila Rujuk data rasmi bagi keputusan dasar utama.</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-24 text-slate-500 space-y-3"
                  >
                    <BookOpen className="w-12 h-12 text-slate-700" />
                    <div>
                      <p className="text-xs font-mono text-slate-300 font-semibold">Bahagian Laporan Analitik Masih Kosong</p>
                      <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto font-sans">
                        Pilih satu tajuk penyelidikan di sebelah kiri, kemudian klik <strong className="text-indigo-400">"Jana Taklimat Dasar AI"</strong> untuk melihat perincian sosiolitik mendalam dari model AI.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
