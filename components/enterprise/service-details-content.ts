/**
 * Plain-language detail for every "What we offer" card on the `/services/<slug>` pages.
 *
 * Keyed by service slug; each array runs in the same order as that page's `offer.cards`
 * (`detail-pages.ts`), so a card and its detail are paired by index. Copy is written for
 * a reader who has never bought the service before: what it is, what changes for them,
 * and what they will actually see. Brand-neutral ("we"), so the file is shared by sites.
 */

export interface ServiceDetail {
  /** Two or three short sentences in everyday language. */
  readonly lead: string;
  /** "What this looks like": three concrete things the reader will see. */
  readonly points: readonly [string, string, string];
}

export const SERVICE_DETAILS: Readonly<Record<string, readonly ServiceDetail[]>> = {
  "digital-ftes": [
    {
      lead: "Think of a Digital FTE as a new team member who never gets tired of the boring parts. Each one has a single, clear job, such as replying to leads or updating reports, and it does that job the way your team does it.",
      points: [
        "One Digital FTE per role, with a clear job description",
        "Works inside the tools your team already uses",
        "Hands anything unusual to a person, with the context attached",
      ],
    },
    {
      lead: "Your customers get a fast, friendly answer at any hour, on your website, WhatsApp or the phone. The agent can answer questions, book appointments and follow up, and when a case needs a human it passes it on with the full conversation.",
      points: [
        "Instant replies on web chat, WhatsApp and phone",
        "Bookings and follow-ups handled without waiting",
        "Smooth hand-over to your team for complex cases",
      ],
    },
    {
      lead: "A lot of work is simply moving information from one place to another: copying details, chasing approvals, sending the next email. We automate those steps between the apps you already have, so work keeps moving without anyone pushing it.",
      points: [
        "Approvals and hand-offs that route themselves",
        "Campaigns and follow-ups sent on time, every time",
        "Connects the apps you already pay for",
      ],
    },
    {
      lead: "An AI is only as good as what it knows. We give every Digital FTE one trusted source for your policies and ways of working, and connect it to your live data, such as your CRM or ERP, so its answers are accurate and up to date.",
      points: [
        "Your approved policies and processes in one place",
        "Live data from the systems you run on",
        "Answers that match how your business really works",
      ],
    },
    {
      lead: "Our engineers do not build from a distance. They sit with your team, learn how the work really gets done, and shape each Digital FTE around it. After launch they stay on to tune it and add new skills as you grow.",
      points: [
        "Engineers embedded with your team from day one",
        "Built around your real workflows, not a template",
        "Ongoing tuning after go-live",
      ],
    },
    {
      lead: "Before anything goes live, we agree with you what good looks like and how it will be measured. Guardrails keep the AI inside safe limits, and sensitive actions always wait for a person to approve them.",
      points: [
        "A clear baseline and target agreed up front",
        "Regular checks that the results stay on track",
        "Human approval for anything sensitive",
      ],
    },
  ],

  "digital-transformation": [
    {
      lead: "Before changing anything, it helps to know exactly where you stand and where you want to be. We look at how your business runs today, picture how it should run, and turn the gap into a step-by-step plan you can act on.",
      points: [
        "An honest picture of how things work today",
        "A clear view of where you are heading",
        "A prioritised roadmap, broken into stages",
      ],
    },
    {
      lead: "Automating a messy process only makes the mess faster. So we first map how work flows, remove the steps that add nothing, and simplify what is left. Then we move it onto digital tools.",
      points: [
        "Every step of the process mapped with your team",
        "Wasted steps and double handling removed",
        "A simpler process, ready to digitise",
      ],
    },
    {
      lead: "Your website is often the first place people meet your business. We design and build fast, modern sites that explain what you do in plain words, look great on phones and computers, and make it easy for visitors to get in touch.",
      points: [
        "A clear, modern design that fits your brand",
        "Fast pages that work on every screen size",
        "Enquiry forms, bookings and search-friendly pages built in",
      ],
    },
    {
      lead: "We build online stores and ordering portals that make buying easy, whether your customers are shoppers or other businesses. Clear catalogues, simple checkout and smooth reordering turn visits into orders.",
      points: [
        "Storefronts for consumers and business buyers",
        "Catalogues that are easy to browse and search",
        "Checkout and reordering designed to convert",
      ],
    },
    {
      lead: "ERP and CRM systems are the backbone of a business: finance, stock, customers and sales. We set them up to fit the way you work and connect them to your other tools, so everyone works from the same numbers.",
      points: [
        "Set-up and configuration around your processes",
        "Connected to the rest of your tools",
        "One shared version of the truth",
      ],
    },
    {
      lead: "Sometimes no off-the-shelf product does what you need. When that happens, we design and build web and mobile apps made for your exact workflow, and nothing you do not need.",
      points: [
        "Web and mobile apps built around your workflow",
        "Only the features that earn their place",
        "Code and documentation you own",
      ],
    },
    {
      lead: "New systems only pay off if people use them. We train your team, write guides in plain language and stay close during the switch, so the change sticks instead of being quietly worked around.",
      points: [
        "Hands-on training for every team",
        "Plain-language guides and how-tos",
        "Support through the switch-over",
      ],
    },
  ],

  "data-analytics": [
    {
      lead: "If your data lives in scattered spreadsheets and old databases, getting a straight answer is slow. We move it onto one modern platform that is fast, reliable and ready to grow with you.",
      points: [
        "Spreadsheets and legacy databases brought together",
        "A platform that scales as your data grows",
        "Faster answers from a single source",
      ],
    },
    {
      lead: "Data engineering is the plumbing behind every good report. We build pipelines that collect data from all your sources, clean it up and combine it automatically, so your numbers are always fresh and correct.",
      points: [
        "Data pulled in automatically from every source",
        "Cleaned and checked on the way in",
        "Always up to date, with no manual copying",
      ],
    },
    {
      lead: "A good dashboard answers the question you actually have. We design reports around the decisions each team makes, so people see what matters at a glance instead of digging through tables.",
      points: [
        "Dashboards shaped around real decisions",
        "The key numbers visible at a glance",
        "Each team sees what is relevant to them",
      ],
    },
    {
      lead: "Beyond what happened, advanced analytics shows why it happened and what is likely next. We use forecasting and segmentation to uncover what is really driving your results.",
      points: [
        "Forecasts that help you plan ahead",
        "Customers and products grouped in useful ways",
        "The real drivers behind your numbers",
      ],
    },
    {
      lead: "Data you cannot trust is worse than no data. We set clear owners, quality rules and access controls, so everyone knows where a number came from and who is allowed to see it.",
      points: [
        "A clear owner for every important dataset",
        "Quality rules that catch problems early",
        "The right access for the right people",
      ],
    },
    {
      lead: "Your machines, devices and systems all produce data in real time. We bring those signals together into one live view, so you can spot issues and opportunities as they happen.",
      points: [
        "Live data from devices and systems",
        "One combined view instead of many screens",
        "Alerts the moment something changes",
      ],
    },
  ],

  "cloud-services": [
    {
      lead: "Moving to the cloud starts with a clear plan. We review what you run today, design where it should live and estimate the cost, so you know what the move involves before you commit.",
      points: [
        "A review of your current systems",
        "A target design for the cloud",
        "A migration plan with cost estimates",
      ],
    },
    {
      lead: "We move your applications and data to the cloud step by step, choosing the right approach for each one. Most of the work happens in the background, so your business keeps running while it moves.",
      points: [
        "The right move for each application",
        "Careful, staged migration",
        "Minimal disruption to your day",
      ],
    },
    {
      lead: "Cloud-native apps are built to make the most of the cloud from day one. They scale up when you are busy, scale down when you are not, and are easier to update and maintain.",
      points: [
        "Apps that scale with demand",
        "Built on modern managed services",
        "Quicker, safer updates",
      ],
    },
    {
      lead: "Most businesses run a mix of cloud and on-site systems. We connect them with reliable APIs so data flows between them automatically, without anyone re-typing it.",
      points: [
        "Cloud and on-site systems talking to each other",
        "Reliable APIs with monitoring built in",
        "No more copying data by hand",
      ],
    },
    {
      lead: "Cloud bills can creep up quietly. We find unused and oversized resources, commit to capacity where it saves money, and set up monitoring so costs stay predictable.",
      points: [
        "Unused and oversized resources removed",
        "Savings from reserved capacity",
        "Cost alerts before bills surprise you",
      ],
    },
    {
      lead: "Once you are in the cloud, we look after it for you. Monitoring, patching, backups and support are handled around the clock, so your team can focus on the business.",
      points: [
        "Round-the-clock monitoring",
        "Patches and backups handled for you",
        "Support when you need it",
      ],
    },
  ],

  cybersecurity: [
    {
      lead: "You cannot fix what you cannot see. We check your systems for weak spots, explain the risks in plain language and give you a clear list of what to fix first.",
      points: [
        "A full review of your security today",
        "Vulnerabilities found and explained",
        "A prioritised plan to fix them",
      ],
    },
    {
      lead: "Good security starts with good rules. We help you set a security strategy and write policies that fit your industry's requirements, without drowning your team in paperwork.",
      points: [
        "A security strategy that fits your business",
        "Clear, practical policies",
        "Aligned with your industry's standards",
      ],
    },
    {
      lead: "Most breaches start with a stolen password. We set up single sign-on and multi-factor authentication, and give each person access only to what they need.",
      points: [
        "One secure login for all your apps",
        "A second check with multi-factor sign-in",
        "Access limited to what each role needs",
      ],
    },
    {
      lead: "Some information needs extra care, such as customer details or financial records. We find it, label it and protect it with encryption and privacy controls.",
      points: [
        "Sensitive data found and labelled",
        "Encryption at rest and in transit",
        "Privacy controls that meet regulations",
      ],
    },
    {
      lead: "The cloud is secure only when it is set up correctly. We check your configuration, protect your workloads and keep you compliant as your cloud environment grows.",
      points: [
        "Secure cloud configuration",
        "Protection for your workloads",
        "Ongoing compliance checks",
      ],
    },
    {
      lead: "Threats do not keep office hours. We watch for suspicious activity, alert you the moment something looks wrong and help you respond quickly if an incident happens.",
      points: [
        "Continuous threat detection",
        "Instant alerts for suspicious activity",
        "Hands-on help during an incident",
      ],
    },
  ],

  "digital-infrastructure": [
    {
      lead: "Your servers and systems need regular care to stay healthy. We monitor them, apply updates and fix small problems before they turn into outages.",
      points: [
        "Proactive monitoring of servers and systems",
        "Regular patching and maintenance",
        "Problems fixed before they cause downtime",
      ],
    },
    {
      lead: "A fast, secure network keeps everyone connected, whether they are at head office, a branch or working from home. We design, set up and manage it for you.",
      points: [
        "Networks for offices and branches",
        "Secure access for hybrid and remote work",
        "Speed and reliability you can count on",
      ],
    },
    {
      lead: "Whether your systems run on your own hardware, virtual machines or a mix with the cloud, we modernise and manage the environment so it runs efficiently.",
      points: [
        "Physical, virtual and hybrid environments",
        "Modernised for efficiency",
        "Managed day to day for you",
      ],
    },
    {
      lead: "Your team needs the right tools to work well together. We set up collaboration apps, manage devices and keep everything secure, so people can get on with their work from anywhere.",
      points: [
        "Collaboration and productivity tools",
        "Laptops and phones set up and managed",
        "Secure work from any location",
      ],
    },
    {
      lead: "If something goes wrong, you need your data and systems back fast. We set up backups and a disaster recovery plan, and we test them, so you know they will work.",
      points: [
        "Automatic, regular backups",
        "A disaster recovery plan for key systems",
        "Recovery tested, not just assumed",
      ],
    },
    {
      lead: "When something breaks, your people need help quickly. Our service desk answers requests, fixes issues and reports back, with clear response times you can hold us to.",
      points: [
        "One place for every IT request",
        "Clear, agreed response times",
        "Regular reports on what was fixed",
      ],
    },
  ],
};

