import { useState, useRef, useEffect } from "react";
import { 
  Send, 
  MessageSquare, 
  User, 
  Sparkles, 
  RefreshCw, 
  Scale, 
  X,
  HelpCircle,
  Video,
  PhoneCall
} from "lucide-react";
import { ChatMessage } from "../types";

export default function ChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Assalamu'alaikum Wr. Wb. Selamat datang di PTSP Online PTA Bangka Belitung. Saya adalah **SI-PINTAR Babel**, asisten virtual cerdas Anda.\n\nSilakan tanyakan seputar pendaftaran banding, persyaratan arsip, simulasi biaya panjar, pengaduan PPID, atau jadwal telekonsultasi Zoom/Meet. Bagaimana saya bisa membantu Anda hari ini?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    "Bagaimana cara mengajukan banding?",
    "Berapa estimasi biaya perkara banding?",
    "Dimana alamat Pengadilan Agama Sungailiat?",
    "Bagaimana cara konsultasi tatap muka via Zoom?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (msgText: string) => {
    if (!msgText.trim()) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: msgText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Gather last 8 message histories for conversational context
      const chatHistory = messages
        .filter(m => m.id !== "welcome" && m.sender !== "system")
        .slice(-8)
        .map(m => ({ sender: m.sender, text: m.text }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msgText, history: chatHistory }),
      });

      if (!response.ok) {
        throw new Error("Gagal terhubung dengan server");
      }

      const data = await response.json();
      
      const botMessage: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: data.reply || "Maaf, terjadi ketidakkonsistenan respon dari server.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: Math.random().toString(),
        sender: "system",
        text: `Koneksi Bermasalah: ${err.message}. Hubungi Customer WhatsApp utama atau silakan sapa kembali beberapa saat lagi.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    if (confirm("Reset seluruh percakapan dengan asisten virtual?")) {
      setMessages([
        {
          id: "welcome-reset",
          sender: "bot",
          text: "Assalamu'alaikum. Percakapan telah diatur ulang. Ada berkas perkara atau panduan hukum yang ingin Anda tanyakan kembali?",
          timestamp: new Date()
        }
      ]);
    }
  };

  // Crude markdown bold formatter
  const formatText = (text: string) => {
    return text.split("\n").map((line, lIdx) => {
      // Bold formatter **text**
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const renderedLine = parts.map((part, pIdx) => {
        if (pIdx % 2 === 1) {
          return <strong key={pIdx} className="font-bold text-slate-900">{part}</strong>;
        }
        return part;
      });
      return (
        <span key={lIdx} className="block mt-1 first:mt-0 font-sans leading-relaxed">
          {renderedLine}
        </span>
      );
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden flex flex-col h-[580px]">
      {/* Bot Header info */}
      <div className="bg-court-green-900 p-4 text-white flex items-center justify-between border-b border-court-green-950">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-court-gold-500/10 border border-court-gold-500 flex items-center justify-center relative animate-pulse">
            <Sparkles className="w-5 h-5 text-court-gold-500" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
          </div>
          <div>
            <h4 className="text-xs font-bold font-display tracking-tight text-white flex items-center gap-1">
              Asisten Virtual SI-PINTAR
            </h4>
            <span className="text-[10px] text-emerald-200">Bertenaga Gemini AI Pasca-Banding</span>
          </div>
        </div>

        <button 
          onClick={handleClearChat}
          className="text-emerald-200 hover:text-white p-1 rounded hover:bg-court-green-800 transition-colors"
          title="Reset Percakapan"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Message list area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-500 uppercase mb-1">
              {msg.sender === "user" ? (
                <>
                  <span>Pemohon</span>
                  <User className="w-2.5 h-2.5 text-slate-500" />
                </>
              ) : msg.sender === "bot" ? (
                <>
                  <Sparkles className="w-2.5 h-2.5 text-court-gold-600" />
                  <span>SI-PINTAR AI</span>
                </>
              ) : (
                <>
                  <Scale className="w-2.5 h-2.5 text-rose-600" />
                  <span>Petugas Sistem</span>
                </>
              )}
            </div>

            <div 
              className={`max-w-[90%] rounded-xl px-3.5 py-2.5 text-xs shadow-xs ${
                msg.sender === "user" 
                  ? "bg-court-green-900 text-white rounded-tr-none" 
                  : msg.sender === "bot" 
                    ? "bg-white border border-gray-200 text-gray-800 rounded-tl-none leading-relaxed" 
                    : "bg-red-50 border border-red-200 text-red-800 rounded-tl-none font-mono"
              }`}
            >
              {formatText(msg.text)}
            </div>
            <span className="text-[9px] text-gray-400 mt-1 px-1 font-mono">
              {new Date(msg.timestamp).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        ))}

        {loading && (
          <div className="flex flex-col items-start font-sans">
            <span className="text-[9px] font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-court-gold-600 animate-spin" />
              SI-PINTAR Memikirkan Jawaban...
            </span>
            <div className="bg-white border border-gray-200 rounded-xl rounded-tl-none p-3 shadow-xs text-xs flex gap-1.5 items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-court-green-900 animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-court-green-900 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-court-green-900 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion prompt shortcuts */}
      {messages.length < 3 && (
        <div className="px-4 py-2 bg-slate-50 border-t border-gray-150 space-y-1">
          <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1 uppercase">
            <HelpCircle className="w-3 h-3 text-court-gold-600" /> Saran Pertanyaan:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                className="text-[10px] bg-white border border-gray-300 hover:border-court-green-900 text-slate-700 hover:text-court-green-950 px-2.5 py-1 rounded-full text-left transition-all max-w-[280px] truncate"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message input */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="p-3 bg-white border-t border-gray-200 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis pesan Anda disini mengenai regulasi/biaya..."
          disabled={loading}
          className="flex-1 text-xs px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-court-green-900 bg-white"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-court-green-900 hover:bg-court-green-950 text-white p-2.5 rounded-lg disabled:opacity-40 transition-colors flex items-center justify-center font-bold"
        >
          <Send className="w-4 h-4 text-court-gold-400" />
        </button>
      </form>
    </div>
  );
}
