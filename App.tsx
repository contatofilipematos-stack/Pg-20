
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
        onClick={(e) => {
          e.stopPropagation();
          if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
            e.nativeEvent.stopImmediatePropagation();
          }
          onAnchorClick(e);
        }}
        className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-black py-4.5 rounded-[24px] shadow-xl animate-cta flex items-center justify-center gap-2 text-lg uppercase"
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
        className={`w-full p-5 rounded-2xl flex justify-between items-center text-left transition-all ${open ? 'bg-pink-50 ring-2 ring-pink-100' : 'bg-white'}`}
      >
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
    
    // Slight delay to allow any pending UI updates before redirect
    setTimeout(() => {
      window.location.href = CHECKOUT_URL;
    }, 200);
  };

  return (
    <div className="min-h-screen flex justify-center selection:bg-pink-100">
      <div className="max-w-[480px] w-full bg-white shadow-2xl relative overflow-x-hidden pb-10">
        
        {/* Urgency Header */}
        <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white py-2 px-4 text-[10px] font-black text-center flex justify-center items-center gap-2 uppercase tracking-wider">
          <Zap size={12} fill="white" className="animate-pulse" />
          Aproveite: {vagas} licenças PLR com desconto exclusivo hoje!
        </div>

        {/* Hero */}
        <section className="p-6 pt-10 space-y-6 text-center bg-gradient-to-b from-sky-50 to-white relative">
          <div className="flex justify-center items-center gap-2 text-pink-500 font-black text-[11px] uppercase bg-white/50 w-fit mx-auto px-4 py-1.5 rounded-full border border-pink-50">
            <Sparkles size={14} fill="currentColor" /> O Aliado que Todo Educador Merece <Sparkles size={14} fill="currentColor" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 leading-[1.1]">
            Chega de Noites sem Dormir Planejando Aulas! Tenha <span className="text-pink-500 underline decoration-yellow-400 decoration-4">25.000 Materiais</span> Prontos! ✨
          </h1>
          <p className="text-gray-600 text-[15px] leading-relaxed font-bold italic px-4">
            Resgate sua paz e seu tempo livre. Um acervo completo de atividades, jogos e planos de aula para você usar, editar ou até revender como se fossem seus! 📚🎨
          </p>

          <div className="relative pt-4">
            <div className="absolute -top-1 -left-1 z-10 bg-yellow-400 text-gray-900 text-[11px] font-black px-4 py-2 rounded-[18px] rotate-[-5deg] shadow-lg flex items-center gap-1 border-2 border-white">
              <Cloud size={14} fill="white" /> ACESSO VITALÍCIO AO DRIVE
            </div>
            <img src="https://iili.io/BgZ8mfn.png" alt="Drive Pedagógico" className="rounded-[40px] shadow-2xl border-[10px] border-white drop-shadow-2xl" />
          </div>

          <div className="flex flex-col items-center gap-5 pt-4">
            <CountdownTimer />
            <button 
              onClick={scrollToOffer}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xl font-black py-5 rounded-[30px] shadow-2xl animate-cta flex flex-col items-center border-b-4 border-pink-800/20"
            >
              <span className="flex items-center gap-2 uppercase">GARANTIR MEU ACESSO AGORA <ArrowRight size={22} /></span>
              <span className="text-[10px] opacity-90 mt-1 uppercase tracking-widest">Liberação Imediata via E-mail</span>
            </button>
            <div className="flex items-center gap-6 text-[10px] font-black text-gray-400 uppercase">
              <span className="flex items-center gap-1.5"><Zap size={14} className="text-pink-300" /> Use ou Revenda (PLR)</span>
              <span className="flex items-center gap-1.5"><Lock size={14} className="text-pink-300" /> Compra 100% Segura</span>
            </div>
          </div>
        </section>

        <WavyDividerBottom color="#f0f9ff" />

        {/* O que você vai receber - GRID DETALHADA */}
        <section className="p-8 space-y-8 bg-sky-50 relative">
          <h2 className="text-2xl font-black text-center text-gray-900 pt-10">O que te espera no Drive:</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { t: "Atividades Prontas", i: "📝", c: "bg-orange-50" },
              { t: "Planos de Aula", i: "📅", c: "bg-blue-50" },
              { t: "Jogos Pedagógicos", i: "🎲", c: "bg-sky-50" },
              { t: "Cartilhas de Alfabetização", i: "🔤", c: "bg-pink-50" },
              { t: "Recursos Especiais", i: "🧩", c: "bg-yellow-50" },
              { t: "Capas de Caderno", i: "📒", c: "bg-red-50" },
              { t: "Planners para Profs", i: "📑", c: "bg-green-50" },
              { t: "Desenhos para Colorir", i: "🖍️", c: "bg-indigo-50" },
              { t: "Painéis Decorativos", i: "🖼️", c: "bg-pink-100" },
              { t: "Dinâmicas Criativas", i: "🏃", c: "bg-purple-50" },
              { t: "Certificados para Alunos", i: "🏆", c: "bg-orange-100" },
              { t: "Material PLR (Revenda)", i: "💰", c: "bg-blue-100" }
            ].map((item, i) => (
              <div key={i} className={`${item.c} border-4 border-white p-5 rounded-[30px] shadow-sm text-center flex flex-col items-center justify-center hover:scale-105 transition-transform`}>
                <div className="text-4xl mb-2">{item.i}</div>
                <h4 className="text-[13px] font-black text-gray-800 leading-tight">{item.t}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO RECEBA AGORA */}
        <section className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-[45px] mx-4 border-4 border-dashed border-yellow-300 space-y-8 shadow-inner my-10">
           <div className="text-center space-y-2">
              <div className="bg-pink-500 text-white text-[10px] font-black px-6 py-1.5 rounded-full uppercase tracking-widest inline-flex items-center gap-1 shadow-md mb-2">
                 <Sparkles size={12} fill="white"/> TRANSFORME SUA ROTINA AGORA
              </div>
              <h2 className="text-2xl font-black text-gray-900 leading-tight">
                Dê um Fim ao Cansaço e <span className="text-pink-500 underline decoration-yellow-400 decoration-4">Ganhe Liberdade</span>!
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
          <h2 className="text-2xl font-black text-center text-gray-900">O que as <span className="text-pink-500">Professoras</span> estão dizendo?</h2>
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

        {/* SUPER OFFER CARD */}
        <section ref={offerRef} className="p-4 space-y-10 pb-20 scroll-mt-20">
          <div className="text-center space-y-4">
             <h2 className="text-3xl font-black text-gray-900 leading-tight uppercase tracking-tight">
               GARANTA SEU ACESSO <span className="text-pink-500 underline decoration-yellow-400 decoration-4">COMPLETO</span> AGORA!
             </h2>
             <div className="flex items-center justify-center gap-2 text-pink-400 font-black text-[10px] uppercase tracking-widest bg-pink-50 w-fit mx-auto px-6 py-2 rounded-full border border-pink-100 shadow-sm">
                <Sparkles size={14} fill="currentColor" /> Oferta Especial por Tempo Limitado <Sparkles size={14} fill="currentColor" />
             </div>
          </div>

          {/* Plano Completo - ÚNICA OPÇÃO */}
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border-2 border-pink-100 relative max-w-[420px] mx-auto">
            <div className="bg-pink-500 p-8 text-center text-white relative">
                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-[10px] font-black px-4 py-1 rounded-full shadow-md z-10">
                   VAGAS LIMITADAS
                </div>
                <h3 className="font-black text-2xl leading-tight uppercase tracking-tight">DRIVE COMPLETO 25K+</h3>
                <p className="text-[13px] font-bold mt-2 opacity-90">TODO O ACERVO + BÔNUS + PLR</p>
            </div>
            <div className="p-8">
              <div className="text-center mb-8">
                 <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-gray-400 line-through text-lg font-bold">R$ 197,00</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider">ECONOMIZE 80%</span>
                 </div>
                 <p className="text-pink-500 text-[13px] font-black uppercase tracking-[2px] mb-1">POR APENAS</p>
                 <div className="flex items-center justify-center text-pink-500">
                   <span className="text-4xl font-black mr-1 mt-[-15px]">R$</span>
                   <span className="text-7xl font-black tracking-tighter leading-none">39,90</span>
                 </div>
                 <p className="text-gray-400 text-[12px] font-bold mt-3 uppercase tracking-wider">ACESSO VITALÍCIO • DIREITO DE REVENDA</p>
              </div>

              <hr className="border-gray-100 mb-8" />
              <div className="space-y-4 mb-10">
                {[
                  "Mais de 25.000 Materiais Exclusivos",
                  "Direito de Revenda (PLR) Incluso",
                  "Acesso Imediato e Vitalício",
                  "Bônus: 100 Planners Editáveis",
                  "Bônus: Cartilhas de Caligrafia Premium",
                  "Suporte Exclusivo via E-mail"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-pink-100 text-pink-500 p-1 rounded-full">
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <span className="font-bold text-gray-700 text-[13px] leading-tight text-left">{item}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={(e) => handleFinalCheckout(e, 39.90)}
                className="block w-full bg-pink-500 text-white font-black py-6 rounded-[24px] shadow-lg animate-cta text-xl uppercase leading-tight px-4 text-center mb-6"
              >
                QUERO MEU ACESSO AGORA
              </button>

              <div className="flex justify-center items-center gap-6 text-gray-400 font-black text-[11px] uppercase tracking-wider">
                <div className="flex items-center gap-1.5"><ShieldCheck size={16} /> SEGURO</div>
                <div className="flex items-center gap-1.5"><Star size={16} className="text-yellow-400" fill="currentColor" /> 4.9/5 ESTRELAS</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ & Guarantee */}
        <section className="p-10 space-y-8 bg-sky-50 rounded-[50px] mx-4 mb-10 border-4 border-white">
          <div className="text-center space-y-4">
            <ShieldCheck size={56} className="text-pink-500 mx-auto" />
            <h3 className="font-black text-xl">Sua Satisfação é Prioridade</h3>
            <p className="text-sm text-gray-500 font-bold px-4">Use o material por 7 dias. Se não sentir que sua rotina mudou, devolvemos seu dinheiro!</p>
          </div>
          <div className="space-y-2">
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
