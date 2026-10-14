// Közös fejléc, eredmény-szalag, lábléc és segédfüggvények.
// Minden oldal a <body data-page="..."> értéke alapján jelöli ki az aktív menüpontot.

const NAV = [
  ["index.html", "Kezdőlap", "home"],
  ["hirek.html", "Hírek", "news"],
  ["jatekosok.html", "Játékosok", "players"],
  ["kapcsolat.html", "Kapcsolat", "contact"]
];

const MONTHS = ["jan.", "febr.", "márc.", "ápr.", "máj.", "jún.", "júl.", "aug.", "szept.", "okt.", "nov.", "dec."];

function el(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") e.className = v;
    else if (k === "text") e.textContent = v;
    else if (v !== undefined && v !== null && v !== false) e.setAttribute(k, v);
  }
  for (const c of children) if (c != null) e.append(c);
  return e;
}

function shortDate(iso) {
  const d = new Date(iso);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}.`;
}

function longDate(iso) {
  const d = new Date(iso);
  const days = ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"];
  const hasTime = iso.includes("T");
  const time = hasTime ? `, ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}` : "";
  return `${d.getFullYear()}. ${MONTHS[d.getMonth()].replace(".", "")} ${d.getDate()}., ${days[d.getDay()]}${time}`;
}

function resultCode(r) {
  if (r.gf > r.ga) return ["gy", "GY", "győzelem"];
  if (r.gf < r.ga) return ["v", "V", "vereség"];
  return ["d", "D", "döntetlen"];
}

function scoreLine(r) {
  const club = SITE.club.shortB || SITE.club.name;
  return r.home ? `${club} ${r.gf}:${r.ga} ${r.opponent}` : `${r.opponent} ${r.ga}:${r.gf} ${club}`;
}

function initials(name) {
  return name.split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

function emptyBox(text) {
  return el("div", { class: "empty" }, el("p", { text }));
}

function renderTicker() {
  if (!SITE.results.length) return null;
  const items = SITE.results.slice(0, 8).map(r => `${shortDate(r.date)} · ${scoreLine(r)} · ${resultCode(r)[2]}`);
  const track = el("div", { class: "ticker-track", "aria-hidden": "true" });
  [...items, ...items].forEach(t => track.append(el("span", { text: t })));
  const label = el("span", { class: "visually-hidden", text: "Legutóbbi eredmények: " + items.join("; ") });
  label.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)";
  return el("div", { class: "ticker" }, label, track);
}

function renderHeader() {
  const page = document.body.dataset.page;
  const ul = el("ul", { class: "nav" });
  NAV.forEach(([href, label, key]) => {
    ul.append(el("li", {}, el("a", { href, text: label, "aria-current": key === page ? "page" : null })));
  });
  const brand = el("a", { class: "brand", href: "index.html" },
    el("img", { src: "logo.png", alt: "" }),
    el("b", { text: SITE.club.shortA }), el("span", { text: SITE.club.shortB }));
  const header = el("header", { class: "site-header" },
    el("div", { class: "wrap" }, brand, el("nav", { "aria-label": "Fő menü" }, ul)));
  const ticker = renderTicker();
  document.body.prepend(header);
  if (ticker) document.body.prepend(ticker);
}

function renderFooter() {
  const c = SITE.contact;
  const contact = el("ul", {});
  if (c.email) contact.append(el("li", {}, el("a", { href: "mailto:" + c.email, text: c.email })));
  if (c.phone) contact.append(el("li", {}, el("a", { href: "tel:" + c.phone.replace(/\s/g, ""), text: c.phone })));
  if (c.address) contact.append(el("li", { text: c.address }));

  const pages = el("ul", {});
  NAV.forEach(([href, label]) => pages.append(el("li", {}, el("a", { href, text: label }))));

  const bottom = [SITE.club.name, SITE.club.league].filter(Boolean).join(" · ");
  const footer = el("footer", { class: "site-footer" },
    el("div", { class: "wrap footer-grid" },
      el("div", {},
        el("img", { src: "logo.png", alt: "" }),
        el("h3", { text: SITE.club.name }),
        el("p", { text: SITE.club.intro })),
      el("div", {}, el("span", { class: "eyebrow", text: "Oldalak" }), pages),
      el("div", {}, el("span", { class: "eyebrow", text: "Kapcsolat" }), contact)),
    el("div", { class: "footer-bottom" }, el("div", { class: "wrap", text: `© ${new Date().getFullYear()} ${bottom}` })));
  document.body.append(footer);
}

function newsCard(n) {
  const card = el("article", { class: "news-card" });
  if (n.image) {
    const img = el("div", { class: "img" });
    img.style.backgroundImage = `url("${n.image}")`;
    card.append(img);
  }
  card.append(el("div", { class: "body" },
    el("span", { class: "eyebrow", text: [n.category, shortDate(n.date)].filter(Boolean).join(" · ") }),
    el("h3", { text: n.title }),
    el("p", { text: n.summary })));
  return card;
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
});
