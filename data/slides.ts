export type Slide = {
  id: number;
  category: "achievement" | "value" | "accordion" | "phases" | "quote_slide" | "map" | "closing";
  number: string;
  eyebrow: string;
  headline: string;
  sub: string;
  metric?: string;
  metricLabel?: string;
  bullets?: string[];
  phases?: { title: string; bullets: string[] }[];
  quoteSmall?: string;
  highlights?: string[];
  bg: string;
  accent: string;
};

export type Track = "achievements" | "goals";

const BG_1 = "#07090f";
const BG_2 = "#07090f";
const BG_3 = "#07090f";
const BG_CLOSE = "#07090f";

export const achievementSlides: Slide[] = [
  {
    id: 1,
    category: "achievement",
    number: "01",
    eyebrow: "Erfolg",
    headline: "200+ Positionen\nerfolgreich besetzt",
    sub: "In 4 Jahren habe ich über 200 Fach- und Führungspositionen im kaufmännischen Bereich erfolgreich vermittelt.",
    metric: "200+",
    metricLabel: "Vermittlungen",
    highlights: ["200+"],
    bg: BG_1,
    accent: "#0e8045",
  },
  {
    id: 2,
    category: "achievement",
    number: "02",
    eyebrow: "Erfolg",
    headline: "Umsatz in 4 Jahren\nauf 170% gesteigert",
    sub: "Durch strategische Neukundengewinnung und nachhaltige Bestandskundenpflege wurde der Umsatz in den letzten 4 Jahren auf 170% ausgebaut.",
    metric: "170%",
    metricLabel: "Umsatzwachstum",
    highlights: ["170%"],
    bg: BG_2,
    accent: "#0e8045",
  },
  {
    id: 3,
    category: "achievement",
    number: "03",
    eyebrow: "Erfolg",
    headline: "Ø 22 Tage\nbis zur Einstellung",
    sub: "Durch mein Netzwerk und strukturierte Suchprozesse besetze ich Vakanzen deutlich schneller als der Marktdurchschnitt von 90 Tagen.",
    metric: "22",
    metricLabel: "Tage Ø",
    highlights: ["22 Tage"],
    bg: BG_3,
    accent: "#0e8045",
  },
  {
    id: 4,
    category: "achievement",
    number: "04",
    eyebrow: "Erfolg",
    headline: "Konvertierungs-\nrate verdoppelt",
    sub: "Die Rate von Qualified Lead zu erfolgreichem Placement wurde durch optimierte Prozesse und gezieltere Kandidatenansprache verdoppelt.",
    metric: "2×",
    metricLabel: "Conversion",
    highlights: ["Konvertierungs-", "rate"],
    bg: BG_1,
    accent: "#0e8045",
  },
  {
    id: 5,
    category: "achievement",
    number: "05",
    eyebrow: "Erfolg",
    headline: "Neukundenquote\nkontinuierlich gesteigert",
    sub: "Durch aktiven Aufbau neuer Kundenbeziehungen und gezielte Marktbearbeitung wurde die Neukundenquote Jahr für Jahr gesteigert.",
    highlights: ["Neukundenquote"],
    bg: BG_2,
    accent: "#0e8045",
  },
  {
    id: 6,
    category: "achievement",
    number: "06",
    eyebrow: "Erfolg",
    headline: "Vermittlungs-\nquote bei\nBestandskunden\ngesteigert",
    sub: "Durch intensivere Betreuung und ein besseres Verständnis der Kundenbedürfnisse konnte die Vermittlungsquote bei Bestandskunden deutlich erhöht werden.",
    highlights: ["Bestandskunden"],
    bg: BG_3,
    accent: "#0e8045",
  },
  {
    id: 99,
    category: "closing",
    number: "—",
    eyebrow: "",
    headline: "",
    sub: "",
    bg: BG_CLOSE,
    accent: "#0e8045",
  },
];

export const goalSlides: Slide[] = [
  {
    id: 10,
    category: "value",
    number: "01",
    eyebrow: "Der Weg zum Ziel",
    headline: "Menschen\nentwickeln",
    sub: "Vertrieb wird nicht erfolgreich, weil alle mehr machen. Sondern weil die richtigen Dinge konsequent richtig gemacht werden.",
    highlights: ["Menschen"],
    bg: BG_1,
    accent: "#0e8045",
  },
  {
    id: 11,
    category: "value",
    number: "02",
    eyebrow: "Der Weg zum Ziel",
    headline: "Führung\nprofessionalisieren",
    sub: "Viele Wachstumsprobleme sind in Wahrheit Führungsprobleme – fehlendes Gespür für Tragweite, fehlender Mut zu ziehen statt zu schieben und auf Augenhöhe zu kommunizieren.",
    highlights: ["Führung"],
    bg: BG_2,
    accent: "#0e8045",
  },
  {
    id: 12,
    category: "value",
    number: "03",
    eyebrow: "Der Weg zum Ziel",
    headline: "Standards\nschaffen",
    sub: "Wachstum wird erst stabil, wenn Erfolg reproduzierbar wird.",
    highlights: ["Standards"],
    bg: BG_3,
    accent: "#0e8045",
  },
  {
    id: 13,
    category: "phases",
    number: "04",
    eyebrow: "Der Weg zum Ziel",
    headline: "Wie ich den Aufbau\nangehen würde",
    sub: "",
    phases: [
      {
        title: "Verstehen",
        bullets: [
          "Gemeinsamkeiten & Unterschiede sichtbar machen",
          "Logik hinter Erfolgsfaktoren erkennen",
          "Operative Realität verstehen",
        ],
      },
      {
        title: "Vereinheitlichen",
        bullets: [
          "Erfolgreiche Prozesse skalieren",
          "Sinnvolle Standards etablieren",
          "Führung stärken – hier steht und fällt alles",
        ],
      },
      {
        title: "Wachsen",
        bullets: [
          "Leistung durch ein echtes \u201eWir\u201c multiplizieren",
          "Eigenverantwortung stärken",
          "Nachhaltige Kultur entwickeln",
        ],
      },
    ],
    bg: BG_1,
    accent: "#0e8045",
  },
  {
    id: 14,
    category: "quote_slide",
    number: "05",
    eyebrow: "Der Weg zum Ziel",
    headline: "Manchmal ist die Extrameile die Entscheidung zwischen Misserfolg und Erfolg.",
    sub: "",
    highlights: [],
    quoteSmall: "Sie fühlt sich aber nicht wie eine Extrameile an …\n… if you do what you want.",
    bg: BG_CLOSE,
    accent: "#0e8045",
  },
  {
    id: 15,
    category: "map",
    number: "06",
    eyebrow: "Der Weg zum Ziel",
    headline: "20 Standorte.\nEin Ziel.",
    sub: "Persona Service wächst. München ist der nächste Schritt — und der Anfang von etwas Größerem.",
    highlights: ["20 Standorte"],
    bg: BG_CLOSE,
    accent: "#0e8045",
  },
  {
    id: 99,
    category: "closing",
    number: "—",
    eyebrow: "",
    headline: "",
    sub: "",
    bg: BG_CLOSE,
    accent: "#0e8045",
  },
];
