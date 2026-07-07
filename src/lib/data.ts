/**
 * Single source of truth for all portfolio content.
 * Update copy, links and metrics here — components only render this data.
 */

export const site = {
  name: "Gaurav Nitesh Gandhi",
  shortName: "Gaurav Gandhi",
  role: "Software Engineer",
  email: "gandhigaurav1145@gmail.com",
  phone: "+91 9346663611",
  location: "India",
  availability: "Open to internships, full-time roles & freelance work",
  // TODO: confirm the primary GitHub username and LinkedIn URL
  github: "https://github.com/gauravgandhi",
  github2: "https://github.com/gaurav3611",
  linkedin: "https://www.linkedin.com/in/gauravgandhi",
  resumeUrl: "/resume.pdf",
  url: "https://gauravgandhi.dev",
};

export const hero = {
  eyebrow: "Software Engineer · M.Tech CS @ VIT",
  headline: ["Software that holds up", "in the real world."],
  sub: "I build full-stack products, distributed backends and IoT systems — from ESP32 firmware streaming sensor data over BLE, to Spring Boot services coordinated by ZooKeeper, to the React interfaces that make all of it feel effortless.",
  roles: [
    "Frontend Engineer",
    "Full Stack Developer",
    "React Specialist",
    "Distributed Systems Enthusiast",
    "IoT Developer",
    "System Designer",
  ],
  stats: [
    { value: 5, suffix: "", label: "Systems designed & shipped" },
    { value: 25, suffix: "+", label: "Technologies in production use" },
    { value: 3, suffix: "", label: "Domains: web, IoT, distributed" },
    { value: 100, suffix: "Hz", label: "Real-time sensor streaming" },
  ],
};

export const about = {
  intro:
    "I'm Gaurav — an engineer who likes the messy parts of software: the sensor that reports garbage twice a second, the cache that goes stale at the worst moment, the UI that has to stay honest while the network isn't.",
  story: [
    "My path into engineering started with hardware, not code. I wanted to know why things worked — so I pulled them apart. The first time I flashed a microcontroller and watched a sensor value show up on a screen I built, the loop closed: software is how you make the physical world programmable. I've been chasing that feeling since.",
    "That curiosity pushed me across the stack in both directions. Downward — into firmware, BLE protocols, and distributed storage, where I learned that reliability is designed, not hoped for. Upward — into React, motion and interface craft, where I learned that performance and polish are what make people trust a system they can't see.",
    "Now, as an M.Tech Computer Science student at VIT, I spend my time building production-grade projects end to end: defining the problem, designing the architecture, writing the code, measuring the result. Each project in this portfolio exists because I wanted to understand a system deeply enough to build it myself.",
  ],
  philosophy: [
    {
      title: "Simple survives",
      body: "The clever solution impresses in a demo; the simple one survives in production. I optimize for the second.",
    },
    {
      title: "Measure, don't guess",
      body: "Latency budgets, sampling rates, cache hit ratios — decisions are cheaper when they're backed by numbers.",
    },
    {
      title: "Own the whole stack",
      body: "Firmware to database to pixels. Knowing every layer means no part of a system is a black box to me.",
    },
    {
      title: "Ship, then sharpen",
      body: "A working system teaches more than a perfect plan. I get to real users fast, then iterate on evidence.",
    },
  ],
};

export const journey = [
  {
    year: "2024",
    title: "First lines of code",
    body: "Started later than most — and moved faster for it. C and the terminal first: pointers, memory, and how a program actually reaches the metal.",
  },
  {
    year: "Late 2024",
    title: "The web clicks",
    body: "JavaScript, then React, within months. Interfaces turned out to be systems too — state, data flow, and rendering budgets all the way down.",
  },
  {
    year: "2025",
    title: "Hardware meets software",
    body: "First ESP32 builds — and the gas & fire monitoring system, shipped and running 24/7 in a real kitchen. My first system where failure had consequences.",
  },
  {
    year: "Late 2025",
    title: "Trust as an engineering problem",
    body: "The cancer EHR on IPFS and the Automate Hub workflow engine — decentralized storage, role-based access, idempotent retries. Backend instincts, earned fast.",
  },
  {
    year: "2026",
    title: "The systems year",
    body: "Started the M.Tech at VIT, interned as an SDE at fintech company Finfactor, and built the distributed e-commerce platform plus the cricket swing analyzer — firmware to shaders.",
  },
  {
    year: "2028",
    title: "M.Tech, complete",
    body: "Expected graduation from VIT — with a portfolio of systems, not just coursework, to show for it.",
  },
];

