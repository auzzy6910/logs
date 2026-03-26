import { useState } from 'react'

// ── Data ──────────────────────────────────────────────────────────────────────

const stats = [
  { label: "Day 1 Registrations", value: "641+", desc: "Kasarani, Nairobi" },
  { label: "Counties Active", value: "47", desc: "Nationwide coverage" },
  { label: "Online Reach", value: "10M+", desc: "Across all platforms" },
  { label: "Target Voters", value: "6.3M", desc: "IEBC registration goal" },
  { label: "WhatsApp Chapters", value: "100+", desc: "Community groups" },
  { label: "Registration Centres", value: "1,450+", desc: "IEBC offices nationwide" },
]

const timeline = [
  {
    date: "Early March 2026",
    title: "The Spark",
    desc: 'A young Kenyan woman documents her grueling, nearly full-day journey to register as a voter in a TikTok video. Despite long queues, travel distances, and personal costs, her message resonated widely: civic duty requires effort. The video goes viral, sparking the "Small Circle" trend.',
    detail: 'The "Small Circle" TikTok challenge saw politically-enlightened Gen Z gathering their friends, registering as voters, and sharing videos of their friend groups with verified voter identification details.',
  },
  {
    date: "March 17, 2026",
    title: "Kasarani Chapter",
    desc: `Ademba Allans creates a WhatsApp group dubbed "Kasarani Chapter" and mobilizes 641 new voter registrations in a single day at the IEBC centre within the D.O's offices in Kasarani sub-county.`,
    detail: "The event was slated to kick off at 9:30am, but IEBC staff had already registered 20 people by 8:58am. By midday, 100+ were registered with 40 transfers. By 1pm, 300 new registrations. The day closed at 641.",
  },
  {
    date: "March 18, 2026",
    title: "#TukoKadi Goes Viral",
    desc: 'The hashtag #TukoKadi trends across TikTok, X, and Instagram. Gen Z shares registration selfies, "Voter Found!" declarations, and "registration dates." NTV Kenya features Ademba on Fixing The Nation.',
    detail: 'Some young couples rebranded voter registration as a "registration date," walking hand in hand into IEBC offices and capturing the moment as both a romantic outing and a commitment to the country\'s future.',
  },
  {
    date: "March 21, 2026",
    title: "Influencers Rally",
    desc: 'Celebrities and influencers across Kenya rally behind the #TukoKadi drive, amplifying the voter registration push. Activists Ademba and Hanifa call on influencers to unite and make the movement "massive and long-term."',
    detail: "The influencer support pushed the campaign beyond political circles into mainstream pop culture, reaching demographics that traditional voter drives had failed to engage.",
  },
  {
    date: "March 22, 2026",
    title: "National TV Spotlight",
    desc: 'Movement leaders Ademba Allans and Sophie Njehia appear on Citizen TV Sunday Live. Ademba declares: "TukoKadi is a force to reckon with. Today, tomorrow, 2027 and forever."',
    detail: 'Sophie Njehia stated: "We decided that we are going to pursue the constitutional way... It is the system that we are uprooting, we are doing a complete system overhaul." The appearance on JKL Show with Jeff Koinange drew massive viewership.',
  },
  {
    date: "March 23, 2026",
    title: "People-Sponsored",
    desc: '"We are sponsored by the people\u2026 we are sponsored by those who died in 2024," Ademba declares on Citizen TV. Announces "Buddies Hangout" events at IEBC offices with Bluetooth speakers and TikTok content creation.',
    detail: '"We are going to have Bluetooth speakers, we are going to do TikToks because that\'s how young people connect. We want to make voter registration something that feels natural and exciting, not forced."',
  },
  {
    date: "March 24, 2026",
    title: "Nationwide Surge",
    desc: "Youth organisers across all 47 counties mobilize physically. Kibra, Kisumu, Turkana, Busia \u2014 registration drives pop up everywhere. Movement firmly rejects political hijacking and co-option attempts.",
    detail: 'Ademba posted: "This is the current situation in Kibra #TukoKadi" \u2014 showing massive queues at registration centres. Even President Ruto said "ako kadi," which movement leaders called "intellectual theft."',
  },
  {
    date: "March 25, 2026",
    title: "Niko Kadi Wave",
    desc: 'The phrase evolves: "Niko Kadi" (I have the card) becomes a personal declaration. Young Kenyans across the country proudly show their voter cards online. The movement becomes a cultural phenomenon beyond just registration.',
    detail: 'The movement draws parallels to the classic Kenyan card game "Kadi," where having the right card means you\'re ready to play \u2014 and win.',
  },
]

