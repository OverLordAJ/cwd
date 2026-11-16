"use strict";

const SECTIONS = [
  { id: "top", label: "Top Stories", shortLabel: "Top" },
  { id: "us", label: "U.S. News", shortLabel: "U.S." },
  { id: "world", label: "World", shortLabel: "World" },
  { id: "politics", label: "Politics", shortLabel: "Politics" },
  { id: "business", label: "Business", shortLabel: "Business" },
  { id: "tech", label: "Technology", shortLabel: "Tech" },
  { id: "ai", label: "Artificial Intelligence", shortLabel: "AI" },
  { id: "gaming", label: "Gaming", shortLabel: "Gaming" },
  { id: "entertainment", label: "Entertainment", shortLabel: "Culture" },
  { id: "music", label: "Music", shortLabel: "Music" },
  { id: "science", label: "Science & Health", shortLabel: "Science" },
  { id: "sports", label: "Sports", shortLabel: "Sports" },
];

const REGIONS = [
  { id: "africa", label: "Africa" },
  { id: "asia", label: "Asia" },
  { id: "europe", label: "Europe" },
  { id: "latam", label: "Latin America" },
  { id: "mideast", label: "Middle East" },
  { id: "northamerica", label: "North America" },
  { id: "oceania", label: "Oceania" },
];

const SECTION_COPY = {
  top: "The leading stories from major U.S. and international newsrooms.",
  us: "National reporting, policy, courts, business, and communities across the United States.",
  world: "Global reporting with dedicated source lists for every major region.",
  politics: "Elections, government, public policy, and political accountability.",
  business: "Markets, companies, work, trade, and the global economy.",
  tech: "Products, platforms, computing, and the people shaping technology.",
  ai: "Artificial intelligence research, products, policy, and real-world impact.",
  gaming: "Games, consoles, studios, releases, and interactive culture.",
  entertainment: "Film, television, streaming, celebrity, and popular culture.",
  music: "Artists, releases, performances, and the music business.",
  science: "Research, space, climate, health, and scientific discovery.",
  sports: "Scores, competitions, athletes, and sporting stories worldwide.",
};

const state = {
  data: null,
  route: readRoute(),
  query: "",
  source: "all",
  visibleCount: 30,
  menuOpen: false,
  loading: true,
  error: "",
};

const $ = (id) => document.getElementById(id);
let loadSequence = 0;

function icon(name) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "icon");
  svg.setAttribute("aria-hidden", "true");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute("href", `#i-${name}`);
  svg.append(use);
  return svg;
}

function make(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function readRoute() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const section = SECTIONS.some((item) => item.id === parts[0]) ? parts[0] : "top";
  const region = section === "world" && REGIONS.some((item) => item.id === parts[1]) ? parts[1] : null;
  return { section, region };
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : "";
  } catch { return ""; }
}

function publisherLink(item, className, label) {
  const link = make("a", className);
  link.href = safeUrl(item.url);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  if (label) link.setAttribute("aria-label", label);
  return link;
}

function titleLink(item) {
  const link = publisherLink(item);
  link.textContent = item.title;
  return link;
}

function sectionDestination(item) {
  return item.section === "world" && item.region ? `#/world/${item.region}` : `#/${item.section}`;
}

function sectionLabel(id) {
  return SECTIONS.find((section) => section.id === id)?.label || "World";
}

function storyKicker(item) {
  const row = make("div", "story-kicker");
  const tag = make("a", "section-tag", sectionLabel(item.section));
  tag.href = sectionDestination(item);
  row.append(tag, make("span", "", item.sourceName));
  return row;
}

function storyTime(item) {
  if (!item.publishedAt) return "Date unavailable";
  const time = new Date(item.publishedAt).getTime();
  if (!Number.isFinite(time)) return "Date unavailable";
  const minutes = Math.max(0, Math.floor((Date.now() - time) / 60000));
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "1 day ago" : `${days} days ago`;
}

function imageFallback(item) {
  const fallback = make("span", "image-fallback");
  fallback.append(icon("globe"), make("span", "", item.sourceName));
  return fallback;
}

