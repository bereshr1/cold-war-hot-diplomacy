{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf0 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 const initialState = () => (\{\
  started: false,\
  screen: "start",\
  side: null,\
  posting: null,\
  rank: null,\
  role: null,\
  name: null,\
  cycle: 0,\
  phase: "BRIEFING",\
  sceneId: null,\
  stats: \{\
    trust: 40,\
    suspicion: 25,\
    influence: 45,\
    access: 35,\
    stress: 15,\
  \},\
  contacts: [],\
  intel: [],\
  log: "Awaiting assignment.",\
\});\
\
let state = initialState();\
\
const startConfigs = \{\
  "1 LOW": \{\
    side: "American",\
    posting: "Moscow",\
    rank: "Low",\
    role: "Junior Political Officer",\
    name: "Thomas Caldwell",\
  \},\
  "1 MEDIUM": \{\
    side: "American",\
    posting: "Moscow",\
    rank: "Medium",\
    role: "Political Counselor",\
    name: "David Mercer",\
  \},\
  "1 HIGH": \{\
    side: "American",\
    posting: "Moscow",\
    rank: "High",\
    role: "Deputy Chief of Mission",\
    name: "Eleanor Price",\
  \},\
  "2 LOW": \{\
    side: "Soviet",\
    posting: "Washington",\
    rank: "Low",\
    role: "Junior Political Officer",\
    name: "Alexei Voronin",\
  \},\
  "2 MEDIUM": \{\
    side: "Soviet",\
    posting: "Washington",\
    rank: "Medium",\
    role: "Political Counselor",\
    name: "Sergei Morozov",\
  \},\
  "2 HIGH": \{\
    side: "Soviet",\
    posting: "Washington",\
    rank: "High",\
    role: "Senior Counselor",\
    name: "Nikolai Serebryakov",\
  \},\
\};\
\
const scenes = \{\
  american_moscow_intro: \{\
    title: "DIPLOMATIC CYCLE 1 // BRIEFING",\
    text: `[CABLE] Washington requests your assessment of Soviet leadership stability.\
\
[RUMOR] Western journalists speculate that Brezhnev's health may be weakening his grip on the system.\
\
[NOTE] Embassy security believes information may be leaking somewhere in the broader diplomatic ecosystem.\
\
Tonight, the Union of Soviet Writers will host a reception attended by Soviet cultural figures, journalists, and foreign diplomats.`,\
    choices: [\
      \{\
        key: "1",\
        label: "Study the cable from Washington",\
        effect: \{ influence: 2, stress: 1 \},\
        result:\
          "You review the cable closely and note the Department wants careful analysis, not dramatic speculation.",\
      \},\
      \{\
        key: "2",\
        label: "Prepare for the writers' reception",\
        effect: \{ access: 3 \},\
        result:\
          "You review the expected guest list and mark several names worth watching.",\
      \},\
      \{\
        key: "3",\
        label: "Speak with embassy security",\
        effect: \{ trust: 1, suspicion: -1 \},\
        result:\
          "Security shares little but confirms that diplomatic chatter has been moving unusually fast.",\
      \},\
      \{\
        key: "4",\
        label: "Meet a journalist contact for coffee",\
        effect: \{ trust: 2, suspicion: 1 \},\
        result:\
          "Your contact shares whispers about unease within upper Party circles but offers no proof.",\
      \},\
    ],\
  \},\
  soviet_washington_intro: \{\
    title: "DIPLOMATIC CYCLE 1 // BRIEFING",\
    text: `[CABLE] Moscow requests your early assessment of the Reagan administration's foreign policy direction.\
\
[NOTE] A handwritten line suggests congressional aides may speak more candidly than official channels.\
\
[RUMOR] A Georgetown reception tonight may draw defense analysts, journalists, and young policy staff.\
\
Your colleagues believe the Americans are still deciding how hard a line they intend to take.`,\
    choices: [\
      \{\
        key: "1",\
        label: "Study the cable from Moscow",\
        effect: \{ influence: 2 \},\
        result:\
          "You detect a familiar tone from Moscow: they want insight, but they want it to confirm their instincts.",\
      \},\
      \{\
        key: "2",\
        label: "Prepare for the Georgetown reception",\
        effect: \{ access: 3 \},\
        result:\
          "You review names, affiliations, and likely lines of conversation for the evening.",\
      \},\
      \{\
        key: "3",\
        label: "Consult a quiet security liaison",\
        effect: \{ suspicion: -1, stress: 1 \},\
        result:\
          "Your liaison warns that Americans can be socially loose and institutionally disciplined at the same time.",\
      \},\
      \{\
        key: "4",\
        label: "Call a congressional staff contact",\
        effect: \{ trust: 2, access: 1 \},\
        result:\
          "The staffer agrees to lunch later in the week and hints that the White House is still sorting priorities.",\
      \},\
    ],\
  \},\
\};\
\
function buildContacts() \{\
  if (state.side === "American") \{\
    state.contacts = [\
      \{\
        name: "Elena Morozova",\
        role: "Cultural Ministry Liaison",\
        disposition: "Polite",\
        notes: "Controls access to literary and artistic circles.",\
      \},\
      \{\
        name: "Tom Bennett",\
        role: "Western Correspondent",\
        disposition: "Friendly",\
        notes: "Hears rumors early. Motives remain unclear.",\
      \},\
      \{\
        name: "Margaret Keating",\
        role: "Embassy Security Officer",\
        disposition: "Guarded",\
        notes: "Blunt, observant, not easy to impress.",\
      \},\
    ];\
  \} else \{\
    state.contacts = [\
      \{\
        name: "Helen Mercer",\
        role: "Congressional Staffer",\
        disposition: "Warm",\
        notes: "Young, ambitious, and eager to be informed.",\
      \},\
      \{\
        name: "Paul Hennessey",\
        role: "Think Tank Fellow",\
        disposition: "Polished",\
        notes: "Likes access and long conversations over drinks.",\
      \},\
      \{\
        name: "Oleg Petrov",\
        role: "Security Liaison",\
        disposition: "Controlled",\
        notes: "Rarely says more than he intends.",\
      \},\
    ];\
  \}\
\}\
\
function buildIntel() \{\
  if (state.side === "American") \{\
    state.intel = [\
      "[CABLE] Washington requests an assessment of Soviet leadership stability.",\
      "[RUMOR] Brezhnev health concerns continue to circulate among foreign observers.",\
      "[NOTE] Embassy security suspects a leak somewhere in the diplomatic ecosystem.",\
      "[EVENT] Writers' reception tonight may provide access to candid talk.",\
    ];\
  \} else \{\
    state.intel = [\
      "[CABLE] Moscow requests an assessment of the Reagan administration's direction.",\
      "[NOTE] Congressional staff may provide more candid insights than formal channels.",\
      "[RUMOR] Georgetown reception could reveal early views on defense and policy.",\
      "[NOTE] Washington appears socially open but politically layered.",\
    ];\
  \}\
\}\
\
function startGame(config) \{\
  state = initialState();\
  state.started = true;\
  state.screen = "main";\
  state.side = config.side;\
  state.posting = config.posting;\
  state.rank = config.rank;\
  state.role = config.role;\
  state.name = config.name;\
  state.cycle = 1;\
  state.phase = "BRIEFING";\
  state.sceneId =\
    state.side === "American"\
      ? "american_moscow_intro"\
      : "soviet_washington_intro";\
\
  buildContacts();\
  buildIntel();\
\
  state.log = `$\{state.name\} assigned. $\{state.side\} diplomat posted to $\{state.posting\}.`;\
  render();\
\}\
\
function adjustStats(effect) \{\
  Object.entries(effect).forEach(([key, value]) => \{\
    state.stats[key] = Math.max(0, Math.min(100, state.stats[key] + value));\
  \});\
\}\
\
function renderBars() \{\
  const bars = document.getElementById("bars");\
  bars.innerHTML = "";\
\
  const order = [\
    ["trust", "TRUST"],\
    ["suspicion", "SUSPICION"],\
    ["influence", "INFLUENCE"],\
    ["access", "ACCESS"],\
    ["stress", "STRESS"],\
  ];\
\
  order.forEach(([key, label]) => \{\
    const value = state.stats[key];\
    const row = document.createElement("div");\
    row.className = "bar-row";\
    row.innerHTML = `\
      <div class="bar-label">$\{label\}</div>\
      <div class="bar"><div class="bar-fill" style="width:$\{value\}%"></div></div>\
      <div>$\{value\}</div>\
    `;\
    bars.appendChild(row);\
  \});\
\}\
\
function renderMeta() \{\
  const meta = document.getElementById("meta");\
\
  if (!state.started) \{\
    meta.innerHTML =\
      "<div>STATUS: NOT YET ASSIGNED</div><div>YEAR: 1981</div><div>MODE: QUICK START</div>";\
    return;\
  \}\
\
  meta.innerHTML = `\
    <div>NAME: $\{state.name\}</div>\
    <div>SIDE: $\{state.side\}</div>\
    <div>POSTING: $\{state.posting\}</div>\
    <div>RANK: $\{state.rank\}</div>\
    <div>ROLE: $\{state.role\}</div>\
    <div>CYCLE: $\{state.cycle\}</div>\
    <div>PHASE: $\{state.phase\}</div>\
  `;\
\}\
\
function renderStart() \{\
  document.getElementById("screen-start").innerHTML = `\
    <div class="content-title">QUICK START</div>\
    <div class="splash">\
      <p>The year is 1981.</p>\
      <p>The Cold War has entered a tense new chapter. Embassies have become quiet battlegrounds where conversations, rumors, reports, and receptions shape the flow of information.</p>\
      <p>Your task is not to solve a single mystery. It is to inhabit the life of a Cold War diplomat and survive \'97 or thrive \'97 within a historically grounded world of pressure, ambiguity, and political consequence.</p>\
      <p><span class="tag">1</span> American Diplomat \'97 Moscow<br>\
      <span class="tag">2</span> Soviet Diplomat \'97 Washington</p>\
      <p>Ranks: <span class="tag">LOW</span>, <span class="tag">MEDIUM</span>, <span class="tag">HIGH</span></p>\
      <p class="muted">Example: 1 MEDIUM</p>\
    </div>\
  `;\
\}\
\
function renderMain() \{\
  const scene = scenes[state.sceneId];\
\
  const choicesHtml = scene.choices\
    .map(\
      (choice) => `\
      <div class="choice" data-choice="$\{choice.key\}">\
        $\{choice.key\}) $\{choice.label\}\
      </div>\
    `\
    )\
    .join("");\
\
  document.getElementById("screen-main").innerHTML = `\
    <div class="content-title">$\{scene.title\}</div>\
    <div class="scene-text">$\{scene.text\}</div>\
    <div class="choices">$\{choicesHtml\}</div>\
  `;\
\
  document.querySelectorAll("[data-choice]").forEach((el) => \{\
    el.addEventListener("click", () => runCommand(el.dataset.choice));\
  \});\
\}\
\
function renderContacts() \{\
  document.getElementById("screen-contacts").innerHTML = `\
    <div class="content-title">CONTACTS</div>\
    <div class="list">\
      $\{state.contacts\
        .map(\
          (c, i) => `\
        <div class="list-item">\
          <div><span class="tag">$\{i + 1\}.</span> $\{c.name\} \'97 $\{c.role\}</div>\
          <div class="muted">Disposition: $\{c.disposition\}</div>\
          <div>$\{c.notes\}</div>\
        </div>\
      `\
        )\
        .join("")\}\
    </div>\
  `;\
\}\
\
function renderIntel() \{\
  document.getElementById("screen-intel").innerHTML = `\
    <div class="content-title">INTELLIGENCE FRAGMENTS</div>\
    <div class="list">\
      $\{state.intel\
        .map(\
          (item, i) => `\
        <div class="list-item"><span class="tag">[$\{i + 1\}]</span> $\{item\}</div>\
      `\
        )\
        .join("")\}\
    </div>\
  `;\
\}\
\
function renderStatusScreen() \{\
  const condition =\
    state.stats.stress < 30\
      ? "Stable"\
      : state.stats.stress < 60\
      ? "Strained"\
      : "Compromised";\
\
  const pngRisk = state.stats.suspicion > 60 ? "Elevated" : "Moderate";\
\
  document.getElementById("screen-status").innerHTML = `\
    <div class="content-title">STATUS</div>\
    <div class="scene-text">Current condition: $\{condition\}\
PNG risk: $\{pngRisk\}\
Current objective: Build useful insight without drawing the wrong kind of attention.</div>\
  `;\
\}\
\
function renderHelp() \{\
  document.getElementById("screen-help").innerHTML = `\
    <div class="content-title">HELP</div>\
    <div class="scene-text">Use numbered commands to choose actions in the current scene.\
\
Reference commands:\
CONTACT \'97 open contact list\
INTEL \'97 open intelligence fragments\
STATUS \'97 open diplomatic condition screen\
BACK \'97 return to the main scene\
RESET \'97 restart the prototype\
\
Quick start commands:\
1 LOW\
1 MEDIUM\
1 HIGH\
2 LOW\
2 MEDIUM\
2 HIGH</div>\
  `;\
\}\
\
function setScreen(name) \{\
  state.screen = name;\
  document.querySelectorAll(".screen").forEach((el) => el.classList.add("hidden"));\
  document.getElementById(`screen-$\{name\}`).classList.remove("hidden");\
\}\
\
function resolveChoice(choiceKey) \{\
  const scene = scenes[state.sceneId];\
  const choice = scene.choices.find((c) => c.key === choiceKey);\
\
  if (!choice) \{\
    state.log = "Unknown action for current scene.";\
    return;\
  \}\
\
  adjustStats(choice.effect);\
  state.phase = "ENGAGEMENT";\
  state.log = choice.result;\
  state.intel.push(`[NOTE] $\{choice.result\}`);\
\}\
\
function runCommand(rawInput) \{\
  const input = rawInput.trim().toUpperCase();\
\
  if (!input) return;\
\
  if (startConfigs[input]) \{\
    startGame(startConfigs[input]);\
    return;\
  \}\
\
  if (input === "START") \{\
    setScreen("start");\
    state.log = "Choose a side and rank.";\
    render();\
    return;\
  \}\
\
  if (input === "CONTACT") \{\
    if (!state.started) \{\
      state.log = "Start a game first.";\
      render();\
      return;\
    \}\
    setScreen("contacts");\
    render();\
    return;\
  \}\
\
  if (input === "INTEL") \{\
    if (!state.started) \{\
      state.log = "Start a game first.";\
      render();\
      return;\
    \}\
    setScreen("intel");\
    render();\
    return;\
  \}\
\
  if (input === "STATUS") \{\
    if (!state.started) \{\
      state.log = "Start a game first.";\
      render();\
      return;\
    \}\
    setScreen("status");\
    render();\
    return;\
  \}\
\
  if (input === "HELP") \{\
    setScreen("help");\
    render();\
    return;\
  \}\
\
  if (input === "BACK") \{\
    setScreen(state.started ? "main" : "start");\
    render();\
    return;\
  \}\
\
  if (input === "RESET") \{\
    state = initialState();\
    render();\
    return;\
  \}\
\
  if (state.started && ["1", "2", "3", "4"].includes(input) && state.screen === "main") \{\
    resolveChoice(input);\
    render();\
    return;\
  \}\
\
  state.log = "Command not recognized.";\
  render();\
\}\
\
document.getElementById("run-command").addEventListener("click", () => \{\
  const input = document.getElementById("command-input");\
  runCommand(input.value);\
  input.value = "";\
  input.focus();\
\});\
\
document.getElementById("command-input").addEventListener("keydown", (e) => \{\
  if (e.key === "Enter") \{\
    document.getElementById("run-command").click();\
  \}\
\});\
\
function render() \{\
  renderMeta();\
  renderBars();\
  renderStart();\
  renderHelp();\
\
  if (state.started) \{\
    renderMain();\
    renderContacts();\
    renderIntel();\
    renderStatusScreen();\
  \}\
\
  setScreen(state.screen);\
  document.getElementById("log").textContent = state.log;\
\}\
\
render();\
document.getElementById("command-input").focus();}