const leaders = [
  {
    name: "Ademba Allans",
    role: "Founder & Lead Voice",
    handle: "@Ademba_47",
    bio: 'Photojournalist and citizen journalist from Kasarani, Nairobi. Rose to prominence during the 2024 Gen Z-led protests against the Finance Bill. His frontline coverage earned him recognition as a "silent hero" and a feature in the BBC documentary "Blood Parliament." Started TukoKadi with a single tweet seeking 100,000 unregistered voters in Kasarani.',
    quote: '"We are sponsored by the people\u2026 we are sponsored by those who died in 2024."',
    achievements: ["641 voters registered in Day 1", "BBC Blood Parliament documentary", "JKL Show with Jeff Koinange", "NTV Fixing The Nation feature"],
    color: "from-red-600 to-red-800",
  },
  {
    name: "Sophie Njehia",
    role: "Youth Leader & Co-Lead",
    handle: "@SophieNjehia",
    bio: 'Youth activist and movement co-lead who has been instrumental in scaling TukoKadi nationally. Sophie framed the movement as "a representation of the Gen Z movement \u2014 a collective of people with progressive ideas about our nation." She advocates for pursuing change through the ballot rather than street protests.',
    quote: '"We decided that we are going to pursue the constitutional way which is getting Ruto out in the ballot. Not only Ruto, it is him and every single MP who has let the people of Kenya down. It is the system that we are uprooting."',
    achievements: ["Citizen TV Sunday Live panelist", "National youth organizer", "Advocate for constitutional change", "Campus mobilization leader"],
    color: "from-green-600 to-green-800",
  },
  {
    name: "Hanifa",
    role: "Activist & University Mobilizer",
    handle: "@Hanifa_KE",
    bio: 'Key activist who has been at the forefront of reaching unregistered Gen Zs in universities across Kenya. Called on influencers to unite and make the voter registration trend "massive and long-term," recognizing that most unregistered young Kenyans are on university campuses.',
    quote: '"Most unregistered Gen Zs are in universities. We must reach them there. This has to be massive and long-term."',
    achievements: ["University campus mobilization", "Influencer coalition builder", "Digital strategy lead", "Campus chapter coordinator"],
    color: "from-red-700 to-green-700",
  },
  {
    name: "Willie Oeba",
    role: "Co-Organizer & Ground Mobilizer",
    handle: "@WillieOeba",
    bio: "Co-spearheaded the Kasarani voter registration initiative alongside Ademba, targeting 600 new registrations on the first day. Together they surpassed expectations with 641 registered. Key ground organizer ensuring logistics, IEBC coordination, and community engagement.",
    quote: '"When young people show up, the system has to respond. We showed them what organized youth can do."',
    achievements: ["Kasarani Day 1 co-organizer", "641 target exceeded", "IEBC liaison coordinator", "Ground logistics manager"],
    color: "from-green-700 to-green-900",
  },
]

const counties = [
  { name: "Nairobi", detail: "641 registered Day 1 in Kasarani alone", status: "active" },
  { name: "Kibra", detail: "Massive queues reported at IEBC centres", status: "active" },
  { name: "Kisumu", detail: "Youth-led registration drives ongoing", status: "active" },
  { name: "Mombasa", detail: "Coastal youth chapters mobilizing", status: "active" },
  { name: "Turkana", detail: "Remote county registration expanding", status: "growing" },
  { name: "Busia", detail: "Cross-border awareness campaign", status: "growing" },
  { name: "Nakuru", detail: "Rift Valley youth chapters active", status: "active" },
  { name: "Kiambu", detail: "University campus drives ongoing", status: "active" },
  { name: "Machakos", detail: "Community-driven registration events", status: "growing" },
  { name: "Kakamega", detail: "Western Kenya mobilization growing", status: "growing" },
  { name: "Uasin Gishu", detail: "Eldoret-based youth chapters", status: "growing" },
  { name: "Kilifi", detail: "Coastal community engagement", status: "growing" },
]

