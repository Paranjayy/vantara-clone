import { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Pause, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  ShieldAlert, 
  HeartPulse, 
  Activity, 
  Globe, 
  Quote, 
  ArrowRight, 
  ArrowUpRight 
} from 'lucide-react';

// Swiper React components & modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function App() {
  // State variables
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isPlayingHeroMedia, setIsPlayingHeroMedia] = useState(true);
  
  // News slider progress
  const [newsProgressText, setNewsProgressText] = useState('1/4');
  
  // Accordion active item index
  const [activeAccordion, setActiveAccordion] = useState(0);

  // About stats tab active slide
  const [activeStatsSlide, setActiveStatsSlide] = useState(0);

  // Conservation tabs state (rktewt / gzrrc)
  const [activeConservationTab, setActiveConservationTab] = useState<'rktewt' | 'gzrrc'>('rktewt');
  const [rktewtProgressText, setRktewtProgressText] = useState('1/4');
  const [gzrrcProgressText, setGzrrcProgressText] = useState('1/3');

  // References
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);

  // Toggle ambient audio playing
  const handleAudioToggle = () => {
    if (!ambientAudioRef.current) return;
    if (isPlayingAudio) {
      ambientAudioRef.current.pause();
    } else {
      ambientAudioRef.current.play().catch(err => console.log('Audio autoplay blocked:', err));
    }
    setIsPlayingAudio(!isPlayingAudio);
  };

  // Swiper slide progress updates
  const handleNewsSlideChange = (swiper: any) => {
    const current = swiper.realIndex + 1;
    setNewsProgressText(`${current}/${swiper.slides.length}`);
  };

  const handleRktewtSlideChange = (swiper: any) => {
    const current = swiper.realIndex + 1;
    setRktewtProgressText(`${current}/${swiper.slides.length}`);
  };

  const handleGzrrcSlideChange = (swiper: any) => {
    const current = swiper.realIndex + 1;
    setGzrrcProgressText(`${current}/${swiper.slides.length}`);
  };

  // Intersection Observer for scroll animation reveals
  useEffect(() => {
    const animateElements = document.querySelectorAll(
      '.section-heading, .news-item, .accordion-item, .quote-grid, .about-text-block, .about-stats-block, .conservation-tabs-container'
    );

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animateElements.forEach(el => {
      el.classList.add('scroll-animate');
      scrollObserver.observe(el);
    });

    return () => {
      scrollObserver.disconnect();
    };
  }, [activeConservationTab]); // Re-observe upon changing conservation tabs to capture newly mounted cards

  // Audio setup
  useEffect(() => {
    ambientAudioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav');
    ambientAudioRef.current.loop = true;
    return () => {
      if (ambientAudioRef.current) {
        ambientAudioRef.current.pause();
      }
    };
  }, []);

  // Syncing accordion selection to image visual slider list
  const initiatives = [
    {
      title: 'Rescue and Recovery',
      icon: <ShieldAlert />,
      desc: 'At Vantara, rescue is the foundation of animal care. We locate and secure wildlife impacted by habitat loss, conflict, or confinement, conducting every operation with precision and compassion. Our teams minimise stress, provide immediate veterinary support, and ensure a safe, stabilised transition into structured recovery, whether animals arrive from within India or internationally.',
      image: 'images/initiative_rescue.png'
    },
    {
      title: 'Treatment and Care',
      icon: <HeartPulse />,
      desc: 'We provide advanced medical treatment and holistic care for rescued, injured, and medically compromised animals. Our state-of-the-art hospitals, diagnostics, and species-specific nutrition ensure expert care. By combining modern medicine with Ayurveda, acupuncture, enriched habitats, and behavioural support, we promote complete recovery, resilience, and long-term well-being.',
      image: 'images/elephant_surgery.png'
    },
    {
      title: 'Rehabilitation & Support',
      icon: <Activity />,
      desc: 'At Vantara, we rehabilitate injured and ill native Indian species through structured, species-appropriate care. Following medical recovery under human care, animals undergo targeted conditioning to restore strength, mobility, and essential natural behaviours. Our rehabilitation approach prioritises physical recovery, behavioural stability, and long-term welfare through expert oversight.',
      image: 'images/elephant_ayurveda.png'
    },
    {
      title: 'Conservation, Breeding & Rewilding',
      icon: <Globe />,
      desc: 'We integrate ex-situ (human care) and in-situ (wild) conservation to protect endangered species through ethical breeding, habitat restoration, and rewilding. Ex-situ programs prioritise genetic diversity and advanced reproductive science, while in-situ efforts focus on threat reduction, population recovery, and long-term monitoring to secure wildlife for future generations.',
      image: 'images/elephant_enrichment.png'
    }
  ];

  return (
    <div className="layout">
      {/* Header */}
      <header className="header-basic">
        <button 
          className="audio-toggle-btn" 
          aria-label={isPlayingAudio ? 'Sound On' : 'Sound Off'} 
          onClick={handleAudioToggle}
        >
          {isPlayingAudio ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>

        <nav aria-label="primary" className="nav-left">
          <ul className="nav-list">
            <li className="nav-item">
              <a className="menu-link active" href="/"><span className="link-text">Home</span></a>
            </li>
            <li className="nav-item">
              <a className="menu-link" href="#section-news"><span className="link-text">Resources</span></a>
            </li>
          </ul>
        </nav>

        <a className="logo-link" aria-label="Go to home page" href="/">
          <div className="logo-container">
            <span className="logo-text">VANTARA</span>
          </div>
        </a>

        <nav aria-label="primary" className="nav-right">
          <ul className="nav-list">
            <li className="nav-item">
              <a className="menu-link" href="#section-about"><span className="link-text">About</span></a>
            </li>
            <li className="nav-item">
              <a className="menu-link" href="#section-conservation"><span className="link-text">Contact Us</span></a>
            </li>
            <li className="nav-item hide-on-desktop">
              <a className="menu-link" href="https://www.linkedin.com/company/vantaraofficial/" target="_blank" rel="noopener noreferrer">
                <span className="link-text">Career</span>
              </a>
            </li>
          </ul>
        </nav>

        <button 
          className={`burger-menu-btn ${isMobileDrawerOpen ? 'open' : ''}`}
          aria-haspopup="true" 
          aria-expanded={isMobileDrawerOpen ? 'true' : 'false'} 
          aria-label="Menu"
          onClick={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
        >
          <div className="burger-inner">
            <div className="burger-bar bar-1"></div>
            <div className="burger-bar bar-2"></div>
          </div>
        </button>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${isMobileDrawerOpen ? 'open' : ''}`}>
        <ul className="drawer-list">
          <li><a href="/" className="drawer-link active" onClick={() => setIsMobileDrawerOpen(false)}>Home</a></li>
          <li><a href="#section-news" className="drawer-link" onClick={() => setIsMobileDrawerOpen(false)}>Resources</a></li>
          <li><a href="#section-about" className="drawer-link" onClick={() => setIsMobileDrawerOpen(false)}>About</a></li>
          <li><a href="#section-conservation" className="drawer-link" onClick={() => setIsMobileDrawerOpen(false)}>Contact Us</a></li>
          <li>
            <a 
              href="https://www.linkedin.com/company/vantaraofficial/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="drawer-link" 
              onClick={() => setIsMobileDrawerOpen(false)}
            >
              Career
            </a>
          </li>
        </ul>
      </div>

      <main className="main">
        {/* Section: Hero Video / Image */}
        <section className="section-hero-video" id="hero-video">
          <div className="hero-overlay"></div>
          <div className="hero-media-wrapper">
            <img src="images/hero_wildlife.png" alt="Wildlife Sanctuary Sunrise" className="hero-img" />
          </div>
          <div className="container hero-container">
            <div className="grid hero-grid">
              <div className="hero-text-block">
                <h1 className="hero-title">
                  <span className="visually-hidden">Advancing the Frontier of Rescue, Rehabilitation, and Conservation</span>
                  <span className="animated-text">
                    <span className="word">Advancing</span>{' '}
                    <span className="word">the</span>{' '}
                    <span className="word">Frontier</span>{' '}
                    <span className="word">of</span>{' '}
                    <span className="word">Rescue,</span>{' '}
                    <span className="word">Rehabilitation,</span>{' '}
                    <span className="word">and</span>{' '}
                    <span className="word">Conservation</span>
                  </span>
                </h1>
              </div>
              <div className="hero-btn-group">
                <a className="btn btn-primary btn-white" href="#section-about">
                  <span>Learn More</span>
                </a>
              </div>
              <div className="hero-media-controls">
                <button 
                  className="media-btn" 
                  aria-label={isPlayingHeroMedia ? 'Pause' : 'Play'}
                  onClick={() => setIsPlayingHeroMedia(!isPlayingHeroMedia)}
                >
                  {isPlayingHeroMedia ? <Pause size={18} /> : <Play size={18} />}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Latest News & Highlights */}
        <section className="section-news" id="section-news">
          <div className="container news-container">
            <div className="news-header">
              <h2 className="section-heading">Latest News and Highlights</h2>
            </div>
            
            <div className="news-slider-wrapper">
              <Swiper
                className="news-swiper"
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={30}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 }
                }}
                navigation={{
                  nextEl: '.news-next',
                  prevEl: '.news-prev',
                }}
                onInit={handleNewsSlideChange}
                onSlideChange={handleNewsSlideChange}
              >
                {/* Slide 1 */}
                <SwiperSlide className="news-slide">
                  <div className="news-item">
                    <a className="news-link-overlay" href="https://www.aninews.in/news/entertainment/out-of-box/anant-ambani-urges-colombia-to-stay-lethal-removal-of-80-hippos-offers-permanent-home-at-vantara20260428130844/" target="_blank" rel="noopener noreferrer"></a>
                    <div className="news-date-wrapper">
                      <span className="news-date">28 Apr 2026</span>
                    </div>
                    <div className="news-img-text-wrapper">
                      <div className="news-img-wrapper" style={{ backgroundImage: "url('images/news_hippos.png')" }}>
                        <div className="news-btn-wrapper">
                          <button className="news-action-btn" aria-label="Read News">
                            <ArrowUpRight size={18} />
                          </button>
                        </div>
                      </div>
                      <p className="news-title">Anant Ambani urges Colombia to stay lethal removal of 80 hippos, offers permanent home at Vantara</p>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide className="news-slide">
                  <div className="news-item">
                    <a className="news-link-overlay" href="https://aninews.in/news/entertainment/out-of-box/vantara-launches-global-university-for-wildlife-veterinary-sciences20260410171020/" target="_blank" rel="noopener noreferrer"></a>
                    <div className="news-date-wrapper">
                      <span className="news-date">9 Apr 2026</span>
                    </div>
                    <div className="news-img-text-wrapper">
                      <div className="news-img-wrapper" style={{ backgroundImage: "url('images/news_university.png')" }}>
                        <div className="news-btn-wrapper">
                          <button className="news-action-btn" aria-label="Read News">
                            <ArrowUpRight size={18} />
                          </button>
                        </div>
                      </div>
                      <p className="news-title">Vantara launches global university for wildlife, veterinary sciences</p>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide className="news-slide">
                  <div className="news-item">
                    <a className="news-link-overlay" href="https://www.instagram.com/p/DVlocLHDJ7B/" target="_blank" rel="noopener noreferrer"></a>
                    <div className="news-date-wrapper">
                      <span className="news-date">7 Mar 2026</span>
                    </div>
                    <div className="news-img-text-wrapper">
                      <div className="news-img-wrapper" style={{ backgroundImage: "url('images/news_leopard.png')" }}>
                        <div className="news-btn-wrapper">
                          <button className="news-action-btn" aria-label="Read News">
                            <ArrowUpRight size={18} />
                          </button>
                        </div>
                      </div>
                      <p className="news-title">Vantara Offers Lifelong Care to 50 Leopards from Human–Wildlife Conflict Areas at Request of Maharashtra Forest Department</p>
                    </div>
                  </div>
                </SwiperSlide>

                {/* Slide 4 */}
                <SwiperSlide className="news-slide">
                  <div className="news-item">
                    <a className="news-link-overlay" href="#section-news"></a>
                    <div className="news-date-wrapper">
                      <span className="news-date">2 Mar 2026</span>
                    </div>
                    <div className="news-img-text-wrapper">
                      <div className="news-img-wrapper" style={{ backgroundImage: "url('images/hero_wildlife.png')" }}>
                        <div className="news-btn-wrapper">
                          <button className="news-action-btn" aria-label="Read News">
                            <ArrowUpRight size={18} />
                          </button>
                        </div>
                      </div>
                      <p className="news-title">On Vantara Foundation Day, Vantara marks milestones in rescue, advanced care, and science-led conservation</p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
              
              {/* Controls */}
              <div className="news-controls">
                <button className="slider-btn news-prev" aria-label="Previous Slide">
                  <ChevronLeft size={20} />
                </button>
                <p className="slider-progress-text news-progress">{newsProgressText}</p>
                <button className="slider-btn news-next" aria-label="Next Slide">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Core Initiatives Accordion/Slider */}
        <section className="section-accordion-slider" id="section-initiatives">
          <div className="container">
            <div className="accordion-slider-grid">
              {/* Left: List & Content */}
              <div className="initiatives-content">
                <h2 className="initiatives-title">Core Initiatives</h2>
                <ul className="accordion-list">
                  {initiatives.map((item, idx) => (
                    <li 
                      key={idx} 
                      className={`accordion-item ${activeAccordion === idx ? 'active' : ''}`}
                    >
                      <button 
                        className="accordion-header" 
                        aria-expanded={activeAccordion === idx ? 'true' : 'false'} 
                        aria-controls={`accordion-panel-${idx}`}
                        onClick={() => setActiveAccordion(idx)}
                      >
                        <div className="accordion-icon">{item.icon}</div>
                        <h3 className="accordion-heading">{item.title}</h3>
                      </button>
                      <div 
                        className="accordion-panel" 
                        id={`accordion-panel-${idx}`} 
                        aria-hidden={activeAccordion === idx ? 'false' : 'true'}
                        style={{ maxHeight: activeAccordion === idx ? '250px' : '0' }}
                      >
                        <div className="panel-content">
                          <p>{item.desc}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Dynamic Image Slider (Synced) */}
              <div className="initiatives-visual">
                <div className="visual-slider-container">
                  {initiatives.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`visual-slide ${activeAccordion === idx ? 'active' : ''}`}
                      style={{ backgroundImage: `url('${item.image}')` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Founder Quotes */}
        <section className="section-quote" id="section-quotes">
          <div className="quote-slider-main">
            <Swiper
              className="quote-swiper"
              modules={[Pagination, Autoplay, EffectFade]}
              slidesPerView={1}
              spaceBetween={50}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              loop={true}
              pagination={{
                el: '.quote-pagination',
                clickable: true,
              }}
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
              }}
            >
              {/* Quote 1 */}
              <SwiperSlide className="quote-slide">
                <div className="container quote-container">
                  <div className="quote-grid">
                    <div className="quote-media-block">
                      <div className="quote-media-mask" style={{ backgroundImage: "url('images/founder_nita.png')" }}></div>
                    </div>
                    <div className="quote-text-block">
                      <h2 className="quote-role">Founder of Reliance Foundation</h2>
                      <h3 className="quote-name">Smt. Nita Mukesh Ambani</h3>
                      <div className="quote-mark"><Quote size={36} /></div>
                      <p className="quote-body">The Vedas have taught us the profound philosophy of Vasudhaiva Kutumbakam. Vantara stands as a living testament to this belief. Mukesh and I are incredibly proud of our son, Anant, for creating the world’s largest rescue and rehabilitation centre in Jamnagar. Vantara is where the wounded find care, the voiceless are heard, and nature flourishes in harmony with humanity.</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              {/* Quote 2 */}
              <SwiperSlide className="quote-slide">
                <div className="container quote-container">
                  <div className="quote-grid">
                    <div className="quote-media-block">
                      <div className="quote-media-mask" style={{ backgroundImage: "url('images/founder_anant.png')" }}></div>
                    </div>
                    <div className="quote-text-block">
                      <h2 className="quote-role">Our Founder</h2>
                      <h3 className="quote-name">Shri. Anant Mukesh Ambani</h3>
                      <div className="quote-mark"><Quote size={36} /></div>
                      <p className="quote-body">I see God in animals and Vantara is my temple. It is born from a belief that every being, no matter how big or small, deserves dignity, care, freedom, and a chance to heal and live. At Vantara, we are not just saving animals; we are healing ecosystems, restoring balance, and redefining coexistence for our future generations.</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            {/* Pagination */}
            <div className="quote-pagination"></div>
          </div>
        </section>

        {/* Section: About ("Where Healing Begins") */}
        <section className="section-about" id="section-about">
          <div className="container about-container">
            <div className="about-main-grid">
              <div className="about-text-block">
                <h2 className="about-title">Where Healing Begins</h2>
                <div className="about-subtitle">
                  <p>Amid the tranquil landscapes of Jamnagar, India, Vantara shelters over 150,000 animals representing 2,000+ species. Each one arrives with a story of struggle and survival. Through compassionate rescue, expert care, and nurturing support, we help them rediscover trust, safety, and the freedom they deserve.</p>
                </div>
                <a className="btn btn-secondary" href="#section-conservation">
                  <span>About Us</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Interactive Stats display */}
              <div className="about-stats-block">
                <div className="stats-media-wrapper" style={{ backgroundImage: "url('images/hero_wildlife.png')" }}>
                  <div className="stats-gradient-overlay"></div>
                </div>
                <div className="stats-info-block">
                  <nav className="stats-tabs">
                    <button 
                      className={`stats-tab-btn ${activeStatsSlide === 0 ? 'active' : ''}`} 
                      onClick={() => setActiveStatsSlide(0)}
                    >
                      Area
                    </button>
                    <button 
                      className={`stats-tab-btn ${activeStatsSlide === 1 ? 'active' : ''}`} 
                      onClick={() => setActiveStatsSlide(1)}
                    >
                      Species
                    </button>
                    <button 
                      className={`stats-tab-btn ${activeStatsSlide === 2 ? 'active' : ''}`} 
                      onClick={() => setActiveStatsSlide(2)}
                    >
                      Shelter
                    </button>
                  </nav>
                  <div className="stats-info-slides">
                    <div className={`stats-slide ${activeStatsSlide === 0 ? 'active' : ''}`}>
                      <p className="stats-caption">Expanding across acres of sanctuary land</p>
                      <div className="stats-value-wrapper">
                        <h3 className="stats-value">3,500+</h3>
                        <span className="stats-unit">Acres</span>
                      </div>
                    </div>
                    <div className={`stats-slide ${activeStatsSlide === 1 ? 'active' : ''}`}>
                      <p className="stats-caption">Caring for diverse wild and exotic species</p>
                      <div className="stats-value-wrapper">
                        <h3 className="stats-value">2,000+</h3>
                        <span className="stats-unit">Species</span>
                      </div>
                    </div>
                    <div className={`stats-slide ${activeStatsSlide === 2 ? 'active' : ''}`}>
                      <p className="stats-caption">Providing a secure and loving home for</p>
                      <div className="stats-value-wrapper">
                        <h3 className="stats-value">150,000+</h3>
                        <span className="stats-unit">Animals</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Conservation Tabbing (RKTEWT vs GZRRC) */}
        <section className="section-conservation" id="section-conservation">
          <div className="container">
            <div className="conservation-tabs-container">
              <div className="tabs-header">
                <button 
                  className={`tab-select-btn ${activeConservationTab === 'rktewt' ? 'active' : ''}`} 
                  onClick={() => setActiveConservationTab('rktewt')}
                >
                  RKTEWT
                </button>
                <button 
                  className={`tab-select-btn ${activeConservationTab === 'gzrrc' ? 'active' : ''}`} 
                  onClick={() => setActiveConservationTab('gzrrc')}
                >
                  GZRRC
                </button>
              </div>

              {/* Tab Panel: RKTEWT */}
              {activeConservationTab === 'rktewt' && (
                <div className="tab-panel active" id="tab-panel-rktewt">
                  <div className="panel-layout">
                    <div className="panel-details">
                      <h3 className="panel-title">Elephant Care Centre</h3>
                      <p className="panel-desc">Across 998 acres of protected land, the Radhe Krishna Temple Elephant Welfare Trust at Vantara shelters more than 260 elephants rescued from lives of hardship, logging camps, city streets, and circuses. Here, they rediscover freedom, friendship, and the joy of living in an environment that mirrors the wild.</p>
                      
                      <div className="panel-controls">
                        <button className="slider-btn rktewt-prev" aria-label="Previous Slide"><ChevronLeft size={20} /></button>
                        <span className="slider-progress-text rktewt-progress">{rktewtProgressText}</span>
                        <button className="slider-btn rktewt-next" aria-label="Next Slide"><ChevronRight size={20} /></button>
                      </div>
                    </div>

                    <div className="panel-swiper-container">
                      <Swiper
                        className="rktewt-swiper"
                        modules={[Navigation]}
                        slidesPerView={1}
                        spaceBetween={25}
                        breakpoints={{
                          768: { slidesPerView: 2 }
                        }}
                        navigation={{
                          nextEl: '.rktewt-next',
                          prevEl: '.rktewt-prev',
                        }}
                        onInit={handleRktewtSlideChange}
                        onSlideChange={handleRktewtSlideChange}
                      >
                        <SwiperSlide className="card-slide">
                          <div className="care-card">
                            <div className="card-img" style={{ backgroundImage: "url('images/elephant_hydrotherapy.png')" }}></div>
                            <div className="card-body">
                              <h4 className="card-title">Hydrotherapy for Gentle Giants</h4>
                              <p className="card-text">Targeted pressurized jets gently massage the body to ease arthritis and joint pain, improve circulation, and support healing in elephants with chronic strain.</p>
                              <button className="card-more-btn">Read more</button>
                            </div>
                          </div>
                        </SwiperSlide>

                        <SwiperSlide className="card-slide">
                          <div className="care-card">
                            <div className="card-img" style={{ backgroundImage: "url('images/elephant_surgery.png')" }}></div>
                            <div className="card-body">
                              <h4 className="card-title">Advanced Elephant Surgery Care</h4>
                              <p className="card-text">State-of-the-art facilities and expert veterinarians perform advanced surgeries that restore mobility, vision, and overall quality of life for elephants.</p>
                              <button className="card-more-btn">Read more</button>
                            </div>
                          </div>
                        </SwiperSlide>

                        <SwiperSlide className="card-slide">
                          <div className="care-card">
                            <div className="card-img" style={{ backgroundImage: "url('images/elephant_ayurveda.png')" }}></div>
                            <div className="card-body">
                              <h4 className="card-title">Ayurvedic Healing Oil Therapy</h4>
                              <p className="card-text">Rooted in Ayurveda, therapeutic oil massages calm the body, ease chronic discomfort, and support deeper healing and long-term physical balance.</p>
                              <button className="card-more-btn">Read more</button>
                            </div>
                          </div>
                        </SwiperSlide>

                        <SwiperSlide className="card-slide">
                          <div className="care-card">
                            <div className="card-img" style={{ backgroundImage: "url('images/elephant_enrichment.png')" }}></div>
                            <div className="card-body">
                              <h4 className="card-title">Food Enrichment for Elephants</h4>
                              <p className="card-text">From puzzle feeders to hidden treats, food enrichment keeps elephants mentally engaged, physically active, and stimulated throughout their recovery.</p>
                              <button className="card-more-btn">Read more</button>
                            </div>
                          </div>
                        </SwiperSlide>
                      </Swiper>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Panel: GZRRC */}
              {activeConservationTab === 'gzrrc' && (
                <div className="tab-panel active" id="tab-panel-gzrrc">
                  <div className="panel-layout">
                    <div className="panel-details">
                      <h3 className="panel-title">Rescue & Rehabilitation Centre</h3>
                      <p className="panel-desc">Greens Zoological Rescue and Rehabilitation Centre houses thousands of rescued leopards, lions, tigers, and wild birds. Equipped with state-of-the-art medical equipment, specialized nutrition protocols, and enclosures designed for behavioral enrichment, it is a global model for wildlife rehabilitation.</p>
                      
                      <div className="panel-controls">
                        <button className="slider-btn gzrrc-prev" aria-label="Previous Slide"><ChevronLeft size={20} /></button>
                        <span className="slider-progress-text gzrrc-progress">{gzrrcProgressText}</span>
                        <button className="slider-btn gzrrc-next" aria-label="Next Slide"><ChevronRight size={20} /></button>
                      </div>
                    </div>

                    <div className="panel-swiper-container">
                      <Swiper
                        className="gzrrc-swiper"
                        modules={[Navigation]}
                        slidesPerView={1}
                        spaceBetween={25}
                        breakpoints={{
                          768: { slidesPerView: 2 }
                        }}
                        navigation={{
                          nextEl: '.gzrrc-next',
                          prevEl: '.gzrrc-prev',
                        }}
                        onInit={handleGzrrcSlideChange}
                        onSlideChange={handleGzrrcSlideChange}
                      >
                        <SwiperSlide className="card-slide">
                          <div className="care-card">
                            <div className="card-img" style={{ backgroundImage: "url('images/news_leopard.png')" }}></div>
                            <div className="card-body">
                              <h4 className="card-title">Leopard Conflict Rehabilitation</h4>
                              <p className="card-text">Providing safe shelters, specialist surgical care, and naturalistic habitats to leopards recovered from human-wildlife conflict zones.</p>
                              <button className="card-more-btn">Read more</button>
                            </div>
                          </div>
                        </SwiperSlide>

                        <SwiperSlide className="card-slide">
                          <div className="care-card">
                            <div className="card-img" style={{ backgroundImage: "url('images/news_hippos.png')" }}></div>
                            <div className="card-body">
                              <h4 className="card-title">Hippopotamus River Habitats</h4>
                              <p className="card-text">Customized river lagoons with rich foliage, offering clean waters, muddy banks, and nutritional care matching their natural biology.</p>
                              <button className="card-more-btn">Read more</button>
                            </div>
                          </div>
                        </SwiperSlide>

                        <SwiperSlide className="card-slide">
                          <div className="care-card">
                            <div className="card-img" style={{ backgroundImage: "url('images/hero_wildlife.png')" }}></div>
                            <div className="card-body">
                              <h4 className="card-title">Avian Rescue & Specialized Care</h4>
                              <p className="card-text">Advanced flight aviaries with high-tech nesting boxes, clinical hospital setups, and nutrition designed for hundreds of exotic bird species.</p>
                              <button className="card-more-btn">Read more</button>
                            </div>
                          </div>
                        </SwiperSlide>
                      </Swiper>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <h2>VANTARA</h2>
              <p>Healing nature, one soul at a time.</p>
            </div>
            <div className="footer-links-grid">
              <div className="footer-col">
                <h4>Explore</h4>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="#section-news">Resources</a></li>
                  <li><a href="#section-about">About Us</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Legal</h4>
                <ul>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Use</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>Contact</h4>
                <ul>
                  <li><a href="mailto:info@vantara.in">info@vantara.in</a></li>
                  <li><span>Jamnagar, Gujarat, India</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Vantara. All Rights Reserved. Cloned with React + TS + Vite.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
