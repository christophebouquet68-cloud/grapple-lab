import { useState } from "react";

// ╔══════════════════════════════════════════════════════════════════════════════╗
// ║                        📌 ADD NEW TECHNIQUES HERE                          ║
// ║                                                                            ║
// ║  This is the permanent technique database for the app.                     ║
// ║                                                                            ║
// ║  WORKFLOW:                                                                 ║
// ║  1. Use the Admin panel ("+ Add") to compose & preview a technique         ║
// ║  2. Click "Export JSON" on the success screen to copy the object           ║
// ║  3. Paste it at the BOTTOM of the list below (before the closing ];)       ║
// ║  4. Assign the next sequential id (last id + 1)                            ║
// ║  5. Save the file and republish — the technique will appear for everyone   ║
// ║                                                                            ║
// ║  REQUIRED fields:  name · category · description                           ║
// ║  OPTIONAL fields:  difficulty · image · youtube · keyPoints[]              ║
// ║                                                                            ║
// ║  Valid categories:  Guards · Submissions · Transitions                     ║
// ║                     Takedowns · Dark BJJ                                   ║
// ║  Valid difficulty:  Beginner · Intermediate · Advanced                     ║
// ╚══════════════════════════════════════════════════════════════════════════════╝

const SEED_TECHNIQUES = [
  {
    id: 1, name: "Closed Guard", category: "Guards", difficulty: "Beginner",
    description: "The cornerstone of BJJ. You're on your back with both legs locked around the opponent's waist. From here you control posture and launch attacks: triangles, armbars, sweeps, omoplatas.",
    image: "https://images.unsplash.com/photo-1627483297886-49710ae1fc22?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=g7WLY0r1-IA",
    keyPoints: ["Break opponent's posture first", "Control collar & sleeve", "Hip angle unlocks attacks"],
  },
  {
    id: 2, name: "Half Guard", category: "Guards", difficulty: "Intermediate",
    description: "One of the opponent's legs is trapped between yours. Acts as both a defensive shield and a platform for deep-half sweeps, back takes, and leg-lock entries.",
    image: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=B_Zn0tYNBdw",
    keyPoints: ["Win the underhook battle", "Recover guard with hip escape", "Sweep to top"],
  },
  {
    id: 3, name: "Spider Guard", category: "Guards", difficulty: "Intermediate",
    description: "Sleeve grips combined with feet on biceps create a web of tension. An elite sport-BJJ platform for triangles, omoplatas, and balloon sweeps.",
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=RqWxP4uRzUU",
    keyPoints: ["Maintain sleeve control", "Push/pull to break posture", "Extend to create openings"],
  },
  {
    id: 4, name: "Rear Naked Choke", category: "Submissions", difficulty: "Beginner",
    description: "The highest-percentage finish in grappling. Applied from back control, the choking arm wraps the throat while the other arm frames the head — cutting off carotid blood flow.",
    image: "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=aVHFPsrpDiE",
    keyPoints: ["Chin-over-shoulder principle", "Squeeze elbow-to-elbow", "Hips away to finish"],
  },
  {
    id: 5, name: "Triangle Choke", category: "Submissions", difficulty: "Intermediate",
    description: "One of BJJ's most iconic chokes. Legs form a triangle around the opponent's neck and one arm, creating a blood choke. Can be hit from guard, mount, or back.",
    image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=OqWbcfLsEAA",
    keyPoints: ["Cut the angle 45°", "Pull head down", "Squeeze knees together"],
  },
  {
    id: 6, name: "Armbar", category: "Submissions", difficulty: "Beginner",
    description: "A hyper-extension of the elbow joint. Can be applied from mount, guard, back, and countless transitional positions. The most versatile submission in the game.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=U2gI5R5Hbio",
    keyPoints: ["Thumb up = elbow vulnerable", "Squeeze knees, bridge hips", "Control the wrist firmly"],
  },
  {
    id: 7, name: "Guard Pass to Side Control", category: "Transitions", difficulty: "Beginner",
    description: "Transitioning from inside the guard to dominant side control is the most fundamental positional improvement in BJJ. Master the toreando and knee-slice as your bread-and-butter passes.",
    image: "https://images.unsplash.com/photo-1627483297886-49710ae1fc22?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=g7WLY0r1-IA",
    keyPoints: ["Control hips before moving", "Keep pressure throughout", "Establish cross-face immediately"],
  },
  {
    id: 8, name: "Mount to Back Take", category: "Transitions", difficulty: "Intermediate",
    description: "When the opponent turns to escape mount, you flow to their back. Recognising this reactive window separates good grapplers from great ones.",
    image: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=B_Zn0tYNBdw",
    keyPoints: ["Anticipate the bridge-and-roll", "Chest stays glued to their back", "Insert hooks immediately"],
  },
  {
    id: 9, name: "Double Leg Takedown", category: "Takedowns", difficulty: "Beginner",
    description: "The cornerstone of wrestling-based takedowns. Shoot low, drive through, finish to side or top. Combining a level change with explosive penetration step is key.",
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=RqWxP4uRzUU",
    keyPoints: ["Level change first", "Drive knee to the mat", "Head outside, lift & turn"],
  },
  {
    id: 10, name: "Seoi Nage", category: "Takedowns", difficulty: "Intermediate",
    description: "A classic judo shoulder throw that translates beautifully to BJJ. Entry requires breaking the opponent's balance forward, then loading them across your back.",
    image: "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=aVHFPsrpDiE",
    keyPoints: ["Break posture forward first", "Elbow drives under armpit", "Explosive hip rotation"],
  },
  {
    id: 11, name: "Heel Hook", category: "Dark BJJ", difficulty: "Advanced",
    description: "The most devastating leg lock in the modern game. It rotates the knee joint beyond its limits by levering the heel. Banned in many beginner competitions — learn structure and defence before attempting.",
    image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=OqWbcfLsEAA",
    keyPoints: ["Understand the 'reap' position", "Control before rotating", "Tap early — damage is silent"],
  },
  {
    id: 12, name: "Neck Crank", category: "Dark BJJ", difficulty: "Advanced",
    description: "A spinal compression or lateral neck force. Highly effective but carries real injury risk. Used in no-gi submission-only rulesets. Not a beginner technique — context and control are everything.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80",
    youtube: "https://www.youtube.com/watch?v=U2gI5R5Hbio",
    keyPoints: ["Slow, controlled pressure", "Distinguish from choke", "Never crank in drilling"],
  },

  // ▼▼▼ PASTE NEW TECHNIQUES BELOW THIS LINE ▼▼▼
  // Use the Admin panel → Export JSON to generate the correct format,
  // then paste the object here and assign the next id (13, 14, 15 …)
  // ▲▲▲ END OF TECHNIQUE LIST ▲▲▲
];