function storyImage(item, lead = false) {
  const link = publisherLink(item, lead ? "lead-image" : "card-image", `Read at ${item.sourceName}: ${item.title}`);
  const url = item.imageUrl ? safeUrl(item.imageUrl) : "";
  if (!url) {
    link.append(imageFallback(item));
    return link;
  }
  const image = new Image();
  image.src = url;
  image.alt = "";
  image.loading = lead ? "eager" : "lazy";
  image.decoding = "async";
  image.addEventListener("error", () => link.replaceChildren(imageFallback(item)), { once: true });
  link.append(image);
  return link;
}

function readLink(item, text = "Source") {
  const link = publisherLink(item, "read-link", `Read at ${item.sourceName}: ${item.title}`);
  link.append(document.createTextNode(text), icon("arrow"));
  return link;
}

function leadCard(item) {
  const article = make("article", "lead-card");
  const copy = make("div", "lead-copy");
  copy.append(storyKicker(item));
  const heading = make("h2");
  heading.append(titleLink(item));
  copy.append(heading);
  if (item.summary) copy.append(make("p", "", item.summary));
  const footer = make("div", "story-footer");
  footer.append(make("time", "", storyTime(item)), readLink(item, `Read at ${item.sourceName}`));
  copy.append(footer);
  article.append(copy, storyImage(item, true));
  return article;
}

function railItem(item) {
  const article = make("article", "rail-item");
  const meta = make("div");
  meta.append(make("span", "", item.sourceName), make("time", "", storyTime(item)));
  const heading = make("h3");
  heading.append(titleLink(item));
  const tag = make("a", "section-tag", sectionLabel(item.section));
  tag.href = sectionDestination(item);
  article.append(meta, heading, tag);
  return article;
}

function newsCard(item) {
  const article = make("article", "news-card");
  article.append(storyImage(item));
  const copy = make("div", "card-copy");
  copy.append(storyKicker(item));
  const heading = make("h3");
  heading.append(titleLink(item));
  copy.append(heading);
  if (item.summary) copy.append(make("p", "", item.summary));
  const meta = make("div", "card-meta");
  meta.append(make("time", "", storyTime(item)), readLink(item));
  copy.append(meta);
  article.append(copy);
  return article;
}

function emptyState(title, description, buttonLabel, action) {
  const view = make("div", "empty-state");
  view.append(icon("globe"), make("h2", "", title), make("p", "", description));
  const button = make("button", "primary-button", buttonLabel);
  button.type = "button";
  button.addEventListener("click", action);
  view.append(button);
  return view;
}

function currentResponse() {
  if (!state.data) return null;
  if (state.route.section === "world" && state.route.region) return state.data.regions[state.route.region] || null;
  return state.data.sections[state.route.section] || null;
}

function buildNavigation() {
  for (const section of SECTIONS) {
    const link = make("a", "", section.shortLabel);
    link.href = `#/${section.id}`;
    link.dataset.section = section.id;
    $("desktop-nav").append(link);

    const button = make("button", "", section.label);
    button.type = "button";
    button.dataset.section = section.id;
    button.append(icon("right"));
    button.addEventListener("click", () => { location.hash = `/${section.id}`; });
    $("mobile-sections").append(button);
  }
}

function renderNavigation() {
  document.querySelectorAll("[data-section]").forEach((node) => {
    const active = node.dataset.section === state.route.section;
    node.classList.toggle("active", active);
    if (node.tagName === "A") {
      if (active) node.setAttribute("aria-current", "page");
      else node.removeAttribute("aria-current");
    }
  });
}

function renderRegions() {
  const bar = $("region-bar");
  bar.hidden = state.route.section !== "world";
  if (bar.hidden) return;
  const choices = [{ id: "", label: "All regions" }, ...REGIONS];
  bar.replaceChildren(...choices.map((region) => {
    const link = make("a", state.route.region === (region.id || null) ? "active" : "", region.label);
    link.href = region.id ? `#/world/${region.id}` : "#/world";
    if (state.route.region === (region.id || null)) link.setAttribute("aria-current", "page");
    return link;
  }));
}

