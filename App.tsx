
import React, { useState, useEffect, useRef } from 'react';
import { redirectWithParams } from './redirect';
import CatechismCarousel from './src/components/CatechismCarousel';
import { 
  Check, 
  ArrowRight, 
  Star,
  ShieldCheck,
  ChevronDown,
  Clock,
  Lock,
  Printer,
  ChevronLeft,
  ChevronRight,
  Heart,
  Palette,
  Cloud,
  Sun,
  Puzzle,
  Gamepad2,
  BookOpen,
  Zap,
  Sparkles,
  CreditCard,
  QrCode
} from 'lucide-react';

// --- Data ---
const CAROUSEL_1 = [
  "https://i.ibb.co/h5cmvwg/1000141289.png",
  "https://i.ibb.co/HLnd6gNX/1000141290.png",
  "https://i.ibb.co/RKGn5tW/1000141294.png",
  "https://i.ibb.co/qQP2KZ1/1000141306.png"
];

const TESTIMONIALS = [
  {
    name: "Ana Paula R.",
    role: "Catequista há 5 anos",
    text: "Gente, esse material é surreal! Eu perdia horas no Pinterest buscando o que fazer. Agora meus encontros são os mais esperados da paróquia. As crianças amam os desenhos fofinhos!",
    city: "São Paulo - SP",
    avatar: "https://iili.io/ftqH97R.jpg"
  },
  {
    name: "Maria Luísa S.",
    role: "Coordenadora de Catequese",
    text: "Comprei para as catequistas da minha comunidade e foi a melhor escolha. Os Mandamentos em Quadrinhos facilitaram muito a explicação. É didático e lindo ao mesmo tempo.",
    city: "Curitiba - PR",
    avatar: "https://iili.io/ftq9ydv.jpg"
  },
  {
    name: "Luciana M.",
    role: "Catequista de Primeira Eucaristia",
    text: "O brilho nos olhos dos pequenos quando entrego as atividades é impagável. O estilo Bobbie Goods católico é uma genialidade. Recomendo de olhos fechados!",
    city: "Belo Horizonte - MG",
    avatar: "https://iili.io/ftq9mrJ.jpg"
  }
];

const CHECKOUT_URL = "https://pay.lowify.com.br/checkout?product_id=jlUfor";

// --- Sub-Components ---

const WavyDividerBottom: React.FC<{ color: string }> = ({ color }) => (
  <div className="w-full overflow-hidden leading-[0]">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px]" style={{ fill: color }}>
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0H0V56.44Z"></path>
    </svg>
  </div>
);

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 12, seconds: 45 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { minutes: prev.minutes - 1, seconds: 59 };
        return { minutes: 12, seconds: 45 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-pink-600 font-black text-xs bg-pink-50 px-5 py-2.5 rounded-full border-2 border-pink-100 uppercase tracking-tight">
      <Clock size={16} />
      <span>Oferta por tempo limitado: {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
    </div>
  );
};

const CATECHIST_PURCHASES = [
  { name: "Mariana S.", city: "Porto Alegre - RS", time: "1 minuto atrás", avatar: "https://i.ibb.co/pBsXfBcb/download-18.jpg" },
  { name: "Clarice de Oliveira", city: "Campinas - SP", time: "3 minutos atrás", avatar: "https://i.ibb.co/0RVtSHVp/download-17.jpg" },
  { name: "Regina Maria", city: "Belo Horizonte - MG", time: "Recém adquirido", avatar: "https://i.ibb.co/2YZsMdBn/download-16.jpg" },
  { name: "Luciana F.", city: "Salvador - BA", time: "2 minutos atrás", avatar: "https://i.ibb.co/ymYyyTxP/download-15.jpg" },
  { name: "Suely Santos", city: "São Paulo - SP", time: "Recém adquirido", avatar: "https://i.ibb.co/hxqQsxB2/download-14.jpg" },
  { name: "Ana Paula de Sousa", city: "Curitiba - PR", time: "5 minutos atrás", avatar: "https://i.ibb.co/WvjmsmwN/download-13.jpg" },
  { name: "Fernanda Ribeiro", city: "Rio de Janeiro - RJ", time: "1 minuto atrás", avatar: "https://i.ibb.co/7xyrsZRN/images-5.jpg" },
  { name: "Patrícia Nunes", city: "Goiânia - GO", time: "Recém adquirido", avatar: "https://i.ibb.co/JRCp9dWb/download-12.jpg" },
  { name: "Cristina M.", city: "Fortaleza - CE", time: "4 minutos atrás", avatar: "https://i.ibb.co/fdrz0Zjb/download-11.jpg" },
  { name: "Rita C.", city: "Recife - PE", time: "Recém adquirido", avatar: "https://i.ibb.co/chMZPkJ1/images-4.jpg" },
  { name: "Cláudia Regina", city: "Manaus - AM", time: "1 minuto atrás", avatar: "https://i.ibb.co/mCYQ5QKV/images-3.jpg" },
  { name: "Rosana Silva", city: "Vitória - ES", time: "2 minutos atrás", avatar: "https://i.ibb.co/pB3cr8Rm/images-2.jpg" },
  { name: "Sandra de Sousa", city: "Florianópolis - SC", time: "3 minutos atrás", avatar: "https://i.ibb.co/GfcCShNV/images-1.jpg" },
  { name: "Fátima Medeiros", city: "Natal - RN", time: "Recém adquirido", avatar: "https://i.ibb.co/MxnCcV7T/images.jpg" },
];

