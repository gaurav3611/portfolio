/**
 * Single source of truth for all portfolio content.
 * Only facts supplied by Gaurav live here — no invented metrics, links or results.
 * Components only render this data.
 */

// gauravgandhi.dev is the homepage set on this repo (github.com/gaurav3611/portfolio).
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gauravgandhi.dev";

export const site = {
  name: "Gaurav Nitesh Gandhi",
  shortName: "Gaurav Gandhi",
  role: "Computer Science Undergraduate · Full-Stack Developer",
  email: "gandhigaurav1145@gmail.com",
  phone: "+91 9346663611",
  phoneHref: "tel:+919346663611",
  location: "Vellore, India",
  github: "https://github.com/gaurav3611",
  linkedin: "https://linkedin.com/in/Gaurav-gandhi",
  url: siteUrl,
  description:
    "Gaurav Nitesh Gandhi — Computer Science undergraduate at VIT Vellore and full-stack developer working across Java/Spring Boot, TypeScript, distributed systems, IoT and machine learning.",
};

export const chapters = [
  { id: "cover", num: "00", label: "Cover" },
  { id: "street", num: "01", label: "Street Level" },
  { id: "underground", num: "02", label: "Underground" },
  { id: "player", num: "03", label: "Player 1" },
  { id: "missions", num: "04", label: "Missions" },
  { id: "contact", num: "05", label: "Contact" },
] as const;

export type Side = "front" | "back";

/** The front/back toggle: what people see vs. what makes it run. */
export const sides = {
  front: {
    label: "Front",
    tag: "Street level",
    line: "The front is what people touch: React, TypeScript and Three.js interfaces in the browser.",
    loadout: ["TypeScript", "JavaScript", "React.js", "HTML5", "CSS3", "Three.js", "Web Bluetooth API", "Android Development with Kotlin"],
  },
  back: {
    label: "Back",
    tag: "Underground",
    line: "The back is what keeps it running: Java, Spring Boot, databases and distributed storage.",
    loadout: ["Java", "Spring Boot", "JDBC", "Hibernate ORM", "Node.js", "Express.js", "Flask", "REST APIs", "MySQL", "MongoDB", "Firebase Firestore", "Apache Hadoop HDFS", "Apache ZooKeeper"],
  },
} as const;

export const cover = {
  chapter: "CHAPTER 00 — THE DEVELOPER",
  headline: ["I build systems.", "I turn ideas into software."],
  role: "Computer Science Undergraduate | Full-Stack Developer",
};

export const origin = {
  title: "A developer in progress",
  lines: [
    "Computer Science undergraduate at VIT.",
    "Interested in full-stack development, backend engineering, distributed systems, IoT, and machine learning.",
  ],
};

export const education = [
  {
    id: "vit",
    step: "01-A",
    school: "Vellore Institute of Technology",
    place: "Vellore, India",
    degree: "Integrated M.Tech in Computer Science",
    date: "Expected May 2028",
    score: "CGPA 7.51",
    coursework: [
      "Artificial Intelligence",
      "Server Side Programming",
      "Data Structures and Algorithms",
      "Object-Oriented Programming in Java",
      "Machine Learning",
      "Python",
      "Software Engineering",
    ],
  },
  {
    id: "pu",
    step: "01-B",
    school: "Pupil Tree PU College",
    place: "Bellary, Karnataka",
    degree: "Pre-University Course",
    date: "May 2023",
    score: "93.33%",
    coursework: [] as string[],
  },
];

export const experience = {
  chapter: "CHAPTER 02 — FIELD EXPERIENCE",
  role: "Software Developer Intern",
  company: "FinFactor",
  date: "May 2025 – June 2025",
  context: "Fintech environment",
  points: [
    "Java and Spring Boot backend development.",
    "TypeScript frontend features.",
    "Full-stack team collaboration.",
    "Debugging, software development, and application maintenance.",
  ],
  detail: [
    "Worked as a Software Developer Intern in a fintech environment.",
    "Developed backend components using Java and Spring Boot.",
    "Built and maintained frontend features using TypeScript.",
    "Collaborated with the development team to build and improve full-stack web applications.",
    "Gained practical experience in software development, debugging, and application maintenance.",
  ],
};