function renderStatus(response) {
  const details = $("source-status");
  details.hidden = !response;
  if (!response) return;
  const items = response.sources.map((source) => {
    const row = make("div", `status-item ${source.status}`);
    row.append(make("span", "status-dot"), make("strong", "", source.name));
    const note = source.status === "error" ? (source.message || "Feed unavailable") : `${source.itemCount} headlines${source.status === "stale" ? " · previous snapshot" : ""}`;
    row.append(make("span", "", note));
    return row;
  });
  $("status-grid").replaceChildren(...items);
}

function renderContent(response) {
  const content = $("news-content");
  if (state.loading && !state.data) {
    const loading = make("div", "loading-view");
    loading.setAttribute("role", "status");
    loading.append(make("div", "skeleton skeleton-lead"), make("div", "loading-copy", "Loading the latest headlines…"));
    content.replaceChildren(loading);
    return;
  }
  if (!response) {
    content.replaceChildren(emptyState("The news snapshot could not be loaded.", "Check that news.json is published alongside index.html, then try again.", "Try again", loadNews));
    return;
  }
  const query = state.query.trim().toLowerCase();
  const filtered = response.items.filter((item) => {
    const matchesSource = state.source === "all" || item.sourceId === state.source;
    const haystack = `${item.title} ${item.summary} ${item.sourceName}`.toLowerCase();
    return matchesSource && (!query || haystack.includes(query));
  });
  if (!filtered.length) {
    const filteredView = response.items.length > 0;
    content.replaceChildren(emptyState(
      filteredView ? "No headlines match these filters." : "No headlines are available in this snapshot.",
      filteredView ? "Try another keyword or show every source." : "Run the GitHub Action again or expand the publisher list. No unrelated stories have been substituted.",
      filteredView ? "Clear filters" : "Reload snapshot",
      filteredView ? clearFilters : loadNews,
    ));
    return;
  }

  const visible = filtered.slice(0, state.visibleCount);
  const fragment = document.createDocumentFragment();
  const lead = make("section", "lead-layout");
  lead.setAttribute("aria-label", "Leading coverage");
  lead.append(leadCard(visible[0]));
  if (visible.length > 1) {
    const rail = make("aside", "latest-rail");
    const heading = make("div", "rail-heading");
    heading.append(make("h2", "", `Latest in ${$("page-title").textContent}`), make("span", "", `${Math.min(6, visible.length - 1)} updates`));
    rail.append(heading, ...visible.slice(1, 7).map(railItem));
    lead.append(rail);
  }
  fragment.append(lead);

  if (visible.length > 7) {
    const section = make("section", "coverage-section");
    section.setAttribute("aria-label", "More coverage");
    const header = make("div", "coverage-header");
    const headingGroup = make("div");
    headingGroup.append(make("h2", "", "More coverage"), make("span", "", "Newest first · links open the original publisher"));
    const label = make("label", "source-select", "Source");
    const select = document.createElement("select");
    select.setAttribute("aria-label", "Source");
    const all = make("option", "", "All sources");
    all.value = "all";
    select.append(all);
    const sourceIds = [...new Set(response.items.map((item) => item.sourceId))];
    for (const id of sourceIds) {
      const item = response.items.find((entry) => entry.sourceId === id);
      const option = make("option", "", item.sourceName);
      option.value = id;
      select.append(option);
    }
    select.value = state.source;
    select.addEventListener("change", () => { state.source = select.value; state.visibleCount = 30; render(); });
    label.append(select);
    header.append(headingGroup, label);
    const grid = make("div", "news-grid");
    grid.append(...visible.slice(7).map(newsCard));
    section.append(header, grid);
    fragment.append(section);
  }

  if (filtered.length > visible.length) {
    const more = make("button", "load-more", "Show more headlines");
    more.type = "button";
    more.append(make("span", "", `${filtered.length - visible.length} remaining`));
    more.addEventListener("click", () => { state.visibleCount += 30; render(); });
    fragment.append(more);
  }
  content.replaceChildren(fragment);
}

