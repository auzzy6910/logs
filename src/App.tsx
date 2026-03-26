import { useState, useEffect, useRef } from 'react'
import './App.css'
import {
  Heart, Users, MapPin, Vote, ChevronDown, Menu, X, ExternalLink,
  Share2, Target, Shield, Megaphone, BookOpen, Globe,
  MessageCircle, Star, Clock, Smartphone,
  Music, TrendingUp, CheckCircle, ArrowRight, Quote,
  HandHeart, Landmark, Radio, Tv, Newspaper
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const STATS = [
  { label: 'Day 1 Registrations', value: '641+', icon: Vote, desc: 'Kasarani, Nairobi' },
  { label: 'Counties Active', value: '47', icon: MapPin, desc: 'Nationwide coverage' },
  { label: 'Online Reach', value: '10M+', icon: Users, desc: 'Across all platforms' },
  { label: 'Target Voters', value: '6.3M', icon: Target, desc: 'IEBC registration goal' },
  { label: 'WhatsApp Chapters', value: '100+', icon: MessageCircle, desc: 'Community groups' },
  { label: 'Registration Centres', value: '1,450+', icon: Landmark, desc: 'IEBC offices nationwide' },
]

const TIMELINE = [
  {
    date: 'Early March 2026',
    title: 'The Spark',
    desc: 'A young Kenyan woman documents her grueling, nearly full-day journey to register as a voter in a TikTok video. Despite long queues, travel distances, and personal costs, her message resonated widely: civic duty requires effort. The video goes viral, sparking the "Small Circle" trend.',
    detail: 'The "Small Circle" TikTok challenge saw politically-enlightened Gen Z gathering their friends, registering as voters, and sharing videos of their friend groups with verified voter identification details.',
  },
  {
    date: 'March 17, 2026',
    title: 'Kasarani Chapter',
    desc: 'Ademba Allans creates a WhatsApp group dubbed "Kasarani Chapter" and mobilizes 641 new voter registrations in a single day at the IEBC centre within the D.O\'s offices in Kasarani sub-county.',
    detail: 'The event was slated to kick off at 9:30am, but IEBC staff had already registered 20 people by 8:58am. By midday, 100+ were registered with 40 transfers. By 1pm, 300 new registrations. The day closed at 641.',
  },
  {
    date: 'March 18, 2026',
    title: '#TukoKadi Goes Viral',
    desc: 'The hashtag #TukoKadi trends across TikTok, X, and Instagram. Gen Z shares registration selfies, "Voter Found!" declarations, and "registration dates." NTV Kenya features Ademba on Fixing The Nation.',
    detail: 'Some young couples rebranded voter registration as a "registration date," walking hand in hand into IEBC offices and capturing the moment as both a romantic outing and a commitment to the country\'s future.',
  },
  {
    date: 'March 21, 2026',
    title: 'Influencers Rally',
    desc: 'Celebrities and influencers across Kenya rally behind the #TukoKadi drive, amplifying the voter registration push. Activists Ademba and Hanifa call on influencers to unite and make the movement "massive and long-term."',
    detail: 'The influencer support pushed the campaign beyond political circles into mainstream pop culture, reaching demographics that traditional voter drives had failed to engage.',
  },
  {
    date: 'March 22, 2026',
    title: 'National TV Spotlight',
    desc: 'Movement leaders Ademba Allans and Sophie Njehia appear on Citizen TV Sunday Live. Ademba declares: "TukoKadi is a force to reckon with. Today, tomorrow, 2027 and forever."',
    detail: 'Sophie Njehia stated: "We decided that we are going to pursue the constitutional way... It is the system that we are uprooting, we are doing a complete system overhaul." The appearance on JKL Show with Jeff Koinange drew massive viewership.',
  },
  {
    date: 'March 23, 2026',
    title: 'People-Sponsored',
    desc: '"We are sponsored by the people… we are sponsored by those who died in 2024," Ademba declares on Citizen TV. Announces "Buddies Hangout" events at IEBC offices with Bluetooth speakers and TikTok content creation.',
    detail: '"We are going to have Bluetooth speakers, we are going to do TikToks because that\'s how young people connect. We want to make voter registration something that feels natural and exciting, not forced."',
  },
  {
    date: 'March 24, 2026',
    title: 'Nationwide Surge',
    desc: 'Youth organisers across all 47 counties mobilize physically. Kibra, Kisumu, Turkana, Busia — registration drives pop up everywhere. Movement firmly rejects political hijacking and co-option attempts.',
    detail: 'Ademba posted: "This is the current situation in Kibra #TukoKadi" — showing massive queues at registration centres. Even President Ruto said "ako kadi," which movement leaders called "intellectual theft."',
  },
  {
    date: 'March 25, 2026',
    title: 'Niko Kadi Wave',
    desc: 'The phrase evolves: "Niko Kadi" (I have the card) becomes a personal declaration. Young Kenyans across the country proudly show their voter cards online. The movement becomes a cultural phenomenon beyond just registration.',
    detail: 'The movement draws parallels to the classic Kenyan card game "Kadi," turning civic engagement into something relatable and playful while maintaining its serious underlying message of accountability.',
  },
]

const LEADERS = [
  {
    name: 'Ademba Allans',
    role: 'Founder & Lead Voice',
    handle: '@Ademba_47',
    bio: 'Photojournalist and citizen journalist from Kasarani, Nairobi. Rose to prominence during the 2024 Gen Z-led protests against the Finance Bill. His frontline coverage earned him recognition as a "silent hero" and a feature in the BBC documentary "Blood Parliament." Started TukoKadi with a single tweet seeking 100,000 unregistered voters in Kasarani.',
    quote: '"We are sponsored by the people… we are sponsored by those who died in 2024."',
    achievements: ['641 voters registered in Day 1', 'BBC Blood Parliament documentary', 'JKL Show with Jeff Koinange', 'NTV Fixing The Nation feature'],
    color: 'from-red-600 to-red-800',
  },
  {
    name: 'Sophie Njehia',
    role: 'Youth Leader & Co-Lead',
    handle: '@SophieNjehia',
    bio: 'Youth activist and movement co-lead who has been instrumental in scaling TukoKadi nationally. Sophie framed the movement as "a representation of the Gen Z movement — a collective of people with progressive ideas about our nation." She advocates for pursuing change through the ballot rather than street protests.',
    quote: '"We decided that we are going to pursue the constitutional way which is getting Ruto out in the ballot. Not only Ruto, it is him and every single MP who has let the people of Kenya down. It is the system that we are uprooting."',
    achievements: ['Citizen TV Sunday Live panelist', 'National youth organizer', 'Advocate for constitutional change', 'Campus mobilization leader'],
    color: 'from-green-600 to-green-800',
  },
  {
    name: 'Hanifa',
    role: 'Activist & University Mobilizer',
    handle: '@Hanifa_KE',
    bio: 'Key activist who has been at the forefront of reaching unregistered Gen Zs in universities across Kenya. Called on influencers to unite and make the voter registration trend "massive and long-term," recognizing that most unregistered young Kenyans are on university campuses.',
    quote: '"Most unregistered Gen Zs are in universities. We must reach them there. This has to be massive and long-term."',
    achievements: ['University campus mobilization', 'Influencer coalition builder', 'Digital strategy lead', 'Campus chapter coordinator'],
    color: 'from-red-700 to-green-700',
  },
  {
    name: 'Willie Oeba',
    role: 'Co-Organizer & Ground Mobilizer',
    handle: '@WillieOeba',
    bio: 'Co-spearheaded the Kasarani voter registration initiative alongside Ademba, targeting 600 new registrations on the first day. Together they surpassed expectations with 641 registered. Key ground organizer ensuring logistics, IEBC coordination, and community engagement.',
    quote: '"When young people show up, the system has to respond. We showed them what organized youth can do."',
    achievements: ['Kasarani Day 1 co-organizer', '641 target exceeded', 'IEBC liaison coordinator', 'Ground logistics manager'],
    color: 'from-green-700 to-green-900',
  },
]

const YOUTUBE_VIDEOS = [
  {
    id: 'OQsBWRilOdg',
    title: 'Tuko Kadi: How Kenyan GenZs Are Mobilising To Register As Voters',
    channel: 'NTV Kenya — Fixing The Nation',
    views: '48K views',
    desc: 'Guest: Allan Ademba, Tuko Kadi Initiative Lead. In-depth interview about how the movement started and where it\'s headed.',
  },
  {
    id: 'E3wn8by5Mtw',
    title: '"Tuko Kadi" movement sparks youth political awakening',
    channel: 'KTN News Kenya',
    views: '47K views',
    desc: 'KTN News coverage of the TukoKadi movement, exploring how social media mobilization is translating into real-world voter registration.',
  },
  {
    id: 'AEXHZIGmwgE',
    title: 'Gen-Z mobilizes for 2027 as youth voter registration surges',
    channel: 'YouTube News',
    views: 'Trending',
    desc: 'Coverage of the nationwide surge in Gen Z voter registration driven by the TukoKadi and NikoKadi campaigns.',
  },
]

const PRESS_COVERAGE = [
  { title: 'How #TukoKadi turned Gen Z voter registration into a national movement', source: 'Top News Kenya', date: 'Mar 18', url: 'https://topnews.ke/how-tukokadi-turned-gen-z-voter-registration-into-a-national-movement/', icon: Newspaper },
  { title: 'Tuko Kadi Initiative Gains Momentum as Gen Z Warns Politicians Against Co-option', source: 'Capital FM', date: 'Mar 24', url: 'https://www.capitalfm.co.ke/news/2026/03/tuko-kadi-initiative-gains-momentum-as-gen-z-warns-politicians-against-co-option/', icon: Radio },
  { title: 'Journalist Allans Ademba leads massive Gen Z #TukoKadi voter drive', source: 'Citizen Digital', date: 'Mar 17', url: 'https://www.citizen.digital/news/journalist-allans-ademba-leads-massive-gen-z-tukokadi-voter-registration-drive-n379192', icon: Tv },
  { title: 'Ademba Allans: Tuko Kadi movement is sponsored by the people', source: 'The Star', date: 'Mar 23', url: 'https://www.the-star.co.ke/news/2026-03-23-ademba-allans-tuko-kadi-is-people-sponsored', icon: Newspaper },
  { title: 'Gen Z first day mass voter registration drive attracts 641 youths', source: 'The Star', date: 'Mar 17', url: 'https://www.the-star.co.ke/news/2026-03-17-gen-z-tuko-kadi-drive-registers-641-in-kasarani', icon: Newspaper },
  { title: '#TukoKadi youths slam politicians for hijacking voter campaign', source: 'Eastleigh Voice', date: 'Mar 23', url: 'https://eastleighvoice.co.ke/news/318015/tukokadi-youths-slam-politicians-for-hijacking-voter-campaign-vow-to-remove-them-from-office', icon: Newspaper },
  { title: 'TukoKadi is a force to reckon with; movement leads Ademba and Sophie say', source: 'Citizen Digital', date: 'Mar 22', url: 'https://www.citizen.digital/news/tukokadi-is-a-force-to-reckon-with-movement-leads-ademba-and-sophie-say-n379499', icon: Tv },
  { title: 'Celebrities Rally Behind #TukoKadi Drive as Voter Registration Gains Momentum', source: 'YNews Digital', date: 'Mar 21', url: 'https://ynews.digital/newsflash/celebrities-rally-behind-tukokadi-drive-as-youth-voter-registration-push-gains-momentum/', icon: Star },
  { title: 'Gen Z Surge: Tuko Kadi and the Youth Political Awakening', source: 'NAX Today', date: 'Mar 19', url: 'https://nax.today/slider-stories-breaking-news-and-top-stories-in-kenya/article/3685/gen-z-surge-tuko-kadi-and-the-youth-political-awakening', icon: Newspaper },
  { title: 'NikoKadi: How Gen Z is Leading a Voter Registration Revolution', source: 'Kenya Election Tracker', date: 'Mar 18', url: 'https://kenyaelectionstracker.com/news-article/730', icon: Globe },
  { title: 'Tuko Kadi convener to hold buddies hangouts at IEBC offices', source: 'The Star', date: 'Mar 23', url: 'https://www.the-star.co.ke/news/2026-03-23-we-will-hold-buddies-hangout-at-iebc-offices-to-drive-youth-voter-registration-says-ademba-allans', icon: Newspaper },
  { title: 'Youth surge as Niko Kadi movement gains momentum', source: 'The Standard', date: 'Mar 24', url: 'https://www.standardmedia.co.ke/breaking-news/article/2001543741/youth-surge-as-niko-kadi-movement-gains-momentum-ahead-of-voter-registration-drive', icon: Newspaper },
]

const FAQ_DATA = [
  {
    q: 'What does "Tuko Kadi" mean?',
    a: '"Tuko Kadi" is Sheng (Kenyan slang) meaning "We Have the Card." It refers to having a voter registration card. "Niko Kadi" means "I have the card" — a personal declaration of readiness to vote.',
  },
  {
    q: 'Who started the TukoKadi movement?',
    a: 'The movement was started by Ademba Allans, a photojournalist and citizen journalist from Kasarani, Nairobi. He rose to prominence during the 2024 Gen Z protests and was featured in the BBC documentary "Blood Parliament." He started TukoKadi with a tweet seeking 100,000 unregistered voters.',
  },
  {
    q: 'How can I register to vote?',
    a: 'Visit your nearest IEBC (Independent Electoral and Boundaries Commission) registration centre with your national ID card. The IEBC has 1,450+ centres across all 47 counties. The ongoing mass registration drive targets 6.3 million new voters before the 2027 elections.',
  },
  {
    q: 'Is TukoKadi affiliated with any political party?',
    a: 'No. TukoKadi is strictly citizen-driven and independent of all political parties. The movement leaders have publicly rejected attempts by politicians — including President Ruto — to co-opt or claim the campaign. As Ademba says: "We are sponsored by the people."',
  },
  {
    q: 'How can I start a chapter in my area?',
    a: 'Create a WhatsApp group for your community, campus, or county following the Kasarani Chapter blueprint: invite friends, set a date, coordinate with your local IEBC office, and walk to register together. Share your experience on social media using #TukoKadi.',
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
    q: 'Why is voter registration important for 2027?',
    a: 'The 2027 General Election is a critical opportunity for Kenya\'s Gen Z to shape the country\'s leadership. With the IEBC targeting 6.3 million new voters, mass registration ensures young people\'s voices are represented at the ballot box — the most powerful tool for democratic accountability.',
  },
]

const COUNTY_HIGHLIGHTS = [
  { name: 'Nairobi', detail: '641 registered Day 1 in Kasarani alone', status: 'active' },
  { name: 'Kibra', detail: 'Massive queues reported at IEBC centres', status: 'active' },
  { name: 'Kisumu', detail: 'Youth-led registration drives ongoing', status: 'active' },
  { name: 'Mombasa', detail: 'Coastal youth chapters mobilizing', status: 'active' },
  { name: 'Turkana', detail: 'Remote county registration expanding', status: 'growing' },
  { name: 'Busia', detail: 'Cross-border awareness campaign', status: 'growing' },
  { name: 'Nakuru', detail: 'Rift Valley youth chapters active', status: 'active' },
  { name: 'Kiambu', detail: 'University campus drives ongoing', status: 'active' },
  { name: 'Machakos', detail: 'Community-driven registration events', status: 'growing' },
  { name: 'Kakamega', detail: 'Western Kenya mobilization growing', status: 'growing' },
  { name: 'Uasin Gishu', detail: 'Eldoret-based youth chapters', status: 'growing' },
  { name: 'Kilifi', detail: 'Coastal community engagement', status: 'growing' },
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
    { label: 'Counties', href: '#counties' },
    { label: 'Videos', href: '#videos' },
    { label: 'Press', href: '#press' },
    { label: 'FAQ', href: '#faq' },
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

        <div className="hidden lg:flex items-center gap-5">
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
            href="#donate"
            className="ml-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-bold transition"
          >
            Support Us
          </a>
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-black/95 border-t border-red-900/40 px-4 pb-4 max-h-96 overflow-y-auto">
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
            href="#donate"
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
          &ldquo;We Have The Card&rdquo; &mdash; Kenya&apos;s Gen Z Voter Revolution
        </p>

        <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
          A citizen-led, youth-driven movement mobilizing millions of young Kenyans
          to register as voters and reclaim their future through the ballot ahead of the 2027 General Election.
        </p>

        <p className="text-gray-500 text-sm max-w-xl mx-auto mb-10 italic">
          Founded by Ademba Allans &bull; Kasarani, Nairobi &bull; March 2026
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#involved"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-lg shadow-red-600/30"
          >
            Join The Movement
          </a>
          <a
            href="#videos"
            className="border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-8 py-4 rounded-full text-lg font-bold transition-all"
          >
            Watch Videos
          </a>
          <a
            href="#about"
            className="border-2 border-gray-600 text-gray-300 hover:border-white hover:text-white px-8 py-4 rounded-full text-lg font-bold transition-all"
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
      <div className="bg-black/90 py-8 md:py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center group">
              <s.icon className="mx-auto mb-2 text-red-400 group-hover:text-green-400 transition" size={24} />
              <p className="text-2xl md:text-3xl font-black text-white">{s.value}</p>
              <p className="text-white text-xs font-bold mt-1">{s.label}</p>
              <p className="text-gray-500 text-xs">{s.desc}</p>
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
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="text-red-500 font-bold text-sm tracking-widest uppercase">The Movement</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-6 leading-tight">
              What is <span className="text-red-500">Tuko Kadi</span>?
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                <strong className="text-white">Tuko Kadi</strong> (Sheng for <em>&ldquo;We Have the Card&rdquo;</em>) is a
                citizen-led mass voter registration movement that began in March 2026. Born on social media and
                brought to life on the streets, it represents Kenya&apos;s Gen Z stepping up to shape their country&apos;s
                future through the ballot.
              </p>
              <p>
                The movement was sparked when a young Kenyan woman documented her challenging, nearly full-day journey to register
                as a voter in a viral TikTok video. Despite long queues, travel distances, and costs, her message
                resonated: <em>civic duty requires effort</em>. Her video inspired the &ldquo;Small Circle&rdquo; TikTok challenge
                where friend groups registered together and shared videos with their verified voter IDs.
              </p>
              <p>
                Photojournalist <strong className="text-white">Ademba Allans</strong>, who rose to prominence during the 2024
                Gen Z-led protests against the Finance Bill and was featured in the BBC documentary <em>&ldquo;Blood Parliament,&rdquo;</em> took
                the online trend offline. He created a WhatsApp group called &ldquo;Kasarani Chapter&rdquo; and organized a
                mass registration drive that registered <strong className="text-red-400">641 new voters</strong> in a single day.
              </p>
              <p>
                Unlike previous voter campaigns, #TukoKadi has tapped into youth culture, blending civic responsibility
                with digital expression. Young people share celebratory posts after registering, using the phrase
                &ldquo;Voter Found!&rdquo; Some couples have even turned it into &ldquo;registration dates,&rdquo; combining personal
                milestones with civic engagement.
              </p>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-black bg-gradient-to-br from-red-600 to-green-700 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {['AA', 'SN', 'HF', 'WO', 'GZ'][i - 1]}
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm">Thousands of youth leaders mobilizing nationwide</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-red-600/20 to-green-600/20 rounded-2xl blur-xl" />
            <img
              src="/images/nairobi.jpg"
              alt="Nairobi cityscape"
              className="relative rounded-2xl shadow-2xl w-full object-cover aspect-square"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = 'https://placehold.co/600x600/1a1a1a/dc2626?text=Tuko+Kadi'
              }}
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-red-900/30">
              <p className="text-white font-bold">#TukoKadi #NikoKadi #VoterFound</p>
              <p className="text-gray-400 text-sm">Trending across TikTok, X, and Instagram</p>
            </div>
          </div>
        </div>

        {/* Key Quotes Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-b from-red-950/30 to-black rounded-2xl p-6 border border-red-900/20">
            <Quote className="text-red-500 mb-3" size={28} />
            <p className="text-gray-300 italic mb-4">&ldquo;We are sponsored by the people… we are sponsored by those who died in 2024.&rdquo;</p>
            <p className="text-red-400 font-bold text-sm">— Ademba Allans, Citizen TV</p>
          </div>
          <div className="bg-gradient-to-b from-green-950/30 to-black rounded-2xl p-6 border border-green-900/20">
            <Quote className="text-green-500 mb-3" size={28} />
            <p className="text-gray-300 italic mb-4">&ldquo;TukoKadi is a representation of the Gen Z movement… a collective of people with progressive ideas about our nation.&rdquo;</p>
            <p className="text-green-400 font-bold text-sm">— Sophie Njehia, Citizen TV</p>
          </div>
          <div className="bg-gradient-to-b from-red-950/30 to-black rounded-2xl p-6 border border-red-900/20">
            <Quote className="text-red-500 mb-3" size={28} />
            <p className="text-gray-300 italic mb-4">&ldquo;It is a force to reckon with. TukoKadi is here to make change. Today, tomorrow, 2027 and forever.&rdquo;</p>
            <p className="text-red-400 font-bold text-sm">— Ademba Allans, Citizen TV Sunday Live</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineSection() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  return (
    <section id="timeline" className="bg-gradient-to-b from-black via-gray-950 to-black py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-green-500 font-bold text-sm tracking-widest uppercase">Our Journey</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">
            How It <span className="text-red-500">Started</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            From a single TikTok video to a nationwide civic revolution — the story of TukoKadi unfolds in days, not months.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-600 via-green-600 to-red-600" />

          {TIMELINE.map((t, i) => (
            <div
              key={i}
              className={`relative flex items-start gap-4 mb-12 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-red-600 border-4 border-black z-10 mt-1" />

              <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <span className="text-green-400 text-sm font-bold">{t.date}</span>
                <h3 className="text-xl font-black text-white mt-1 mb-2">{t.title}</h3>
                <p className="text-gray-400 leading-relaxed">{t.desc}</p>
                {t.detail && (
                  <>
                    <button
                      onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                      className="text-red-400 hover:text-red-300 text-sm font-bold mt-2 inline-flex items-center gap-1 transition"
                    >
                      {expandedIdx === i ? 'Show less' : 'Read more'}
                      <ArrowRight size={14} className={`transition-transform ${expandedIdx === i ? 'rotate-90' : ''}`} />
                    </button>
                    {expandedIdx === i && (
                      <p className="text-gray-500 text-sm mt-2 leading-relaxed italic border-l-2 border-green-800 pl-3">
                        {t.detail}
                      </p>
                    )}
                  </>
                )}
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

        <div className="grid md:grid-cols-2 gap-8">
          {LEADERS.map((l) => (
            <div
              key={l.name}
              className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl p-6 border border-gray-800 hover:border-red-900/50 transition group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${l.color} flex items-center justify-center text-white text-xl font-black shrink-0 group-hover:scale-110 transition`}>
                  {l.name.split(' ').map((w) => w[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{l.name}</h3>
                  <p className="text-red-400 text-sm font-bold">{l.role}</p>
                  <p className="text-gray-600 text-xs">{l.handle}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{l.bio}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {l.achievements.map((a) => (
                  <span key={a} className="inline-flex items-center gap-1 bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full">
                    <CheckCircle size={10} className="text-green-500" />
                    {a}
                  </span>
                ))}
              </div>

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

function CountiesSection() {
  return (
    <section id="counties" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-green-900/20" />
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-green-500 font-bold text-sm tracking-widest uppercase">Nationwide Reach</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">
            Movement Across <span className="text-red-500">47 Counties</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            &ldquo;Kenya does not revolve around Nairobi. I want to see lines of young people registering in Turkana, Busia,
            Kisumu, and every other county.&rdquo; — Ademba Allans
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {COUNTY_HIGHLIGHTS.map((c) => (
            <div
              key={c.name}
              className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-red-900/50 transition flex items-start gap-3"
            >
              <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${c.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
              <div>
                <h4 className="text-white font-bold">{c.name}</h4>
                <p className="text-gray-400 text-sm">{c.detail}</p>
                <span className={`text-xs font-bold mt-1 inline-block ${c.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {c.status === 'active' ? 'Active' : 'Growing'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-sm">
            + 35 more counties with active TukoKadi chapters. The movement reaches every corner of Kenya.
          </p>
        </div>

        {/* Impact cards below counties */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-red-900/30 text-center">
            <Shield className="text-red-400 mx-auto mb-3" size={32} />
            <h3 className="text-lg font-black text-white mb-2">Independent</h3>
            <p className="text-gray-400 text-sm">Not backed by any political party. Leaders have rejected all attempts by politicians to co-opt the campaign.</p>
          </div>
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-green-900/30 text-center">
            <Smartphone className="text-green-400 mx-auto mb-3" size={32} />
            <h3 className="text-lg font-black text-white mb-2">Digital-First</h3>
            <p className="text-gray-400 text-sm">Born on TikTok, spread via X and Instagram. Memes, challenges, and creative storytelling drive engagement.</p>
          </div>
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-green-900/30 text-center">
            <Megaphone className="text-green-400 mx-auto mb-3" size={32} />
            <h3 className="text-lg font-black text-white mb-2">Ground Action</h3>
            <p className="text-gray-400 text-sm">Buddies Hangouts at IEBC offices with music, TikToks, and peer mobilization make registration social and fun.</p>
          </div>
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-red-900/30 text-center">
            <Heart className="text-red-400 mx-auto mb-3" size={32} />
            <h3 className="text-lg font-black text-white mb-2">Ballot Power</h3>
            <p className="text-gray-400 text-sm">The ballot is the most powerful tool for change. Mass registration sends a clear signal of accountability to politicians.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function VideosSection() {
  return (
    <section id="videos" className="bg-black py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-red-500 font-bold text-sm tracking-widest uppercase">Watch Now</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">
            TukoKadi <span className="text-green-500">On Screen</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Watch the movement&apos;s story directly — from national TV interviews to viral moments
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {YOUTUBE_VIDEOS.map((v) => (
            <div key={v.id} className="bg-gray-950 rounded-2xl overflow-hidden border border-gray-800 hover:border-red-900/50 transition">
              <div className="aspect-video">
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
                <p className="text-red-400 text-xs font-bold">{v.channel}</p>
                <p className="text-gray-500 text-xs mt-1">{v.views}</p>
                <p className="text-gray-400 text-xs mt-2 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured video large */}
        <div className="mt-12 bg-gray-950 rounded-2xl overflow-hidden border border-gray-800">
          <div className="grid lg:grid-cols-2">
            <div className="aspect-video lg:aspect-auto">
              <iframe
                src="https://www.youtube.com/embed/OQsBWRilOdg"
                title="Tuko Kadi NTV Kenya Full Interview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full min-h-64"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Featured Interview</span>
              <h3 className="text-2xl font-black text-white mt-2 mb-3">Ademba Allans on NTV Kenya</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                The full 49-minute interview on NTV Kenya&apos;s &ldquo;Fixing The Nation&rdquo; program. Ademba discusses
                the origins of TukoKadi, the vision for 2027, and why Gen Z&apos;s political awakening is
                different from anything Kenya has seen before.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <TrendingUp size={14} /> 48K+ views
                </span>
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <Clock size={14} /> 49:30
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PressSection() {
  return (
    <section id="press" className="bg-gradient-to-b from-black via-gray-950 to-black py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-green-500 font-bold text-sm tracking-widest uppercase">In The News</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">
            Press <span className="text-red-500">Coverage</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            {PRESS_COVERAGE.length} articles from Kenya&apos;s top media outlets covering the TukoKadi revolution
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRESS_COVERAGE.map((article) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-950 rounded-xl p-5 border border-gray-800 hover:border-red-900/50 transition group block"
            >
              <div className="flex items-center gap-2 mb-3">
                <article.icon size={16} className="text-red-500" />
                <span className="text-red-400 text-xs font-bold">{article.source}</span>
                <span className="text-gray-600 text-xs ml-auto">{article.date}</span>
              </div>
              <h3 className="text-gray-300 text-sm font-medium group-hover:text-white transition leading-relaxed">
                {article.title}
              </h3>
              <div className="mt-3 flex items-center gap-1 text-green-500 text-xs font-bold opacity-0 group-hover:opacity-100 transition">
                Read article <ExternalLink size={12} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section id="faq" className="bg-black py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-red-500 font-bold text-sm tracking-widest uppercase">Questions</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2">
            Frequently <span className="text-green-500">Asked</span>
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.map((faq, i) => (
            <div key={i} className="bg-gray-950 rounded-xl border border-gray-800 overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-gray-900 transition"
              >
                <span className="text-white font-bold text-sm">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-red-400 shrink-0 transition-transform ${openIdx === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openIdx === i && (
                <div className="px-6 pb-4">
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GetInvolvedSection() {
  const [copied, setCopied] = useState(false)
  const shareText = "I stand with #TukoKadi! Kenya's Gen Z is registering to vote and reclaiming our future. Have you registered? #VoterFound #NikoKadi #Kenya2027"

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="involved" className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-green-900" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-green-400 font-bold text-sm tracking-widest uppercase">Take Action</span>
          <h2 className="text-4xl md:text-6xl font-black text-white mt-2 mb-6">
            Join The <span className="text-red-500">Revolution</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            The movement is people-powered. Here&apos;s how you can be part of Kenya&apos;s biggest
            youth voter mobilization campaign.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-red-900/30 text-left">
            <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center mb-4">
              <Vote className="text-red-400" size={24} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Register to Vote</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Visit your nearest IEBC registration centre with your national ID. The mass registration
              drive is ongoing across all 47 counties.
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-green-900/30 text-left">
            <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center mb-4">
              <Share2 className="text-green-400" size={24} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Spread the Word</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Share your voter registration journey on TikTok, X, and Instagram using #TukoKadi
              and #VoterFound. Inspire your circle!
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-red-900/30 text-left">
            <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center mb-4">
              <Users className="text-red-400" size={24} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Start a Chapter</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Create a WhatsApp group for your community. Follow the Kasarani Chapter
              blueprint: mobilize friends, set a date, walk to IEBC together.
            </p>
          </div>

          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6 border border-green-900/30 text-left">
            <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center mb-4">
              <Music className="text-green-400" size={24} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Host a Buddies Hangout</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Organize a fun registration event with Bluetooth speakers, TikTok content,
              and snacks at your local IEBC office.
            </p>
          </div>
        </div>

        {/* Share box */}
        <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 max-w-2xl mx-auto mb-12">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2 justify-center">
            <Share2 size={18} className="text-green-400" />
            Copy &amp; Share on Social Media
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
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { href: 'https://x.com/search?q=%23TukoKadi', label: 'X #TukoKadi', border: 'hover:border-red-500' },
            { href: 'https://www.tiktok.com/search?q=tukokadi', label: 'TikTok #TukoKadi', border: 'hover:border-green-500' },
            { href: 'https://www.instagram.com/explore/tags/tukokadi/', label: 'Instagram #TukoKadi', border: 'hover:border-red-500' },
            { href: 'https://x.com/Ademba_47', label: '@Ademba_47', border: 'hover:border-green-500' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 bg-black border border-gray-700 ${s.border} text-white px-5 py-3 rounded-full text-sm font-bold transition`}
            >
              {s.label}
            </a>
          ))}
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
          <HandHeart className="mx-auto text-red-500 mb-4" size={48} />
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
              { amount: 'KES 500', desc: 'Transport for 5 youths to IEBC centres', icon: MapPin },
              { amount: 'KES 2,000', desc: 'Civic education materials for a campus', icon: BookOpen },
              { amount: 'KES 10,000', desc: 'Fund a full county registration drive', icon: Globe },
            ].map((tier) => (
              <div
                key={tier.amount}
                className="bg-black/60 border border-gray-800 hover:border-red-600 rounded-xl p-5 transition cursor-pointer group"
              >
                <tier.icon className="mx-auto text-gray-600 group-hover:text-red-400 mb-2 transition" size={24} />
                <p className="text-2xl font-black text-red-500 group-hover:text-red-400">{tier.amount}</p>
                <p className="text-gray-400 text-sm mt-2">{tier.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-950 rounded-xl p-6 border border-gray-800 max-w-md mx-auto">
            <p className="text-green-400 font-bold mb-2">M-Pesa Paybill</p>
            <p className="text-gray-400 text-sm mb-4">
              To donate, contact the official TukoKadi campaign channels:
            </p>
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center bg-black rounded-lg p-3">
                <span className="text-gray-400 text-sm">Follow on X:</span>
                <a href="https://x.com/Ademba_47" target="_blank" rel="noopener noreferrer" className="text-red-400 font-bold text-sm hover:underline">@Ademba_47</a>
              </div>
              <div className="flex justify-between items-center bg-black rounded-lg p-3">
                <span className="text-gray-400 text-sm">Hashtag:</span>
                <a href="https://x.com/search?q=%23TukoKadi" target="_blank" rel="noopener noreferrer" className="text-green-400 font-bold text-sm hover:underline">#TukoKadi</a>
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
      <div className="flex h-1.5">
        <div className="flex-1 bg-black" />
        <div className="flex-1 bg-red-600" />
        <div className="flex-1 bg-green-600" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
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
            <h4 className="text-white font-bold mb-4">Navigate</h4>
            <div className="space-y-2">
              {['About', 'Timeline', 'Leaders', 'Counties', 'Videos', 'Press', 'FAQ'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-gray-500 hover:text-red-400 text-sm transition"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Take Action</h4>
            <div className="space-y-2">
              {[
                { label: 'Register to Vote', href: '#involved' },
                { label: 'Start a Chapter', href: '#involved' },
                { label: 'Support the Movement', href: '#donate' },
                { label: 'Share on Social Media', href: '#involved' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-gray-500 hover:text-red-400 text-sm transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <div className="space-y-2">
              {[
                { label: 'X (Twitter) - #TukoKadi', href: 'https://x.com/search?q=%23TukoKadi' },
                { label: 'TikTok - #TukoKadi', href: 'https://www.tiktok.com/search?q=tukokadi' },
                { label: 'Instagram - #TukoKadi', href: 'https://www.instagram.com/explore/tags/tukokadi/' },
                { label: '@Ademba_47 on X', href: 'https://x.com/Ademba_47' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-500 hover:text-red-400 text-sm transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            &copy; 2026 TukoKadi Movement. This is a citizen-driven initiative.
          </p>
          <p className="text-gray-700 text-xs italic">
            &ldquo;We are sponsored by the people.&rdquo; &mdash; Ademba Allans
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
      <Reveal><CountiesSection /></Reveal>
      <Reveal><VideosSection /></Reveal>
      <Reveal><PressSection /></Reveal>
      <Reveal><FAQSection /></Reveal>
      <Reveal><GetInvolvedSection /></Reveal>
      <Reveal><DonateSection /></Reveal>
      <Footer />
    </div>
  )
}

export default App