export const skillGroups = [
  {
    title: "Languages",
    icon: "Code2",
    skills: ["Java", "Python", "JavaScript", "TypeScript", "Kotlin", "C", "SQL"],
  },
  {
    title: "Frontend",
    icon: "LayoutDashboard",
    skills: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS", "Three.js", "Framer Motion"],
  },
  {
    title: "Backend",
    icon: "Server",
    skills: ["Node.js", "Express", "Spring Boot", "Hibernate", "Flask", "REST", "SOAP", "JWT Auth"],
  },
  {
    title: "Databases",
    icon: "Database",
    skills: ["MongoDB", "MySQL", "Firebase", "Redis-style caching", "Schema design"],
  },
  {
    title: "Cloud & Deployment",
    icon: "Cloud",
    skills: ["Firebase", "Vercel", "CI-ready builds", "Blynk Cloud", "Serverless functions"],
  },
  {
    title: "IoT & Embedded",
    icon: "Cpu",
    skills: ["ESP32", "BLE / GATT", "Web Bluetooth", "MPU6050 IMU", "Sensor fusion", "MQTT"],
  },
  {
    title: "Machine Learning",
    icon: "BrainCircuit",
    skills: ["TensorFlow", "Keras", "Model training", "Data preprocessing"],
  },
  {
    title: "Big Data & Distributed",
    icon: "Network",
    skills: ["Apache Hadoop", "ZooKeeper", "Apache Ignite", "HDFS", "Fault tolerance"],
  },
  {
    title: "Visualization",
    icon: "ChartSpline",
    skills: ["Chart.js", "Power BI", "Three.js scenes", "Real-time dashboards"],
  },
  {
    title: "Tools & Core CS",
    icon: "Wrench",
    skills: ["Git", "GitHub", "Android Studio", "DSA", "OS", "DBMS", "Networks", "System Design"],
  },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  flagship?: boolean;
  year: string;
  stack: string[];
  gradient: string; // tailwind gradient classes for the cover
  cover: "swing" | "distributed" | "health" | "iot" | "automation";
  metrics: { value: string; label: string }[];
  problem: string;
  goal: string;
  features: string[];
  process: string[];
  results: string[];
  architecture: string[];
  flow: string[]; // nodes of the architecture diagram, in order
  challenges: { title: string; body: string }[];
  lessons: string[];
  impact: string;
  future?: string[];
};

