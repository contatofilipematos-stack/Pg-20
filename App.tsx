
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
const TESTIMONIALS = [
  {
    name: "Débora S.",
    role: "Professora de Curitiba - PR",
    text: "Minha vida mudou! Eu chegava em casa exausta e ainda tinha que planejar aula. Agora, com o Drive, escolho a atividade, imprimo e pronto. Sobra tempo até para brincar com meus filhos.",
    city: "Curitiba - PR",
    avatar: "https://iili.io/ftqH97R.jpg"
  },
  {
    name: "Cláudia M.",
    role: "Educação Infantil há 12 anos",
    text: "O material é de uma qualidade absurda. As crianças ficam hipnotizadas com os desenhos. Além disso, usei alguns materiais para criar meu próprio mini-curso e já estou vendendo!",
    city: "Salvador - BA",
    avatar: "https://iili.io/ftq9ydv.jpg"
  },
  {
    name: "Renata F.",
    role: "Recém-formada e Encantada",
    text: "Eu estava perdida no começo da carreira. Este acervo foi meu bote salva-vidas. Planos de aula prontinhos e atividades que realmente engajam os pequenos. Melhor investimento que fiz.",
    city: "Porto Alegre - RS",
    avatar: "https://iili.io/ftq9mrJ.jpg"
  }
];

const CHECKOUT_URL = "https://pay.lowify.com.br/checkout?product_id=bLcXUO";