const CONCEPTS = [
  { icon: "⚖️", title: "Positional Hierarchy", body: "BJJ ranks positions by dominance: back control → mount → knee-on-belly → side control → guard. The higher on the ladder, the more control and submission options you have." },
  { icon: "🔄", title: "The Guard", body: "Unique to BJJ — fighting effectively from your back. The guard is not defensive; it is an attacking platform. Developing a strong guard changed martial arts forever." },
  { icon: "🌊", title: "Flowing & Chaining", body: "Techniques are rarely isolated. A failed armbar should flow into a triangle; a blocked triangle feeds an omoplata. Train combinations, not just individual moves." },
  { icon: "🎯", title: "Base & Posture", body: "Before attacking, establish base (hips low, weight distributed) and posture (spine neutral). Neglecting these fundamentals is the fastest way to get submitted." },
  { icon: "⏱️", title: "Timing Over Force", body: "BJJ was designed so a smaller person can overcome a larger one. Timing, leverage, and technique consistently beat raw strength — especially over a long roll." },
  { icon: "🦺", title: "Tap Early, Tap Often", body: "Tapping is not failure — it's the mechanism that lets training continue safely. Pride in refusing to tap leads to injuries. The mats will always be there tomorrow." },
];

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const CATS  = ["All", "Guards", "Submissions", "Transitions", "Takedowns", "Dark BJJ"];
const DIFFS = ["All", "Beginner", "Intermediate", "Advanced"];
// Nav order: Overview → Concepts → Techniques → About
const NAV   = ["Overview", "Concepts", "Techniques", "About"];

const CAT_COLORS  = { Guards: "#4cc9f0", Submissions: "#e85d04", Transitions: "#a29bfe", Takedowns: "#55efc4", "Dark BJJ": "#d63031" };
const DIFF_COLORS = { Beginner: "#2ecc71", Intermediate: "#f39c12", Advanced: "#e74c3c" };

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&q=80";

const JSON_TEMPLATE = `[
  {
    "name": "Butterfly Guard",
    "category": "Guards",
    "difficulty": "Intermediate",
    "description": "Seated guard with insteps hooked under opponent's thighs. A powerful sweeping platform used extensively in no-gi.",
    "image": "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&q=80",
    "youtube": "https://www.youtube.com/watch?v=example",
    "keyPoints": [
      "Stay upright and active",
      "Hook lift is explosive",
      "Combine with underhook"
    ]
  }
]`;

// ─── ADMIN ────────────────────────────────────────────────────────────────────
// Change this password before deploying. It lives client-side, so it's
// casual protection — enough to keep regular users out of the Add panel.
const ADMIN_PASSWORD = "osss2026singapore";

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function GrappleLab() {
  const [page, setPage]         = useState("Overview");
  const [techniques, setTechs]  = useState(SEED_TECHNIQUES);
  const [cat, setCat]           = useState("All");
  const [diff, setDiff]         = useState("All");
  const [selected, setSelected] = useState(null);
  const [isAdmin, setIsAdmin]   = useState(false);
  const [showGate, setShowGate] = useState(false);

  const filtered = techniques.filter(p =>
    (cat  === "All" || p.category   === cat) &&
    (diff === "All" || p.difficulty === diff)
  );

  const handleImport = (newItems) => {
    const maxId = techniques.reduce((m, t) => Math.max(m, t.id || 0), 0);
    const stamped = newItems.map((t, i) => ({
      difficulty: "Beginner",
      image: DEFAULT_IMAGE,
      youtube: "",
      keyPoints: [],
      ...t,
      id: maxId + i + 1,
    }));
    setTechs(prev => [...prev, ...stamped]);
    setPage("Techniques");
  };

  // "+ Add" click — show gate if not yet authenticated
  const handleAddClick = () => {
    if (isAdmin) { setPage("Add"); }
    else         { setShowGate(true); }
  };

  const handleUnlock = () => {
    setIsAdmin(true);
    setShowGate(false);
    setPage("Add");
  };

  const handleLock = () => {
    setIsAdmin(false);
    if (page === "Add") setPage("Overview");
  };

  return (
    <div style={S.root}>
      <Grain />
      <nav style={S.nav}>
        <div style={S.navBrand} onClick={() => setPage("Overview")}>
          <span style={S.navLogo}>⬡</span>
          <span style={S.navTitle}>The <em>Grapple</em> Lab</span>
        </div>
        <div style={S.navLinks}>
          {NAV.map(n => (
            <button key={n} onClick={() => setPage(n)}
              style={{ ...S.navBtn, ...(page === n ? S.navActive : {}) }}>
              {n}
            </button>
          ))}
          {/* Admin controls */}
          {isAdmin
            ? <>
                <button onClick={handleAddClick}
                  style={{ ...S.navBtn, ...(page === "Add" ? S.navAddActive : S.navAdd) }}>
                  + Add
                </button>
                <button onClick={handleLock}
                  style={{ ...S.navBtn, ...S.navLockBtn }} title="Exit admin mode">
                  🔓 Admin
                </button>
              </>
            : <button onClick={handleAddClick} style={{ ...S.navBtn, ...S.navAdd }}>
                🔒 Admin
              </button>
          }
        </div>
      </nav>

      <main style={S.main}>
        {page === "Overview"   && <Overview   techniques={techniques} goTo={setPage} />}
        {page === "Concepts"   && <Concepts />}
        {page === "Techniques" && <Techniques filtered={filtered} cat={cat} setCat={setCat} diff={diff} setDiff={setDiff} onSelect={setSelected} />}
        {page === "About"      && <About />}
        {page === "Add"        && isAdmin && <AddTechniques onImport={handleImport} />}
      </main>

      {selected   && <Modal       pos={selected} onClose={() => setSelected(null)} />}
      {showGate   && <PasswordGate onUnlock={handleUnlock} onCancel={() => setShowGate(false)} />}
    </div>
  );
}

