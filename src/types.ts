export interface ChatMessage {
  id: string;
  sender: "user" | "bot" | "system";
  text: string;
  timestamp: Date;
}

export interface CourtService {
  id: string;
  title: string;
  category: "kepaniteraan" | "kesekretariatan" | "ppid" | "pengaduan";
  description: string;
  requirements: string[];
  waTemplate: string;
}

export interface VirtualDesk {
  id: string;
  name: string;
  officer: string;
  status: "Aktif" | "Istirahat" | "Offline";
  zoomLink: string;
  meetLink: string;
  waLink: string;
}
