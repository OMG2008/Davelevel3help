
// Topic-aligned "past paper" packs (NOT verbatim).
// These pick questions by unit and difficulty to mimic the feel of each paper.
export const paperPacks = [
  {
    id: "u2-2023-jun-31769h",
    title: "Unit 2 — June 2023 (31769H) — Topic Pack",
    cat: "U2: Computer Systems",
    aim: "all",
    diff: "mix",
    qty: 20,
    secs: 35,
    note: "Covers CPU architecture, registers, caches, logic and performance — aligned to the 2023 June U2 paper themes."
  },
  {
    id: "u1-2018-jan-31768h",
    title: "Unit 1 — January 2018 (31768H) — Topic Pack",
    cat: "U1: Principles of CS",
    aim: "all",
    diff: "mix",
    qty: 20,
    secs: 40,
    note: "Algorithm design, pseudocode, control structures, data types, validation — aligned to Jan 2018 U1 themes."
  },
  {
    id: "u1-2023-jan",
    title: "Unit 1 — January 2023 — Topic Pack",
    cat: "U1: Principles of CS",
    aim: "all",
    diff: "mix",
    qty: 20,
    secs: 40,
    note: "Principles & problem solving emphasis typical of U1 Jan sessions."
  }
];

export function buildQuizHref(pack, opts={}){
  const params = new URLSearchParams();
  params.set('cat', pack.cat);
  params.set('aim', pack.aim);
  params.set('diff', pack.diff);
  params.set('qty', String(pack.qty));
  params.set('secs', String(pack.secs));
  params.set('title', pack.title);
  params.set('shuffle', opts.shuffle===false ? '0' : '1');
  return `quiz.html?${params.toString()}`;
}