// --- Global Fix for Circular JSON Errors in Third-Party Trackers ---
if (typeof window !== 'undefined') {
  if (!(HTMLElement.prototype as any).toJSON) {
    (HTMLElement.prototype as any).toJSON = function() {
      return {
        tagName: this.tagName,
        id: this.id,
        className: this.className,
        type: (this as any).type
      };
    };
  }
}

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
    <div className="flex items-center gap-2 text-blue-700 font-bold text-[11px] bg-blue-50 px-5 py-2.5 rounded-full border-2 border-blue-100/50 uppercase tracking-wide">
      <Clock size={16} className="text-red-500 shrink-0" />
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
    <div className="fixed bottom-0 left-0 right-0 p-4 z-[100] glass-effect border-t-2 border-slate-100 max-w-[480px] mx-auto animate-fade-in rounded-t-[40px] shadow-[0_-15px_40px_rgba(0,0,0,0.08)]">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
            e.nativeEvent.stopImmediatePropagation();
          }
          onAnchorClick(e);
        }}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-black py-5 rounded-[28px] shadow-lg animate-cta flex items-center justify-center gap-2 text-lg uppercase tracking-tight border-b-4 border-blue-800"
      >
        <Zap size={20} fill="currentColor" />
        GARANTIR MEU MATERIAL AGORA
      </button>
    </div>
  );
};

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-3">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
            e.nativeEvent.stopImmediatePropagation();
          }
          setOpen(!open);
        }} 
        className={`w-full p-5 rounded-2xl flex justify-between items-center text-left transition-all ${open ? 'bg-yellow-50 ring-2 ring-yellow-400' : 'bg-white'}`}
      >
        <span className="font-black text-slate-800 text-[13px]">{q}</span>
        <div className={`p-1.5 rounded-xl bg-slate-100 text-slate-500 transition-transform ${open ? 'rotate-180 bg-yellow-400 text-black' : ''}`}><ChevronDown size={18} /></div>
      </button>
      {open && <div className="p-6 text-slate-600 text-[13px] font-medium leading-relaxed animate-fade-in bg-yellow-400/5 rounded-b-2xl">{a}</div>}
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

  const scrollToOffer = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
        e.nativeEvent.stopImmediatePropagation();
      }
    }
    if (offerRef.current) {
      offerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFinalCheckout = (e: React.MouseEvent, value: number) => {
    if (e) {
      e.preventDefault(); 
      e.stopPropagation();
      if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
        e.nativeEvent.stopImmediatePropagation();
      }
    }
    
    // Smooth transition
    setTimeout(() => {
      window.location.href = CHECKOUT_URL;
    }, 150);
  };

  return (
    <div className="min-h-screen flex justify-center selection:bg-yellow-200">
      <div className="max-w-[480px] w-full bg-[#FCFCFA] shadow-2xl relative overflow-x-hidden pb-10">
        
        {/* Urgency Header */}
        <div className="bg-yellow-400 text-black py-2.5 px-4 text-[10px] font-black text-center flex justify-center items-center gap-2 uppercase tracking-widest shadow-md">
          <Zap size={12} fill="currentColor" className="animate-pulse" />
          Aproveite: {vagas} licenças PLR com desconto exclusivo hoje!
        </div>

        {/* Hero */}
        <section className="p-6 pt-10 space-y-6 text-center bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-yellow-100/50 -z-10" />
          <div className="flex justify-center items-center gap-2 text-blue-600 font-black text-[11px] uppercase bg-blue-50 w-fit mx-auto px-5 py-2 rounded-full border-2 border-blue-100/50 shadow-sm">
            <Sparkles size={14} fill="currentColor" /> O Aliado que Todo Educador Merece <Sparkles size={14} fill="currentColor" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Chega de Noites sem Dormir Planejando Aulas! Tenha <span className="text-red-500 underline decoration-yellow-400 decoration-8 underline-offset-4">25.000 Materiais</span> Prontos! ✨
          </h1>
          <p className="text-slate-600 text-[15px] leading-relaxed font-bold italic px-4">
            Resgate sua paz e seu tempo livre. Um acervo completo de atividades, jogos e planos de aula para você usar, editar ou até revender como se fossem seus! 📚🎨
          </p>

          <div className="relative pt-4 px-2">
            <div className="absolute -top-1 -left-1 z-10 bg-green-500 text-white text-[10px] font-black px-5 py-2.5 rounded-[20px] rotate-[-4deg] shadow-xl flex items-center gap-1.5 border-2 border-white">
              <Cloud size={14} fill="white" /> ACESSO VITALÍCIO AO DRIVE
            </div>
            <img src="https://iili.io/BgZ8mfn.png" alt="Drive Pedagógico" className="rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-[8px] border-white drop-shadow-xl" />
          </div>

          <div className="flex flex-col items-center gap-5 pt-4">
            <CountdownTimer />
            <button 
              onClick={scrollToOffer}
              className="w-full bg-yellow-400 text-black text-xl font-black py-6 rounded-[30px] shadow-[0_15px_0_0_#ca8a04] active:translate-y-1 active:shadow-[0_10px_0_0_#ca8a04] transition-all animate-cta flex flex-col items-center border-2 border-black"
            >
              <span className="flex items-center gap-2 uppercase tracking-tight">GARANTIR MEU ACESSO AGORA <ArrowRight size={22} /></span>
              <span className="text-[10px] opacity-80 mt-1 uppercase tracking-widest font-black">Liberação Imediata via E-mail</span>
            </button>
            <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span className="flex items-center gap-2"><Zap size={14} className="text-blue-500" /> Use ou Revenda</span>
              <span className="flex items-center gap-2"><Lock size={14} className="text-green-500" /> 100% Seguro</span>
            </div>
          </div>
        </section>

        <WavyDividerBottom color="#F8FAFC" />

        {/* O que você vai receber - GRID DETALHADA */}
        <section className="p-8 space-y-8 bg-[#F8FAFC] relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-30 -z-10" />
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-900 pt-5">O que te espera no Drive:</h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Acervo completo organizado</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { t: "Atividades Prontas", i: "📝", c: "bg-blue-50", b: "border-blue-100" },
              { t: "Planos de Aula", i: "📅", c: "bg-green-50", b: "border-green-100" },
              { t: "Jogos Pedagógicos", i: "🎲", c: "bg-yellow-400/20", b: "border-yellow-400" },
              { t: "Cartilhas de Alfabetização", i: "🔤", c: "bg-red-50", b: "border-red-100" },
              { t: "Recursos Especiais", i: "🧩", c: "bg-sky-50", b: "border-sky-100" },
              { t: "Capas de Caderno", i: "📒", c: "bg-yellow-400/20", b: "border-yellow-400" },
              { t: "Planners para Profs", i: "📑", c: "bg-emerald-50", b: "border-emerald-100" },
              { t: "Desenhos para Colorir", i: "🖍️", c: "bg-indigo-50", b: "border-indigo-100" },
              { t: "Painéis Decorativos", i: "🖼️", c: "bg-blue-50", b: "border-blue-100" },
              { t: "Dinâmicas Criativas", i: "🏃", c: "bg-rose-50", b: "border-rose-100" },
              { t: "Certificados para Alunos", i: "🏆", c: "bg-yellow-400/30", b: "border-yellow-400" },
              { t: "Material PLR (Revenda)", i: "💰", c: "bg-green-50", b: "border-green-100" }
            ].map((item, i) => (
              <div key={i} className={`${item.c} border-2 ${item.b} p-5 rounded-[32px] shadow-sm text-center flex flex-col items-center justify-center hover:scale-105 transition-all duration-300`}>
                <div className="text-4xl mb-2 drop-shadow-sm">{item.i}</div>
                <h4 className="text-[12px] font-black text-slate-800 leading-tight">{item.t}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO RECEBA AGORA */}
        <section className="p-8 bg-yellow-50 rounded-[45px] mx-4 border-4 border-dashed border-yellow-400 space-y-8 shadow-inner my-10 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200/40 blur-3xl -z-10" />
           <div className="text-center space-y-2">
              <div className="bg-blue-600 text-white text-[10px] font-black px-6 py-1.5 rounded-full uppercase tracking-widest inline-flex items-center gap-1 shadow-md mb-2">
                 <Sparkles size={12} fill="white"/> TRANSFORME SUA ROTINA AGORA
              </div>
              <h2 className="text-2xl font-black text-slate-900 leading-tight">
                Dê um Fim ao Cansaço e <span className="text-green-600 underline decoration-yellow-400 decoration-8 underline-offset-4">Ganhe Liberdade</span>!
              </h2>
           </div>
           
           <div className="space-y-4">
              {[
                { 
                  t: "Economize Horas de Planejamento", 
                  d: "Pare de passar o domingo planejando o que fazer na segunda. Abra o Drive, escolha e imprima.", 
                  i: <Clock size={22}/> 
                },
                { 
                  t: "Aulas Criativas e Sem Estresse", 
                  d: "Material testado e aprovado. Chegue na sala com a segurança de quem tem o melhor conteúdo nas mãos.", 
                  i: <Heart size={22} fill="currentColor"/> 
                },
                { 
                  t: "Organização que Traz Paz", 
                  d: "Tudo separado por pastas organizadas. Nunca mais perca tempo buscando arquivos no computador.", 
                  i: <BookOpen size={22}/> 
                },
                { 
                  t: "Renda Extra com PLR", 
                  d: "Você tem o direito de revender esses materiais para outros professores e ficar com 100% do lucro.", 
                  i: <Zap size={22}/> 
                }
              ].map((item, idx) => {
                const colors = [
                  { bg: 'bg-blue-50', text: 'text-blue-600' },
                  { bg: 'bg-red-50', text: 'text-red-500' },
                  { bg: 'bg-green-50', text: 'text-green-600' },
                  { bg: 'bg-yellow-400/20', text: 'text-yellow-600' }
                ];
                return (
                  <div key={idx} className="bg-white p-7 rounded-[35px] shadow-sm flex items-start gap-5 border-2 border-white hover:scale-[1.02] transition-transform">
                     <div className={`${colors[idx % colors.length].bg} ${colors[idx % colors.length].text} p-4 rounded-2xl flex-shrink-0`}>{item.i}</div>
                     <div>
                        <h4 className="text-[15px] font-black text-slate-800 mb-1 leading-tight">{item.t}</h4>
                        <p className="text-[12px] text-slate-500 font-bold leading-relaxed">{item.d}</p>
                     </div>
                  </div>
                );
              })}
           </div>
        </section>

        {/* Depoimentos */}
        <section className="p-8 space-y-8 bg-[#F8F9FA]">
          <h2 className="text-2xl font-black text-center text-slate-900 uppercase tracking-tight">O que as <span className="text-blue-600 underline decoration-yellow-400 decoration-8 underline-offset-2">Professoras</span> dizem?</h2>
          <div className="space-y-6">
            {TESTIMONIALS.map((t, i) => {
              const accentColors = ['text-blue-600', 'text-green-600', 'text-red-500'];
              return (
                <div key={i} className="bg-white p-7 rounded-[40px] shadow-xl shadow-slate-200/50 relative border-2 border-slate-50">
                  <div className="absolute top-6 right-8 opacity-10 text-6xl font-black">“</div>
                  <p className="text-[14px] text-slate-600 font-bold italic mb-6 leading-relaxed relative z-10">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 bg-slate-100 rounded-full border-4 border-white shadow-md overflow-hidden flex-shrink-0">
                        <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <h4 className="text-[14px] font-black text-slate-900">{t.name}</h4>
                        <p className={`text-[10px] ${accentColors[i % accentColors.length]} font-black uppercase tracking-widest`}>{t.role}</p>
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section ref={offerRef} className="p-4 space-y-10 pb-20 scroll-mt-20">
          <div className="text-center space-y-3">
             <h2 className="text-3xl font-black text-slate-900 leading-tight uppercase tracking-tight">
               GARANTA SEU ACESSO <span className="text-red-500 underline decoration-yellow-400 decoration-8 underline-offset-4">COMPLETO</span> AGORA!
             </h2>
             <div className="flex items-center justify-center gap-2 text-black font-black text-[11px] uppercase tracking-widest bg-yellow-400 w-fit mx-auto px-6 py-2.5 rounded-full border-2 border-black shadow-md">
                <Sparkles size={14} fill="currentColor" /> Oferta Especial por Tempo Limitado <Sparkles size={14} fill="currentColor" />
             </div>
          </div>

          {/* Plano Completo - ÚNICA OPÇÃO */}
          <div className="bg-white rounded-[45px] shadow-[0_25px_60px_rgba(0,0,0,0.15)] overflow-hidden border-2 border-yellow-400 relative max-w-[420px] mx-auto">
            <div className="bg-yellow-400 p-10 text-center text-black relative border-b-2 border-black">
                <div className="absolute top-5 right-5 bg-red-600 text-white text-[10px] font-black px-5 py-2 rounded-full shadow-lg z-10 border-2 border-white animate-pulse">
                   ÚLTIMAS VAGAS
                </div>
                <h3 className="font-black text-2xl leading-tight uppercase tracking-widest">DRIVE COMPLETO 25K+</h3>
                <p className="text-[13px] font-black mt-2 opacity-100 uppercase tracking-tighter">TODO O ACERVO + BÔNUS + PLR</p>
            </div>
            <div className="p-10 bg-white">
              <div className="text-center mb-10">
                 <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-slate-300 line-through text-lg font-bold">R$ 197,00</span>
                    <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider">ECONOMIZE 80%</span>
                 </div>
                 <p className="text-blue-600 text-[13px] font-black uppercase tracking-[3px] mb-2">POR APENAS</p>
                 <div className="flex items-center justify-center text-slate-900 font-black">
                   <span className="text-4xl mr-2 mt-[-15px]">R$</span>
                   <span className="text-8xl tracking-tighter leading-none">39,<span className="text-5xl align-top pt-2">90</span></span>
                 </div>
                 <p className="text-slate-400 text-[11px] font-bold mt-5 uppercase tracking-[0.2em]">ACESSO VITALÍCIO • DIREITO DE REVENDA</p>
              </div>

              <div className="space-y-4 mb-10">
                {[
                  { text: "Mais de 25.000 Materiais Exclusivos", color: "text-blue-500", bg: "bg-blue-50" },
                  { text: "Direito de Revenda (PLR) Incluso", color: "text-green-500", bg: "bg-green-50" },
                  { text: "Acesso Imediato e Vitalício", color: "text-red-500", bg: "bg-red-50" },
                  { text: "Bônus: 100 Planners Editáveis", color: "text-orange-500", bg: "bg-orange-50" },
                  { text: "Bônus: Cartilhas de Caligrafia Premium", color: "text-yellow-600", bg: "bg-yellow-50" },
                  { text: "Suporte Exclusivo via E-mail", color: "text-blue-500", bg: "bg-blue-50" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3.5">
                    <div className={`${item.bg} ${item.color} p-1.5 rounded-full`}>
                      <Check size={14} strokeWidth={4} />
                    </div>
                    <span className="font-bold text-slate-700 text-[13px] leading-tight text-left">{item.text}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={(e) => handleFinalCheckout(e, 39.90)}
                className="block w-full bg-yellow-400 text-black font-black py-7 rounded-[30px] shadow-[0_15px_0_0_#ca8a04] active:translate-y-1 active:shadow-[0_10px_0_0_#ca8a04] transition-all animate-cta text-xl uppercase leading-tight px-4 text-center mb-8 border-2 border-black"
              >
                QUERO MEU ACESSO AGORA
              </button>

              <div className="flex justify-center items-center gap-6 text-slate-400 font-black text-[11px] uppercase tracking-wider">
                <div className="flex items-center gap-1.5"><ShieldCheck size={16} /> SEGURO</div>
                <div className="flex items-center gap-1.5"><Star size={16} className="text-yellow-500" fill="currentColor" /> 4.9/5 ESTRELAS</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ & Guarantee */}
        <section className="p-10 space-y-8 bg-sky-50/50 rounded-[50px] mx-4 mb-10 border-4 border-white shadow-inner">
          <div className="text-center space-y-4">
            <div className="bg-blue-600/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-blue-100">
               <ShieldCheck size={56} className="text-blue-600" />
            </div>
            <h3 className="font-black text-2xl text-slate-900 tracking-tight">Sua Satisfação é Prioridade</h3>
            <p className="text-[14px] text-slate-500 font-bold px-4 leading-relaxed">Use o material por 7 dias. Se não sentir que sua rotina mudou, devolvemos 100% do seu dinheiro!</p>
          </div>
          <div className="space-y-3">
            <FAQItem q="O que é PLR?" a="PLR significa Private Label Rights. Isso quer dizer que você tem permissão legal para editar, personalizar e até revender os materiais como se fossem seus, ficando com 100% do lucro." />
            <FAQItem q="Como recebo o acesso?" a="Imediatamente após a confirmação do pagamento, você receberá um e-mail com as instruções para acessar o Drive no Google Drive." />
            <FAQItem q="O acesso é vitalício?" a="Sim! Uma vez adquirido, o acesso é seu para sempre, incluindo todas as atualizações futuras que fizermos no acervo." />
          </div>
        </section>

        <footer className="p-10 text-center bg-white pb-32">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest px-8">
            © 2024 DRIVE PEDAGÓGICO PLR - FACILITANDO A VIDA DO PROFESSOR COM AMOR
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