export type ArchNode = {
  id: string;
  label: string;
  sub?: string;
  purpose: string;
  /** Position as % of the diagram box: [x, y] for wide and tall layouts. */
  wide: [number, number];
  tall: [number, number];
};

export type Architecture = {
  nodes: ArchNode[];
  edges: [string, string, string?][];
  /** Node ids traced by the "Trace a request" demo. */
  trace: string[];
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  tech: string[];
  highlights: string[];
  goal: string;
  points: string[];
  alt: string;
  architecture: Architecture;
  flagship?: boolean;
  note?: string;
  /** Only URLs that were checked and load publicly. Omit when nothing is public. */
  links?: ProjectLink[];
  /** Separate deliverables of a multi-part build, each with its own honest status. */
  parts?: ProjectPart[];
  /** Slug of the earlier build this one rewrites. */
  evolvedFrom?: string;
};

export type ProjectPart = {
  kind: "web" | "api" | "mobile" | "hardware";
  name: string;
  stack: string[];
  does: string;
  status: string;
  url?: string;
};

export type ProjectLink = { kind: "repo" | "demo" | "download"; label: string; url: string };

export const projects: Project[] = [
  {
    slug: "iot-cricket-swing-analyzer",
    index: "03-A",
    name: "IoT Cricket Swing Analyzer",
    tagline: "End-to-end IoT motion analytics",
    tech: ["ESP32", "MPU6050", "BLE 4.2", "Web Bluetooth API", "Three.js", "Firebase", "Flask"],
    highlights: ["Motion capture at 50 Hz.", "Live browser streaming via Web Bluetooth API.", "Interactive 3D swing visualization.", "Flask backend and Firebase services."],
    goal: "Capture how a cricket bat moves during a swing and make that motion visible and storable from an ordinary browser.",
    points: [
      "Built an end-to-end IoT analytics platform using ESP32 and MPU6050 IMU sensors.",
      "Captured bat motion at 50 Hz using Bluetooth Low Energy 4.2.",
      "Integrated the Web Bluetooth API for live browser streaming.",
      "Developed an interactive 3D swing visualization using Three.js.",
      "Used Firebase Firestore for cloud storage, Firebase Authentication for user access, and Flask as the backend service.",
    ],
    alt: "Monochrome technical illustration of a cricket bat with a sensor module, directional swing arcs, and a companion architecture diagram showing ESP32, MPU6050, Bluetooth streaming, a browser-based 3D visualization, Flask, and Firebase.",
    flagship: true,
    links: [
      { kind: "demo", label: "Live demo", url: "https://cricket-six-nu.vercel.app" },
      { kind: "repo", label: "Repository", url: "https://github.com/gaurav3611/Cricket" },
    ],
    architecture: {
      nodes: [
        { id: "imu", label: "MPU6050", sub: "IMU on the bat", purpose: "The inertial sensor mounted on the bat that measures its motion.", wide: [9, 28], tall: [25, 8] },
        { id: "esp", label: "ESP32", sub: "50 Hz capture", purpose: "Reads the IMU and sends motion samples at 50 Hz.", wide: [30, 28], tall: [75, 8] },
        { id: "ble", label: "BLE 4.2", sub: "Wireless link", purpose: "Bluetooth Low Energy link carrying samples from the ESP32 to the browser.", wide: [51, 28], tall: [75, 32] },
        { id: "browser", label: "Browser", sub: "Web Bluetooth API", purpose: "Receives the live stream directly in the browser through the Web Bluetooth API.", wide: [72, 28], tall: [25, 32] },
        { id: "three", label: "Three.js view", sub: "3D swing", purpose: "Renders the swing as an interactive 3D visualization.", wide: [91, 28], tall: [25, 56] },
        { id: "flask", label: "Flask", sub: "Backend service", purpose: "The backend service used by the web app.", wide: [72, 76], tall: [75, 56] },
        { id: "firebase", label: "Firebase", sub: "Auth + Firestore", purpose: "Firebase Authentication for user access and Firestore for cloud storage.", wide: [91, 76], tall: [50, 84] },
      ],
      edges: [
        ["imu", "esp", "I2C"],
        ["esp", "ble"],
        ["ble", "browser"],
        ["browser", "three"],
        ["browser", "flask"],
        ["flask", "firebase"],
        ["browser", "firebase"],
      ],
      trace: ["imu", "esp", "ble", "browser", "three"],
    },
  },
  {
    slug: "sswingg-platform",
    index: "03-B",
    name: "SSwinGG Platform",
    tagline: "Cricket swing analytics across web, API, Android and hardware (v0.2)",
    tech: ["Angular 21", "TypeScript", "Spring Boot 4.1", "Java 21", "Flutter", "Firebase", "ESP32-C3", "BMI160", "Chart.js", "three.js"],
    highlights: [
      "Angular 21 rewrite of the swing dashboard.",
      "Spring Boot REST API rewrite of the Flask backend.",
      "Flutter Android recorder with auto-record and CSV export.",
      "ESP32-C3 + BMI160 bat sensor with a nine-stage build guide.",
    ],
    goal: "Rebuild the cricket swing analyzer as separate, tested pieces: a web app, a Java API, an Android recorder and a documented bat sensor.",
    points: [
      "Rewrote the HTML/JavaScript dashboard as an Angular 21 single-page app with standalone components and signals, Chart.js charts and the original three.js bat scene.",
      "Rewrote the Flask backend as a Spring Boot 4.1 REST API on Java 21 with the same paths, JSON fields and status codes, using the Firebase Admin SDK for ID tokens and Firestore.",
      "Built a Flutter Android app that connects to the bat over Bluetooth, records shots between Start and Stop or automatically, shows the dashboard's shot metrics and saves each shot as a CSV file.",
      "Documented the bat sensor (ESP32-C3 Super Mini, BMI160, LiPo cell, TP4056 charger) as a stage-by-stage build guide with circuit diagrams and firmware.",
      "The app's shot type is a first guess from fixed rules, not a trained classifier, until labelled recordings exist.",
    ],
    alt: "Monochrome manga panel of a cricket bat with a small sensor board, a phone showing a speed chart and a browser window, joined by Bluetooth arcs.",
    note: "Status from the repositories: the web app and API build, pass their tests and run locally but are not deployed; the sensor firmware compiles and was tested against a simulated sensor, not yet on real hardware.",
    links: [
      { kind: "repo", label: "Web app", url: "https://github.com/gaurav3611/Cric-Pro-FE" },
      { kind: "repo", label: "API", url: "https://github.com/gaurav3611/java-cricket-backend" },
      { kind: "repo", label: "Android app", url: "https://github.com/gaurav3611/mobile_app_swing" },
      { kind: "repo", label: "Hardware", url: "https://github.com/gaurav3611/Cric-Pro-Hardware" },
      { kind: "download", label: "Android APK", url: "https://github.com/gaurav3611/mobile_app_swing/releases/latest" },
    ],
    evolvedFrom: "iot-cricket-swing-analyzer",
    parts: [
      {
        kind: "web",
        name: "Web app",
        stack: ["Angular 21", "TypeScript", "Chart.js", "three.js", "Firebase Auth"],
        does: "The swing dashboard as an Angular single-page app: live charts, shot history and the 3D bat scene.",
        status: "Builds, tests pass, runs locally. Not deployed.",
        url: "https://github.com/gaurav3611/Cric-Pro-FE",
      },
      {
        kind: "api",
        name: "API",
        stack: ["Spring Boot 4.1", "Java 21", "Firebase Admin SDK"],
        does: "REST API with the same paths, JSON fields and status codes as the original Flask backend, backed by Firestore.",
        status: "Builds, tests pass, runs locally. Not deployed.",
        url: "https://github.com/gaurav3611/java-cricket-backend",
      },
      {
        kind: "mobile",
        name: "Android app",
        stack: ["Flutter", "Bluetooth LE"],
        does: "Connects to the bat, records shots manually or automatically, shows shot metrics and exports each shot as CSV.",
        status: "v0.2.0 APK published on GitHub Releases.",
        url: "https://github.com/gaurav3611/mobile_app_swing",
      },
      {
        kind: "hardware",
        name: "Bat sensor",
        stack: ["ESP32-C3", "BMI160", "LiPo + TP4056"],
        does: "The sensor on the bat, documented as a stage-by-stage build guide with circuit diagrams and firmware.",
        status: "Firmware compiles and was tested against a simulated sensor; not yet run on real hardware.",
        url: "https://github.com/gaurav3611/Cric-Pro-Hardware",
      },
    ],
    architecture: {
      nodes: [
        { id: "imu", label: "BMI160", sub: "Motion sensor", purpose: "Measures acceleration and rotation on three axes each.", wide: [9, 28], tall: [25, 8] },
        { id: "esp", label: "ESP32-C3", sub: "Bat firmware", purpose: "Reads the sensor on the bat and advertises the SSwinGG Bluetooth service.", wide: [30, 28], tall: [75, 8] },
        { id: "ble", label: "Bluetooth LE", sub: "Wireless link", purpose: "Carries live readings from the bat to the phone or the browser.", wide: [51, 28], tall: [75, 32] },
        { id: "app", label: "Flutter app", sub: "Android recorder", purpose: "Records shots, shows the shot metrics and saves every reading as a CSV file.", wide: [51, 76], tall: [25, 32] },
        { id: "web", label: "Angular app", sub: "Dashboard", purpose: "The web dashboard with charts and the three.js bat scene.", wide: [72, 28], tall: [25, 56] },
        { id: "api", label: "Spring Boot API", sub: "Java 21", purpose: "REST API with the same contract as the original Flask backend.", wide: [91, 28], tall: [75, 56] },
        { id: "fb", label: "Firebase", sub: "Auth + Firestore", purpose: "Sign-in and cloud storage, used through the Firebase Admin SDK.", wide: [91, 76], tall: [50, 84] },
      ],
      edges: [["imu", "esp", "I2C"], ["esp", "ble"], ["ble", "app"], ["ble", "web"], ["web", "api"], ["api", "fb"]],
      trace: ["imu", "esp", "ble", "web", "api", "fb"],
    },
  },
  {
    slug: "trace-edge-routing",
    index: "03-C",
    name: "TRACE",
    tagline: "Trust-constrained, category-aware routing for edge AI inference (research)",
    tech: ["Python", "NumPy", "pandas", "SciPy", "Matplotlib", "LaTeX"],
    highlights: ["Event-driven simulator of edge servers.", "Compares routing policies, from round-robin to TRACE.", "Experiment and analysis pipeline behind a paper draft."],
    goal: "Study how AI inference requests should be routed between edge servers when trust domains and request categories matter.",
    points: [
      "Built an event-driven simulator with configurable topologies, load levels and state-sync periods.",
      "Implemented and compared routing policies: local only, round-robin variants, EPARA-style capacity-proportional offloading, trust-filtered and energy-aware variants, and TRACE (a trust filter plus best-fit clearance).",
      "Wrote a resumable experiment runner (about 1,400 runs) and an analysis script that produces the paper's figures, tables and statistics.",
      "Wrote the paper draft in LaTeX, built with Tectonic.",
    ],
    alt: "Monochrome manga diagram of edge server nodes inside dashed trust boundaries, with request arrows routed between them and one sent to a cloud.",
    note: "A research prototype and paper draft. No results are claimed on this page.",
    links: [{ kind: "repo", label: "Repository", url: "https://github.com/gaurav3611/edge-cloud-ai-routing" }],
    architecture: {
      nodes: [
        { id: "topo", label: "Topology", sub: "Edge servers", purpose: "Builds a network of edge servers for each experiment.", wide: [10, 30], tall: [25, 10] },
        { id: "pol", label: "Policies", sub: "Routing rules", purpose: "The routing policies being compared, from local-only to TRACE.", wide: [10, 74], tall: [75, 10] },
        { id: "sim", label: "Simulator", sub: "Event-driven", purpose: "Runs requests through the topology under a chosen policy and load.", wide: [36, 52], tall: [50, 35] },
        { id: "exp", label: "Experiments", sub: "~1,400 runs", purpose: "Resumable batch of runs across configurations.", wide: [62, 52], tall: [50, 58] },
        { id: "ana", label: "Analysis", sub: "Figures + tables", purpose: "Turns run logs into the paper's figures, tables and statistics.", wide: [88, 30], tall: [25, 84] },
        { id: "paper", label: "Paper", sub: "LaTeX draft", purpose: "The paper draft built from the analysis output.", wide: [88, 74], tall: [75, 84] },
      ],
      edges: [["topo", "sim"], ["pol", "sim"], ["sim", "exp"], ["exp", "ana"], ["ana", "paper"]],
      trace: ["topo", "sim", "exp", "ana", "paper"],
    },
  },
  {
    slug: "minimal-launcher",
    index: "03-D",
    name: "MINIMAL",
    tagline: "A quiet, monochrome Android home screen",
    tech: ["Kotlin", "Jetpack Compose", "Android", "DataStore"],
    highlights: ["Launcher with essential apps and local search.", "Pause before distracting apps.", "Five editable focus profiles."],
    goal: "A home screen that shows what matters, helps you do one thing, and gets out of the way: no account, no network permission, no analytics.",
    points: [
      "Native Kotlin and Jetpack Compose launcher with a clock, chosen essential apps, an app list with ranked local search, and hidden apps.",
      "A countdown pause before opening apps marked as distracting.",
      "Five editable focus profiles, each with its own apps, friction, theme, clock and widgets.",
      "Built-in widgets plus hosted third-party widgets, with Retro Dark and Retro Paper themes.",
      "22 JVM unit tests and 8 instrumented Compose tests, verified on an Android 16 emulator.",
    ],
    alt: "Monochrome manga panel of a phone showing a large clock and a short text list of apps, with an hourglass pause symbol beside it.",
    note: "Verified on the Android emulator, not yet on a physical phone. Not published, so no repository link is shown.",
    architecture: {
      nodes: [
        { id: "home", label: "Home screen", sub: "Clock + essentials", purpose: "The launcher screen with the clock and chosen apps.", wide: [12, 50], tall: [50, 8] },
        { id: "pause", label: "Pause", sub: "Launch friction", purpose: "A countdown before opening apps marked as distracting.", wide: [38, 26], tall: [25, 36] },
        { id: "profiles", label: "Focus profiles", sub: "Five, editable", purpose: "Per-profile apps, friction, theme, clock and widgets.", wide: [38, 74], tall: [75, 36] },
        { id: "store", label: "DataStore", sub: "On-device only", purpose: "Keeps settings on the phone; the app has no network permission.", wide: [70, 50], tall: [50, 64] },
        { id: "apps", label: "Android apps", sub: "Launched", purpose: "The apps MINIMAL opens after any pause.", wide: [92, 50], tall: [50, 90] },
      ],
      edges: [["home", "pause"], ["home", "profiles"], ["profiles", "store"], ["pause", "apps"]],
      trace: ["home", "pause", "apps"],
    },
  },
  {
    slug: "distributed-ecommerce",
    index: "03-E",
    name: "Distributed E-Commerce Platform",
    tagline: "Microservices-ready commerce on distributed storage",
    tech: ["Spring Boot", "React", "Hadoop HDFS", "ZooKeeper", "JWT"],
    highlights: ["Distributed storage.", "Service coordination.", "JWT authentication.", "Microservices-ready architecture."],
    goal: "Build a commerce platform designed for scalability, fault tolerance, and system reliability.",
    points: [
      "Developed a distributed e-commerce platform using Spring Boot and React.",
      "Integrated Apache Hadoop HDFS for scalable distributed storage.",
      "Utilized Apache ZooKeeper for distributed coordination and service management.",
      "Implemented a microservices-ready architecture with JWT authentication.",
      "Focused on scalability, fault tolerance, and system reliability.",
    ],
    alt: "Monochrome system architecture illustration showing a React storefront connected to Spring Boot services, Hadoop HDFS storage, ZooKeeper coordination, and JWT authentication.",
    links: [{ kind: "repo", label: "Repository", url: "https://github.com/gaurav3611/DistributedEcommerce" }],
    architecture: {
      nodes: [
        { id: "store", label: "React storefront", sub: "UI", purpose: "The customer-facing storefront built in React.", wide: [10, 55], tall: [50, 8] },
        { id: "jwt", label: "JWT auth", sub: "Token check", purpose: "JSON Web Tokens authenticate requests between the storefront and services.", wide: [31, 55], tall: [50, 29] },
        { id: "svc", label: "Spring Boot services", sub: "Microservices-ready", purpose: "Backend services built with Spring Boot, structured so they can be split into microservices.", wide: [55, 55], tall: [50, 52] },
        { id: "zk", label: "ZooKeeper", sub: "Coordination", purpose: "Apache ZooKeeper coordinates and manages the service instances.", wide: [55, 14], tall: [26, 72] },
        { id: "hdfs", label: "Hadoop HDFS", sub: "Distributed storage", purpose: "Apache Hadoop HDFS provides scalable distributed storage.", wide: [86, 55], tall: [72, 90] },
      ],
      edges: [["store", "jwt"], ["jwt", "svc"], ["svc", "hdfs"], ["zk", "svc", "coord"]],
      trace: ["store", "jwt", "svc", "hdfs"],
    },
  },
  {
    slug: "ipfs-health-records",
    index: "03-F",
    name: "Decentralized Health Records",
    tagline: "IPFS-Based Cancer Electronic Health Record System",
    tech: ["MERN Stack", "IPFS"],
    highlights: ["Distributed record storage and CRUD functionality.", "Backend and database integration.", "Focus on data integrity and accessibility."],
    goal: "Store electronic health records in a decentralized way while keeping the application usable through a familiar MERN interface.",
    points: [
      "Developed a decentralized electronic health record system using the MERN stack.",
      "Integrated IPFS for distributed storage of patient records.",
      "Implemented CRUD functionality with backend and database integration.",
      "Focused on data integrity and accessibility through decentralized storage architecture.",
    ],
    alt: "Original monochrome technical illustration of a generic medical document connected to an application and a network of distributed IPFS storage nodes. No real patient data is shown.",
    note: "Illustrations use a generic document only — no real patient data. Distributed storage supports integrity and availability; it does not by itself guarantee confidentiality or regulatory compliance.",
    links: [{ kind: "repo", label: "Repository", url: "https://github.com/gaurav3611/EhrForCancerPatients" }],
    architecture: {
      nodes: [
        { id: "client", label: "React client", sub: "Record screens", purpose: "The interface for creating, viewing, updating and deleting records.", wide: [12, 50], tall: [50, 10] },
        { id: "api", label: "Express + Node", sub: "Backend API", purpose: "The backend that handles CRUD requests and coordinates the database and IPFS.", wide: [40, 50], tall: [50, 38] },
        { id: "mongo", label: "MongoDB", sub: "App database", purpose: "The application database integrated with the backend.", wide: [72, 22], tall: [25, 72] },
        { id: "ipfs", label: "IPFS network", sub: "Distributed storage", purpose: "Distributed, content-addressed storage for patient record files.", wide: [72, 78], tall: [75, 72] },
      ],
      edges: [["client", "api"], ["api", "mongo"], ["api", "ipfs", "files"]],
      trace: ["client", "api", "ipfs"],
    },
  },
  {
    slug: "automate-hub",
    index: "03-G",
    name: "Automate Hub",
    tagline: "Order Management System",
    tech: ["Java", "JDBC", "MySQL"],
    highlights: ["Backend-driven order processing, database CRUD operations, and modular business logic."],
    goal: "Process orders reliably through a backend that owns the business rules and talks to a relational database.",
    points: [
      "Developed a backend-driven order management system.",
      "Implemented database connectivity and CRUD operations for order processing.",
      "Designed modular server-side business logic to improve maintainability and scalability.",
    ],
    alt: "Monochrome technical illustration of an order-management workflow connecting a Java backend through JDBC to a MySQL database, with order-processing panels in the foreground.",
    architecture: {
      nodes: [
        { id: "ui", label: "Order panel", sub: "Create · Read · Update · Delete", purpose: "Where order operations start: each action maps to one CRUD operation on an order.", wide: [12, 50], tall: [50, 10] },
        { id: "logic", label: "Business logic", sub: "Java modules", purpose: "Modular server-side Java code that validates and processes orders, kept separate from data access for maintainability.", wide: [38, 50], tall: [50, 37] },
        { id: "jdbc", label: "JDBC", sub: "Connectivity", purpose: "The Java Database Connectivity layer that opens connections and runs SQL against the database.", wide: [63, 50], tall: [50, 63] },
        { id: "db", label: "MySQL", sub: "Orders data", purpose: "Relational storage for order records.", wide: [88, 50], tall: [50, 90] },
      ],
      edges: [["ui", "logic"], ["logic", "jdbc"], ["jdbc", "db", "SQL"]],
      trace: ["ui", "logic", "jdbc", "db"],
    },
  },
];

