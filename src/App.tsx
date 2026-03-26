import { useState, useEffect, useRef } from 'react'
import './App.css'
import { Heart, Users, MapPin, Vote, ChevronDown, Menu, X, ExternalLink, Play, Share2, Calendar, Target, Shield, Megaphone } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const STATS = [
  { label: 'Voters Registered (Day 1)', value: '641+', icon: Vote },
  { label: 'Counties Reached', value: '47', icon: MapPin },
  { label: 'Online Reach', value: '10M+', icon: Users },
  { label: 'Target New Voters', value: '6.3M', icon: Target },
]

const TIMELINE = [
  {
    date: 'March 2026',
    title: 'The Spark',
    desc: 'A young Kenyan woman documents her grueling journey to register as a voter on TikTok. Her video goes viral, inspiring thousands.',
  },
  {
    date: 'March 17, 2026',
    title: 'Kasarani Chapter',
    desc: 'Ademba Allans creates a WhatsApp group dubbed "Kasarani Chapter" and mobilizes 641 new voter registrations in a single day at the IEBC centre.',
  },
  {
    date: 'March 18, 2026',
    title: '#TukoKadi Goes Viral',
    desc: 'The hashtag #TukoKadi trends across TikTok, X, and Instagram. Gen Z shares registration selfies, "Voter Found!" declarations, and "registration dates."',
  },
  {
    date: 'March 22, 2026',
    title: 'National Recognition',
    desc: 'Movement leaders Ademba Allans and Sophie Njehia appear on Citizen TV, declaring TukoKadi "a force to reckon with" and warning politicians against co-option.',
  },
  {
    date: 'March 23, 2026',
    title: 'People-Sponsored',
    desc: '"We are sponsored by the people... we are sponsored by those who died in 2024," Ademba declares on national TV, framing the movement as citizen-powered accountability.',
  },
  {
    date: 'March 24, 2026',
    title: 'Nationwide Momentum',
    desc: 'Youth organisers across all 47 counties mobilize physically, visiting IEBC registration centres. The movement firmly rejects political hijacking.',
  },
]

const LEADERS = [
  {
    name: 'Ademba Allans',
    role: 'Founder & Lead Voice',
    bio: 'Photojournalist and activist from Kasarani, Nairobi. Started the movement with a single tweet seeking 100,000 unregistered voters. His grassroots approach turned digital activism into real-world registration drives.',
    quote: '"We are sponsored by the people... we are sponsored by those who died in 2024."',
  },
  {
    name: 'Sophie Njehia',
    role: 'Youth Leader & Co-Lead',
    bio: 'Youth activist who has been instrumental in scaling the movement nationally. Sophie has been vocal about keeping the initiative independent and citizen-driven, calling it "the solution to problems facing Kenyans."',
    quote: '"TukoKadi is the solution to problems that continue to face Kenyans."',
  },
  {
    name: 'Hanifa',
    role: 'Activist & Mobilizer',
    bio: 'Key activist who called on influencers to unite and make the voter registration trend "massive and long-term," focusing on reaching unregistered Gen Zs in universities across Kenya.',
    quote: '"Most unregistered Gen Zs are in universities. We must reach them there."',
  },
]

/* ------------------------------------------------------------------ */
/*  COMPONENTS                                                         */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Leaders', href: '#leaders' },
    { label: 'Impact', href: '#impact' },
    { label: 'Media', href: '#media' },
    { label: 'Get Involved', href: '#involved' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 shadow-lg shadow-red-900/20 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        <a href="#" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-black text-white text-lg">
            TK
          </div>
          <span className="text-white font-extrabold text-xl tracking-tight">
            Tuko<span className="text-red-500">Kadi</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-gray-300 hover:text-red-400 transition text-sm font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#involved"
            className="ml-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-bold transition"
          >
            Support Us
          </a>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black/95 border-t border-red-900/40 px-4 pb-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-gray-300 hover:text-red-400 transition text-base font-medium border-b border-gray-800"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#involved"
            onClick={() => setOpen(false)}
            className="block mt-3 bg-red-600 hover:bg-red-700 text-white text-center px-5 py-3 rounded-full text-base font-bold transition"
          >
            Support Us
          </a>
        </div>
      )}
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black">
        <img
          src="/images/hero-youth.jpg"
          alt="Kenyan youth at a civic engagement rally"
          className="w-full h-full object-cover opacity-30"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = 'https://placehold.co/1600x900/111/333?text=Tuko+Kadi'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
      </div>

      {/* Diagonal accent stripes */}
      <div className="absolute top-0 right-0 w-96 h-full opacity-20">
        <div className="absolute top-0 right-0 w-32 h-full bg-red-600 -skew-x-12 translate-x-16" />
        <div className="absolute top-0 right-24 w-16 h-full bg-green-600 -skew-x-12 translate-x-16" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-300 text-sm font-medium">Movement Active Across 47 Counties</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white leading-none tracking-tighter mb-4">
          TUKO
          <span className="text-red-500"> KADI</span>
        </h1>

        <p className="text-xl sm:text-2xl text-green-400 font-bold mb-6 tracking-wide">
          "We Have The Card" &mdash; Kenya's Gen Z Voter Revolution
        </p>

        <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          A citizen-led, youth-driven movement mobilizing millions of young Kenyans
          to register as voters and reclaim their future through the ballot ahead of the 2027 General Election.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#involved"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg shadow-red-600/30"
          >
            Join The Movement
          </a>
          <a
            href="#about"
            className="border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-8 py-4 rounded-full text-lg font-bold transition-all"
          >
            Learn More
          </a>
        </div>

        <a
          href="#about"
          className="inline-block mt-16 text-gray-500 animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  )
}

