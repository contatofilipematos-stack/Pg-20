
import React, { useState, useEffect, useRef } from 'react';
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

const trackFBEvent = (eventName: string, params?: object) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, params);
  }
};

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

const StickyCTA: React.FC<{ onAnchorClick: (e: React.MouseEvent) => void }> = ({ onAnchorClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 z-[100] glass-effect border-t-2 border-pink-100 max-w-[480px] mx-auto animate-fade-in rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      <button 
        onClick={onAnchorClick}
        className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-black py-4.5 rounded-[24px] shadow-xl animate-cta flex items-center justify-center gap-2 text-lg uppercase"
      >
        <Heart size={20} fill="currentColor" />
        QUERO MEU PDF AGORA
      </button>
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
        <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-pink-500/90 text-white shadow-lg flex items-center justify-center"><ChevronLeft size={24}/></button>
        <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-pink-500/90 text-white shadow-lg flex items-center justify-center"><ChevronRight size={24}/></button>
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
  const [vagas, setVagas] = useState(14);
  const offerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setVagas(prev => (prev > 2 ? prev - 1 : prev)), 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToOffer = (e: React.MouseEvent) => {
    e.preventDefault();
    trackFBEvent('InitiateCheckout');
    if (offerRef.current) {
      offerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFinalCheckout = () => {
    trackFBEvent('Purchase', { value: 37.9, currency: 'BRL' });
  };

  return (
    <div className="min-h-screen flex justify-center selection:bg-pink-100">
      <div className="max-w-[480px] w-full bg-white shadow-2xl relative overflow-x-hidden pb-10">
        
        {/* Urgency Header */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white py-2 px-4 text-[10px] font-black text-center flex justify-center items-center gap-2 uppercase tracking-wider">
          <Sun size={12} fill="white" className="animate-pulse" />
          Apenas {vagas} vagas com o bônus "Bobbie Goods" exclusivo!
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
              onClick={scrollToOffer}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xl font-black py-5 rounded-[30px] shadow-2xl animate-cta flex flex-col items-center border-b-4 border-pink-800/20"
            >
              <span className="flex items-center gap-2 uppercase">QUERO MEU PDF AGORA <ArrowRight size={22} /></span>
              <span className="text-[10px] opacity-90 mt-1 uppercase tracking-widest">Acesso Vitalício e Imediato</span>
            </button>
            <div className="flex items-center gap-6 text-[10px] font-black text-gray-400 uppercase">
              <span className="flex items-center gap-1.5"><Printer size={14} className="text-pink-300" /> Imprima e Encante</span>
              <span className="flex items-center gap-1.5"><Lock size={14} className="text-pink-300" /> Compra 100% Segura</span>
            </div>
          </div>
        </section>

        <WavyDividerBottom color="#f0f9ff" />

        {/* O que você vai receber - GRID DETALHADA */}
        <section className="p-8 space-y-8 bg-sky-50 relative">
          <h2 className="text-2xl font-black text-center text-gray-900 pt-10">O que vem no seu Pack:</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { t: "Mandamentos HQ", i: "📜", c: "bg-orange-50" },
              { t: "7 Sacramentos", i: "⛪", c: "bg-blue-50" },
              { t: "Batismo", i: "💧", c: "bg-sky-50" },
              { t: "Confissão", i: "🤍", c: "bg-pink-50" },
              { t: "Eucaristia", i: "🍞", c: "bg-yellow-50" },
              { t: "Crisma", i: "🔥", c: "bg-red-50" },
              { t: "Perseverança", i: "👣", c: "bg-green-50" },
              { t: "Bíblia Ilustrada", i: "📖", c: "bg-indigo-50" },
              { t: "Dinâmicas Kids", i: "🎈", c: "bg-pink-100" },
              { t: "Bobbie Goods", i: "🎨", c: "bg-purple-50" },
              { t: "Jogos & Quiz", i: "🧩", c: "bg-orange-100" },
              { t: "Santos & Anjos", i: "😇", c: "bg-blue-100" }
            ].map((item, i) => (
              <div key={i} className={`${item.c} border-4 border-white p-5 rounded-[30px] shadow-sm text-center flex flex-col items-center justify-center hover:scale-105 transition-transform`}>
                <div className="text-4xl mb-2">{item.i}</div>
                <h4 className="text-[13px] font-black text-gray-800 leading-tight">{item.t}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Carousel de Amostras */}
        <section className="p-8 space-y-8 bg-white">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-black text-gray-900">Espie a Fofura do <span className="text-pink-500 underline decoration-yellow-300 decoration-4">Nosso Material</span></h2>
            <p className="text-sm text-gray-500 font-bold italic">O estilo Bobbie Goods que as crianças amam!</p>
          </div>
          <Carousel images={CAROUSEL_1} />
        </section>

        {/* SEÇÃO RECEBA AGORA */}
        <section className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-[45px] mx-4 border-4 border-dashed border-yellow-300 space-y-8 shadow-inner my-10">
           <div className="text-center space-y-2">
              <div className="bg-pink-500 text-white text-[10px] font-black px-6 py-1.5 rounded-full uppercase tracking-widest inline-flex items-center gap-1 shadow-md mb-2">
                 <Sparkles size={12} fill="white"/> LIBERADO AGORA NO SEU E-MAIL
              </div>
              <h2 className="text-2xl font-black text-gray-900 leading-tight">
                Sua Rotina na Catequese vai <span className="text-pink-500 underline decoration-yellow-400 decoration-4">Mudar Agora</span>!
              </h2>
           </div>
           
           <div className="space-y-4">
              {[
                { 
                  t: "Resgate sua Paz e seu Tempo Livre", 
                  d: "Pare de passar madrugadas buscando o que fazer. Abra o PDF, imprima e sua aula está pronta.", 
                  i: <Clock size={22}/> 
                },
                { 
                  t: "Evangelização que Prende a Atenção", 
                  d: "Use a estética 'Bobbie Goods' que é febre entre as crianças e veja a participação da sua turma decolar.", 
                  i: <Heart size={22} fill="currentColor"/> 
                },
                { 
                  t: "Material Completo e Fiel à Igreja", 
                  d: "Atividades didáticas baseadas na sã doutrina, unindo beleza estética e profundidade espiritual.", 
                  i: <BookOpen size={22}/> 
                },
                { 
                  t: "Acesso Vitalício no seu E-mail", 
                  d: "Compre uma vez e use para sempre. O material é seu, para todas as turmas que você tiver.", 
                  i: <Zap size={22}/> 
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-[35px] shadow-sm flex items-start gap-5 border-2 border-white hover:scale-[1.02] transition-transform">
                   <div className="bg-pink-100 text-pink-500 p-3.5 rounded-2xl flex-shrink-0">{item.i}</div>
                   <div>
                      <h4 className="text-sm font-black text-gray-800 mb-1 leading-tight">{item.t}</h4>
                      <p className="text-[11px] text-gray-500 font-bold leading-relaxed">{item.d}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Depoimentos */}
        <section className="p-8 space-y-8 bg-white">
          <h2 className="text-2xl font-black text-center text-gray-900">O que as <span className="text-pink-500">Catequistas</span> estão dizendo?</h2>
          <div className="space-y-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-pink-50/50 p-6 rounded-[35px] border-2 border-white shadow-xl relative">
                <p className="text-[13px] text-gray-600 font-bold italic mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 bg-white rounded-full border-2 border-pink-200 overflow-hidden">
                      <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                   </div>
                   <div>
                      <h4 className="text-[13px] font-black text-gray-800">{t.name}</h4>
                      <p className="text-[10px] text-pink-400 font-black uppercase">{t.role}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SUPER OFFER CARD - MAIS COMPLETO */}
        <section ref={offerRef} className="p-4 space-y-10 pb-20 scroll-mt-20">
          <div className="bg-white rounded-[50px] shadow-[0_30px_80px_-20px_rgba(236,72,153,0.4)] overflow-hidden border-[6px] border-[#fce7f3] relative">
            
            {/* Faixa de Oferta Irresistível */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-3 text-center">
               <p className="text-[11px] font-black text-gray-900 uppercase tracking-widest flex items-center justify-center gap-2">
                 <Sparkles size={14} fill="currentColor"/> PACOTE COMPLETO + BÔNUS EXCLUSIVOS
               </p>
            </div>

            {/* Header do Card */}
            <div className="bg-gradient-to-br from-[#ec4899] to-[#db2777] p-8 text-center text-white relative">
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase">VITALÍCIO</div>
                <h3 className="font-black text-2xl leading-tight uppercase tracking-tight">CATEQUESE KIDS<br/><span className="text-yellow-300">PREMIUM PACK</span></h3>
                <p className="text-[11px] font-bold opacity-80 mt-2">Acesso imediato ao material mais completo do Brasil</p>
            </div>

            <div className="p-6 sm:p-8">
              {/* O que está incluído - LISTA DETALHADA */}
              <div className="space-y-3 mb-10">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">CONTEÚDO DO PACK:</p>
                {[
                  { main: "+150 Páginas", sub: "Atividades Prontas para Imprimir", highlight: true },
                  { main: "Módulo Completo", sub: "Os 7 Sacramentos Ilustrados" },
                  { main: "Mandamentos HQ", sub: "Explicação Lúdica em Quadrinhos" },
                  { main: "Bíblia Ilustrada", sub: "Personagens no estilo Bobbie Goods" },
                  { main: "Guia da Missa", sub: "Atividades sobre a Santa Eucaristia" },
                  { main: "Orações Kids", sub: "Pai Nosso e Ave Maria Ilustrados" },
                  { main: "Dinâmicas", sub: "Jogos e Quebra-cabeças Cristãos" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-pink-50/40 rounded-2xl border border-pink-100/50">
                    <div className="bg-pink-500 text-white p-0.5 rounded-full mt-0.5 shadow-sm">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    <div className="text-[13px] leading-tight">
                       <span className="font-black text-gray-800">{item.main}: </span>
                       <span className="font-bold text-gray-600">{item.sub}</span>
                    </div>
                  </div>
                ))}

                <p className="text-[11px] font-black text-pink-400 uppercase tracking-widest mt-6 mb-4">BÔNUS ESPECIAIS (HOJE É GRÁTIS):</p>
                {[
                  { main: "BÔNUS 1:", sub: "Especial Histórias do Antigo Testamento", color: "text-orange-500" },
                  { main: "BÔNUS 2:", sub: "Lembrancinhas para Datas Comemorativas", color: "text-blue-500" },
                  { main: "BÔNUS 3:", sub: "Dinâmicas Inéditas para Catequistas", color: "text-green-500" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-yellow-50/50 rounded-2xl border border-yellow-100">
                    <div className="bg-yellow-400 text-white p-0.5 rounded-full mt-0.5 shadow-sm">
                      <Star size={14} fill="white" />
                    </div>
                    <div className="text-[13px] leading-tight">
                       <span className={`font-black ${item.color}`}>{item.main} </span>
                       <span className="font-bold text-gray-600">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Preço e Comparativo */}
              <div className="bg-gray-50 rounded-[35px] p-8 text-center border-2 border-white shadow-inner mb-8">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-3 mb-2">
                     <span className="text-gray-400 line-through text-sm font-bold">De R$ 147,90</span>
                     <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">MUITO MAIS VALOR</span>
                  </div>
                  
                  <p className="text-pink-500 text-[11px] font-black uppercase tracking-[3px] mb-2">LEVE TUDO ISSO POR APENAS</p>
                  
                  <div className="flex items-center text-pink-500">
                    <span className="text-3xl font-black mr-1 mt-[-10px]">R$</span>
                    <span className="text-8xl font-black tracking-tighter leading-none">37,90</span>
                  </div>
                  
                  <p className="text-gray-400 text-[10px] font-bold mt-4 leading-relaxed italic">
                    "Menos que o preço de um lanche para<br/>transformar o ano todo da sua turma!"
                  </p>
                </div>
              </div>

              {/* Botão de Checkout */}
              <div className="space-y-4">
                <a 
                  href={CHECKOUT_URL}
                  onClick={handleFinalCheckout}
                  className="block w-full bg-gradient-to-r from-[#ec4899] to-[#db2777] text-white font-black py-7 rounded-[35px] shadow-[0_15px_40px_-5px_rgba(219,39,119,0.5)] animate-cta text-2xl uppercase leading-tight px-4 text-center ring-4 ring-pink-100"
                >
                  QUERO O PACK COMPLETO!
                </a>
                
                {/* Formas de Pagamento e Segurança */}
                <div className="space-y-4 pt-4">
                  <div className="flex justify-center items-center gap-4 opacity-50 grayscale">
                    <div className="flex flex-col items-center gap-1">
                      <CreditCard size={20} />
                      <span className="text-[8px] font-black uppercase">Cartão</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <QrCode size={20} />
                      <span className="text-[8px] font-black uppercase">PIX</span>
                    </div>
                    <div className="h-8 w-px bg-gray-300 mx-2"></div>
                    <div className="flex flex-col items-center gap-1">
                      <ShieldCheck size={20} />
                      <span className="text-[8px] font-black uppercase">Seguro</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-1.5 text-green-600 font-black text-[10px] uppercase tracking-widest bg-green-50 px-4 py-2 rounded-full">
                       <Lock size={12}/> AMBIENTE 100% SEGURO E CRIPTOGRAFADO
                    </div>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">Pagamento processado por Lowify</p>
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
            <FAQItem q="É pago mensalmente?" a="Não! É um pagamento único de R$ 37,90 e você tem acesso para sempre." />
            <FAQItem q="Como recebo o acesso?" a="Imediatamente após a confirmação do pagamento, você receberá um e-mail com o link para baixar todos os PDFs." />
          </div>
        </section>

        <footer className="p-10 text-center bg-white pb-32">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest px-8">
            © 2024 CATEQUESE KIDS - FEITO COM AMOR PARA OS PEQUENOS DE DEUS
          </p>
        </footer>

        {/* Sticky CTA */}
        <StickyCTA onAnchorClick={scrollToOffer} />
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        .glass-effect { background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(10px); }
      `}</style>
    </div>
  );
};

export default App;