// ─── OVERVIEW ─────────────────────────────────────────────────────────────────
function Overview({ techniques, goTo }) {
  return (
    <div style={S.overviewWrap}>
      <div style={S.hero}>
        <div style={S.heroTag}>Brazilian Jiu-Jitsu Knowledge Base</div>
        <h1 style={S.heroTitle}>The Art of<br /><span style={S.heroAccent}>Human Chess</span></h1>
        <p style={S.heroBody}>
          BJJ is a ground-based martial art built on leverage, timing, and positional strategy.
          A smaller practitioner can — and regularly does — defeat larger opponents using technique alone.
          This lab is your structured guide to positions, submissions, and concepts.
        </p>
        <div style={S.heroCtas}>
          <button style={S.ctaPrimary}   onClick={() => goTo("Techniques")}>Explore Techniques →</button>
          <button style={S.ctaSecondary} onClick={() => goTo("Concepts")}>Basic Concepts</button>
        </div>
      </div>

      <div style={S.statRow}>
        {[
          [String(techniques.length), "Techniques Indexed"],
          [String(CATS.length - 1),   "Categories"],
          ["3",                        "Difficulty Levels"],
          ["∞",                        "Combinations"],
        ].map(([n, l]) => (
          <div key={l} style={S.stat}>
            <span style={S.statNum}>{n}</span>
            <span style={S.statLabel}>{l}</span>
          </div>
        ))}
      </div>

      <div style={S.catGrid}>
        {CATS.slice(1).map(c => (
          <div key={c}
            style={{ ...S.catCard, borderColor: CAT_COLORS[c] + "33" }}
            onClick={() => goTo("Techniques")}
            onMouseEnter={e => e.currentTarget.style.borderColor = CAT_COLORS[c]}
            onMouseLeave={e => e.currentTarget.style.borderColor = CAT_COLORS[c] + "33"}>
            <span style={{ ...S.catDot, background: CAT_COLORS[c] }} />
            <span style={S.catName}>{c}</span>
            <span style={S.catCount}>{techniques.filter(p => p.category === c).length} techniques</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CONCEPTS ─────────────────────────────────────────────────────────────────
function Concepts() {
  return (
    <div>
      <div style={S.pageHeader}>
        <h2 style={S.pageTitle}>Basic Concepts</h2>
        <p style={S.pageSubtitle}>The mental models every BJJ practitioner should internalise from day one.</p>
      </div>
      <div style={S.conceptGrid}>
        {CONCEPTS.map(c => (
          <div key={c.title} style={S.conceptCard}>
            <div style={S.conceptIcon}>{c.icon}</div>
            <h3 style={S.conceptTitle}>{c.title}</h3>
            <p style={S.conceptBody}>{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TECHNIQUES ───────────────────────────────────────────────────────────────
function Techniques({ filtered, cat, setCat, diff, setDiff, onSelect }) {
  return (
    <div>
      <div style={S.filterBar}>
        <div style={S.filterGroup}>
          <span style={S.filterLabel}>Type</span>
          <div style={S.pills}>
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                style={{ ...S.pill, ...(cat === c ? { ...S.pillActive, borderColor: CAT_COLORS[c] || "#e85d04", color: CAT_COLORS[c] || "#e85d04" } : {}) }}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div style={S.filterGroup}>
          <span style={S.filterLabel}>Level</span>
          <div style={S.pills}>
            {DIFFS.map(d => (
              <button key={d} onClick={() => setDiff(d)}
                style={{ ...S.pill, ...(diff === d ? { ...S.pillActive, borderColor: DIFF_COLORS[d] || "#e85d04", color: DIFF_COLORS[d] || "#e85d04" } : {}) }}>
                {d}
              </button>
            ))}
          </div>
        </div>
        <div style={S.filterCount}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</div>
      </div>
      <div style={S.grid}>
        {filtered.length === 0
          ? <div style={S.empty}>No techniques match these filters.</div>
          : filtered.map(p => <Card key={p.id} pos={p} onSelect={onSelect} />)}
      </div>
    </div>
  );
}

function Card({ pos, onSelect }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ ...S.card, ...(hov ? S.cardHov : {}) }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => onSelect(pos)}>
      <div style={S.cardImgWrap}>
        <img src={pos.image || DEFAULT_IMAGE} alt={pos.name} style={S.cardImg} />
        <div style={S.cardImgOverlay} />
        <span style={{ ...S.badge, background: DIFF_COLORS[pos.difficulty] || "#888" }}>{pos.difficulty}</span>
      </div>
      <div style={S.cardBody}>
        <span style={{ ...S.cardCat, color: CAT_COLORS[pos.category] || "#e85d04" }}>{pos.category}</span>
        <h3 style={S.cardTitle}>{pos.name}</h3>
        <p style={S.cardDesc}>{pos.description.slice(0, 90)}…</p>
        <span style={S.cardCta}>Open →</span>
      </div>
    </div>
  );
}

// ─── ADD TECHNIQUES ───────────────────────────────────────────────────────────
function AddTechniques({ onImport }) {
  const [mode, setMode]     = useState("form");
  const [jsonText, setJson] = useState(JSON_TEMPLATE);
  const [jsonErr, setErr]   = useState("");
  const [done, setDone]     = useState(false);
  const [addedCount, setAddedCount] = useState(0);

  // Form state
  const blank = { name: "", category: "Guards", difficulty: "Beginner", description: "", image: "", youtube: "", kp1: "", kp2: "", kp3: "" };
  const [form, setForm]     = useState(blank);
  const [formErr, setFErr]  = useState("");

  const finishImport = (items) => {
    onImport(items);
    setAddedCount(items.length);
    setDone(true);
  };

  const handleJsonImport = () => {
    setErr("");
    try {
      const parsed = JSON.parse(jsonText);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      const bad = arr.filter(t => !t.name || !t.category || !t.description);
      if (bad.length) { setErr(`${bad.length} item(s) missing required fields: name, category, description.`); return; }
      finishImport(arr);
    } catch (e) { setErr("Invalid JSON — " + e.message); }
  };

  const handleFormImport = () => {
    setFErr("");
    if (!form.name.trim())        { setFErr("Name is required."); return; }
    if (!form.description.trim()) { setFErr("Description is required."); return; }
    const kps = [form.kp1, form.kp2, form.kp3].map(s => s.trim()).filter(Boolean);
    finishImport([{
      name: form.name.trim(),
      category: form.category,
      difficulty: form.difficulty,
      description: form.description.trim(),
      image: form.image.trim() || DEFAULT_IMAGE,
      youtube: form.youtube.trim(),
      keyPoints: kps,
    }]);
  };

  const F = (label, key, opts = {}) => (
    <div style={S.addField}>
      <label style={S.addLabel}>{label}</label>
      {opts.textarea
        ? <textarea value={form[key]} rows={3}
            onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
            style={{ ...S.addInput, resize: "vertical" }}
            placeholder={opts.ph || ""} />
        : opts.select
        ? <select value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={S.addInput}>
            {opts.options.map(o => <option key={o}>{o}</option>)}
          </select>
        : <input value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
            style={S.addInput} placeholder={opts.ph || ""} />}
    </div>
  );

  // Build a clean exportable JSON string from the last imported items
  const buildExportJSON = () => {
    const obj = {
      name:        form.name.trim()        || "Untitled",
      category:    form.category,
      difficulty:  form.difficulty,
      description: form.description.trim(),
      image:       form.image.trim()       || DEFAULT_IMAGE,
      youtube:     form.youtube.trim()     || "",
      keyPoints:   [form.kp1, form.kp2, form.kp3].map(s => s.trim()).filter(Boolean),
    };
    return JSON.stringify(obj, null, 2);
  };

  const [copied, setCopied] = useState(false);
  const handleCopyExport = () => {
    const text = mode === "form" ? buildExportJSON() : jsonText;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (done) return (
    <div style={S.successBox}>
      <div style={{ fontSize: 44, marginBottom: 14 }}>✓</div>
      <h3 style={{ margin: "0 0 8px", fontSize: 22, letterSpacing: "-0.5px" }}>
        {addedCount} Technique{addedCount !== 1 ? "s" : ""} Added to Session
      </h3>
      <p style={{ color: "#666", fontSize: 14, marginBottom: 6, maxWidth: 420 }}>
        The library is updated for this session. To make it permanent, export the JSON and paste it into <code style={S.code}>SEED_TECHNIQUES</code> in the source file, then republish.
      </p>

      {/* Export box */}
      <div style={S.exportBox}>
        <div style={S.exportHeader}>
          <span style={S.addLabel}>📋 Export JSON — paste into SEED_TECHNIQUES</span>
          <button style={copied ? S.exportCopiedBtn : S.exportCopyBtn} onClick={handleCopyExport}>
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>
        <pre style={S.exportPre}>{mode === "form" ? buildExportJSON() : jsonText}</pre>
        <p style={S.exportHint}>
          Assign the next sequential <code style={S.code}>id</code>, paste above the <code style={S.code}>▲▲▲ END OF TECHNIQUE LIST</code> marker, and republish.
        </p>
      </div>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 20 }}>
        <button style={S.ctaPrimary} onClick={() => { setDone(false); setForm(blank); setJson(JSON_TEMPLATE); setCopied(false); }}>
          Add Another
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <div style={S.pageHeader}>
        <h2 style={S.pageTitle}>Add Techniques</h2>
        <p style={S.pageSubtitle}>
          Extend the library with new entries. Use the <strong style={{ color: "#ede8df" }}>Form</strong> for one technique at a time,
          or paste a <strong style={{ color: "#ede8df" }}>JSON</strong> array to import many at once.
        </p>
      </div>

      {/* Mode tabs */}
      <div style={S.modeTabs}>
        {[["form", "📝  Form (single)"], ["json", "{ }  JSON (batch)"]].map(([m, lbl]) => (
          <button key={m} onClick={() => setMode(m)}
            style={{ ...S.modeTab, ...(mode === m ? S.modeTabActive : {}) }}>
            {lbl}
          </button>
        ))}
      </div>

      {/* ── FORM MODE ── */}
      {mode === "form" && (
        <div style={S.addCard}>
          <div style={S.addGrid2}>
            {F("Technique Name *", "name", { ph: "e.g. Butterfly Guard" })}
            {F("Category *", "category", { select: true, options: CATS.slice(1) })}
          </div>
          <div style={S.addGrid2}>
            {F("Difficulty", "difficulty", { select: true, options: DIFFS.slice(1) })}
            {F("Image URL", "image", { ph: "https://… (leave blank for default)" })}
          </div>
          {F("Description *", "description", { textarea: true, ph: "Describe the position, its purpose, and when it's used." })}
          {F("YouTube URL", "youtube", { ph: "https://www.youtube.com/watch?v=…" })}

          <div style={{ ...S.addDivider, margin: "20px 0 14px" }} />
          <div style={S.addLabel}>Key Points (up to 3 — optional)</div>
          <div style={S.addGrid3}>
            {F("Point 1", "kp1", { ph: "e.g. Break posture first" })}
            {F("Point 2", "kp2", { ph: "e.g. Control the sleeve" })}
            {F("Point 3", "kp3", { ph: "e.g. Hip angle matters" })}
          </div>
          {formErr && <div style={S.errBox}>{formErr}</div>}
          <button style={{ ...S.ctaPrimary, marginTop: 22 }} onClick={handleFormImport}>Add to Library →</button>
        </div>
      )}

      {/* ── JSON MODE ── */}
      {mode === "json" && (
        <div style={S.addCard}>
          <div style={{ marginBottom: 14 }}>
            <p style={{ ...S.addLabel, textTransform: "none", letterSpacing: 0, color: "#888", fontSize: 13, margin: "0 0 6px" }}>
              Paste a JSON array. Each object needs at minimum{" "}
              <code style={S.code}>name</code>, <code style={S.code}>category</code>, <code style={S.code}>description</code>.
            </p>
            <p style={{ ...S.addLabel, textTransform: "none", letterSpacing: 0, color: "#555", fontSize: 11, margin: 0 }}>
              Categories: {CATS.slice(1).join(" · ")} &nbsp;|&nbsp; Difficulty: {DIFFS.slice(1).join(" · ")}
            </p>
          </div>
          <textarea
            value={jsonText}
            onChange={e => { setJson(e.target.value); setErr(""); }}
            style={S.jsonArea}
            spellCheck={false}
          />
          {jsonErr && <div style={S.errBox}>{jsonErr}</div>}
          <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
            <button style={S.ctaPrimary}   onClick={handleJsonImport}>Import JSON →</button>
            <button style={S.ctaSecondary} onClick={() => { setJson(JSON_TEMPLATE); setErr(""); }}>Reset Template</button>
          </div>

          <div style={{ ...S.addDivider, margin: "28px 0 18px" }} />
          <div style={S.addLabel}>Full Field Reference</div>
          <pre style={S.schemaBox}>{`{
  "name":        string           ← required
  "category":    "Guards" | "Submissions" | "Transitions"
                 "Takedowns" | "Dark BJJ"   ← required
  "description": string           ← required
  "difficulty":  "Beginner" | "Intermediate" | "Advanced"
                                  ← default: "Beginner"
  "image":       string (URL)     ← optional
  "youtube":     string (URL)     ← optional
  "keyPoints":   string[]         ← optional, ≤ 3 items
}`}</pre>
        </div>
      )}
    </div>
  );
}

// ─── PASSWORD GATE ────────────────────────────────────────────────────────────
function PasswordGate({ onUnlock, onCancel }) {
  const [pw, setPw]       = useState("");
  const [err, setErr]     = useState("");
  const [shake, setShake] = useState(false);

  const attempt = () => {
    if (pw === ADMIN_PASSWORD) {
      onUnlock();
    } else {
      setErr("Incorrect password.");
      setPw("");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") attempt();
    if (e.key === "Escape") onCancel();
  };

  return (
    <div style={S.overlay} onClick={onCancel}>
      <div
        style={{ ...S.gateBox, ...(shake ? S.gateShake : {}) }}
        onClick={e => e.stopPropagation()}
      >
        <div style={S.gateLock}>🔒</div>
        <h3 style={S.gateTitle}>Admin Access</h3>
        <p style={S.gateSub}>Enter the admin password to manage techniques.</p>
        <input
          type="password"
          value={pw}
          onChange={e => { setPw(e.target.value); setErr(""); }}
          onKeyDown={handleKey}
          placeholder="Password"
          autoFocus
          style={{ ...S.addInput, marginBottom: 6, fontSize: 14, letterSpacing: "0.1em" }}
        />
        {err && <div style={{ ...S.errBox, marginBottom: 10 }}>{err}</div>}
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button style={S.ctaPrimary}   onClick={attempt}>Unlock →</button>
          <button style={S.ctaSecondary} onClick={onCancel}>Cancel</button>
        </div>
        <p style={S.gateHint}>
          Hint: the default password is <code style={S.code}>osss2024</code>.
          Change <code style={S.code}>ADMIN_PASSWORD</code> in the source before deploying.
        </p>
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <div>
      <div style={S.pageHeader}>
        <h2 style={S.pageTitle}>About The Grapple Lab</h2>
      </div>
      <div style={S.aboutCard}>
        <p style={S.aboutBody}>
          The Grapple Lab is a structured BJJ knowledge base built to help practitioners of all levels explore positions, submissions, transitions, and takedowns in an organised, visual way.
        </p>
        <p style={S.aboutBody}>
          Each technique entry includes a description, coaching key points, difficulty rating, and a link to external video resources. Use the <strong style={{ color: "#ede8df" }}>+ Add</strong> nav button to extend the library with your own techniques at any time — one by one via the form, or in bulk via JSON.
        </p>
        <div style={S.addDivider} />
        <h3 style={S.aboutSub}>Categories Explained</h3>
        {CATS.slice(1).map(c => (
          <div key={c} style={S.aboutCatRow}>
            <span style={{ ...S.catDot, background: CAT_COLORS[c], flexShrink: 0, marginTop: 3 }} />
            <div>
              <strong style={{ color: CAT_COLORS[c] }}>{c}</strong>
              <span style={{ color: "#777", marginLeft: 10, fontSize: 13 }}>
                {{ Guards: "Bottom positions to control, sweep, or submit.", Submissions: "Force a tap via joint locks or chokes.", Transitions: "Movement between positions — where grappling really lives.", Takedowns: "Getting the fight to the ground on your terms.", "Dark BJJ": "High-risk techniques — study carefully, apply with control." }[c]}
              </span>
            </div>
          </div>
        ))}
        <div style={S.addDivider} />
        <p style={{ ...S.aboutBody, color: "#444", fontSize: 12 }}>
          Built with React · Images via Unsplash · Video links via YouTube
        </p>
      </div>
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ pos, onClose }) {
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <button style={S.closeBtn} onClick={onClose}>✕</button>
        <div style={S.modalImgWrap}>
          <img src={pos.image || DEFAULT_IMAGE} alt={pos.name} style={S.modalImg} />
          <div style={S.modalImgGrad} />
          <div style={S.modalImgMeta}>
            <span style={{ ...S.cardCat, color: CAT_COLORS[pos.category] || "#e85d04", fontSize: 10 }}>{pos.category}</span>
            <h2 style={S.modalTitle}>{pos.name}</h2>
            <span style={{ ...S.badge, background: DIFF_COLORS[pos.difficulty] || "#888", position: "static" }}>{pos.difficulty}</span>
          </div>
        </div>
        <div style={S.modalBody}>
          <p style={S.modalDesc}>{pos.description}</p>
          {pos.keyPoints?.length > 0 && (
            <div style={S.kpBox}>
              <div style={S.kpHead}>Key Points</div>
              {pos.keyPoints.map((kp, i) => (
                <div key={i} style={S.kpRow}>
                  <span style={{ ...S.catDot, background: CAT_COLORS[pos.category] || "#e85d04" }} />
                  {kp}
                </div>
              ))}
            </div>
          )}
          {pos.youtube && (
            <a href={pos.youtube} target="_blank" rel="noopener noreferrer" style={S.ytBtn}>▶ Watch on YouTube</a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── GRAIN ────────────────────────────────────────────────────────────────────
function Grain() {
  return <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.28,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")` }} />;
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  root: { minHeight: "100vh", background: "#0a0a0a", color: "#ede8df", fontFamily: "'Georgia','Times New Roman',serif", position: "relative" },

  // NAV
  nav: { position: "sticky", top: 0, zIndex: 50, background: "rgba(10,10,10,0.94)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1a1a1a", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 },
  navBrand: { display: "flex", alignItems: "center", gap: 9, cursor: "pointer", userSelect: "none" },
  navLogo: { fontSize: 19, color: "#e85d04" },
  navTitle: { fontSize: 15, fontWeight: 700, letterSpacing: "-0.4px" },
  navLinks: { display: "flex", gap: 2, alignItems: "center" },
  navBtn: { background: "none", border: "none", color: "#666", fontSize: 12, fontFamily: "monospace", letterSpacing: "0.04em", padding: "5px 11px", borderRadius: 4, cursor: "pointer" },
  navActive: { color: "#e85d04" },
  navAdd: { color: "#444", borderLeft: "1px solid #1e1e1e", marginLeft: 8, paddingLeft: 14 },
  navAddActive: { color: "#e85d04", borderLeft: "1px solid #1e1e1e", marginLeft: 8, paddingLeft: 14 },
  navLockBtn: { color: "#2ecc71", fontSize: 11, borderLeft: "1px solid #1e1e1e", marginLeft: 4, paddingLeft: 12 },

  // PASSWORD GATE
  gateBox: { background: "#141414", border: "1px solid #2a2a2a", borderRadius: 12, padding: "36px 32px", maxWidth: 360, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" },
  gateLock: { fontSize: 36, marginBottom: 12 },
  gateTitle: { fontSize: 20, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.4px" },
  gateSub: { fontSize: 13, color: "#666", margin: "0 0 20px", lineHeight: 1.5 },
  gateHint: { fontSize: 11, color: "#444", marginTop: 18, lineHeight: 1.6, fontFamily: "monospace" },

  main: { position: "relative", zIndex: 1, padding: "40px 32px 80px", maxWidth: 1100, margin: "0 auto" },

  // OVERVIEW
  overviewWrap: { display: "flex", flexDirection: "column", gap: 50 },
  hero: { paddingTop: 18 },
  heroTag: { fontFamily: "monospace", fontSize: 10, letterSpacing: "0.22em", color: "#555", textTransform: "uppercase", marginBottom: 12 },
  heroTitle: { fontSize: "clamp(36px, 7vw, 70px)", fontWeight: 700, lineHeight: 1.06, margin: "0 0 20px", letterSpacing: "-2px" },
  heroAccent: { color: "#e85d04", fontStyle: "italic" },
  heroBody: { maxWidth: 520, fontSize: 15, color: "#999", lineHeight: 1.85, margin: "0 0 26px" },
  heroCtas: { display: "flex", gap: 10, flexWrap: "wrap" },
  ctaPrimary: { background: "#e85d04", color: "#fff", border: "none", padding: "11px 24px", borderRadius: 4, fontSize: 12, fontFamily: "monospace", fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em" },
  ctaSecondary: { background: "none", color: "#ede8df", border: "1px solid #2a2a2a", padding: "11px 24px", borderRadius: 4, fontSize: 12, fontFamily: "monospace", cursor: "pointer", letterSpacing: "0.05em" },
  statRow: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, border: "1px solid #181818", borderRadius: 6, overflow: "hidden" },
  stat: { background: "#111", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 4 },
  statNum: { fontSize: 32, fontWeight: 700, color: "#e85d04", letterSpacing: "-1px" },
  statLabel: { fontSize: 10, color: "#555", fontFamily: "monospace", letterSpacing: "0.05em" },
  catGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: 10 },
  catCard: { background: "#111", border: "1px solid transparent", borderRadius: 6, padding: "15px 13px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 7, transition: "border-color 0.2s" },
  catDot: { display: "inline-block", width: 7, height: 7, borderRadius: "50%" },
  catName: { fontSize: 13, fontWeight: 700 },
  catCount: { fontSize: 10, color: "#555", fontFamily: "monospace" },

  // FILTER
  filterBar: { background: "#111", border: "1px solid #1a1a1a", borderRadius: 8, padding: "15px 18px", marginBottom: 22, display: "flex", flexDirection: "column", gap: 11 },
  filterGroup: { display: "flex", alignItems: "center", gap: 11, flexWrap: "wrap" },
  filterLabel: { fontFamily: "monospace", fontSize: 10, letterSpacing: "0.12em", color: "#555", textTransform: "uppercase", minWidth: 30 },
  pills: { display: "flex", gap: 5, flexWrap: "wrap" },
  pill: { background: "none", border: "1px solid #222", color: "#666", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontFamily: "monospace", cursor: "pointer", transition: "all 0.15s" },
  pillActive: { background: "rgba(232,93,4,0.07)" },
  filterCount: { fontFamily: "monospace", fontSize: 11, color: "#444", marginLeft: "auto" },

  // GRID / CARD
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(265px,1fr))", gap: 16 },
  empty: { gridColumn: "1/-1", textAlign: "center", color: "#444", padding: 60, fontFamily: "monospace" },
  card: { background: "#111", border: "1px solid #1a1a1a", borderRadius: 8, overflow: "hidden", cursor: "pointer", transition: "transform 0.2s, border-color 0.2s" },
  cardHov: { transform: "translateY(-5px)", borderColor: "#2a2a2a" },
  cardImgWrap: { position: "relative", height: 180, overflow: "hidden" },
  cardImg: { width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(25%) contrast(1.1)", display: "block" },
  cardImgOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(17,17,17,.95) 0%,transparent 55%)" },
  badge: { position: "absolute", top: 9, right: 9, fontSize: 9, fontFamily: "monospace", fontWeight: 700, padding: "3px 8px", borderRadius: 20, color: "#000" },
  cardBody: { padding: "13px 15px 17px" },
  cardCat: { fontSize: 9, fontFamily: "monospace", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 },
  cardTitle: { fontSize: 17, margin: "4px 0 7px", fontWeight: 700, letterSpacing: "-0.3px" },
  cardDesc: { fontSize: 12, color: "#777", lineHeight: 1.6, margin: "0 0 9px" },
  cardCta: { fontSize: 11, color: "#e85d04", fontFamily: "monospace" },

  // CONCEPTS
  pageHeader: { marginBottom: 30 },
  pageTitle: { fontSize: 32, fontWeight: 700, letterSpacing: "-1px", margin: "0 0 8px" },
  pageSubtitle: { color: "#666", fontSize: 14, lineHeight: 1.6, margin: 0 },
  conceptGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 13 },
  conceptCard: { background: "#111", border: "1px solid #1a1a1a", borderRadius: 8, padding: "20px" },
  conceptIcon: { fontSize: 24, marginBottom: 9 },
  conceptTitle: { fontSize: 14, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.2px" },
  conceptBody: { fontSize: 12, color: "#888", lineHeight: 1.7, margin: 0 },

  // ABOUT
  aboutCard: { background: "#111", border: "1px solid #1a1a1a", borderRadius: 8, padding: "26px 30px", maxWidth: 660 },
  aboutBody: { fontSize: 14, color: "#999", lineHeight: 1.85, margin: "0 0 13px" },
  aboutSub: { fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em", color: "#555", textTransform: "uppercase", margin: "0 0 13px", fontWeight: 400 },
  aboutCatRow: { display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, fontSize: 13 },

  // ADD TECHNIQUES
  modeTabs: { display: "flex", gap: 0, marginBottom: 18, border: "1px solid #1e1e1e", borderRadius: 6, overflow: "hidden", maxWidth: 360 },
  modeTab: { flex: 1, background: "none", border: "none", borderRight: "1px solid #1e1e1e", color: "#555", fontSize: 12, fontFamily: "monospace", padding: "9px 0", cursor: "pointer", transition: "all 0.15s" },
  modeTabActive: { background: "#161616", color: "#ede8df" },
  addCard: { background: "#111", border: "1px solid #1a1a1a", borderRadius: 8, padding: "26px 28px", maxWidth: 780 },
  addGrid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 },
  addGrid3: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 10 },
  addField: { display: "flex", flexDirection: "column", gap: 5 },
  addLabel: { fontSize: 10, fontFamily: "monospace", letterSpacing: "0.08em", color: "#666", textTransform: "uppercase" },
  addInput: { background: "#0d0d0d", border: "1px solid #252525", borderRadius: 5, color: "#ede8df", fontSize: 13, padding: "8px 10px", fontFamily: "Georgia,serif", outline: "none", width: "100%", boxSizing: "border-box" },
  addDivider: { borderTop: "1px solid #1a1a1a", margin: "22px 0" },
  errBox: { background: "rgba(214,48,49,0.09)", border: "1px solid #d63031", borderRadius: 5, color: "#d63031", fontSize: 11, fontFamily: "monospace", padding: "8px 11px", marginTop: 10 },
  jsonArea: { width: "100%", boxSizing: "border-box", background: "#0d0d0d", border: "1px solid #252525", borderRadius: 6, color: "#a8d8a8", fontFamily: "monospace", fontSize: 12, padding: "13px", lineHeight: 1.65, height: 290, resize: "vertical", outline: "none", display: "block" },
  schemaBox: { background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 6, color: "#666", fontFamily: "monospace", fontSize: 11, lineHeight: 1.75, padding: "13px 15px", margin: "10px 0 0", overflowX: "auto", whiteSpace: "pre" },
  code: { background: "#1a1a1a", color: "#4cc9f0", padding: "1px 5px", borderRadius: 3, fontSize: 11 },
  successBox: { textAlign: "center", padding: "60px 20px" },
  exportBox: { background: "#0d0d0d", border: "1px solid #252525", borderRadius: 8, padding: "16px 18px", marginTop: 22, maxWidth: 580, width: "100%", textAlign: "left" },
  exportHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  exportPre: { color: "#a8d8a8", fontFamily: "monospace", fontSize: 11, lineHeight: 1.65, margin: 0, overflowX: "auto", whiteSpace: "pre" },
  exportHint: { fontSize: 11, color: "#555", fontFamily: "monospace", marginTop: 12, marginBottom: 0, lineHeight: 1.6 },
  exportCopyBtn: { background: "#1a1a1a", border: "1px solid #333", color: "#aaa", fontSize: 11, fontFamily: "monospace", padding: "4px 12px", borderRadius: 4, cursor: "pointer" },
  exportCopiedBtn: { background: "rgba(46,204,113,0.15)", border: "1px solid #2ecc71", color: "#2ecc71", fontSize: 11, fontFamily: "monospace", padding: "4px 12px", borderRadius: 4, cursor: "pointer" },

  // MODAL
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
  modal: { background: "#141414", border: "1px solid #222", borderRadius: 12, width: "100%", maxWidth: 540, maxHeight: "92vh", overflowY: "auto", position: "relative" },
  closeBtn: { position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.5)", border: "1px solid #333", color: "#aaa", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", zIndex: 2, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center" },
  modalImgWrap: { position: "relative", height: 220, borderRadius: "12px 12px 0 0", overflow: "hidden" },
  modalImg: { width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%)" },
  modalImgGrad: { position: "absolute", inset: 0, background: "linear-gradient(to top,#141414 0%,rgba(20,20,20,.3) 60%,transparent 100%)" },
  modalImgMeta: { position: "absolute", bottom: 18, left: 22, display: "flex", flexDirection: "column", gap: 5 },
  modalTitle: { fontSize: 24, fontWeight: 700, margin: 0, letterSpacing: "-0.6px", lineHeight: 1 },
  modalBody: { padding: "18px 22px 24px" },
  modalDesc: { fontSize: 13, color: "#bbb", lineHeight: 1.8, margin: "0 0 16px" },
  kpBox: { background: "#1a1a1a", border: "1px solid #222", borderRadius: 7, padding: "11px 15px", marginBottom: 16 },
  kpHead: { fontSize: 9, fontFamily: "monospace", letterSpacing: "0.15em", color: "#555", textTransform: "uppercase", marginBottom: 9 },
  kpRow: { display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: "#ddd", marginBottom: 6 },
  ytBtn: { display: "inline-flex", alignItems: "center", gap: 7, background: "#e85d04", color: "#fff", padding: "10px 20px", borderRadius: 5, textDecoration: "none", fontSize: 12, fontWeight: 700, fontFamily: "monospace" },
};