const videos = [
  {
    id: "OQsBWRilOdg",
    title: "Tuko Kadi: How Kenyan GenZs Are Mobilising To Register As Voters",
    channel: "NTV Kenya \u2014 Fixing The Nation",
    views: "48K views",
    desc: "Guest: Allan Ademba, Tuko Kadi Initiative Lead. In-depth interview about how the movement started and where it's headed.",
  },
  {
    id: "E3wn8by5Mtw",
    title: '"Tuko Kadi" movement sparks youth political awakening',
    channel: "KTN News Kenya",
    views: "47K views",
    desc: "KTN News coverage of the TukoKadi movement, exploring how social media mobilization is translating into real-world voter registration.",
  },
  {
    id: "AEXHZIGmwgE",
    title: "Gen-Z mobilizes for 2027 as youth voter registration surges",
    channel: "YouTube News",
    views: "Trending",
    desc: "Coverage of the nationwide surge in Gen Z voter registration driven by the TukoKadi and NikoKadi campaigns.",
  },
]

const pressArticles = [
  { title: "How #TukoKadi turned Gen Z voter registration into a national movement", source: "Top News Kenya", date: "Mar 18", url: "https://topnews.ke/how-tukokadi-turned-gen-z-voter-registration-into-a-national-movement/" },
  { title: "Tuko Kadi Initiative Gains Momentum as Gen Z Warns Politicians Against Co-option", source: "Capital FM", date: "Mar 24", url: "https://www.capitalfm.co.ke/news/2026/03/tuko-kadi-initiative-gains-momentum-as-gen-z-warns-politicians-against-co-option/" },
  { title: "Journalist Allans Ademba leads massive Gen Z #TukoKadi voter drive", source: "Citizen Digital", date: "Mar 17", url: "https://www.citizen.digital/news/journalist-allans-ademba-leads-massive-gen-z-tukokadi-voter-registration-drive-n379192" },
  { title: "Ademba Allans: Tuko Kadi movement is sponsored by the people", source: "The Star", date: "Mar 23", url: "https://www.the-star.co.ke/news/2026-03-23-ademba-allans-tuko-kadi-is-people-sponsored" },
  { title: "Gen Z first day mass voter registration drive attracts 641 youths", source: "The Star", date: "Mar 17", url: "https://www.the-star.co.ke/news/2026-03-17-gen-z-tuko-kadi-drive-registers-641-in-kasarani" },
  { title: "#TukoKadi youths slam politicians for hijacking voter campaign", source: "Eastleigh Voice", date: "Mar 23", url: "https://eastleighvoice.co.ke/news/318015/tukokadi-youths-slam-politicians-for-hijacking-voter-campaign-vow-to-remove-them-from-office" },
  { title: "TukoKadi is a force to reckon with; movement leads Ademba and Sophie say", source: "Citizen Digital", date: "Mar 22", url: "https://www.citizen.digital/news/tukokadi-is-a-force-to-reckon-with-movement-leads-ademba-and-sophie-say-n379499" },
  { title: "Celebrities Rally Behind #TukoKadi Drive as Voter Registration Gains Momentum", source: "YNews Digital", date: "Mar 21", url: "https://ynews.digital/newsflash/celebrities-rally-behind-tukokadi-drive-as-youth-voter-registration-push-gains-momentum/" },
  { title: "Gen Z Surge: Tuko Kadi and the Youth Political Awakening", source: "NAX Today", date: "Mar 19", url: "https://nax.today/slider-stories-breaking-news-and-top-stories-in-kenya/article/3685/gen-z-surge-tuko-kadi-and-the-youth-political-awakening" },
  { title: "NikoKadi: How Gen Z is Leading a Voter Registration Revolution", source: "Kenya Election Tracker", date: "Mar 18", url: "https://kenyaelectionstracker.com/news-article/730" },
  { title: "Tuko Kadi convener to hold buddies hangouts at IEBC offices", source: "The Star", date: "Mar 23", url: "https://www.the-star.co.ke/news/2026-03-23-we-will-hold-buddies-hangout-at-iebc-offices-to-drive-youth-voter-registration-says-ademba-allans" },
  { title: "Youth surge as Niko Kadi movement gains momentum", source: "The Standard", date: "Mar 24", url: "https://www.standardmedia.co.ke/breaking-news/article/2001543741/youth-surge-as-niko-kadi-movement-gains-momentum-ahead-of-voter-registration-drive" },
]