/**
 * The two card sections on `/ai-workforce`, in the same order as
 * `AI_WORKFORCE_MODEL_CARDS` and `AI_WORKFORCE_FDE_CARDS` (`ai-workforce-content.ts`).
 */
export const AI_WORKFORCE_MODEL_DETAILS: readonly ServiceDetail[] = [
  {
    lead: "A Digital FTE is an AI employee with one clear job, like answering support questions or following up on leads. It works inside the tools your team already uses, so nobody has to learn a new system to work with it.",
    points: [
      "One Digital FTE for each role you need",
      "Works in your existing apps and inboxes",
      "Available around the clock, without breaks",
    ],
  },
  {
    lead: "Your people and your Digital FTEs work as one team. People do what people are best at, like judgement, relationships and ideas, while Digital FTEs handle the volume and repetition.",
    points: [
      "People keep the decisions that need judgement",
      "Digital FTEs take the repetitive volume",
      "One team, with a clear split of who does what",
    ],
  },
  {
    lead: "Every piece of work follows a simple pattern. Your team sets the goal at the start, the Digital FTE does most of the work in the middle, and your team checks and approves the result at the end.",
    points: [
      "First 10%: your team decides what good looks like",
      "Middle 80%: the Digital FTE does the heavy lifting",
      "Final 10%: your team reviews and signs off",
    ],
  },
  {
    lead: "This is the rulebook your Digital FTEs follow: your policies, procedures and ways of working, kept in one place. Every document has an owner and a version, so you can always see where an answer came from.",
    points: [
      "All your approved rules and methods in one home",
      "Each document owned, versioned and reviewed",
      "Every answer traceable to its source",
    ],
  },
  {
    lead: "These are the systems that hold your live numbers, like your CRM, ERP or accounts. The rulebook says how things should be done; these systems say what is true right now.",
    points: [
      "Connected to the systems you already run on",
      "Always working from the latest figures",
      "No copies of your data drifting out of date",
    ],
  },
  {
    lead: "For each task, this layer gathers exactly what the Digital FTE needs from your rulebook and your live data, and nothing more. It only reaches what your team has given it permission to see.",
    points: [
      "Pulls the right rules and data for each task",
      "Leaves out what is not relevant",
      "Respects the permissions your team sets",
    ],
  },
];