export const projects: Project[] = [
  {
    id: "cricket-swing-analyzer",
    index: "01",
    title: "IoT Cricket Swing Analyzer",
    tagline:
      "A wearable sensor that turns a cricket bat swing into live 3D telemetry in the browser — no app install, no cables.",
    flagship: true,
    year: "2026",
    stack: [
      "ESP32",
      "MPU6050",
      "BLE / GATT",
      "Web Bluetooth",
      "Three.js",
      "React",
      "Flask",
      "Firebase",
    ],
    gradient: "from-primary via-secondary to-accent",
    cover: "swing",
    metrics: [
      { value: "100Hz", label: "IMU sampling rate" },
      { value: "<40ms", label: "Sensor-to-screen latency" },
      { value: "60fps", label: "3D render, mid-range laptops" },
    ],
    problem:
      "Cricket coaching relies on the naked eye. Professional swing-analysis rigs cost lakhs and live in labs; a club player gets feedback like 'swing straighter' with no data behind it. I wanted lab-grade swing telemetry from hardware that costs less than a match ticket — and a zero-install experience, because a coach on a field will never download an SDK.",
    goal:
      "Lab-grade swing telemetry for under \u20b91,500 — connect from a browser tab and see your swing in 3D within seconds, no installs, no cables.",
    features: [
      "Live 3D bat replica driven by real IMU orientation",
      "Swing-path ribbon with bat speed & swing-plane metrics",
      "One-tap BLE pairing straight from the browser",
      "Session history with replay, persisted in Firebase",
      "100Hz end-to-end pipeline at <40ms latency",
    ],
    process: [
      "Prototyped sensor fusion on a breadboard with serial plots",
      "Designed the binary BLE frame layout & negotiated throughput",
      "Built the Three.js visualization against recorded sessions",
      "Integrated the live pipeline, then Flask + Firebase persistence",
    ],
    results: [
      "100Hz sustained streaming with no visible frame drops",
      "<40ms sensor-to-screen latency on mid-range laptops",
      "A complete swing lab for less than the price of a match ticket",
    ],
    architecture: [
      "An ESP32 with an MPU6050 IMU mounts on the bat handle. Firmware samples accelerometer and gyroscope at 100Hz, runs a complementary filter on-device to fuse orientation, and packs each reading into a compact binary frame.",
      "Frames stream over a custom BLE GATT characteristic using notifications. The browser connects directly through the Web Bluetooth API — no native app — parses the binary layout with DataView, and pushes quaternions into a ring buffer.",
      "A React + Three.js front end renders the bat as a 3D model driven by live orientation, traces the swing path as a ribbon, and computes bat speed, swing plane and impact timing from the buffered stream.",
      "Completed sessions post to a Flask API that validates and enriches the data (peak speed, swing arc, consistency score) and persists to Firebase, so players can replay any swing and track progress across sessions.",
    ],
    flow: ["MPU6050 IMU", "ESP32 firmware", "BLE GATT notify", "Web Bluetooth", "Ring buffer", "Three.js scene", "Flask API", "Firebase"],
    challenges: [
      {
        title: "BLE throughput vs. packet loss",
        body: "Naive one-reading-per-notification flooded the connection and dropped frames. I batched 5 readings per 20-byte-aligned packet and negotiated a shorter connection interval — throughput held at 100Hz with zero visible stutter.",
      },
      {
        title: "Orientation drift",
        body: "Raw gyro integration drifted within seconds. A complementary filter running on the ESP32 (gyro for fast motion, accelerometer for gravity reference) kept the virtual bat aligned with the real one through full swings.",
      },
      {
        title: "Rendering under pressure",
        body: "Recomputing the swing ribbon every frame tanked the frame rate. Preallocated buffer geometry and in-place attribute updates got the scene back to a stable 60fps.",
      },
    ],
    lessons: [
      "Binary protocol design: layout, alignment and versioning of sensor frames matter as much as the transport.",
      "The browser is a serious real-time platform — Web Bluetooth plus WebGL replaces an entire native app.",
      "Filtering belongs as close to the sensor as possible; shipping raw noise downstream just moves the problem.",
    ],
    impact:
      "A complete swing lab for under ₹1,500 in parts: connect from a browser tab, swing, and watch your bat move in 3D with speed and swing-plane metrics in real time. It's the project that taught me end-to-end system ownership — from soldering to shaders.",
    future: [
      "Impact detection via high-g accelerometer events to isolate ball contact",
      "ML model over Firebase session data to classify shot types",
      "Multi-sensor sync for full body + bat kinematics",
    ],
  },
  {
    id: "distributed-ecommerce",
    index: "02",
    title: "Distributed E-commerce Platform",
    tagline:
      "A fault-tolerant commerce backend that keeps serving when nodes don't — Spring Boot, Hadoop, ZooKeeper and Ignite.",
    year: "2026",
    stack: [
      "Spring Boot",
      "React",
      "Apache Hadoop",
      "ZooKeeper",
      "Apache Ignite",
      "MySQL",
      "JWT",
    ],
    gradient: "from-secondary to-primary",
    cover: "distributed",
    metrics: [
      { value: "~85%", label: "Catalog cache hit ratio" },
      { value: "3×", label: "Replication factor on HDFS" },
      { value: "0", label: "Single points of failure in the data path" },
    ],
    problem:
      "Most student e-commerce builds are a monolith with a single database — one crash and the store is gone. I wanted to build commerce the way it actually runs at scale: services that fail independently, storage that survives a dead node, and reads that don't hammer the database on every request.",
    goal:
      "Build commerce infrastructure that survives real failures — dead nodes, cache races, duplicate traffic — with no single point of failure in the data path.",
    features: [
      "Domain-split Spring Boot services behind one gateway",
      "ZooKeeper service registry & leader election",
      "Ignite write-through cache for hot catalog reads",
      "HDFS-backed assets & analytics with 3\u00d7 replication",
      "Stateless JWT sessions — any node serves any user",
    ],
    process: [
      "Modeled domains and consistency boundaries before code",
      "Stood up ZooKeeper coordination and service skeletons",
      "Layered Ignite caching with per-entity versioned invalidation",
      "Chaos-tested by killing DataNodes and services mid-request",
    ],
    results: [
      "Node failure: zero data loss, requests keep serving",
      "~85% cache hit ratio on catalog reads",
      "Stale-price bugs eliminated via write-through versioning",
    ],
    architecture: [
      "Spring Boot services split by domain — catalog, cart, orders, auth — each owning its data and exposed through REST. A React storefront consumes them through a single gateway.",
      "ZooKeeper handles coordination: service registration, leader election for scheduled jobs, and shared configuration, so instances can join or die without manual intervention.",
      "Product images, order archives and clickstream logs live on HDFS with 3× replication — losing a DataNode loses no data. Batch jobs aggregate sales analytics from the same store.",
      "Apache Ignite sits in front of MySQL as a distributed cache for hot catalog reads, with write-through invalidation so product updates never serve stale prices. Auth is stateless JWT so any instance can serve any user.",
    ],
    flow: ["React storefront", "API gateway", "Spring Boot services", "ZooKeeper", "Ignite cache", "MySQL", "HDFS (3× replicas)"],
    challenges: [
      {
        title: "Cache invalidation, for real",
        body: "Price updates through the admin path initially raced with cached reads. Write-through caching with per-entity versioning closed the gap — a stale price is a correctness bug, not a performance detail.",
      },
      {
        title: "Session state in a stateless world",
        body: "Sticky sessions would have defeated the point. Moving carts into the Ignite grid keyed by user meant any service instance could pick up any request mid-session.",
      },
      {
        title: "Testing failure on purpose",
        body: "I killed DataNodes and service instances mid-request to verify the guarantees I was claiming. Watching HDFS re-replicate and ZooKeeper re-elect turned distributed-systems theory into muscle memory.",
      },
    ],
    lessons: [
      "Fault tolerance is an architecture property, not a library import — you design for the dead node up front.",
      "Consistency boundaries matter: knowing which reads may be stale (recommendations) and which never can be (prices) shapes the whole cache design.",
      "Coordination is its own concern; pushing it into ZooKeeper kept every service simpler.",
    ],
    impact:
      "The platform survives a node failure with zero data loss and keeps p95 catalog reads fast off the Ignite grid. It's the project where distributed systems stopped being a course topic and became something I can build and reason about under failure.",
  },
  {
    id: "cancer-ehr-ipfs",
    index: "03",
    title: "Cancer EHR on IPFS",
    tagline:
      "A decentralized electronic health record system where oncology patients — not hospitals — hold the keys to their data.",
    year: "2025",
    stack: ["MongoDB", "Express", "React", "Node.js", "IPFS", "JWT", "Crypto"],
    gradient: "from-[#f43f5e] to-[#fb923c]",
    cover: "health",
    metrics: [
      { value: "AES-256", label: "Client-side record encryption" },
      { value: "CID", label: "Content-addressed integrity" },
      { value: "RBAC", label: "Doctor / patient / admin roles" },
    ],
    problem:
      "Cancer treatment spans years and multiple hospitals — and records get trapped in each one's silo. Patients repeat scans they've already paid for; oncologists make decisions with partial history. Centralized EHRs also make a single database breach catastrophic. The record should follow the patient, tamper-evident, with the patient controlling access.",
    goal:
      "Give oncology patients a record that follows them — portable across hospitals, tamper-evident by construction, and shareable strictly on their terms.",
    features: [
      "Client-side AES-256 encryption before data leaves the browser",
      "IPFS content addressing — integrity checks built into storage",
      "Per-grantee key wrapping for share & revoke",
      "Separate doctor / patient / admin portals",
      "Access logging on every record view",
    ],
    process: [
      "Threat-modeled the data flows before writing code",
      "Built and tested the crypto & key-wrapping layer first",
      "Wired IPFS storage with chunked uploads and pinning",
      "Shipped RBAC portals with every route audited",
    ],
    results: [
      "Records verifiable by hash from any hospital",
      "Sharing revocable without touching stored ciphertext",
      "Large scans stay responsive via chunked streaming",
    ],
    architecture: [
      "A MERN application fronts the system: React portals for patients and doctors, Express/Node APIs, MongoDB for accounts, permissions and record metadata.",
      "Medical files never touch the server unencrypted. Records are AES-encrypted client-side, then pushed to IPFS; only the content hash (CID) and encrypted key material are stored in MongoDB.",
      "Because IPFS addresses content by hash, any tampering changes the CID — integrity verification is built into the storage layer itself rather than bolted on.",
      "JWT sessions with role-based access control gate every route: patients grant and revoke doctor access per record, doctors see only what's shared with them, and every access is logged.",
    ],
    flow: ["Patient portal", "AES-256 encrypt", "IPFS (CID)", "MongoDB metadata", "RBAC / JWT", "Doctor portal"],
    challenges: [
      {
        title: "Key management without a custodian",
        body: "Encrypting on the client raises the question of who holds keys. Wrapping record keys per-grantee lets a patient share with a specific doctor without ever exposing the master key to the server.",
      },
      {
        title: "IPFS latency for large scans",
        body: "Multi-hundred-MB imaging files retrieved slowly through public gateways. Chunked uploads, a pinning service and metadata-first rendering kept the portal responsive while payloads streamed.",
      },
      {
        title: "Designing for revocation",
        body: "Immutable storage can't 'unshare' — so access control had to live in the key layer, not the storage layer. Revocation invalidates the wrapped key, leaving the ciphertext harmless.",
      },
    ],
    lessons: [
      "Decentralized storage changes where security lives — encryption and key policy become the product.",
      "Healthcare UX is trust UX: every screen has to make it obvious who can see what, and why.",
      "Content addressing is a gift: integrity checks you'd normally build, you get for free.",
    ],
    impact:
      "A working model of patient-owned oncology records: portable across hospitals, verifiable by hash, shareable and revocable by the patient. Built end to end — cryptography, storage, APIs and both portals.",
  },
  {
    id: "gas-fire-monitoring",
    index: "04",
    title: "Gas & Fire Monitoring System",
    tagline:
      "An always-on IoT safety net that detects gas leaks and fire in seconds — and alerts before the smoke does.",
    year: "2025",
    stack: ["ESP32", "MQ-2", "Flame sensor", "DHT11", "Blynk", "C/C++"],
    gradient: "from-warning to-[#ef4444]",
    cover: "iot",
    metrics: [
      { value: "<3s", label: "Leak-to-alert latency" },
      { value: "24/7", label: "Months of continuous uptime" },
      { value: "2-tier", label: "Local + cloud alerting" },
    ],
    problem:
      "LPG leaks and kitchen fires kill precisely because detection is slow and alerts don't travel — a beeping unit in an empty house warns no one. Commercial systems with remote alerting are priced for industry, not homes. I wanted detection measured in seconds and alerts that reach a phone anywhere.",
    goal:
      "Cut leak-to-alert time to seconds with hardware a household can afford — and a safety path that keeps working when the internet doesn't.",
    features: [
      "MQ-2 + flame + DHT11 sensor fusion on an ESP32",
      "Two-tier alerting: instant local buzzer/relay, cloud push via Blynk",
      "Remote threshold tuning without reflashing firmware",
      "Rolling-baseline calibration against sensor drift",
      "Wi-Fi drop resilience with reconnection backoff",
    ],
    process: [
      "Characterized sensor drift and burn-in on the bench",
      "Built threshold logic with moving-average smoothing",
      "Split the safety path (local) from the notification path (cloud)",
      "Ran it in a real kitchen and tuned false positives to zero",
    ],
    results: [
      "<3s leak-to-alert in every test run",
      "Months of continuous 24/7 operation",
      "Zero false alarms after cross-sensor gating",
    ],
    architecture: [
      "An ESP32 polls an MQ-2 gas sensor, an IR flame sensor and a DHT11 temperature/humidity sensor on a tight loop, with calibrated thresholds and moving-average smoothing to reject transient spikes.",
      "Alerting is two-tier by design: a local buzzer and relay cutoff fire instantly with no network dependency, while the Blynk cloud pushes notifications to phones over Wi-Fi.",
      "The Blynk dashboard exposes live readings, historical charts and remote threshold tuning, so sensitivity can be adjusted without reflashing firmware.",
      "The firmware handles Wi-Fi drops with reconnection backoff and keeps local protection active offline — the safety path never depends on the cloud.",
    ],
    flow: ["MQ-2 / Flame / DHT11", "ESP32 loop", "Threshold logic", "Local buzzer + relay", "Blynk Cloud", "Phone alerts"],
    challenges: [
      {
        title: "Sensors that lie",
        body: "The MQ-2 drifts with humidity and needs a burn-in period. Warm-up gating plus a rolling baseline turned a noisy analog signal into a trustworthy one — my first real lesson in never trusting raw sensor data.",
      },
      {
        title: "False alarms erode trust",
        body: "A steamy kitchen shouldn't page your phone. Cross-checking gas readings against temperature and requiring sustained threshold breaches cut false positives to effectively zero without slowing true detection.",
      },
      {
        title: "Designing for offline",
        body: "The first version alerted only via cloud — useless in a power-cut-prone network. Splitting the safety path (local, instant) from the notification path (cloud, best-effort) fixed the design, not just the bug.",
      },
    ],
    lessons: [
      "Safety systems are designed around their failure modes, not their happy path.",
      "Calibration and signal conditioning are half the work in any sensor project.",
      "Latency budgets are user experience: three seconds feels instant; thirty is a disaster.",
    ],
    impact:
      "Ran continuously for months in a real kitchen, catching test leaks in under three seconds every time. My first system with real-world stakes — and the project that set my bar for reliability.",
  },
  {
    id: "automate-hub",
    index: "05",
    title: "Automate Hub",
    tagline:
      "A self-hosted automation platform that chains triggers to actions — webhooks in, workflows out, retries built in.",
    year: "2025",
    stack: ["Node.js", "Express", "React", "MongoDB", "REST", "Webhooks"],
    gradient: "from-[#14b8a6] to-accent",
    cover: "automation",
    metrics: [
      { value: "idempotent", label: "Safe retries by design" },
      { value: "3", label: "Trigger types: webhook, cron, manual" },
      { value: "full", label: "Run history with per-step logs" },
    ],
    problem:
      "Small teams stitch tools together by hand — copy this form response there, ping that channel, update the sheet. SaaS automation gets expensive fast and hides your data in someone else's cloud. I wanted a self-hosted hub where a workflow is data: define a trigger, chain actions, and let the engine handle execution, retries and logging.",
    goal:
      "Make automation trustworthy enough to leave on: workflows as data, retries that never double-fire, and failures you can actually debug.",
    features: [
      "Webhook, cron and manual triggers",
      "Idempotent step contracts with deduplication keys",
      "Exponential-backoff retries per step",
      "Full run timelines with per-step input/output logs",
      "One-click replay from the failed step",
    ],
    process: [
      "Designed the workflow / run / step schema first",
      "Built the execution engine around at-least-once delivery",
      "Added observability: run timelines and step-level logs",
      "Hardened against duplicate webhooks and mid-step failures",
    ],
    results: [
      "Duplicate webhooks never double-post — verified by test",
      "Failed runs debuggable from the dashboard alone",
      "Run history stays fast via summarized documents",
    ],
    architecture: [
      "An Express/Node core exposes a REST API and a webhook ingress; workflows, runs and credentials live in MongoDB with a schema designed for querying run history efficiently.",
      "The execution engine treats each workflow as a directed chain of steps. Every run gets an ID; every step records input, output, duration and status — so a failed run is a debuggable artifact, not a mystery.",
      "Failed steps retry with exponential backoff, and each step is idempotent by contract (deduplication keys on side effects), so a retry never double-posts or double-writes.",
      "A React dashboard handles the human side: building workflows, inspecting run timelines, and replaying failed runs after fixing the cause.",
    ],
    flow: ["Webhook / Cron trigger", "Ingress + validation", "Execution engine", "Step chain", "Retry + backoff", "MongoDB run log", "React dashboard"],
    challenges: [
      {
        title: "Exactly-once is a lie",
        body: "Webhooks arrive twice; networks fail mid-step. Instead of chasing exactly-once delivery, I made every action idempotent and deduplicated on delivery IDs — at-least-once plus idempotency equals correct.",
      },
      {
        title: "Run history at scale",
        body: "Logging every step verbosely bloated the collection fast. Capped detail retention plus summarized run documents kept dashboards snappy without losing the audit trail.",
      },
      {
        title: "Failure UX",
        body: "The dashboard's hardest feature was honesty: showing exactly which step failed, with what input, and offering one-click replay from that step — because automation people don't trust is automation people turn off.",
      },
    ],
    lessons: [
      "Distributed-systems thinking applies at every scale — even a single-node engine needs idempotency and backoff.",
      "Observability is a feature: run logs that explain failures are why users keep automation on.",
      "Schema design for time-series-ish data (runs, steps) decides whether your dashboard is fast or unusable.",
    ],
    impact:
      "A working automation engine that runs real workflows reliably: webhook to action in milliseconds, failures retried and logged, everything self-hosted. It sharpened the backend instincts — idempotency, retries, observability — that the distributed e-commerce platform later built on.",
  },
];

