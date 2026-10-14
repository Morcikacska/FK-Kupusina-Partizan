// =====================================================================
// A weboldal adatai. Csak ezt a fájlt kell szerkeszteni a frissítéshez.
// Ami üres ([] vagy ""), az az oldalon üres állapotként jelenik meg.
// Dátum formátum: "ÉÉÉÉ-HH-NN", időponttal: "ÉÉÉÉ-HH-NNTÓÓ:PP"
// =====================================================================

const SITE = {
  club: {
    name: "FK Partizan Kupuszina",
    shortA: "FK Partizan",       // a logó melletti név első (halvány) része
    shortB: "Kupuszina",         // a logó melletti név második (kiemelt) része
    town: "Kupuszina, Szerbia",
    league: "",                  // pl. "Vajdasági Liga"
    founded: "",                 // pl. "1932"
    intro: "Kupuszinai focicsapat, amely a falu közösségéből nőtt ki, és a falu közösségéért játszik.",
    heroPhoto: ""                // pl. "kepek/hero.jpg" (fekete-fehérre színezve jelenik meg)
  },

  contact: {
    email: "",                   // pl. "info@fkkupusina.rs"
    phone: "",                   // pl. "+381 ..."
    address: "Somborski put, Kupusina, Szerbia"
  },

  // Következő mérkőzés. Ha nincs, legyen null.
  // Példa: { date: "2026-10-18T15:00", opponent: "FK Példa", home: true, round: "12. forduló", venue: "Kupuszinai pálya" }
  nextMatch: null,

  // Lejátszott meccsek, a legújabb legyen elöl.
  // Példa: { date: "2026-10-11", opponent: "FK Példa", home: true, gf: 3, ga: 1 }
  results: [],

  // Következő fordulók.
  // Példa: { date: "2026-10-25", opponent: "FK Példa", home: false }
  fixtures: [],

  // Bajnoki tabella. A saját csapat neve egyezzen a club.name-mel, így ki lesz emelve.
  // Példa: { team: "FK Példa", m: 11, gy: 7, d: 3, v: 1, gf: 22, ga: 10 }
  table: [],

  // Hírek, a legújabb legyen elöl.
  // Példa: { date: "2026-10-11", category: "Mérkőzés", title: "Cím", summary: "Rövid összefoglaló.", image: "kepek/hir1.jpg" }
  news: []
};