export const AI_WORKFORCE_FDE_DETAILS: readonly ServiceDetail[] = [
  {
    lead: "Our engineers do not work from a distance. They join your team, learn your systems and rules, and then build, launch and run your Digital FTEs alongside your people.",
    points: [
      "Engineers embedded in your business",
      "They learn your systems before they build",
      "They stay on to run it with your team",
    ],
  },
  {
    lead: "One person owns the business result, not just the technology. They agree the problem to solve, redesign how work flows between your people and Digital FTEs, and make sure your team actually uses it.",
    points: [
      "A single owner for the business outcome",
      "Workflows redesigned around people and AI",
      "Adoption tracked, not assumed",
    ],
  },
  {
    lead: "Before we build anything, we write down three things together: where you are today, where you want to get to, and exactly what counts as done. Everyone knows the finish line from the start.",
    points: [
      "Today's baseline, measured and agreed",
      "A clear target to reach",
      "Acceptance criteria that define done",
    ],
  },
  {
    lead: "We prove the value in your real, day-to-day work, not in a demo. You see your business numbers move against the baseline, how much your team uses it, and how well it keeps performing.",
    points: [
      "Business KPIs compared with the baseline",
      "Real usage by your team",
      "Ongoing checks on quality",
    ],
  },
  {
    lead: "Safety is built into the system from day one. Digital FTEs can only do what they are allowed to do, and anything sensitive waits for a person to approve it.",
    points: [
      "Permissions that limit what each Digital FTE can do",
      "Approval gates for sensitive actions",
      "Policy checks on every step",
    ],
  },
  {
    lead: "Launch is the start, not the end. We keep watching how each Digital FTE performs, fix what drifts and update its knowledge whenever your policies or systems change.",
    points: [
      "Performance monitored after launch",
      "Regular evaluations and fixes",
      "Knowledge kept current as things change",
    ],
  },
];