export const techStack = [
  // row 1
  ["React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express", "Java", "Spring Boot", "Hibernate", "Flask", "Python", "Kotlin", "Android", "HTML", "CSS"],
  // row 2
  ["MongoDB", "MySQL", "Firebase", "Apache Hadoop", "ZooKeeper", "Apache Ignite", "Three.js", "Chart.js", "TensorFlow", "Keras", "Power BI", "Git", "GitHub", "Vercel", "REST", "SOAP"],
];

export const experience = [
  {
    period: "2026 · 2 months",
    title: "SDE Intern",
    org: "Finfactor · Fintech",
    points: [
      "Built and shipped backend features on production fintech services — REST APIs, data validation and third-party integrations — through real code review, testing and release processes.",
      "Worked alongside senior engineers on data-heavy financial workflows, picking up production habits that now show in every project: observability, defensive input handling and safe rollouts.",
    ],
  },
  {
    period: "2025 — Present",
    title: "Graduate Engineer & Researcher",
    org: "VIT · M.Tech Computer Science",
    points: [
      "Designing and building distributed-systems projects — service coordination with ZooKeeper, distributed storage on HDFS, and cache architectures with Apache Ignite.",
      "Studying advanced systems coursework while shipping production-grade side projects that apply it the same semester.",
    ],
  },
  {
    period: "2024 — 2026",
    title: "End-to-End Project Lead",
    org: "Independent / Academic Projects",
    points: [
      "Led the full lifecycle of five substantial systems — requirements, architecture, implementation, deployment and iteration — across web, IoT and distributed domains.",
      "Owned every layer personally: firmware in C/C++, backend services in Java/Node/Python, and React front ends with real-time 3D visualization.",
    ],
  },
  {
    period: "2024 — Present",
    title: "Hackathons & Collaboration",
    org: "Team Builds",
    points: [
      "Built under 24–36 hour constraints in team hackathons — scoping ruthlessly, dividing interfaces cleanly, and integrating under deadline pressure.",
      "Regularly the bridge between hardware and web teammates: comfortable owning the protocol layer where the two worlds meet.",
    ],
  },
  {
    period: "Ongoing",
    title: "Freelance & Open Source",
    org: "Available",
    points: [
      "Taking on freelance full-stack and IoT builds — the same end-to-end ownership, applied to client problems.",
      "Preparing open-source releases of the swing-analyzer BLE protocol layer and the automation engine core.",
    ],
  },
];

