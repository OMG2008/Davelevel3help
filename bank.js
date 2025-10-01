
// Question bank with Units + Learning Aims (A/B/C)
export const builtIn = [
  // U1 — Aim A
  {cat:'U1: Principles of CS', aim:'A', diff:'easy', hint:'CT steps', q:'Which is NOT a step of computational thinking?', options:['Abstraction','Decomposition','Pattern recognition','Refactoring'], correct:3, exp:'Refactoring is code improvement, not a CT step.'},
  {cat:'U1: Principles of CS', aim:'A', diff:'medium', hint:'O(n log n)', q:'Which sorting algorithm has average-case O(n log n)?', options:['Bubble sort','Selection sort','Merge sort','Insertion sort'], correct:2, exp:'Merge sort runs in O(n log n) on average and worst-case.'},
  {cat:'U1: Principles of CS', aim:'B', diff:'medium', hint:'FILO', q:'A stack follows which access discipline?', options:['FIFO','FILO/LIFO','Random','Priority'], correct:1, exp:'Stacks are Last-In, First-Out.'},
  {cat:'U1: Principles of CS', aim:'B', diff:'hard', hint:'Trees', q:'Average search in a balanced BST is…', options:['O(1)','O(log n)','O(n)','O(n log n)'], correct:1, exp:'Balanced BSTs give logarithmic search.'},

  // U2 — A/B
  {cat:'U2: Computer Systems', aim:'A', diff:'easy', hint:'Binary→decimal', q:'What is 00110110₂ in decimal?', options:['52','54','118','38'], correct:1, exp:'32+16+4+2 = 54.'},
  {cat:'U2: Computer Systems', aim:'A', diff:'medium', hint:'Gates', q:'Which gate outputs 1 only when inputs differ?', options:['AND','OR','XOR','NAND'], correct:2, exp:'XOR is true when inputs are different.'},
  {cat:'U2: Computer Systems', aim:'B', diff:'medium', hint:'CPU cycle', q:'Correct order of CPU cycle?', options:['Decode→Fetch→Execute','Fetch→Decode→Execute','Execute→Fetch→Decode','Fetch→Execute→Decode'], correct:1, exp:'Fetch → Decode → Execute.'},
  {cat:'U2: Computer Systems', aim:'B', diff:'hard', hint:'Pipeline', q:'RAW hazard stands for…', options:['Write after write','Read after write','Read after read','Write after read'], correct:1, exp:'Read-after-write can stall a pipeline unless forwarded.'},

  // U3 — A
  {cat:'U3: Project Mgmt', aim:'A', diff:'easy', hint:'Triangle', q:'PM triangle balances cost, time and…', options:['Risk','Scope','People','Quality'], correct:1, exp:'Scope, time, and cost.'},
  {cat:'U3: Project Mgmt', aim:'A', diff:'medium', hint:'Critical path', q:'The longest path in a project network is the…', options:['Baseline','Slack path','Critical path','Float path'], correct:2, exp:'Determines duration; tasks have zero float.'},

  // U4 — A
  {cat:'U4: Software Dev Project', aim:'A', diff:'easy', hint:'UML', q:'Which diagram shows actor–system interactions?', options:['Class','Use-case','Sequence','ER'], correct:1, exp:'Use-cases capture user goals.'},
  {cat:'U4: Software Dev Project', aim:'A', diff:'medium', hint:'SOLID', q:'SRP means a module should have…', options:['One reason to change','Many responsibilities','No public methods','Only static methods'], correct:0, exp:'Single Responsibility Principle.'},

  // U6 — A/B/C
  {cat:'U6: Web Dev', aim:'A', diff:'easy', hint:'HTML', q:'Which tag creates a hyperlink?', options:['<link>','<a>','<href>','<nav>'], correct:1, exp:'<a> defines an anchor/hyperlink.'},
  {cat:'U6: Web Dev', aim:'B', diff:'medium', hint:'Layout', q:'CSS Grid is for…', options:['1D layout','2D layout','Only mobile','Absolute positioning'], correct:1, exp:'Grid handles rows and columns.'},
  {cat:'U6: Web Dev', aim:'C', diff:'hard', hint:'Security header', q:'Which header restricts allowed script sources?', options:['Content-Security-Policy','Accept','Keep-Alive','ETag'], correct:0, exp:'CSP mitigates XSS.'},

  // U11 — A/B
  {cat:'U11: Cyber Security', aim:'A', diff:'easy', hint:'Law', q:'Which UK law criminalises unauthorised access?', options:['GDPR','Computer Misuse Act 1990','FOI 2000','DPA 2018'], correct:1, exp:'CMA 1990.'},
  {cat:'U11: Cyber Security', aim:'B', diff:'medium', hint:'Detective', q:'Which is a detective control?', options:['Firewall rule','Security training','IDS/SIEM alerting','Disk encryption'], correct:2, exp:'Detective controls identify events.'},

  // U13 — A/B/C
  {cat:'U13: Databases', aim:'A', diff:'easy', hint:'Keys', q:'A primary key must be…', options:['Unique & not null','Unique & nullable','Not unique','Optional'], correct:0, exp:'Must uniquely identify rows.'},
  {cat:'U13: Databases', aim:'B', diff:'medium', hint:'ACID', q:'Which ACID property is all‑or‑nothing?', options:['Atomicity','Consistency','Isolation','Durability'], correct:0, exp:'Atomicity.'},
  {cat:'U13: Databases', aim:'C', diff:'hard', hint:'Indexes', q:'Which index is best for range queries?', options:['Hash','B+ tree','Bloom filter','Inverted'], correct:1, exp:'B+ trees preserve order for efficient ranges.'}

// --- EXTRA: U1 (A/B/C) ---
{cat:'U1: Principles of CS', aim:'A', diff:'easy', hint:'Design', q:'Pseudocode is mainly used to…', options:['Execute algorithms','Design algorithms language-independently','Measure Big-O precisely','Generate UML automatically'], correct:1, exp:'Pseudocode expresses intent before coding.'},
{cat:'U1: Principles of CS', aim:'A', diff:'medium', hint:'Greedy', q:'Which problem is commonly solved by a greedy approach?', options:['Knapsack (fractional)','Matrix multiplication','Longest common subsequence','Travelling salesman (optimal)'], correct:0, exp:'Fractional knapsack is optimally solved greedily.'},
{cat:'U1: Principles of CS', aim:'C', diff:'medium', hint:'Queue', q:'Which data structure is best for breadth‑first search?', options:['Stack','Queue','Priority queue','Deque'], correct:1, exp:'BFS explores level by level using a queue.'},
{cat:'U1: Principles of CS', aim:'C', diff:'hard', hint:'Graph', q:'A connected acyclic undirected graph is called a…', options:['Tree','DAG','Clique','Bipartite graph'], correct:0, exp:'Trees are connected, acyclic, undirected graphs.'},

// --- EXTRA: U2 (A/B) ---
{cat:'U2: Computer Systems', aim:'A', diff:'easy', hint:'Hex→dec', q:'0x1F in decimal equals…', options:['15','16','31','32'], correct:2, exp:'1F₁₆ = 1×16 + 15 = 31.'},
{cat:'U2: Computer Systems', aim:'A', diff:'medium', hint:'Boolean', q:'De Morgan’s law: ¬(A ∧ B) =', options:['¬A ∧ ¬B','A ∨ B','¬A ∨ ¬B','A ∧ ¬B'], correct:2, exp:'Negation of AND becomes OR of negations.'},
{cat:'U2: Computer Systems', aim:'B', diff:'medium', hint:'CPU', q:'Which register typically holds the address of the next instruction?', options:['MAR','PC','ACC','IR'], correct:1, exp:'The program counter (PC) points to the next instruction.'},
{cat:'U2: Computer Systems', aim:'B', diff:'hard', hint:'Memory', q:'Which is fastest?', options:['SSD','RAM','L2 Cache','L1 Cache'], correct:3, exp:'L1 is the fastest cache level.'},

// --- EXTRA: U3 (A/B/C) ---
{cat:'U3: Project Mgmt', aim:'B', diff:'easy', hint:'Docs', q:'Which document defines scope, objectives and constraints?', options:['PID/Project Charter','RAID log','MoSCoW list','Business case'], correct:0, exp:'The Project Initiation Document sets the foundations.'},
{cat:'U3: Project Mgmt', aim:'B', diff:'medium', hint:'Prioritise', q:'MoSCoW stands for…', options:['Must, Should, Could, Won’t','Maybe, Should, Could, Will','Must, Shall, Can, Won’t','Minimal, Standard, Custom, Wild'], correct:0, exp:'MoSCoW prioritisation.'},
{cat:'U3: Project Mgmt', aim:'C', diff:'hard', hint:'Quality', q:'Which standard focuses on quality management systems?', options:['ISO 27001','ITIL','ISO 9001','PRINCE2'], correct:2, exp:'ISO 9001 is for quality management systems.'},

// --- EXTRA: U4 (A/B/C) ---
{cat:'U4: Software Dev Project', aim:'B', diff:'easy', hint:'Process', q:'Agile favours…', options:['Comprehensive documentation','Following a plan over change','Customer collaboration','Big design up front'], correct:2, exp:'Agile values collaboration and responding to change.'},
{cat:'U4: Software Dev Project', aim:'B', diff:'medium', hint:'Diagrams', q:'A class diagram primarily shows…', options:['Runtime messages','System states','Structure and relationships','User stories'], correct:2, exp:'Classes, attributes, associations.'},
{cat:'U4: Software Dev Project', aim:'C', diff:'hard', hint:'Testing', q:'Mutation testing evaluates…', options:['Performance under load','Branch coverage only','Effectiveness of test suite','GUI responsiveness'], correct:2, exp:'Checks if tests catch small code mutations.'},

// --- EXTRA: U6 (A/B/C) ---
{cat:'U6: Web Dev', aim:'A', diff:'easy', hint:'HTTP', q:'Which status code means “Not Found”?', options:['200','301','404','500'], correct:2, exp:'404 indicates resource not found.'},
{cat:'U6: Web Dev', aim:'B', diff:'medium', hint:'Responsive', q:'The `viewport` meta tag is mainly for…', options:['SEO keywords','Mobile scaling','Caching','DNS prefetch'], correct:1, exp:'Controls layout on mobile devices.'},
{cat:'U6: Web Dev', aim:'C', diff:'hard', hint:'Security', q:'CSRF primarily exploits…', options:['Trust of a site in a user’s browser','Trust of a user in a site','Input validation flaws','Password reuse'], correct:0, exp:'CSRF tricks the browser into sending authenticated requests.'},

// --- EXTRA: U11 (A/B/C) ---
{cat:'U11: Cyber Security', aim:'C', diff:'easy', hint:'CIA', q:'In the CIA triad, “A” stands for…', options:['Authentication','Authority','Availability','Accountability'], correct:2, exp:'Confidentiality, Integrity, Availability.'},
{cat:'U11: Cyber Security', aim:'C', diff:'medium', hint:'Framework', q:'Which is a common security framework?', options:['NIST CSF','Agile','ITIL 4 DSV','UML'], correct:0, exp:'NIST Cybersecurity Framework.'},
{cat:'U11: Cyber Security', aim:'C', diff:'hard', hint:'Crypto', q:'Which provides integrity (tamper detection)?', options:['AES-CBC','HMAC','RSA (encrypt only)','Base64'], correct:1, exp:'HMAC verifies message integrity and authenticity.'},

// --- EXTRA: U13 (A/B/C) ---
{cat:'U13: Databases', aim:'A', diff:'medium', hint:'ERD', q:'A relationship with attributes is represented in ER as…', options:['Weak entity','Associative entity','Unary relation','View'], correct:1, exp:'Associative entities hold relationship attributes.'},
{cat:'U13: Databases', aim:'B', diff:'hard', hint:'Isolation', q:'Which isolation level prevents non-repeatable reads?', options:['READ UNCOMMITTED','READ COMMITTED','REPEATABLE READ','SNAPSHOT only'], correct:2, exp:'Repeatable Read blocks updates to read rows.'},
{cat:'U13: Databases', aim:'C', diff:'medium', hint:'SQL', q:'Which SQL returns rows in left table even without a match?', options:['INNER JOIN','LEFT JOIN','RIGHT JOIN','FULL JOIN'], correct:1, exp:'LEFT keeps all rows from the left table.'},

];