const PurchaseToast: React.FC<{ vagas: number }> = ({ vagas }) => {
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Delay first notification by 12 seconds so user can read hero peacefully
    const initialTimer = setTimeout(() => {
      setShow(true);
      // Automatically close after 5 seconds
      setTimeout(() => setShow(false), 5000);
    }, 12000);

    // Dynamic slower interval of 22 seconds for consecutive organic alerts
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % CATECHIST_PURCHASES.length);
        setShow(true);
        // Display for 5 seconds of active duration
        setTimeout(() => setShow(false), 5000);
      }, 1000);
    }, 22000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!show) return null;
  const item = CATECHIST_PURCHASES[current];

  return (
    <div className="fixed bottom-24 left-4 right-4 z-[90] max-w-[480px] mx-auto animate-slide-up pointer-events-none px-2 sm:px-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl border-2 border-pink-100 shadow-[0_12px_30px_rgba(219,39,119,0.15)] p-3 flex items-center gap-3 max-w-[310px]">
        <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center shrink-0 relative border border-pink-100">
          <img 
            src={item.avatar} 
            alt={item.name} 
            className="w-full h-full rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        </div>
        <div className="text-left leading-tight">
          <p className="text-[9px] text-gray-400 font-extrabold uppercase tracking-widest">Inscrição Confirmada!</p>
          <p className="text-[11px] font-black text-gray-800">{item.name}</p>
          <p className="text-[9px] text-pink-500 font-bold">{item.city} • <span className="text-gray-400 font-medium">{item.time}</span></p>
        </div>
      </div>
    </div>
  );
};

const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-[100] glass-effect border-t-2 border-pink-100 max-w-[480px] mx-auto animate-fade-in rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.12)]">
      <a 
        href={CHECKOUT_URL}
        className="block w-full text-center bg-pink-500 hover:bg-pink-600 text-white font-black py-4 rounded-full shadow-[0_8px_20px_rgba(219,39,119,0.35)] animate-cta flex items-center justify-center flex-wrap gap-2 text-[12.5px] sm:text-[14px] uppercase tracking-wider px-2"
      >
        <Heart size={18} fill="currentColor" className="shrink-0" />
        QUERO MEU MATERIAL AGORA
      </a>
    </div>
  );
};

const Carousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const next = () => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  const prev = () => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-[32px] shadow-2xl bg-white border-8 border-pink-100 aspect-[3/4] flex items-center justify-center">
        <div className="flex transition-transform duration-700 h-full w-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((img, idx) => (
            <div key={idx} className="w-full h-full flex-shrink-0 flex items-center justify-center p-4 bg-white">
              <img src={img} alt={`Amostra ${idx + 1}`} className="max-w-full max-h-full object-contain drop-shadow-lg" />
            </div>
          ))}
        </div>
        <button onClick={() => prev()} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-pink-500/90 text-white shadow-lg flex items-center justify-center"><ChevronLeft size={24}/></button>
        <button onClick={() => next()} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-pink-500/90 text-white shadow-lg flex items-center justify-center"><ChevronRight size={24}/></button>
        <div className="absolute top-6 right-6 pdf-badge shadow-xl">PDF FOFINHO</div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, idx) => (
          <div key={idx} className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentIndex ? 'bg-pink-500 w-6' : 'bg-pink-200'}`} />
        ))}
      </div>
    </div>
  );
};

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-3">
      <button onClick={() => setOpen(!open)} className={`w-full p-5 rounded-2xl flex justify-between items-center text-left transition-all ${open ? 'bg-pink-50 ring-2 ring-pink-100' : 'bg-white'}`}>
        <span className="font-extrabold text-gray-800 text-sm">{q}</span>
        <div className={`p-1 rounded-full bg-pink-100 text-pink-500 transition-transform ${open ? 'rotate-180' : ''}`}><ChevronDown size={18} /></div>
      </button>
      {open && <div className="p-5 text-gray-600 text-[13px] leading-relaxed animate-fade-in">{a}</div>}
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [vagas, setVagas] = useState<number>(17);
  const [isVagasFlash, setIsVagasFlash] = useState(false);
  const [hasTriggeredDrop, setHasTriggeredDrop] = useState(false);
  const offerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasTriggeredDrop) return;

    const runSequentialDrop = () => {
      setHasTriggeredDrop(true);
      
      // First drop (17 -> 16) after 1.2s
      setTimeout(() => {
        setVagas(prev => {
          if (prev > 3) {
            setIsVagasFlash(true);
            setTimeout(() => setIsVagasFlash(false), 850);
            return prev - 1;
          }
          return prev;
        });

        // Second drop (16 -> 15) after 1.8s
        setTimeout(() => {
          setVagas(prev => {
            if (prev > 3) {
              setIsVagasFlash(true);
              setTimeout(() => setIsVagasFlash(false), 850);
              return prev - 1;
            }
            return prev;
          });

          // Third drop (15 -> 14) after 1.8s
          setTimeout(() => {
            setVagas(prev => {
              if (prev > 3) {
                setIsVagasFlash(true);
                setTimeout(() => setIsVagasFlash(false), 850);
                return prev - 1;
              }
              return prev;
            });
          }, 1800);
        }, 1800);
      }, 1200);
    };

    // Trigger on scroll (when the pricing banner enters viewport)
    let observer: IntersectionObserver | null = null;
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const checkAndRun = () => {
        const target = bannerRef.current || document.getElementById("urgency-banner");
        if (target) {
          observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
              runSequentialDrop();
              if (observer) observer.disconnect();
            }
          }, { threshold: 0.05 });
          observer.observe(target);
        }
      };
      
      // Schedule check to ensure element is rendered
      setTimeout(checkAndRun, 100);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [hasTriggeredDrop]);

  useEffect(() => {
    // Normal slow ambient decrement every 50 seconds to continue standard urgency decay down to 3
    const interval = setInterval(() => {
      if (hasTriggeredDrop) {
        setVagas(prev => {
          if (prev > 3) {
            setIsVagasFlash(true);
            setTimeout(() => setIsVagasFlash(false), 850);
            return prev - 1;
          }
          return prev;
        });
      }
    }, 50000);

    return () => clearInterval(interval);
  }, [hasTriggeredDrop]);

  const scrollToOffer = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (offerRef.current) {
      offerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex justify-center selection:bg-pink-100">
      <div className="max-w-[480px] w-full bg-white shadow-2xl relative overflow-x-hidden pb-10">
        
        {/* Urgency Header */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white py-2 px-2 text-[8.2px] min-[360px]:text-[9px] min-[390px]:text-[10px] sm:text-[11px] font-black text-center flex justify-center items-center gap-1 uppercase tracking-tight leading-none whitespace-nowrap">
          <Sun size={11} fill="white" className="animate-pulse shrink-0" />
          <span>VAGAS LIMITADAS PARA ADQUIRIR O MATERIAL: RESTAM APENAS <span className={`inline-block transition-all duration-300 transform ${isVagasFlash ? 'text-yellow-200 scale-125 font-black drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]' : ''}`}>{vagas}</span>!</span>
        </div>

        {/* Hero */}
        <section className="p-6 pt-10 space-y-6 text-center bg-gradient-to-b from-sky-50 to-white relative">
          <div className="flex justify-center items-center gap-2 text-pink-500 font-black text-[11px] uppercase bg-white/50 w-fit mx-auto px-4 py-1.5 rounded-full border border-pink-50">
            <Heart size={14} fill="currentColor" /> A Melhor Escolha para sua Catequese <Heart size={14} fill="currentColor" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 leading-[1.1]">
            Transforme sua Catequese: Tenha o Material mais <span className="text-pink-500 underline decoration-yellow-400 decoration-4">Lúdico e Apaixonante</span> do Brasil! ✨
          </h1>
          <p className="text-gray-600 text-[15px] leading-relaxed font-bold italic px-4">
            Diga adeus ao cansaço de preparar aulas do zero. Encante seus pequenos com atividades fofas em PDF e veja o brilho nos olhos de cada criança! 🎨📖
          </p>

          <div className="relative pt-4">
            <div className="absolute -top-1 -left-1 z-10 bg-yellow-400 text-gray-900 text-[11px] font-black px-4 py-2 rounded-[18px] rotate-[-5deg] shadow-lg flex items-center gap-1 border-2 border-white">
              <Cloud size={14} fill="white" /> 100% DIGITAL EM PDF
            </div>
            <img src="https://i.ibb.co/Xx9tT55J/1000141193.png" alt="Pack Kids" className="rounded-[40px] shadow-2xl border-[10px] border-white drop-shadow-2xl" />
          </div>

          <div className="flex flex-col items-center gap-5 pt-4">
            <CountdownTimer />
            <button 
              onClick={() => scrollToOffer()}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white text-base font-black py-5 rounded-[30px] shadow-2xl animate-cta flex flex-col items-center border-b-4 border-pink-800/20 px-4"
            >
              <span className="flex items-center justify-center flex-wrap gap-2 uppercase text-center text-[14px] sm:text-base whitespace-normal break-words leading-tight">
                QUERO MEU MATERIAL AGORA <ArrowRight size={22} className="shrink-0" />
              </span>
              <span className="text-[10px] opacity-90 mt-1.5 uppercase tracking-widest">Acesso Vitalício e Imediato</span>
            </button>
            <div className="flex items-center gap-6 text-[10px] font-black text-gray-400 uppercase">
              <span className="flex items-center gap-1.5"><Printer size={14} className="text-pink-300" /> Imprima e Encante</span>
              <span className="flex items-center gap-1.5"><Lock size={14} className="text-pink-300" /> Compra 100% Segura</span>
            </div>
          </div>
        </section>

        <WavyDividerBottom color="#e0f2fe" />
        <section className="bg-sky-100 flex justify-center items-center pb-10">
          <img src="https://i.ibb.co/GvcHNLT7/Screenshot-2026-05-20-09-29-53-316-com-android-chrome-edit.jpg" alt="Conteúdo do Pack" className="w-full" />
        </section>
        
        {/* Carousel de Amostras */}
        <section className="p-8 space-y-8 bg-white">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-black text-gray-900">Espie a Fofura do <span className="text-pink-500 underline decoration-yellow-300 decoration-4">Nosso Material</span></h2>
            <p className="text-sm text-gray-500 font-bold italic">O estilo Bobbie Goods que as crianças amam!</p>
          </div>
          <Carousel images={CAROUSEL_1} />
          
          <div className="flex justify-center mt-6">
            <img src="https://i.ibb.co/5hTpDGLH/Screenshot-2026-05-20-09-53-33-377-com-android-chrome-edit.jpg" alt="Qualidade que Apaixona" className="w-full rounded-[24px] [mask-image:linear-gradient(to_bottom,black_90%,transparent_100%)]" />
          </div>
        </section>

        <CatechismCarousel />

        {/* O que você vai receber - GRID DETALHADA */}
        <section className="p-8 space-y-8 bg-sky-50 relative">
          <h2 className="text-2xl font-black text-center text-gray-900 pt-10">O que vem no seu Pack:</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { t: "Mandamentos HQ", s: "HISTÓRIAS EM QUADRINHOS", i: "📜", c: "bg-orange-50" },
              { t: "7 Sacramentos", s: "AULAS CRIATIVAS", i: "⛪", c: "bg-blue-50" },
              { t: "Batismo", s: "INICIAÇÃO CRISTÃ", i: "💧", c: "bg-sky-50" },
              { t: "Confissão", s: "PENITÊNCIA LÚDICA", i: "🤍", c: "bg-pink-50" },
              { t: "Eucaristia", s: "1ª COMUNHÃO", i: "🍞", c: "bg-yellow-50" },
              { t: "Crisma", s: "CONFIRMAÇÃO", i: "🔥", c: "bg-red-50" },
              { t: "Perseverança", s: "CAMINHANDO COM JESUS", i: "👣", c: "bg-green-50" },
              { t: "Bíblia Ilustrada", s: "CONTOS EM PDF", i: "📖", c: "bg-indigo-50" },
              { t: "Dinâmicas Kids", s: "ALEGRIA NO ENCONTRO", i: "🎈", c: "bg-pink-100" },
              { t: "Bobbie Goods", s: "DESENHOS EXCLUSIVOS", i: "🎨", c: "bg-purple-50" },
              { t: "Jogos & Quiz", s: "FIXAÇÃO DIVERTIDA", i: "🧩", c: "bg-orange-100" },
              { t: "Santos & Anjos", s: "NOSSOS AMIGOS", i: "😇", c: "bg-blue-100" }
            ].map((item, i) => (
              <div key={i} className={`${item.c} border-4 border-white p-5 rounded-[30px] shadow-sm text-center flex flex-col items-center justify-center hover:scale-105 transition-transform`}>
                <div className="text-4xl mb-2">{item.i}</div>
                <h4 className="text-[13px] font-black text-gray-800 leading-tight">{item.t}</h4>
                <p className="text-[9px] text-gray-500 font-bold uppercase mt-1 tracking-wider">{item.s}</p>
              </div>
            ))}
          </div>
        </section>


        {/* Imagem do Pack Completo */}
        <section className="p-0 bg-white">
          <img src="https://iili.io/C9zwhoQ.jpg" alt="Pack Completo" className="w-full saturate-150" />
        </section>

        {/* Imagem dos Bônus */}
        <section className="p-0 bg-white">
          <img src="https://iili.io/C9z8wiv.jpg" alt="Bônus Especiais" className="w-full [mask-image:linear-gradient(to_bottom,black_90%,transparent_100%)]" />
        </section>

        {/* SUPER OFFER CARD - MAIS COMPLETO */}
        <section ref={offerRef} className="p-4 space-y-10 pb-20 scroll-mt-20">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 font-black text-[11px] px-5 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
              OPORTUNIDADE DE HOJE 🎁
            </div>
            <h2 className="text-3xl font-black text-gray-900 leading-tight">Leve o Pack Completo</h2>
          </div>

          <div className="bg-gradient-to-b from-white to-pink-50 rounded-[40px] shadow-[0_20px_40px_rgba(244,114,182,0.15)] border-[8px] border-pink-100 relative">
            
            {/* Header do Card */}
            <div className="bg-pink-500 rounded-t-[32px] p-8 text-center text-white">
                <h3 className="font-extrabold text-[22px] leading-tight uppercase tracking-tight">SUPER COMBO CATEQUESE KIDS</h3>
                <p className="text-[12px] font-bold mt-2 opacity-90 uppercase tracking-wide">TUDO O QUE VOCÊ VIU E MUITO MAIS!</p>
            </div>

            <div className="p-8">
              {/* Preço */}
              <div className="text-center mb-8">
                 <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-gray-400 line-through text-lg font-bold">R$ 97,00</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">90% DE DESCONTO</span>
                 </div>
                 <p className="text-pink-500 text-[12px] font-black uppercase tracking-[2px] mb-1">POR APENAS</p>
                 <div className="flex items-baseline justify-center text-pink-600">
                   <span className="text-3xl font-black mr-1">R$</span>
                   <span className="text-[72px] font-black tracking-tighter leading-none animate-pulse">19,90</span>
                 </div>
                 <p className="text-gray-400 text-[11px] font-bold mt-3 uppercase tracking-wider">ACESSO VITALÍCIO • DEVOLUÇÃO EM 7 DIAS</p>
                 
                 {/* Blinking Urgency Banner inside Pricing box */}
                 <div id="urgency-banner" ref={bannerRef} className="mt-4 bg-red-50 border border-red-100 text-red-600 rounded-xl p-3 text-[11px] font-black uppercase tracking-wide flex items-center justify-center gap-1.5 animate-pulse">
                   <span>⚠️ VAGAS PROMOCIONAIS ESGOTANDO (APENAS <span className={`inline-block transition-all duration-300 transform ${isVagasFlash ? 'text-pink-600 scale-150 font-black drop-shadow-[0_0_12px_rgba(219,39,119,0.7)]' : ''}`}>{vagas}</span> RESTANTES)</span>
                 </div>
              </div>

              <hr className="border-gray-100 mb-8" />

              {/* Lista com Value Stack */}
              <div className="space-y-4 mb-10">
                {[
                  { text: "Pack Completo: Temas de Batismo à Crisma", val: "R$ 47" },
                  { text: "Bônus: Coleção de Histórias Bíblicas Kids", val: "R$ 27" },
                  { text: "Bônus: Lembrancinhas e Moldes Prontos", val: "R$ 19" },
                  { text: "Super Bônus: Desenhos Bobbie Goods 100% Católicos", val: "R$ 37" },
                  { text: "Especial Corpus Christi e Dinâmicas Lúdicas", val: "R$ 17" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="bg-pink-100 text-pink-500 p-1 rounded-full shrink-0 mt-0.5">
                      <Check size={14} strokeWidth={3.5} />
                    </div>
                    <div className="text-left leading-tight">
                      <span className="font-bold text-gray-700 text-[13.5px] block">{item.text}</span>
                      <span className="text-[10px] text-pink-500 font-extrabold uppercase bg-pink-50 px-2 py-0.5 rounded border border-pink-100/50 inline-block mt-1">
                        Valor normal: {item.val} • <span className="text-green-600 font-black">HOJE GRÁTIS</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botão de Checkout */}
              <a 
                href={CHECKOUT_URL}
                className="block w-full bg-pink-600 hover:bg-pink-700 text-white font-black py-4 sm:py-4.5 rounded-[22px] text-[13px] sm:text-[17px] uppercase tracking-wider px-4 text-center mb-6 border-b-4 border-pink-800 whitespace-normal break-words leading-tight animate-pulse-strong"
              >
                QUERO ENCANTAR MINHA TURMA AGORA
              </a>

              {/* Métodos de Pagamento e Segurança */}
              <div className="flex flex-col items-center gap-4 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-4 text-gray-400 font-black text-[10px] uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><ShieldCheck size={15} className="text-green-500" /> COMPRA 100% SEGURA</span>
                  <span className="flex items-center gap-1.5"><Star size={15} className="text-yellow-400" fill="currentColor" /> 4.9/5 ESTRELAS</span>
                </div>
                
                {/* Payment Methods Badges */}
                <div className="flex items-center justify-center gap-3 bg-gray-50 px-5 py-2.5 rounded-2xl border border-gray-100/60 w-full">
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wide">Pague com:</span>
                  
                  <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-gray-100 text-pink-600 text-[10px] font-black">
                    <QrCode size={13} className="text-sky-500" /> PIX (Acesso Imediato)
                  </div>
                  
                  <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-gray-100 text-pink-600 text-[10px] font-black">
                    <CreditCard size={13} className="text-yellow-500" /> CARTÃO
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ & Guarantee */}
        <section className="p-10 space-y-8 bg-sky-50 rounded-[50px] mx-4 mb-10 border-4 border-white">
          <div className="text-center space-y-4">
            <ShieldCheck size={56} className="text-pink-500 mx-auto" />
            <h3 className="font-black text-xl">Garantia Sorriso no Rosto</h3>
            <p className="text-sm text-gray-500 font-bold px-4">Seus pequenos vão amar. Se não gostar, devolvemos seu dinheiro em 7 dias!</p>
          </div>
          <div className="space-y-2">
            <FAQItem q="O material chega pelo correio?" a="Não, é 100% digital! Você recebe no e-mail logo após a compra, baixa e imprime quando quiser." />
            <FAQItem q="É pago mensalmente?" a="Não! É um pagamento único de R$ 19,90 e você tem acesso para sempre." />
            <FAQItem q="Como recebo o acesso?" a="Imediatamente após a confirmação do pagamento, você receberá um e-mail com o link para baixar todos os PDFs." />
          </div>
        </section>

        <footer className="p-10 text-center bg-white pb-32">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest px-8">
            © 2024 CATEQUESE KIDS - FEITO COM AMOR PARA OS PEQUENOS DE DEUS
          </p>
        </footer>

        {/* Purchase Toast notification for ultimate social proof */}
        <PurchaseToast vagas={vagas} />

        {/* Sticky CTA */}
        <StickyCTA />
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-strong {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(219, 39, 119, 0.7), 0 8px 25px rgba(219, 39, 119, 0.35);
          }
          50% {
            transform: scale(1.04);
            box-shadow: 0 0 0 20px rgba(219, 39, 119, 0), 0 12px 35px rgba(219, 39, 119, 0.55);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(219, 39, 119, 0), 0 8px 25px rgba(219, 39, 119, 0.35);
          }
        }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-pulse-strong { animation: pulse-strong 1.5s infinite cubic-bezier(0.25, 1, 0.5, 1); }
        .glass-effect { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); }
      `}</style>
    </div>
  );
};

export default App;
