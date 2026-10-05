import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";

type Route =
  | "home"
  | "about"
  | "services"
  | "service"
  | "industries"
  | "contact"
  | "privacy"
  | "terms"
  | "disclaimer"
  | "motion"
  | "style-guide"
  | "404"
  | "500"
  | "maintenance";

const routes: Route[] = ["home", "about", "services", "service", "industries", "contact", "privacy", "terms", "disclaimer", "motion", "style-guide", "404", "500", "maintenance"];
const routeFromHash = (): Route => {
  const hash = window.location.hash.replace(/^#\/?/, "") as Route;
  return routes.includes(hash) ? hash : "home";
};

const contact = {
  phone: "+91 9403285122",
  email: "caombondre@gmail.com",
  address: "Pune, Maharashtra, India",
};

const practiceAreas = [
  {
    number: "01",
    title: "Virtual CFO Services",
    text: "Financial oversight, reporting and decision support structured around business requirements.",
    className: "service-card service-card--wide",
  },
  {
    number: "02",
    title: "Business Advisory & Consulting",
    text: "Financial and commercial guidance relating to decisions across the business lifecycle.",
    className: "service-card",
  },
  {
    number: "03",
    title: "Business Process Automation",
    text: "Process review and technology-led workflow improvement for finance and compliance functions.",
    className: "service-card service-card--green",
  },
  {
    number: "04",
    title: "Compliance Services",
    text: "Coordinated support for recurring accounting, tax and regulatory compliance requirements.",
    className: "service-card service-card--lines",
  },
  {
    number: "05",
    title: "Startup Advisory & Support",
    text: "Entity setup, financial structuring and compliance guidance for early-stage businesses.",
    className: "service-card",
  },
  {
    number: "06",
    title: "Statutory & Tax Audits",
    text: "Statutory and tax audit engagements conducted in accordance with applicable professional requirements.",
    className: "service-card",
  },
  {
    number: "07",
    title: "GST Notices, Orders & Representation",
    text: "Professional assistance with GST notices, proceedings, orders and representation.",
    className: "service-card service-card--wide",
  },
];

const industries = [
  ["Startups", "Structuring, compliance and financial reporting through the early business lifecycle."],
  ["SMEs", "Tax, accounting and advisory services relating to business operations."],
  ["Manufacturing", "Costing, controls, indirect taxation and statutory compliance."],
  ["Information Technology", "Tax and compliance guidance for technology-led businesses and professionals."],
  ["Professionals", "Accounting, direct taxation and advisory for professional practices."],
  ["Real Estate", "Project accounting, tax considerations and regulatory reporting."],
  ["Retail", "Indirect tax, bookkeeping, controls and periodic reporting."],
  ["Individuals & NRIs", "Personal taxation, filings and cross-border tax considerations."],
];

const faqs = [
  ["What information should I provide with an initial enquiry?", "The documents depend on the matter. An initial review may require identity and registration details, relevant notices or filings, recent financial information and a concise summary of the query."],
  ["Do you work with both businesses and individuals?", "Yes. Our areas of practice cover eligible businesses, professionals, individuals and NRIs, subject to conflict checks and engagement acceptance procedures."],
  ["How does an engagement begin?", "Following an initial discussion, we define the scope, responsibilities, information requirements and professional terms in a written engagement communication."],
  ["Is information shared through this website confidential?", "Please avoid sharing sensitive information in the contact form. Confidentiality obligations apply after an engagement is formally accepted. See our Privacy Policy for data-use information."],
];

function Icon({ name, size = 20 }: { name: "arrow" | "phone" | "mail" | "menu" | "close" | "check" | "whatsapp" | "location"; size?: number }) {
  const paths: Record<string, ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    menu: <><path d="M4 8h16"/><path d="M4 16h16"/></>,
    close: <><path d="m6 6 12 12"/><path d="m18 6-12 12"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    whatsapp: <><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6A8.38 8.38 0 0 1 12.5 3h.5a8.48 8.48 0 0 1 8 8z"/><path d="M9 8.5c.5 2.5 2 4 4.5 5"/></>,
    location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Button({ children, variant = "primary", onClick, type = "button", disabled, loading, className = "" }: {
  children: ReactNode; variant?: "primary" | "secondary" | "ghost" | "icon"; onClick?: () => void;
  type?: "button" | "submit"; disabled?: boolean; loading?: boolean; className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const magnet = (event: React.MouseEvent) => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${(event.clientX - r.left - r.width / 2) * .12}px`);
    ref.current.style.setProperty("--my", `${(event.clientY - r.top - r.height / 2) * .12}px`);
  };
  return <button ref={ref} type={type} className={`button button--${variant} ${className}`} onClick={onClick} disabled={disabled || loading}
    onMouseMove={magnet} onMouseLeave={() => { ref.current?.style.setProperty("--mx", "0px"); ref.current?.style.setProperty("--my", "0px"); }}>
    {loading && <span className="spinner" />}<span>{children}</span>{variant !== "icon" && !loading && <Icon name="arrow" size={17} />}
  </button>;
}

function SectionTitle({ eyebrow, title, text, light = false }: { eyebrow: string; title: ReactNode; text?: string; light?: boolean }) {
  return <div className={`section-title reveal ${light ? "section-title--light" : ""}`}>
    <span className="eyebrow"><i />{eyebrow}</span>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </div>;
}

function Header({ route, navigate }: { route: Route; navigate: (route: Route) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > lastY.current && y > 180);
      setProgress((y / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)) * 100);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (r: Route) => { setMenuOpen(false); navigate(r); };
  const links: [string, Route][] = [["Home", "home"], ["Audit", "service"], ["Taxes", "service"], ["Business Setup", "services"], ["Registrations", "services"], ["Compliance", "services"], ["Advisory", "service"], ["About", "about"], ["Contact", "contact"]];
  const menuContent: Record<string, [string, string, string][]> = {
    Audit: [["Statutory Audit", "Independent financial statement audit", "Assurance"], ["Tax Audit", "Reporting under applicable tax law", "Assurance"], ["Audit Readiness", "Records and documentation review", "Support"], ["Audit Coordination", "Engagement information support", "Support"]],
    Taxes: [["GST Notices", "Review and professional response", "GST matters"], ["GST Orders", "Order analysis and next steps", "GST matters"], ["Tax Representation", "Assistance before applicable authorities", "Representation"], ["Tax Compliance", "Periodic filings and reconciliations", "Representation"]],
    "Business Setup": [["Startup Advisory", "Setup and financial guidance", "Planning"], ["Entity Selection", "Entity structuring information", "Planning"], ["Company Formation", "Incorporation process support", "Formation"], ["Initial Compliance", "Registration and filing support", "Formation"]],
    Registrations: [["Company Registration", "MCA incorporation support", "Business"], ["LLP Registration", "Formation and documentation support", "Business"], ["GST Registration", "Application and documentation", "Tax"], ["Professional Tax", "Applicable state registrations", "Tax"]],
    Compliance: [["Compliance Services", "Recurring compliance support", "Ongoing"], ["ROC / MCA", "Periodic corporate filings", "Ongoing"], ["Accounting", "Books and financial reporting", "Finance"], ["Process Automation", "Finance workflow improvement", "Finance"]],
    Advisory: [["Virtual CFO", "Financial oversight and reporting", "Financial"], ["Business Advisory", "Financial and decision support", "Financial"], ["Process Automation", "Finance workflow improvement", "Operations"]],
  };
  const activeLabel = route === "service" ? "Taxes" : route === "services" ? "Business Setup" : route === "about" ? "About" : route === "contact" ? "Contact" : route === "home" ? "Home" : "";
  return <>
    <header className={`header ${scrolled ? "header--scrolled" : ""} ${hidden && !menuOpen ? "header--hidden" : ""}`}>
      <span className="progress" style={{ transform: `scaleX(${progress / 100})` }} />
      <div className="utility-bar"><div className="utility-bar__inner"><span>Business Enquiries</span><a href={`tel:${contact.phone}`}><Icon name="phone" size={12}/>Phone: {contact.phone}</a><a href={`mailto:${contact.email}`}><Icon name="mail" size={12}/>Email: {contact.email}</a><button>English · IN</button></div></div>
      <div className="main-header">
        <button className="brand" onClick={() => go("home")} aria-label="Go to home">
          <span className="brand-mark"><b>CA</b></span><span><strong>Bondre Neve & Associates</strong><small>Chartered Accountants</small></span>
        </button>
        <Button className="header-cta" onClick={() => go("contact")}>Contact the Office</Button>
        <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button>
      </div>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, r]) => <div className="nav-item" key={label}>
          <button className={activeLabel === label ? "active" : ""} onClick={() => go(r)}>{label}</button>
          {menuContent[label] && <div className="mega-menu"><div>
            <span className="mega-menu__label">{label} services</span>
            <div className="mega-menu__groups">
              {[...new Set(menuContent[label].map(([, , group]) => group))].map(group => <section className="mega-menu__group" key={group}>
                <b>{group}</b>
                {menuContent[label].filter(([, , itemGroup]) => itemGroup === group).map(([name, description]) => <button key={name} onClick={() => go(r)}><i><Icon name="arrow" size={14}/></i><span><strong>{name}</strong><small>{description}</small></span></button>)}
              </section>)}
            </div>
          </div><aside><span>Area information</span><p>View the stated scope and process for this area of practice.</p><button onClick={() => go("services")}>View all services <Icon name="arrow" size={15}/></button></aside></div>}
        </div>)}
      </nav>
    </header>
    <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`} aria-hidden={!menuOpen}>
      <div className="mobile-menu__inner">
        <span className="eyebrow"><i />Navigation</span>
        {links.map(([label, r], i) => <div className={`mobile-nav-item ${mobileOpen === label ? "mobile-nav-item--open" : ""}`} style={{ "--i": i } as React.CSSProperties} key={label}>
          <button onClick={() => menuContent[label] ? setMobileOpen(mobileOpen === label ? null : label) : go(r)}><span>{String(i+1).padStart(2,"0")}</span>{label}{menuContent[label] && <b>+</b>}</button>
          {menuContent[label] && <div><section>{menuContent[label].map(([name]) => <button key={name} onClick={() => go(r)}>{name}<Icon name="arrow" size={14}/></button>)}</section></div>}
        </div>)}
        <div className="mobile-menu__contact"><span>{contact.phone}</span><span>{contact.email}</span></div>
      </div>
    </div>
  </>;
}

function Footer({ navigate }: { navigate: (r: Route) => void }) {
  return <footer className="footer">
    <div className="footer__main">
      <div className="footer__brand">
        <button className="brand brand--footer" onClick={() => navigate("home")}><span className="brand-mark"><b>CA</b></span><span><strong>Bondre Neve & Associates</strong><small>Chartered Accountants</small></span></button>
        <p>Professional services in taxation, audit, advisory and compliance from Pune, India.</p>
        <span className="registration">Firm Registration No. 165775W</span>
      </div>
      <div><h4>Quick links</h4>{[["About", "about"], ["Areas of Practice", "services"], ["Industries", "industries"], ["Contact", "contact"]].map(([l, r]) => <button key={l} onClick={() => navigate(r as Route)}>{l}</button>)}</div>
      <div><h4>Services</h4>{["Virtual CFO Services","Business Advisory","Process Automation","Compliance Services","Statutory & Tax Audits","GST Representation"].map(l => <button key={l} onClick={() => navigate("service")}>{l}</button>)}</div>
      <div><h4>Contact</h4><a href={`tel:${contact.phone}`}>{contact.phone}</a><a href={`mailto:${contact.email}`}>{contact.email}</a><p>{contact.address}</p><a href="#/contact">View map & directions →</a><div className="social-links"><a href="https://in.linkedin.com/in/om-bondre-5575b3281" target="_blank" rel="noreferrer" aria-label="Open CA Om Anil Bondre on LinkedIn">in</a><a href="https://mail.google.com/mail/?view=cm&fs=1&to=caombondre%40gmail.com" target="_blank" rel="noreferrer" aria-label="Compose an email to CA Om Anil Bondre in Gmail"><Icon name="mail" size={14}/></a></div></div>
    </div>
    <div className="compliance-note"><strong>Client review note — ICAI compliance:</strong> This prototype intentionally excludes testimonials, ratings, client identities, promotional statistics, awards, guarantees, fee offers and comparative or superlative claims. Final content should be reviewed against the ICAI Code of Ethics before publication.</div>
    <div className="footer__bottom"><span>© {new Date().getFullYear()} Bondre Neve & Associates. All rights reserved.</span><span><button onClick={()=>navigate("privacy")}>Privacy</button> · <button onClick={()=>navigate("terms")}>Terms</button> · <button onClick={()=>navigate("disclaimer")}>Disclaimer</button> · <button onClick={()=>navigate("motion")}>Motion</button> · <button onClick={()=>navigate("style-guide")}>Style Guide</button></span><span>This website is for general information and does not constitute solicitation or advertisement.</span></div>
  </footer>;
}

function DisclaimerModal({ onAccept }: { onAccept: () => void }) {
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="disclaimer-title">
    <div className="modal-card">
      <div className="modal-monogram">F</div><span className="eyebrow"><i />Before you continue</span>
      <h2 id="disclaimer-title">Information & professional notice</h2>
      <div className="accent-rule" />
      <p>This website is intended solely to provide general information about Bondre Neve & Associates and its areas of practice. It does not constitute advertising, solicitation, professional advice, or an invitation to create a client relationship.</p>
      <p>By continuing, you acknowledge that you are visiting this website on your own initiative and will seek specific professional advice before acting on any information presented here.</p>
      <Button onClick={onAccept}>I understand, continue</Button>
      <small>Prepared with reference to the ICAI Code of Ethics.</small>
    </div>
  </div>;
}

function ServiceIcon({ number }: { number: string }) {
  const paths: Record<string, ReactNode> = {
    "01": <><path d="M5 19V9"/><path d="M12 19V5"/><path d="M19 19v-7"/><path d="M3 19h18"/></>,
    "02": <><path d="M4 18V8l8-4 8 4v10"/><path d="M8 21v-8h8v8"/><path d="M2 21h20"/></>,
    "03": <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/><path d="M10 7h4a3 3 0 0 1 3 3v4"/><path d="m14 11 3 3 3-3"/></>,
    "04": <><path d="M7 3h10v4H7z"/><path d="M5 5H3v16h18V5h-2"/><path d="m8 14 3 3 6-7"/></>,
    "05": <><path d="M12 3v18"/><path d="M5 9c0-3 3-5 7-5s7 2 7 5-3 5-7 5-7 2-7 5"/><path d="m8 18 4 3 4-3"/></>,
    "06": <><path d="M4 4h16v16H4z"/><path d="m8 12 3 3 5-6"/><path d="M8 7h5"/></>,
    "07": <><path d="M5 3h14v18H5z"/><path d="M8 8h8"/><path d="M8 12h5"/><path d="M8 16h7"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[number]}</svg>;
}

function ServiceCard({ area, navigate }: { area: typeof practiceAreas[number]; navigate: (r: Route) => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  return <button ref={ref} className={area.className} onClick={() => navigate("service")} onMouseMove={(e) => {
    const r = ref.current?.getBoundingClientRect(); if (!r || !ref.current) return;
    ref.current.style.setProperty("--x", `${e.clientX - r.left}px`); ref.current.style.setProperty("--y", `${e.clientY - r.top}px`);
  }}>
    <span className="card-spotlight" />
    <span className="service-card__top"><i><ServiceIcon number={area.number}/></i><span className="card-number">{area.number}</span></span>
    <div className="service-card__copy"><h3>{area.title}</h3><p>{area.text}</p></div>
    <span className="service-card__link">Learn more <Icon name="arrow" size={16}/></span>
  </button>;
}

const approachSteps = [
  ["01", "Understand", "We listen carefully, establish context and identify the question that needs to be resolved."],
  ["02", "Plan", "We define scope, information requirements, responsibilities and the proposed course of action."],
  ["03", "Execute", "We carry out the agreed work with disciplined review, documentation and communication."],
  ["04", "Support", "We remain available for clarifications, next steps and ongoing requirements within the engagement."],
];

function ApproachIcon({ step }: { step: number }) {
  const drawings = [
    <><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/><path d="M7 10h6"/></>,
    <><path d="M5 3h12v18H5z"/><path d="M8 8h6M8 12h6M8 16h4"/></>,
    <><path d="M4 18 10 6l4 7 3-4 3 9"/><path d="m13 19 3 3 6-7"/></>,
    <><path d="M4 12a8 8 0 0 1 16 0"/><path d="M4 12v5h4v-5H4ZM16 12v5h4v-5h-4Z"/><path d="M16 20h-5"/></>,
  ];
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{drawings[step]}</svg>;
}

function ApproachSection() {
  return <section className="approach">
    <div className="container">
      <SectionTitle eyebrow="Engagement process" title={<>Four stages of an <em>accepted engagement.</em></>} text="The process defines information requirements, responsibilities, work stages and subsequent communication." />
      <div className="approach__viewport">
        <div className="approach__timeline reveal-stagger">
          {approachSteps.map(([n, title, text], i) => <article className="approach-step" key={n}>
            <span>{n}</span>
            <i><ApproachIcon step={i}/></i>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>)}
        </div>
      </div>
      <div className="approach__dots" aria-hidden="true"><i/><i/><i/><i/></div>
    </div>
  </section>;
}

function Home({ navigate }: { navigate: (r: Route) => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return <>
    <section className="hero">
      <div className="hero-glow" /><div className="mesh mesh--one" /><div className="mesh mesh--two" />
      <div className="hero__content">
        <div className="hero__copy">
          <span className="eyebrow hero-reveal" style={{ "--d": 1 } as React.CSSProperties}><i />Chartered Accountants | Pune</span>
          <h1 aria-label="Tax, Audit and Advisory for Businesses and Individuals">
            <span className="hero-word" style={{ "--d": 2 } as React.CSSProperties}>Tax,</span>{" "}
            <span className="hero-phrase">
              <span className="hero-word hero-word--green" style={{ "--d": 3 } as React.CSSProperties}>Audit</span>{" "}
              <span className="hero-word hero-word--green" style={{ "--d": 4 } as React.CSSProperties}>&</span>{" "}
              <span className="hero-word hero-word--green" style={{ "--d": 5 } as React.CSSProperties}>Advisory</span>
            </span>
            <span className="hero-line-break" />
            <span className="hero-word hero-word--small" style={{ "--d": 6 } as React.CSSProperties}>for</span>{" "}
            <span className="hero-word hero-word--small" style={{ "--d": 7 } as React.CSSProperties}>Businesses</span>{" "}
            <span className="hero-word hero-word--small" style={{ "--d": 8 } as React.CSSProperties}>and</span>{" "}
            <span className="hero-word hero-word--small" style={{ "--d": 9 } as React.CSSProperties}>Individuals</span>
          </h1>
          <p className="hero__intro hero-reveal" style={{ "--d": 10 } as React.CSSProperties}>Information on tax, audit, advisory and compliance services for businesses and individuals.</p>
          <div className="hero__actions hero-reveal" style={{ "--d": 11 } as React.CSSProperties}>
            <Button onClick={() => navigate("contact")}>Contact the Office</Button>
            <Button variant="secondary" onClick={() => navigate("services")}>Our Services</Button>
          </div>
        </div>
        <div className="hero-visual hero-reveal" style={{ "--d": 5 } as React.CSSProperties}>
          <div className="hero-shape"><i/><i/><i/></div>
          <div className="hero-photo"><img src="/images/ca-om-anil-bondre.jpg" alt="CA Om Anil Bondre, Founder Partner at Bondre Neve & Associates" /></div>
          <div className="hero-partner-card"><span>Founder Partner</span><strong>CA Om Anil Bondre</strong><small>ICAI Membership No. 646756</small></div>
        </div>
      </div>
    </section>

    <section className="quick-access"><div className="container">{[
      ["Virtual CFO","CFO"],["Business Advisory","BA"],["Process Automation","PA"],["Compliance","CO"],["Startup Support","SS"],["Audit","AU"]
    ].map(([name,icon])=><button key={name} onClick={()=>navigate("service")}><i>{icon}</i><span>{name}</span><Icon name="arrow" size={14}/></button>)}</div></section>

    <section className="section section--white">
      <div className="container">
        <SectionTitle eyebrow="Areas of practice" title={<>Services provided by <em>the firm.</em></>} text="Information about services available to businesses, professionals and individuals, subject to engagement acceptance." />
        <div className="services-grid reveal-stagger">{practiceAreas.map(a => <ServiceCard key={a.title} area={a} navigate={navigate} />)}</div>
        <button className="text-link" onClick={() => navigate("services")}>Explore all areas of practice <Icon name="arrow" size={16} /></button>
      </div>
    </section>

    <ApproachSection/>

    <section className="section section--white partner-section">
      <div className="container partner-grid">
        <div className="partner-portrait reveal"><img src="/images/ca-om-anil-bondre.jpg" alt="Portrait of CA Om Anil Bondre" /></div>
        <div className="partner-copy">
          <SectionTitle eyebrow="The firm" title={<>Bondre Neve<br /><em>& Associates.</em></>} />
          <p className="lead reveal">Bondre Neve & Associates is a Chartered Accountancy firm based in Pune with stated areas of practice in advisory, compliance, audit and GST representation.</p>
          <div className="partner-name reveal"><strong>CA Om Anil Bondre</strong><span>Founder Partner · ICAI Membership No. 646756</span></div>
          <Button variant="ghost" onClick={() => navigate("about")}>Meet the partner</Button>
        </div>
      </div>
    </section>

    <div className="marquee" aria-label="Industries served"><div>{[...industries, ...industries].map(([name], i) => <span key={i}>{name}<i /></span>)}</div></div>

    <section className="section calendar-section"><div className="container calendar-grid">
      <SectionTitle eyebrow="Compliance calendar" title={<>Dates to keep<br/><em>in view.</em></>} text="An informational overview of common recurring due dates. Dates may vary by taxpayer and notification." />
      <div className="due-list">{[
        ["GST","GSTR-1","11th of the following month"],["TDS","TDS payment","7th of the following month"],["Income Tax","Advance tax instalment","As prescribed for each quarter"],["ROC / MCA","Annual filings","Based on the applicable company timeline"]
      ].map(([type,name,date])=><div className="due-item reveal" key={name}><span>{type}</span><strong>{name}</strong><p>{date}</p><i><Icon name="arrow" size={16}/></i></div>)}
      <small>Indicative only. Verify the current statutory calendar and applicability before taking action.</small></div>
    </div></section>

    <section className="section section--white faq-section">
      <div className="container faq-grid">
        <SectionTitle eyebrow="Frequently asked questions" title={<>Information about<br /><em>engagements and enquiries.</em></>} />
        <div className="faq-list">
          {faqs.map(([q, a], i) => <div className={`faq ${openFaq === i ? "faq--open" : ""}`} key={q}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}><span>{q}</span><i><b /><b /></i></button>
            <div className="faq__answer"><div><p>{a}</p></div></div>
          </div>)}
        </div>
      </div>
    </section>
    <ContactBand navigate={navigate} />
  </>;
}

function ContactBand({ navigate }: { navigate: (r: Route) => void }) {
  return <section className="contact-band"><div className="contact-band__orb" /><div className="container">
    <span className="eyebrow"><i />Contact information</span>
    <h2>Office contact and<br /><em>enquiry details.</em></h2>
    <p>The contact page provides the office telephone number, email address and an optional enquiry form.</p>
    <div><Button onClick={() => navigate("contact")}>View Contact Details</Button><a href={`tel:${contact.phone}`} className="contact-phone"><Icon name="phone" />{contact.phone}</a></div>
  </div></section>;
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text: string }) {
  return <section className="page-hero"><div className="ledger-grid" /><div className="container"><span className="eyebrow hero-reveal"><i />{eyebrow}</span><h1 className="hero-word">{title}</h1><p className="hero-reveal">{text}</p></div></section>;
}

function About({ navigate }: { navigate: (r: Route) => void }) {
  return <><PageHero eyebrow="About the firm" title={<>Bondre Neve<br /><em>& Associates.</em></>} text="Bondre Neve & Associates is a Pune-based Chartered Accountancy practice with services for businesses, professionals and individuals." />
    <section className="section section--white"><div className="container editorial-grid">
      <SectionTitle eyebrow="Professional approach" title={<>Understanding the <em>engagement context.</em></>} />
      <div className="editorial-copy reveal"><p className="lead">Financial and regulatory matters may involve related objectives, responsibilities and practical constraints that form part of the engagement context.</p><p>Engagement work is performed with reference to applicable professional standards, documented analysis and agreed communication procedures.</p></div>
    </div></section>
    <section className="section section--deep"><div className="container"><SectionTitle eyebrow="How we practise" title={<>Principles that guide <em>the work.</em></>} light />
      <div className="values-grid">{[["01","Communication","Engagement communications record the scope, information requirements and agreed next steps."],["02","Review","Work includes documented review procedures relevant to the agreed scope."],["03","Independence","Professional judgement is exercised with reference to applicable standards and available evidence."]].map(v=><div className="value-card reveal" key={v[1]}><span>{v[0]}</span><h3>{v[1]}</h3><p>{v[2]}</p></div>)}</div>
    </div></section>
    <section className="section section--white"><div className="container profile-grid">
      <div className="partner-portrait partner-portrait--large"><img src="/images/ca-om-anil-bondre.jpg" alt="CA Om Anil Bondre, Founder Partner" /></div>
      <div><span className="eyebrow"><i />Founder Partner</span><h2>CA Om Anil Bondre</h2><p className="profile-role">Chartered Accountant · ICAI Membership No. 646756</p><div className="accent-rule" /><p className="lead">Founder Partner at Bondre Neve & Associates, working across business advisory, compliance, audit, GST representation and financial oversight engagements.</p>
      <dl className="profile-facts"><div><dt>Designation</dt><dd>Founder Partner</dd></div><div><dt>Areas of practice</dt><dd>Virtual CFO, Business Advisory, Compliance, Audit and GST Representation</dd></div></dl><Button onClick={() => navigate("contact")}>View Contact Details</Button></div>
    </div></section><ContactBand navigate={navigate} /></>;
}

function Services({ navigate }: { navigate: (r: Route) => void }) {
  return <><PageHero eyebrow="Areas of practice" title={<>Services and<br /><em>engagement scopes.</em></>} text="Professional services are provided under defined scopes and subject to engagement acceptance procedures." />
    <section className="section section--white"><div className="container services-list">
      {practiceAreas.map((a, i) => <button className="service-row reveal" onClick={() => navigate("service")} key={a.title}><span>0{i+1}</span><div><h2>{a.title}</h2><p>{a.text}</p></div><i><Icon name="arrow" /></i></button>)}
    </div></section><ContactBand navigate={navigate} /></>;
}

function ServiceDetail({ navigate }: { navigate: (r: Route) => void }) {
  return <><PageHero eyebrow="Virtual CFO Services" title={<>Virtual CFO<br /><em>service information.</em></>} text="Financial reporting, review and decision-support activities that may form part of an agreed scope." />
    <section className="section section--white"><div className="container service-detail">
      <main>
        <SectionTitle eyebrow="Service scope" title="Activities that may form part of the engagement." />
        <p className="lead">Virtual CFO services may include financial oversight, management information and planning support within a defined engagement scope.</p>
        <div className="detail-list">{["Management information and reporting","Cash flow review and planning","Budgeting and financial analysis","Finance process review","Compliance coordination","Decision-support information"].map((x,i)=><div key={x}><span>0{i+1}</span>{x}</div>)}</div>
        <SectionTitle eyebrow="How we work" title={<>Defined scope. <em>Documented process.</em></>} />
        <p>Every engagement begins with an understanding of the requirement and available records. Scope, deliverables, timelines and information responsibilities are communicated before substantive work begins.</p>
      </main>
      <aside><span className="eyebrow"><i />Contact information</span><h3>Office enquiry details</h3><p>The contact page may be used to provide a brief outline of a matter without sensitive information.</p><Button onClick={()=>navigate("contact")}>View Contact Details</Button><a href={`tel:${contact.phone}`}><Icon name="phone"/>{contact.phone}</a><small>Engagements are subject to professional acceptance procedures.</small></aside>
    </div></section></>;
}

function Industries() {
  return <><PageHero eyebrow="Industries" title={<>Sectors and<br /><em>taxpayer categories.</em></>} text="The firm’s stated areas of practice may apply across the sectors and taxpayer categories listed below." />
    <section className="section section--white"><div className="container industries-grid">{industries.map(([name,text],i)=><article className="industry-card reveal" key={name}><span>0{i+1}</span><div className="industry-glyph"><i/><i/><i/></div><h3>{name}</h3><p>{text}</p></article>)}</div></section></>;
}

function Field({ label, name, type = "text", required = false, error }: { label: string; name: string; type?: string; required?: boolean; error?: string }) {
  return <label className={`field ${error ? "field--error" : ""}`}><input name={name} type={type} required={required} placeholder=" " /><span>{label}{required && " *"}</span>{error && <small>{error}</small>}</label>;
}

function Contact() {
  const [status, setStatus] = useState<"idle"|"submitting"|"success"|"error">("idle");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const form = new FormData(e.currentTarget); const next: Record<string,string> = {};
    if (!form.get("name")) next.name = "Please enter your name";
    if (!form.get("phone")) next.phone = "Please enter a phone number";
    if (!form.get("email") || !String(form.get("email")).includes("@")) next.email = "Please enter a valid email";
    if (!form.get("consent")) next.consent = "Consent is required to send this form";
    setErrors(next); if (Object.keys(next).length) { setStatus("error"); return; }
    setStatus("submitting"); window.setTimeout(()=>setStatus("success"), 1100);
  };
  return <><PageHero eyebrow="Contact" title={<>Office contact<br /><em>information.</em></>} text="The form may be used to submit a brief enquiry. Please do not include sensitive personal or financial information." />
    <section className="section section--white"><div className="container contact-grid">
      <div className="contact-info"><span className="eyebrow"><i/>Contact details</span><h2>Our Pune office</h2><p>Office hours: Monday–Friday, 10:00–18:00 IST<br/>Meetings by prior appointment.</p>
        <a href={`tel:${contact.phone}`}><i><Icon name="phone"/></i><span><small>Call</small>{contact.phone}</span></a>
        <a href={`mailto:${contact.email}`}><i><Icon name="mail"/></i><span><small>Email</small>{contact.email}</span></a>
        <div className="address"><i><Icon name="location"/></i><span><small>Visit</small>{contact.address}</span></div>
        <div className="map-placeholder"><div className="map-grid"/><span><Icon name="location"/>Map preview unavailable</span><small>Use the written address above for directions.</small></div>
      </div>
      <form className={`contact-form ${status==="error" ? "form--shake":""}`} onSubmit={submit} noValidate>
        {status==="success" ? <div className="form-success"><span><Icon name="check" size={36}/></span><h2>Thank you.</h2><p>Your enquiry has been recorded. The office will respond using the contact details provided.</p><Button variant="ghost" onClick={()=>setStatus("idle")}>Send another enquiry</Button></div> : <>
          <div><span className="eyebrow"><i/>Enquiry form</span><h2>Enquiry details</h2></div>
          <div className="form-row"><Field label="Name" name="name" required error={errors.name}/><Field label="Phone" name="phone" type="tel" required error={errors.phone}/></div>
          <Field label="Email" name="email" type="email" required error={errors.email}/>
          <label className="select-field"><span>Service or support required</span><select name="service" defaultValue=""><option value="" disabled>Select a service</option>{practiceAreas.map(x=><option key={x.title}>{x.title}</option>)}<option>Other / General Enquiry</option></select></label>
          <label className="textarea-field"><span>Message</span><textarea name="message" rows={5} placeholder="A brief outline of your requirement (do not include sensitive information)" /></label>
          <label className={`checkbox ${errors.consent ? "checkbox--error":""}`}><input type="checkbox" name="consent"/><i><Icon name="check" size={14}/></i><span>I consent to Bondre Neve & Associates using my information to respond to this enquiry in accordance with India’s Digital Personal Data Protection Act, 2023 and the <button type="button">Privacy Policy</button>. *</span></label>
          {errors.consent && <small className="consent-error">{errors.consent}</small>}
          <Button type="submit" loading={status==="submitting"}>{status==="submitting" ? "Sending enquiry" : "Send enquiry"}</Button>
          <small className="form-note">Submitting this form does not create a client or professional relationship.</small>
        </>}
      </form>
    </div></section></>;
}

function Legal({ type }: { type: "privacy"|"terms"|"disclaimer" }) {
  const data = {
    privacy: ["Privacy Policy","How we collect and use personal information submitted through this website."],
    terms: ["Terms of Use","The terms governing access to and use of this informational website."],
    disclaimer: ["Website Disclaimer","Important information about the purpose and limitations of this website."],
  }[type];
  const sections = type==="privacy" ? [
    ["Information we collect","When you use the enquiry form, we may collect your name, contact details, selected area of practice and the message you provide. Please do not submit sensitive personal or financial information through this website."],
    ["Purpose and lawful use","Information is used only to review and respond to your enquiry, maintain necessary records, protect this website and comply with applicable legal obligations."],
    ["Retention and security","We retain enquiry information only for as long as reasonably necessary for the stated purpose or applicable obligations. Reasonable administrative and technical safeguards are used to protect information."],
    ["Your rights","Subject to applicable law, you may request access, correction or erasure of your personal data, or withdraw consent by contacting the office."],
  ] : [
    ["Informational purpose","Content on this website is general information only. It is not professional advice, advertising or solicitation and should not be relied upon as a substitute for advice relating to your circumstances."],
    ["No professional relationship","Viewing this website or sending an enquiry does not create a client, fiduciary or professional relationship. An engagement begins only after applicable acceptance procedures and written terms."],
    ["Accuracy and availability","We aim to keep information current but do not represent that all content is complete or applicable to every circumstance. Access may be interrupted for maintenance or technical reasons."],
    ["External links","Any external resources are provided for convenience. Their content, security and availability are outside our control."],
  ];
  return <><PageHero eyebrow="Legal information" title={<>{data[0]}</>} text={data[1]}/><section className="section section--white"><div className="container legal-layout"><aside><strong>On this page</strong>{sections.map(([h],i)=><a key={h} href={`#legal-${i}`}>{String(i+1).padStart(2,"0")} {h}</a>)}</aside><main><div className="legal-meta">Current website version</div>{sections.map(([h,p],i)=><section id={`legal-${i}`} key={h}><h2>{h}</h2><p>{p}</p></section>)}<section><h2>Contact</h2><p>Questions may be directed to {contact.email} or the office address listed in the footer.</p></section></main></div></section></>;
}

function MotionPage() {
  const rules = [
    ["300ms", "Hover response", "Color, border, icon and small positional feedback for direct interaction."],
    ["450ms", "Standard transition", "Cards, accordions, menus and component state changes."],
    ["600ms", "Entrance transition", "Page, modal and scroll-reveal entrances with short stagger delays."],
  ];
  return <><PageHero eyebrow="Design system" title={<>Motion<br/><em>guidelines.</em></>} text="The motion rules used throughout this website, documented for implementation and handoff."/>
    <section className="section section--white"><div className="container motion-doc">
      <SectionTitle eyebrow="Timing" title="A restrained three-speed system." text="Every interface transition uses one of three durations. Continuous decorative animation is avoided."/>
      <div className="motion-grid">{rules.map(([time,title,text])=><article key={time}><span>{time}</span><i/><h3>{title}</h3><p>{text}</p></article>)}</div>
      <div className="motion-rules">
        <section><span className="eyebrow"><i/>Entrance easing</span><h2>Entrance transitions.</h2><code>cubic-bezier(0.16, 1, 0.3, 1)</code><p>Used for page changes, modals and scroll reveals. Elements fade while moving no more than 24px. Staggers are limited to 60–120ms.</p></section>
        <section><span className="eyebrow"><i/>Hover easing</span><h2>Direct and responsive.</h2><code>cubic-bezier(0.2, 0.7, 0.3, 1)</code><p>Used for hover, focus and pressed states. Movement remains subtle: cards lift up to 6px and icons translate up to 4px.</p></section>
        <section><span className="eyebrow"><i/>Reduced motion</span><h2>Meaning without movement.</h2><code>prefers-reduced-motion: reduce</code><p>Transforms, smooth scrolling, ambient effects, marquees and stagger delays are removed. State changes use a short opacity fade only.</p></section>
        <section><span className="eyebrow"><i/>Principles</span><h2>Inform, never distract.</h2><ul><li>Motion confirms hierarchy, state or navigation.</li><li>No bounce, elastic overshoot or attention-seeking loops.</li><li>Loading indicators are the only continuous functional animation.</li><li>Keyboard focus never depends on motion alone.</li></ul></section>
      </div>
    </div></section></>;
}

function StyleGuidePage() {
  const colors = [
    ["Primary Blue", "#0B3D6E", "blue"], ["Deep Navy", "#072A4D", "deep"], ["Brand Green", "#5CA83A", "green"],
    ["Green Hover", "#4A9230", "green-hover"], ["Mint", "#F1F7EC", "mint"], ["Ice Blue", "#EAF2FA", "ice"],
    ["Text", "#1E2A38", "text"], ["Muted Text", "#5B6B7B", "slate"], ["Border", "#E3EAF0", "line"], ["White", "#FFFFFF", "white"],
  ];
  const iconNames: Array<"arrow"|"phone"|"mail"|"menu"|"close"|"check"|"whatsapp"|"location"> = ["arrow","phone","mail","menu","close","check","whatsapp","location"];
  return <><PageHero eyebrow="Design system" title={<>Style Guide</>} text="The live visual foundations and reusable interface components used across Bondre Neve & Associates."/>
    <section className="section section--white"><div className="container style-guide">
      <section className="guide-section"><SectionTitle eyebrow="Color" title="Color tokens." text="Every interface color references a semantic CSS variable. Tints and transparencies derive from these core values."/>
        <div className="swatch-grid">{colors.map(([name,value,key])=><article key={name}><i className={`swatch swatch--${key}`}/><strong>{name}</strong><code>{value}</code></article>)}</div>
      </section>
      <section className="guide-section"><SectionTitle eyebrow="Typography" title="Fraunces with Inter." text="Fraunces is used for headings and Inter is used for functional and long-form content."/>
        <div className="type-specimens"><article><span>Display · Fraunces</span><h2>Tax, Audit & Advisory.</h2></article><article><span>Heading · Fraunces</span><h3>Business Advisory & Consulting</h3></article><article><span>Body · Inter</span><p>Body text presents professional and regulatory information in direct, accessible language.</p></article><article><span>Label · Inter</span><b>CHARTERED ACCOUNTANTS · PUNE</b></article></div>
      </section>
      <section className="guide-section"><SectionTitle eyebrow="Buttons" title="Button variants."/>
        <div className="component-row"><Button>Primary action</Button><Button variant="secondary">Secondary action</Button><Button variant="ghost">Text action</Button><Button disabled>Disabled action</Button><Button loading>Loading</Button></div>
      </section>
      <section className="guide-section"><SectionTitle eyebrow="Inputs" title="Accessible form controls."/>
        <div className="guide-form"><Field label="Default field" name="guide-default"/><Field label="Filled example" name="guide-filled"/><Field label="Email address" name="guide-error" error="Example validation message"/><label className="select-field"><span>Service required</span><select defaultValue=""><option value="" disabled>Select a service</option><option>Virtual CFO Services</option></select></label><label className="textarea-field"><span>Message</span><textarea rows={4} placeholder="Enter a brief message"/></label><label className="checkbox"><input type="checkbox"/><i><Icon name="check" size={14}/></i><span>Checkbox label and supporting information.</span></label></div>
      </section>
      <section className="guide-section"><SectionTitle eyebrow="Cards" title="Card variants."/>
        <div className="guide-cards"><article><span>01</span><i><ServiceIcon number="01"/></i><h3>Service card</h3><p>Mint and ice surfaces use the same spacing, radius and elevation tokens.</p></article><article><span>02</span><i><Icon name="arrow"/></i><h3>Information card</h3><p>Cards separate related content without relying on heavy decoration.</p></article><article className="guide-card--dark"><span>03</span><i><Icon name="check"/></i><h3>Dark card</h3><p>Dark surfaces retain accessible contrast and restrained accents.</p></article></div>
      </section>
      <section className="guide-section"><SectionTitle eyebrow="Icons" title="Simple line-based symbols."/>
        <div className="icon-grid">{iconNames.map(name=><article key={name}><i><Icon name={name}/></i><span>{name}</span></article>)}</div>
      </section>
      <section className="guide-section guide-foundations"><SectionTitle eyebrow="Foundations" title="Consistent by construction."/>
        <div><article><h3>8px spacing</h3><p>Spacing uses 8, 16, 24, 32, 40, 48, 64, 80, 96 and 128px tokens.</p></article><article><h3>Radius</h3><p>Small 8px, medium 16px, large 24px, extra-large 32px and pill 999px.</p></article><article><h3>Elevation</h3><p>Three shadows: subtle 8/24, raised 16/40 and overlay 24/64.</p></article><article><h3>Naming</h3><p>Components use block, element and variant naming: component, component__element, component--variant.</p></article></div>
      </section>
    </div></section></>;
}

function StatePage({ type, navigate }: { type: "404"|"500"|"maintenance"; navigate: (r: Route)=>void }) {
  const content = {
    "404": ["404","This page is not in the ledger.","The address may have changed, or the page may no longer be available."],
    "500": ["500","Something did not balance.","We encountered an unexpected error. Your information has not been submitted."],
    maintenance: ["Service notice","A brief pause for maintenance.","This website is temporarily unavailable while scheduled updates are completed."],
  }[type];
  return <section className={`state-page state-page--${type}`}>
    <div className="state-graphic"><span/><span/><span/><i>{type==="maintenance" ? "—" : content[0]}</i></div>
    <span className="eyebrow"><i/>Bondre Neve & Associates</span><h1>{content[1]}</h1><p>{content[2]}</p>
    <Button onClick={()=>navigate("home")}>Back to Home</Button>
    <div className="state-contact">
      <a href="tel:+919403285122"><Icon name="phone"/><span><small>Call</small>{contact.phone}</span></a>
      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=caombondre%40gmail.com" target="_blank" rel="noreferrer"><Icon name="mail"/><span><small>Email</small>{contact.email}</span></a>
      <a href="https://wa.me/919403285122" target="_blank" rel="noreferrer"><Icon name="whatsapp"/><span><small>WhatsApp</small>Message the office</span></a>
    </div>
  </section>;
}

function OfflineFallback({ onHome }: { onHome: () => void }) {
  return <aside className="offline-fallback" aria-label="Offline contact information">
    <span className="eyebrow"><i/>Offline contact</span>
    <h3>You can still reach the office.</h3>
    <p>Use the details below while the website connection is unavailable.</p>
    <div>
      <a href="tel:+919403285122"><Icon name="phone" size={17}/>{contact.phone}</a>
      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=caombondre%40gmail.com" target="_blank" rel="noreferrer"><Icon name="mail" size={17}/>{contact.email}</a>
      <a href="https://wa.me/919403285122" target="_blank" rel="noreferrer"><Icon name="whatsapp" size={17}/>WhatsApp</a>
    </div>
    <button onClick={onHome}>Back to Home <Icon name="arrow" size={15}/></button>
  </aside>;
}

function FloatingActions({ navigate }: { navigate: (r: Route) => void }) {
  return <div className="floating-actions" aria-label="Contact options">
    <a className="floating-action floating-action--whatsapp" href="https://wa.me/919403285122" target="_blank" rel="noreferrer" aria-label="Chat with Bondre Neve & Associates on WhatsApp"><Icon name="whatsapp"/><span>WhatsApp</span></a>
    <a className="floating-action floating-action--call" href="tel:+919403285122" aria-label="Call Bondre Neve & Associates at +91 9403285122"><Icon name="phone"/><span>Call office</span></a>
    <a className="floating-action floating-action--email" href="https://mail.google.com/mail/?view=cm&fs=1&to=caombondre%40gmail.com" target="_blank" rel="noreferrer" aria-label="Compose an email to caombondre@gmail.com in Gmail"><Icon name="mail"/><span>Email</span></a>
    <button className="floating-action floating-action--enquire" onClick={()=>navigate("contact")}><Icon name="arrow"/><span>Enquire</span></button>
  </div>;
}

function MobileBar({ navigate }: { navigate: (r: Route) => void }) {
  return <div className="mobile-bar"><a href="tel:+919403285122"><Icon name="phone"/>Call</a><a href="https://wa.me/919403285122" target="_blank" rel="noreferrer"><Icon name="whatsapp"/>WhatsApp</a><button onClick={()=>navigate("contact")}><Icon name="mail"/>Enquire</button></div>;
}

function App() {
  const [route, setRoute] = useState<Route>(routeFromHash);
  const [showDisclaimer, setShowDisclaimer] = useState(() => localStorage.getItem("firm-disclaimer") !== "accepted");
  const [offline, setOffline] = useState(!navigator.onLine);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const online = () => setOffline(false), off = () => setOffline(true);
    const onHashChange = () => { setRoute(routeFromHash()); window.scrollTo({ top: 0 }); };
    window.addEventListener("online", online); window.addEventListener("offline", off);
    window.addEventListener("hashchange", onHashChange);
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("is-visible"); }), { threshold: .12 });
    document.querySelectorAll(".reveal, .reveal-stagger").forEach(el => observer.observe(el));
    return () => { observer.disconnect(); window.removeEventListener("online", online); window.removeEventListener("offline", off); window.removeEventListener("hashchange", onHashChange); };
  }, [route]);
  useEffect(() => {
    const cursor = document.querySelector(".cursor-dot") as HTMLElement;
    const move = (e: MouseEvent) => { if(cursor){ cursor.style.left=`${e.clientX}px`; cursor.style.top=`${e.clientY}px`; } };
    window.addEventListener("mousemove",move); return()=>window.removeEventListener("mousemove",move);
  },[]);
  const navigate = (next: Route) => {
    if (next === route) { window.scrollTo({top:0,behavior:"smooth"}); return; }
    setLoading(true); window.setTimeout(()=>{ window.location.hash = `/${next}`; setRoute(next); setLoading(false); window.scrollTo({top:0}); }, 280);
  };
  const pages: Record<Route, ReactNode> = {
    home:<Home navigate={navigate}/>, about:<About navigate={navigate}/>, services:<Services navigate={navigate}/>,
    service:<ServiceDetail navigate={navigate}/>, industries:<Industries/>, contact:<Contact/>,
    privacy:<Legal type="privacy"/>, terms:<Legal type="terms"/>, disclaimer:<Legal type="disclaimer"/>,
    motion:<MotionPage/>,
    "style-guide":<StyleGuidePage/>,
    "404":<StatePage type="404" navigate={navigate}/>, "500":<StatePage type="500" navigate={navigate}/>,
    maintenance:<StatePage type="maintenance" navigate={navigate}/>,
  };
  return <div className="app">
    <div className="cursor-dot"/><div className={`page-loader ${loading ? "page-loader--active":""}`} />
    {offline && <><div className="offline-banner" role="status"><span><b>You’re offline.</b> Some website features may be unavailable.</span><button onClick={()=>setOffline(false)} aria-label="Dismiss offline notice"><Icon name="close" size={16}/></button></div><OfflineFallback onHome={()=>navigate("home")}/></>}
    <Header route={route} navigate={navigate}/>
    <main className={`page ${loading ? "page--leaving":""}`}>{pages[route]}</main>
    {!["404","500","maintenance"].includes(route) && <Footer navigate={navigate}/>}
    <FloatingActions navigate={navigate}/>
    <MobileBar navigate={navigate}/>
    {showDisclaimer && <DisclaimerModal onAccept={()=>{localStorage.setItem("firm-disclaimer","accepted");setShowDisclaimer(false)}}/>}
  </div>;
}

export default App;