function render() {
  const section = SECTIONS.find((item) => item.id === state.route.section) || SECTIONS[0];
  const region = REGIONS.find((item) => item.id === state.route.region);
  const title = region ? region.label : section.label;
  const response = currentResponse();
  document.title = `${title} — NetWatch`;
  $("page-title").textContent = title;
  $("page-description").textContent = region ? `Reporting from publishers covering ${region.label}.` : SECTION_COPY[state.route.section];
  $("section-overline").textContent = `NETWATCH / ${region ? "REGIONAL DESK" : "NEWS DESK"}`;
  $("search").placeholder = `Search ${title.toLowerCase()}`;
  $("search").setAttribute("aria-label", `Search ${title}`);
  $("search").disabled = !response;
  $("search-clear").hidden = !state.query;
  $("refresh-button").disabled = state.loading;
  renderNavigation();
  renderRegions();

  const summary = $("feed-summary");
  summary.hidden = !response;
  if (response) {
    const reporting = response.sources.filter((source) => source.status !== "error").length;
    summary.replaceChildren(make("strong", "", String(response.items.length)), document.createTextNode(" headlines "), make("span", "", `${reporting}/${response.sources.length} sources reporting`));
  }

  const notice = $("notice");
  notice.hidden = !state.error && !response?.fromCache;
  $("notice-action").hidden = !state.error;
  $("notice-text").textContent = state.error || "Publishers did not respond in the latest run. Showing the previous successful snapshot.";

  const latest = response?.items[0];
  $("wire-loading").hidden = Boolean(latest);
  $("wire-link").hidden = !latest;
  if (latest) {
    const link = $("wire-link");
    link.href = safeUrl(latest.url);
    link.querySelector("strong").textContent = latest.sourceName;
    link.querySelector("span").textContent = latest.title;
  }

  renderContent(response);
  renderStatus(response);
}

function clearFilters() {
  state.query = "";
  state.source = "all";
  state.visibleCount = 30;
  $("search").value = "";
  render();
}

function setMenu(open) {
  state.menuOpen = open;
  $("mobile-sections").hidden = !open;
  $("menu-button").setAttribute("aria-expanded", String(open));
  $("menu-button").setAttribute("aria-label", open ? "Close sections" : "Open sections");
  $("menu-icon").setAttribute("href", open ? "#i-close" : "#i-menu");
}

function renderTheme() {
  const theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  $("theme-button").setAttribute("aria-label", `Use ${theme === "light" ? "dark" : "light"} theme`);
  $("theme-icon").setAttribute("href", theme === "light" ? "#i-moon" : "#i-sun");
  document.querySelector('meta[name="theme-color"]').content = theme === "light" ? "#f6f4ef" : "#111a29";
}

async function loadNews() {
  const sequence = ++loadSequence;
  state.loading = true;
  state.error = "";
  $("refresh-icon").classList.add("spinning");
  render();
  try {
    const response = await fetch(`news.json?reload=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!data.sections || !data.regions) throw new Error("Invalid news snapshot");
    if (sequence !== loadSequence) return;
    state.data = data;
    $("snapshot-time").textContent = `Snapshot generated ${new Date(data.generatedAt).toLocaleString()}.`;
  } catch (error) {
    if (sequence !== loadSequence) return;
    state.error = location.protocol === "file:"
      ? "Browsers block local JSON loading. Use GitHub Pages or run npm run serve locally."
      : "The news snapshot could not be reached. Check that news.json is published with the site.";
  } finally {
    if (sequence === loadSequence) {
      state.loading = false;
      $("refresh-icon").classList.remove("spinning");
      render();
    }
  }
}

buildNavigation();
$("utility-date").textContent = new Date().toLocaleString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
$("search").addEventListener("input", (event) => { state.query = event.target.value; state.visibleCount = 30; render(); });
$("search-clear").addEventListener("click", () => { state.query = ""; $("search").value = ""; render(); $("search").focus(); });
$("refresh-button").addEventListener("click", loadNews);
$("notice-action").addEventListener("click", loadNews);
$("menu-button").addEventListener("click", () => setMenu(!state.menuOpen));
$("theme-button").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("netwatch-theme", next); } catch { /* Storage is optional. */ }
  renderTheme();
});
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && state.menuOpen) setMenu(false); });
window.addEventListener("hashchange", () => {
  state.route = readRoute();
  state.query = "";
  state.source = "all";
  state.visibleCount = 30;
  $("search").value = "";
  setMenu(false);
  render();
});

renderTheme();
render();
loadNews();

if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