const faq = [
  {
    q: 'What does "Tuko Kadi" mean?',
    a: '"Tuko Kadi" is Sheng (Kenyan slang) meaning "We Have the Card." It refers to having a voter registration card. "Niko Kadi" means "I have the card" \u2014 a personal declaration of readiness to vote.',
  },
  {
    q: "Who started the TukoKadi movement?",
    a: 'The movement was started by Ademba Allans, a photojournalist and citizen journalist from Kasarani, Nairobi. He rose to prominence during the 2024 Gen Z protests and was featured in the BBC documentary "Blood Parliament." He started TukoKadi with a tweet seeking 100,000 unregistered voters.',
  },
  {
    q: "How can I register to vote?",
    a: "Visit your nearest IEBC (Independent Electoral and Boundaries Commission) registration centre with your national ID card. The IEBC has 1,450+ centres across all 47 counties. The ongoing mass registration drive targets 6.3 million new voters before the 2027 elections.",
  },
  {
    q: "Is TukoKadi affiliated with any political party?",
    a: 'No. TukoKadi is strictly citizen-driven and independent of all political parties. The movement leaders have publicly rejected attempts by politicians \u2014 including President Ruto \u2014 to co-opt or claim the campaign. As Ademba says: "We are sponsored by the people."',
  },
  {
    q: "How can I start a chapter in my area?",
    a: "Create a WhatsApp group for your community, campus, or county following the Kasarani Chapter blueprint: invite friends, set a date, coordinate with your local IEBC office, and walk to register together. Share your experience on social media using #TukoKadi.",
  },
  {
    q: 'What is the "Buddies Hangout" concept?',
    a: 'Buddies Hangout events transform voter registration from a bureaucratic process into a social experience. They feature music (Bluetooth speakers), TikTok content creation, and peer-driven mobilization at IEBC offices. As Ademba says: "That\'s how young people connect."',
  },
  {
    q: 'What was the "Small Circle" challenge?',
    a: 'The "Small Circle" was a viral TikTok trend where Gen Z gathered their friend groups, registered as voters together, and shared videos showing their verified voter identification details. It was the precursor to the broader TukoKadi movement.',
  },
  {
    q: "Why is voter registration important for 2027?",
    a: "The 2027 General Election is a critical opportunity for Kenya's Gen Z to shape the country's leadership. With the IEBC targeting 6.3 million new voters, mass registration ensures young people's voices are represented at the ballot box \u2014 the most powerful tool for democratic accountability.",
  },
]

// ── Components ────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = ["About", "Timeline", "Leaders", "Counties", "Videos", "Press", "FAQ", "Get Involved"]
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <span className="bg-red-600 text-white font-bold text-sm px-2 py-1 rounded">TK</span>
          <span className="text-white font-bold text-lg">Tuko<span className="text-red-500">Kadi</span></span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`} className="text-gray-300 hover:text-white text-sm transition-colors">{l}</a>
          ))}
          <a href="#support" className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-full transition-colors">Support Us</a>
        </div>
        <button className="md:hidden text-gray-300" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-4 space-y-3">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`} className="block text-gray-300 hover:text-white text-sm" onClick={() => setOpen(false)}>{l}</a>
          ))}
          <a href="#support" className="block bg-red-600 text-white text-sm px-4 py-2 rounded-full text-center" onClick={() => setOpen(false)}>Support Us</a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-gray-900 via-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-gray-800/80 border border-gray-700 rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-red-300 text-sm font-medium">Movement Active Across 47 Counties</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-4">
          TUKO <span className="text-red-500">KADI</span>
        </h1>
        <p className="text-green-500 text-xl md:text-2xl font-semibold mb-6">
          "We Have The Card" &mdash; Kenya's Gen Z Voter Revolution
        </p>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-4">
          A citizen-led, youth-driven movement mobilizing millions of young Kenyans to register as voters and reclaim their future through the ballot ahead of the 2027 General Election.
        </p>
        <p className="text-gray-500 text-sm mb-8">Founded by Ademba Allans &bull; Kasarani, Nairobi &bull; March 2026</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#get-involved" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition-colors">Join The Movement</a>
          <a href="#videos" className="border border-green-500 text-green-400 hover:bg-green-500/10 font-semibold px-8 py-3 rounded-full transition-colors">Watch Videos</a>
          <a href="#about" className="border border-gray-600 text-gray-300 hover:bg-gray-700/50 font-semibold px-8 py-3 rounded-full transition-colors">Learn More</a>
        </div>
      </div>
      <a href="#stats" className="absolute bottom-8 text-gray-500 animate-bounce">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </a>
    </section>
  )
}