export const skills = [
  { id: "languages", title: "Languages", items: ["Java", "TypeScript", "JavaScript", "Python", "SQL", "Kotlin"] },
  { id: "web", title: "Web Development", items: ["HTML5", "CSS3", "React.js", "Node.js", "Express.js", "Spring Boot", "REST APIs", "JDBC", "Hibernate ORM", "Flask", "Flask-SocketIO"] },
  { id: "databases", title: "Databases", items: ["MySQL", "MongoDB", "Firebase Firestore"] },
  { id: "distributed", title: "Distributed Systems", items: ["Apache Hadoop HDFS", "Apache ZooKeeper", "Apache Ignite"] },
  { id: "iot", title: "IoT and Embedded Systems", items: ["ESP32", "MPU6050 IMU", "BLE 4.2", "Web Bluetooth API", "Blynk IoT Platform", "I2C", "UART", "SPI"] },
  { id: "ml", title: "Machine Learning", items: ["Scikit-learn", "TensorFlow", "Keras", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Regression", "Classification", "Clustering"] },
  { id: "dataviz", title: "Data Visualization", items: ["Power BI", "Google Looker Studio", "R", "ggplot2", "Plotly"] },
  { id: "mobile", title: "Mobile Development", items: ["Android Development with Kotlin", "Android Studio"] },
  { id: "tools", title: "Development Tools", items: ["Git", "GitHub", "Postman", "Vercel"] },
  { id: "core", title: "Core Computer Science", items: ["Data Structures and Algorithms", "Object-Oriented Programming", "DBMS", "Operating Systems", "Computer Networks", "Software Engineering"] },
] as const;

export type SkillId = (typeof skills)[number]["id"];

export const player = {
  status: "Integrated M.Tech at VIT Vellore · Expected May 2028",
  stats: [
    { value: String(projects.length), label: "Builds in the archive" },
    { value: "1", label: "Internship (FinFactor)" },
    { value: "7.51", label: "CGPA at VIT" },
    { value: "93.33%", label: "Pre-University Course" },
  ],
};

export type Mission = {
  id: string;
  name: string;
  brief: string;
  loadout: string[];
  /** Project slugs from the archive that used this kind of work. */
  builds: string[];
  experience?: boolean;
};

export const missions: Mission[] = [
  {
    id: "fullstack",
    name: "Full-stack web apps",
    brief: "A complete web application: interface, API and database, built by one person who can move across the stack.",
    loadout: ["React.js", "TypeScript", "Node.js", "Express.js", "Spring Boot", "MongoDB", "MySQL"],
    builds: ["ipfs-health-records", "distributed-ecommerce"],
    experience: true,
  },
  {
    id: "backend",
    name: "Backend & APIs",
    brief: "Server-side services, REST APIs and data layers with clear, modular business logic.",
    loadout: ["Java", "Spring Boot", "JDBC", "Hibernate ORM", "REST APIs", "Flask", "SQL"],
    builds: ["sswingg-platform", "automate-hub", "distributed-ecommerce"],
    experience: true,
  },
  {
    id: "iot",
    name: "IoT & embedded",
    brief: "Sensors and microcontrollers connected to the web: capture, stream, store and visualize.",
    loadout: ["ESP32", "MPU6050 IMU", "BLE 4.2", "Web Bluetooth API", "Firebase Firestore", "I2C", "UART", "SPI"],
    builds: ["iot-cricket-swing-analyzer", "sswingg-platform"],
  },
  {
    id: "mobile",
    name: "Android & mobile",
    brief: "Native Android apps in Kotlin and Jetpack Compose, and Flutter apps that talk to Bluetooth hardware.",
    loadout: ["Kotlin", "Jetpack Compose", "Android Studio", "Flutter", "Bluetooth LE"],
    builds: ["minimal-launcher", "sswingg-platform"],
  },
  {
    id: "data",
    name: "Data & machine learning",
    brief: "Exploring data, building models for regression, classification and clustering, and running simulation experiments with clear visualizations.",
    loadout: ["Python", "Pandas", "NumPy", "SciPy", "Scikit-learn", "TensorFlow", "Matplotlib", "Power BI"],
    builds: ["trace-edge-routing"],
  },
];