export const education = [
  {
    period: "2026 — 2028 (expected)",
    degree: "Master of Technology, Computer Science",
    school: "Vellore Institute of Technology",
    detail:
      "CGPA 7.51 · Focus: distributed systems, advanced databases, machine learning. Coursework applied directly into shipped projects each semester.",
    current: true,
  },
  {
    period: "Foundation",
    degree: "Computer Science & Engineering fundamentals",
    school: "Undergraduate studies",
    detail:
      "Data structures & algorithms, operating systems, DBMS, computer networks — the core CS that every project here stands on.",
    current: false,
  },
];

export const achievements = {
  counters: [
    { value: 5, suffix: "", label: "End-to-end systems shipped" },
    { value: 8, suffix: "", label: "Hardware + software integrations" },
    { value: 1000, suffix: "+", label: "Commits across active repos" },
    { value: 2, suffix: "+", label: "Years building, non-stop" },
  ],
  cards: [
    {
      icon: "GitBranch",
      title: "GitHub Activity",
      body: "Consistent, project-driven contribution history — firmware, backends and front ends across active repositories.",
      link: true,
    },
    {
      icon: "Trophy",
      title: "Hackathon Builds",
      body: "Multiple team hackathon entries shipped under 24–36 hour constraints, owning integration and the hardware/web boundary.",
      link: false,
    },
    {
      icon: "BookOpenCheck",
      title: "Certifications",
      body: "Currently pursuing cloud and distributed-systems certifications — this space is reserved for them.",
      link: false,
    },
    {
      icon: "Rocket",
      title: "Open Source (incoming)",
      body: "Extracting the BLE streaming layer and automation engine into standalone open-source packages.",
      link: false,
    },
  ],
};