function StatsBar() {
  return (
    <section className="relative bg-gradient-to-r from-red-700 via-red-600 to-green-700 py-1">
      <div className="bg-black/90 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center group">
              <s.icon className="mx-auto mb-2 text-red-400 group-hover:text-green-400 transition" size={28} />
              <p className="text-3xl md:text-4xl font-black text-white">{s.value}</p>
              <p className="text-gray-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="bg-black py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-red-500 font-bold text-sm tracking-widest uppercase">The Movement</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-6 leading-tight">
            What is <span className="text-red-500">Tuko Kadi</span>?
          </h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              <strong className="text-white">Tuko Kadi</strong> (Sheng for <em>"We Have the Card"</em>) is a
              citizen-led mass voter registration movement that began in March 2026. Born on social media and
              brought to life on the streets, it represents Kenya's Gen Z stepping up to shape their country's
              future through the ballot.
            </p>
            <p>
              The movement was sparked when a young Kenyan woman documented her challenging journey to register
              as a voter in a viral TikTok video. Despite long queues, travel distances, and costs, her message
              resonated: <em>civic duty requires effort</em>. The video inspired a wave of youth-led registration
              drives across the country.
            </p>
            <p>
              Unlike previous voter campaigns, #TukoKadi has tapped into youth culture, blending civic responsibility
              with digital expression. Young people share photos, videos, and celebratory posts after registering.
              Some couples have even turned it into "registration dates," combining personal milestones with civic engagement.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-8">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-black bg-gradient-to-br from-red-600 to-green-700 flex items-center justify-center text-white text-xs font-bold"
                >
                  {['AK', 'SN', 'HF', 'GZ', 'KE'][i - 1]}
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-sm">Thousands of youth leaders mobilizing nationwide</p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-red-600/20 to-green-600/20 rounded-2xl blur-xl" />
          <img
            src="/images/kenya-flag.jpg"
            alt="Kenyan youth with national flag at a civic engagement event"
            className="relative rounded-2xl shadow-2xl w-full object-cover aspect-square"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = 'https://placehold.co/600x600/1a1a1a/dc2626?text=Tuko+Kadi'
            }}
          />
          <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-red-900/30">
            <p className="text-white font-bold">#TukoKadi #VoterFound</p>
            <p className="text-gray-400 text-sm">Trending across TikTok, X, and Instagram</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineSection() {
  return (
    <section id="timeline" className="bg-gradient-to-b from-black via-gray-950 to-black py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-green-500 font-bold text-sm tracking-widest uppercase">Our Journey</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">
            How It <span className="text-red-500">Started</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600 via-green-600 to-red-600" />

          {TIMELINE.map((t, i) => (
            <div
              key={i}
              className={`relative flex items-start gap-4 mb-12 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-red-600 border-4 border-black z-10 mt-1" />

              <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <span className="text-green-400 text-sm font-bold">{t.date}</span>
                <h3 className="text-xl font-black text-white mt-1 mb-2">{t.title}</h3>
                <p className="text-gray-400 leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LeadersSection() {
  return (
    <section id="leaders" className="bg-black py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-red-500 font-bold text-sm tracking-widest uppercase">Voices of Change</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">
            Movement <span className="text-green-500">Leaders</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            The youth leaders who turned a hashtag into a nationwide civic revolution
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {LEADERS.map((l) => (
            <div
              key={l.name}
              className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:border-red-900/50 transition group"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-green-700 flex items-center justify-center text-white text-2xl font-black mb-4 group-hover:scale-110 transition">
                {l.name
                  .split(' ')
                  .map((w) => w[0])
                  .join('')}
              </div>
              <h3 className="text-xl font-black text-white">{l.name}</h3>
              <p className="text-red-400 text-sm font-bold mb-3">{l.role}</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{l.bio}</p>
              <blockquote className="border-l-2 border-green-600 pl-3 text-green-300 text-sm italic">
                {l.quote}
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ImpactSection() {
  return (
    <section id="impact" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-black to-green-900/30" />
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-green-500 font-bold text-sm tracking-widest uppercase">Making History</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">
            Our <span className="text-red-500">Impact</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-red-900/30">
            <Shield className="text-red-400 mb-4" size={36} />
            <h3 className="text-2xl font-black text-white mb-3">Independent & Citizen-Driven</h3>
            <p className="text-gray-400 leading-relaxed">
              TukoKadi is not backed by any political party or traditional sponsors. The movement belongs to the
              youth and is driven by the collective experiences and frustrations of Kenyans. Leaders have firmly
              rejected attempts by political figures to appropriate the campaign's messaging.
            </p>
          </div>

          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-green-900/30">
            <Megaphone className="text-green-400 mb-4" size={36} />
            <h3 className="text-2xl font-black text-white mb-3">From Digital to Ground</h3>
            <p className="text-gray-400 leading-relaxed">
              What began as a viral TikTok trend evolved into coordinated ground mobilization. The "Small Circle"
              challenge saw friend groups registering together. Ademba's Kasarani Chapter WhatsApp group became
              the blueprint for county-by-county registration drives nationwide.
            </p>
          </div>

          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-green-900/30">
            <Calendar className="text-green-400 mb-4" size={36} />
            <h3 className="text-2xl font-black text-white mb-3">2027 Election Ready</h3>
            <p className="text-gray-400 leading-relaxed">
              With the IEBC's 30-day mass registration drive targeting 6.3 million new voters, TukoKadi is
              ensuring that Gen Z won't just watch from the sidelines. The movement is transforming voter
              registration from a routine exercise into a cultural phenomenon.
            </p>
          </div>

          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-red-900/30">
            <Heart className="text-red-400 mb-4" size={36} />
            <h3 className="text-2xl font-black text-white mb-3">Accountability Through the Ballot</h3>
            <p className="text-gray-400 leading-relaxed">
              The movement's core message is simple: the ballot is the most powerful tool for change. By
              registering en masse, young Kenyans are sending a clear signal to politicians that they will be
              held accountable. As Ademba puts it: "We are the solution."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function MediaSection() {
  return (
    <section id="media" className="bg-black py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-red-500 font-bold text-sm tracking-widest uppercase">In The Media</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">
            Watch & <span className="text-green-500">Share</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Coverage from national media and viral social media moments
          </p>
        </div>

        {/* Video embeds */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-950 rounded-2xl overflow-hidden border border-gray-800 group">
            <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
              <img
                src="/images/community.jpg"
                alt="Community gathering for voter registration"
                className="w-full h-full object-cover opacity-60"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = 'https://placehold.co/800x450/1a1a1a/dc2626?text=Video'
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href="https://www.youtube.com/results?search_query=tuko+kadi+kenya+gen+z+voter+registration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition hover:scale-110"
                >
                  <Play className="text-white ml-1" size={28} />
                </a>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-bold">Tuko Kadi: How Kenyan Gen Zs Are Mobilising</h3>
              <p className="text-gray-500 text-sm mt-1">NTV Kenya - Fixing The Nation</p>
            </div>
          </div>

          <div className="bg-gray-950 rounded-2xl overflow-hidden border border-gray-800 group">
            <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
              <img
                src="/images/smartphone.jpg"
                alt="Youth using smartphones for digital civic engagement"
                className="w-full h-full object-cover opacity-60"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = 'https://placehold.co/800x450/1a1a1a/16a34a?text=Video'
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href="https://www.youtube.com/results?search_query=ademba+allans+tuko+kadi+citizen+tv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition hover:scale-110"
                >
                  <Play className="text-white ml-1" size={28} />
                </a>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-white font-bold">Ademba Allans on JKL Show with Jeff Koinange</h3>
              <p className="text-gray-500 text-sm mt-1">Citizen TV - JKL Show</p>
            </div>
          </div>
        </div>

        {/* News coverage links */}
        <div className="bg-gray-950 rounded-2xl p-6 border border-gray-800">
          <h3 className="text-white font-bold text-lg mb-4">Press Coverage</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: 'How #TukoKadi turned Gen Z voter registration into a national movement', source: 'Top News Kenya', url: 'https://topnews.ke/how-tukokadi-turned-gen-z-voter-registration-into-a-national-movement/' },
              { title: 'Tuko Kadi Initiative Gains Momentum as Gen Z Warns Politicians', source: 'Capital FM', url: 'https://www.capitalfm.co.ke/news/2026/03/tuko-kadi-initiative-gains-momentum-as-gen-z-warns-politicians-against-co-option/' },
              { title: 'Journalist Allans Ademba leads massive Gen Z #TukoKadi voter drive', source: 'Citizen Digital', url: 'https://www.citizen.digital/news/journalist-allans-ademba-leads-massive-gen-z-tukokadi-voter-registration-drive-n379192' },
              { title: 'Ademba Allans: Tuko Kadi movement is sponsored by the people', source: 'The Star', url: 'https://www.the-star.co.ke/news/2026-03-23-ademba-allans-tuko-kadi-is-people-sponsored' },
              { title: 'Gen Z first day mass voter registration drive attracts 641 youths', source: 'The Star', url: 'https://www.the-star.co.ke/news/2026-03-17-gen-z-tuko-kadi-drive-registers-641-in-kasarani' },
              { title: '#TukoKadi youths slam politicians for hijacking voter campaign', source: 'Eastleigh Voice', url: 'https://eastleighvoice.co.ke/news/318015/tukokadi-youths-slam-politicians-for-hijacking-voter-campaign-vow-to-remove-them-from-office' },
            ].map((article) => (
              <a
                key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-900 transition group"
              >
                <ExternalLink className="text-red-500 shrink-0 mt-1 group-hover:text-green-400 transition" size={16} />
                <div>
                  <p className="text-gray-300 text-sm font-medium group-hover:text-white transition">{article.title}</p>
                  <p className="text-gray-600 text-xs mt-1">{article.source}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function GetInvolvedSection() {
  const [copied, setCopied] = useState(false)
  const shareText = "I stand with #TukoKadi! Kenya's Gen Z is registering to vote and reclaiming our future. Have you registered? #VoterFound #Kenya2027"

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="involved" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-green-900" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 text-center">
        <span className="text-green-400 font-bold text-sm tracking-widest uppercase">Take Action</span>
        <h2 className="text-4xl md:text-6xl font-black text-white mt-2 mb-6">
          Join The <span className="text-red-500">Revolution</span>
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-12">
          The movement is people-powered. Here's how you can be part of Kenya's biggest
          youth voter mobilization campaign.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-red-900/30 text-left">
            <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center mb-4">
              <Vote className="text-red-400" size={24} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Register to Vote</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Visit your nearest IEBC registration centre with your national ID. The mass registration
              drive is ongoing across all 47 counties. Don't wait!
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-green-900/30 text-left">
            <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center mb-4">
              <Share2 className="text-green-400" size={24} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Spread the Word</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Share your voter registration journey on TikTok, X, and Instagram using #TukoKadi
              and #VoterFound. Inspire your circle to register!
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-red-900/30 text-left sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center mb-4">
              <Users className="text-red-400" size={24} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Start a Chapter</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Create a WhatsApp group for your community, campus, or county. Follow the Kasarani Chapter
              blueprint: mobilize friends, set a date, and walk to the IEBC office together.
            </p>
          </div>
        </div>

        {/* Share box */}
        <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 max-w-2xl mx-auto">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2 justify-center">
            <Share2 size={18} className="text-green-400" />
            Copy & Share on Social Media
          </h3>
          <p className="text-gray-400 text-sm bg-gray-900 rounded-lg p-4 mb-4 text-left">
            {shareText}
          </p>
          <button
            onClick={handleCopy}
            className={`px-6 py-2 rounded-full text-sm font-bold transition ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {copied ? 'Copied!' : 'Copy to Clipboard'}
          </button>
        </div>

        {/* Social Links */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <a
            href="https://x.com/search?q=%23TukoKadi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black border border-gray-700 hover:border-red-500 text-white px-5 py-3 rounded-full text-sm font-bold transition"
          >
            <span className="font-black">X</span> #TukoKadi
          </a>
          <a
            href="https://www.tiktok.com/search?q=tukokadi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black border border-gray-700 hover:border-green-500 text-white px-5 py-3 rounded-full text-sm font-bold transition"
          >
            TikTok #TukoKadi
          </a>
          <a
            href="https://www.instagram.com/explore/tags/tukokadi/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black border border-gray-700 hover:border-red-500 text-white px-5 py-3 rounded-full text-sm font-bold transition"
          >
            Instagram #TukoKadi
          </a>
        </div>
      </div>
    </section>
  )
}

function DonateSection() {
  return (
    <section id="donate" className="bg-black py-20 md:py-28 border-t border-gray-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-gradient-to-br from-red-950/50 via-black to-green-950/50 rounded-3xl p-8 md:p-12 border border-red-900/30">
          <Heart className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Support The <span className="text-red-500">Movement</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
            TukoKadi is people-powered and people-sponsored. Your contribution helps fund transport
            for youth to reach registration centres, civic education materials, and community mobilization
            across all 47 counties.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { amount: 'KES 500', desc: 'Transport for 5 youths to IEBC centres' },
              { amount: 'KES 2,000', desc: 'Civic education materials for a campus' },
              { amount: 'KES 10,000', desc: 'Fund a full county registration drive' },
            ].map((tier) => (
              <div
                key={tier.amount}
                className="bg-black/60 border border-gray-800 hover:border-red-600 rounded-xl p-5 transition cursor-pointer group"
              >
                <p className="text-2xl font-black text-red-500 group-hover:text-red-400">{tier.amount}</p>
                <p className="text-gray-400 text-sm mt-2">{tier.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-950 rounded-xl p-6 border border-gray-800 max-w-md mx-auto">
            <p className="text-green-400 font-bold mb-2">M-Pesa Paybill</p>
            <p className="text-gray-400 text-sm mb-4">
              To donate, send to the official TukoKadi campaign channels:
            </p>
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center bg-black rounded-lg p-3">
                <span className="text-gray-400 text-sm">Follow on X:</span>
                <a href="https://x.com/search?q=%23TukoKadi" target="_blank" rel="noopener noreferrer" className="text-red-400 font-bold text-sm hover:underline">@TukoKadi</a>
              </div>
              <div className="flex justify-between items-center bg-black rounded-lg p-3">
                <span className="text-gray-400 text-sm">Contact:</span>
                <span className="text-green-400 font-bold text-sm">Via official social channels</span>
              </div>
            </div>
            <p className="text-gray-600 text-xs mt-4">
              Always verify donation channels through official TukoKadi social media accounts before contributing.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-black border-t border-gray-900">
      {/* Kenyan flag stripe */}
      <div className="flex h-1">
        <div className="flex-1 bg-black" />
        <div className="flex-1 bg-red-600" />
        <div className="flex-1 bg-green-600" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-black text-white text-lg">
                TK
              </div>
              <span className="text-white font-extrabold text-xl">
                Tuko<span className="text-red-500">Kadi</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              A citizen-led, youth-driven voter registration movement. Independent of any political party.
              Powered by the people of Kenya.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['About', 'Timeline', 'Leaders', 'Impact', 'Media', 'Get Involved'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  className="block text-gray-500 hover:text-red-400 text-sm transition"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <div className="space-y-2">
              <a
                href="https://x.com/search?q=%23TukoKadi"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-500 hover:text-red-400 text-sm transition"
              >
                X (Twitter) - #TukoKadi
              </a>
              <a
                href="https://www.tiktok.com/search?q=tukokadi"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-500 hover:text-green-400 text-sm transition"
              >
                TikTok - #TukoKadi
              </a>
              <a
                href="https://www.instagram.com/explore/tags/tukokadi/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-500 hover:text-red-400 text-sm transition"
              >
                Instagram - #TukoKadi
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            &copy; 2026 TukoKadi Movement. This is a citizen-driven initiative.
          </p>
          <p className="text-gray-700 text-xs">
            "We are sponsored by the people." &mdash; Ademba Allans
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/*  SCROLL REVEAL WRAPPER                                              */
/* ------------------------------------------------------------------ */

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <Reveal><AboutSection /></Reveal>
      <Reveal><TimelineSection /></Reveal>
      <Reveal><LeadersSection /></Reveal>
      <Reveal><ImpactSection /></Reveal>
      <Reveal><MediaSection /></Reveal>
      <Reveal><GetInvolvedSection /></Reveal>
      <Reveal><DonateSection /></Reveal>
      <Footer />
    </div>
  )
}

export default App