function Stats() {
  return (
    <section id="stats" className="py-12 bg-gray-900/50 border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {stats.map(s => (
          <div key={s.label} className="text-center">
            <div className="text-red-500 text-3xl md:text-4xl font-black mb-1">{s.value}</div>
            <div className="text-white text-sm font-semibold">{s.label}</div>
            <div className="text-gray-500 text-xs">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-red-500 text-sm font-bold tracking-widest uppercase mb-2">THE MOVEMENT</p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-8">What is <span className="text-red-500">Tuko Kadi</span>?</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p><strong className="text-white">Tuko Kadi</strong> (Sheng for <em>"We Have the Card"</em>) is a citizen-led mass voter registration movement that began in March 2026. Born on social media and brought to life on the streets, it represents Kenya's Gen Z stepping up to shape their country's future through the ballot.</p>
            <p>The movement was sparked when a young Kenyan woman documented her challenging, nearly full-day journey to register as a voter in a viral TikTok video. Despite long queues, travel distances, and costs, her message resonated: <em>civic duty requires effort</em>. Her video inspired the "Small Circle" TikTok challenge where friend groups registered together and shared videos with their verified voter IDs.</p>
            <p>Photojournalist <strong className="text-white">Ademba Allans</strong>, who rose to prominence during the 2024 Gen Z-led protests against the Finance Bill and was featured in the BBC documentary <em>"Blood Parliament,"</em> took the online trend offline. He created a WhatsApp group called "Kasarani Chapter" and organized a mass registration drive that registered <strong className="text-green-500">641 new voters</strong> in a single day.</p>
            <p>Unlike previous voter campaigns, #TukoKadi has tapped into youth culture, blending civic responsibility with digital expression. Young people share celebratory posts after registering, using the phrase "Voter Found!" Some couples have even turned it into "registration dates," combining personal milestones with civic engagement.</p>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex -space-x-2">
                {["AA", "SN", "HF", "WO", "GZ"].map(initials => (
                  <div key={initials} className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-green-700 flex items-center justify-center text-white text-xs font-bold border-2 border-gray-900">{initials}</div>
                ))}
              </div>
              <span className="text-gray-400 text-sm">Thousands of youth leaders mobilizing nationwide</span>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-gray-800 aspect-video flex items-end">
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop" alt="Young people studying and organizing" className="absolute inset-0 w-full h-full object-cover" />
            <div className="relative z-10 bg-gradient-to-t from-black/90 to-transparent p-6 w-full">
              <p className="text-white font-bold">#TukoKadi &nbsp; #NikoKadi &nbsp; #VoterFound</p>
              <p className="text-gray-400 text-sm">Trending across TikTok, X, and Instagram</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Timeline() {
  const [expanded, setExpanded] = useState<number | null>(null)
  return (
    <section id="timeline" className="py-20 md:py-28 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-center text-green-500 text-sm font-bold tracking-widest uppercase mb-2">OUR JOURNEY</p>
        <h2 className="text-center text-4xl md:text-5xl font-black text-white mb-4">How It <span className="text-green-500">Started</span></h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">From a single TikTok video to a nationwide civic revolution &mdash; the story of TukoKadi unfolds in days, not months.</p>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-600/30 -translate-x-1/2" />
          {timeline.map((item, i) => (
            <div key={i} className={`relative flex items-start mb-16 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-900 z-10" />
              <div className={`w-full md:w-5/12 ${i % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12 md:text-right'}`}>
                <p className="text-green-500 text-sm font-semibold mb-1">{item.date}</p>
                <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                {expanded === i && (
                  <p className="text-gray-500 text-sm mt-3 italic">{item.detail}</p>
                )}
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="text-red-500 hover:text-red-400 text-sm font-medium mt-2 inline-flex items-center gap-1"
                >
                  {expanded === i ? 'Show less' : 'Read more'} &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Leaders() {
  return (
    <section id="leaders" className="py-20 md:py-28 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-red-500 text-sm font-bold tracking-widest uppercase mb-2">THE PEOPLE</p>
        <h2 className="text-center text-4xl md:text-5xl font-black text-white mb-4">Movement <span className="text-red-500">Leaders</span></h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">The voices driving Kenya's largest youth voter registration movement.</p>
        <div className="grid md:grid-cols-2 gap-8">
          {leaders.map(leader => (
            <div key={leader.name} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${leader.color} flex items-center justify-center text-white font-bold text-lg shrink-0`}>
                  {leader.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{leader.name}</h3>
                  <p className="text-gray-500 text-sm">{leader.role}</p>
                  <p className="text-green-500 text-sm">{leader.handle}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{leader.bio}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {leader.achievements.map(a => (
                  <span key={a} className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-700">
                    <span className="text-green-500 mr-1">&bull;</span>{a}
                  </span>
                ))}
              </div>
              <blockquote className="text-red-300/80 text-sm italic border-l-2 border-red-600 pl-4">{leader.quote}</blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Counties() {
  return (
    <section id="counties" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-950/30 via-gray-900 to-red-950/20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <p className="text-center text-green-500 text-sm font-bold tracking-widest uppercase mb-2">NATIONWIDE REACH</p>
        <h2 className="text-center text-4xl md:text-5xl font-black text-white mb-4">Movement Across <span className="text-green-500">47 Counties</span></h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
          "Kenya does not revolve around Nairobi. I want to see lines of young people registering in Turkana, Busia, Kisumu, and every other county." &mdash; Ademba Allans
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {counties.map(c => (
            <div key={c.name} className="bg-gray-900/80 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-3 mb-1">
                <span className={`w-2.5 h-2.5 rounded-full ${c.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <h3 className="text-white font-bold">{c.name}</h3>
              </div>
              <p className="text-gray-400 text-sm ml-5.5">{c.detail}</p>
              <p className={`text-sm font-medium ml-5.5 ${c.status === 'active' ? 'text-green-500' : 'text-yellow-500'}`}>
                {c.status === 'active' ? 'Active' : 'Growing'}
              </p>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm mt-8">+ 35 more counties with active TukoKadi chapters. The movement reaches every corner of Kenya.</p>
      </div>
    </section>
  )
}

function Videos() {
  return (
    <section id="videos" className="py-20 md:py-28 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-red-500 text-sm font-bold tracking-widest uppercase mb-2">WATCH</p>
        <h2 className="text-center text-4xl md:text-5xl font-black text-white mb-4">Videos & <span className="text-red-500">Coverage</span></h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">Media coverage and key moments from the TukoKadi movement.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {videos.map(v => (
            <div key={v.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
              <div className="aspect-video relative">
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-sm mb-1">{v.title}</h3>
                <p className="text-red-500 text-xs font-medium">{v.channel}</p>
                <p className="text-gray-500 text-xs">{v.views}</p>
                <p className="text-gray-400 text-xs mt-2">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-8 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="aspect-video">
            <iframe
              src="https://www.youtube.com/embed/OQsBWRilOdg"
              title="Ademba Allans on NTV Kenya"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <p className="text-red-500 text-sm font-bold tracking-widest uppercase mb-2">FEATURED INTERVIEW</p>
            <h3 className="text-white text-2xl font-bold mb-4">Ademba Allans on NTV Kenya</h3>
            <p className="text-gray-400 leading-relaxed mb-4">The full 49-minute interview on NTV Kenya's "Fixing The Nation" program. Ademba discusses the origins of TukoKadi, the vision for 2027, and why Gen Z's political awakening is different from anything Kenya has seen before.</p>
            <p className="text-gray-500 text-sm">&#8599; 48K+ views &nbsp;&nbsp; &#9201; 49:30</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Press() {
  return (
    <section id="press" className="py-20 md:py-28 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-green-500 text-sm font-bold tracking-widest uppercase mb-2">IN THE NEWS</p>
        <h2 className="text-center text-4xl md:text-5xl font-black text-white mb-4">Press <span className="text-green-500">Coverage</span></h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">TukoKadi in Kenya's leading media outlets.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pressArticles.map((a, i) => (
            <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" className="bg-gray-800/50 border border-gray-800 rounded-xl p-5 hover:border-gray-600 hover:bg-gray-800/80 transition-all group block">
              <p className="text-white font-semibold text-sm mb-2 group-hover:text-red-400 transition-colors">{a.title}</p>
              <div className="flex items-center justify-between">
                <span className="text-green-500 text-xs font-medium">{a.source}</span>
                <span className="text-gray-600 text-xs">{a.date}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  return (
    <section id="faq" className="py-20 md:py-28 bg-gray-950">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-center text-red-500 text-sm font-bold tracking-widest uppercase mb-2">QUESTIONS</p>
        <h2 className="text-center text-4xl md:text-5xl font-black text-white mb-16">Frequently <span className="text-green-500">Asked</span></h2>
        <div className="space-y-3">
          {faq.map((item, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full text-left px-6 py-4 flex items-center justify-between text-white font-medium hover:bg-gray-800/50 transition-colors"
              >
                {item.q}
                <svg className={`w-5 h-5 text-gray-500 transition-transform shrink-0 ml-4 ${openIdx === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {openIdx === i && (
                <div className="px-6 pb-4 text-gray-400 text-sm leading-relaxed">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GetInvolved() {
  const [copied, setCopied] = useState(false)
  const shareText = "I'm joining #TukoKadi \u2014 Kenya's Gen Z voter registration movement. Register to vote and reclaim your future! \ud83c\uddf0\ud83c\uddea\u2705 #NikoKadi #VoterFound"

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="get-involved" className="py-20 md:py-28 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-green-500 text-sm font-bold tracking-widest uppercase mb-2">TAKE ACTION</p>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Get <span className="text-green-500">Involved</span></h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">Join millions of Kenyans taking control of their future. Every registration counts.</p>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="text-3xl mb-3">&#x1F4CD;</div>
            <h3 className="text-white font-bold mb-2">Register to Vote</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Visit your nearest IEBC registration centre with your national ID. The mass registration drive is ongoing across all 47 counties.</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="text-3xl mb-3">&#x1F4F1;</div>
            <h3 className="text-white font-bold mb-2">Start a Chapter</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Create a WhatsApp group for your area, rally your friends, and organize a group registration drive at your local IEBC office.</p>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="text-3xl mb-3">&#x1F4E3;</div>
            <h3 className="text-white font-bold mb-2">Spread the Word</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Share your registration journey on social media with #TukoKadi. Inspire your circle to join the movement.</p>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
          <p className="text-gray-300 text-sm mb-4">{shareText}</p>
          <button
            onClick={handleCopy}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full text-sm transition-colors"
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: "X #TukoKadi", href: "https://twitter.com/hashtag/TukoKadi" },
            { label: "TikTok #TukoKadi", href: "https://tiktok.com/tag/tukokadi" },
            { label: "Instagram #TukoKadi", href: "https://instagram.com/explore/tags/tukokadi" },
            { label: "@Ademba_47", href: "https://twitter.com/Ademba_47" },
          ].map(link => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 px-5 py-2 rounded-full text-sm transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Support() {
  return (
    <section id="support" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-950/20 via-gray-900 to-red-950/20" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="text-4xl mb-4">&#x1F91D;</div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Support The <span className="text-green-500">Movement</span></h2>
        <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">TukoKadi is people-powered and people-sponsored. Your contribution helps fund transport for youth to reach registration centres, civic education materials, and community mobilization across all 47 counties.</p>
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          {[
            { amount: "KES 500", desc: "Transport for 5 youths to IEBC centres" },
            { amount: "KES 2,000", desc: "Civic education materials for a campus" },
            { amount: "KES 10,000", desc: "Fund a full county registration drive" },
          ].map(tier => (
            <div key={tier.amount} className="bg-gray-900/80 border border-gray-800 rounded-xl p-6">
              <div className="text-red-500 text-2xl font-black mb-2">{tier.amount}</div>
              <p className="text-gray-400 text-sm">{tier.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-6 max-w-md mx-auto">
          <h3 className="text-green-500 font-bold mb-2">M-Pesa Paybill</h3>
          <p className="text-gray-400 text-sm mb-4">To donate, contact the official TukoKadi campaign channels:</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center bg-gray-800/50 px-4 py-2 rounded-lg">
              <span className="text-gray-400">Follow on X:</span>
              <span className="text-green-500 font-medium">@Ademba_47</span>
            </div>
            <div className="flex justify-between items-center bg-gray-800/50 px-4 py-2 rounded-lg">
              <span className="text-gray-400">Hashtag:</span>
              <span className="text-green-500 font-medium">#TukoKadi</span>
            </div>
            <div className="flex justify-between items-center bg-gray-800/50 px-4 py-2 rounded-lg">
              <span className="text-gray-400">Contact:</span>
              <span className="text-green-500 font-medium">Via official social channels</span>
            </div>
          </div>
          <p className="text-gray-600 text-xs mt-4">Always verify donation channels through official TukoKadi social media accounts before contributing.</p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-950 border-t-2 border-red-600">
      <div className="border-t-2 border-green-500">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-red-600 text-white font-bold text-sm px-2 py-1 rounded">TK</span>
                <span className="text-white font-bold text-lg">Tuko<span className="text-red-500">Kadi</span></span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">A citizen-led, youth-driven voter registration movement. Independent of any political party. Powered by the people of Kenya.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Navigate</h4>
              <div className="space-y-2">
                {["About", "Timeline", "Leaders", "Counties", "Videos", "Press", "FAQ"].map(l => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="block text-gray-500 hover:text-gray-300 text-sm transition-colors">{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Take Action</h4>
              <div className="space-y-2">
                <a href="#get-involved" className="block text-gray-500 hover:text-gray-300 text-sm transition-colors">Register to Vote</a>
                <a href="#get-involved" className="block text-gray-500 hover:text-gray-300 text-sm transition-colors">Start a Chapter</a>
                <a href="#support" className="block text-gray-500 hover:text-gray-300 text-sm transition-colors">Support the Movement</a>
                <a href="#get-involved" className="block text-gray-500 hover:text-gray-300 text-sm transition-colors">Share on Social Media</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Connect</h4>
              <div className="space-y-2">
                <a href="https://twitter.com/hashtag/TukoKadi" target="_blank" rel="noopener noreferrer" className="block text-gray-500 hover:text-gray-300 text-sm transition-colors">X (Twitter) - #TukoKadi</a>
                <a href="https://tiktok.com/tag/tukokadi" target="_blank" rel="noopener noreferrer" className="block text-gray-500 hover:text-gray-300 text-sm transition-colors">TikTok - #TukoKadi</a>
                <a href="https://instagram.com/explore/tags/tukokadi" target="_blank" rel="noopener noreferrer" className="block text-gray-500 hover:text-gray-300 text-sm transition-colors">Instagram - #TukoKadi</a>
                <a href="https://twitter.com/Ademba_47" target="_blank" rel="noopener noreferrer" className="block text-gray-500 hover:text-gray-300 text-sm transition-colors">@Ademba_47 on X</a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-sm">&copy; 2026 TukoKadi Movement. This is a citizen-driven initiative.</p>
            <p className="text-gray-700 text-sm italic">"We are sponsored by the people." &mdash; Ademba Allans</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── Main App ──────────────────────────────────────────────────────────────────

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Timeline />
      <Leaders />
      <Counties />
      <Videos />
      <Press />
      <FAQ />
      <GetInvolved />
      <Support />
      <Footer />
    </div>
  )
}

export default App
