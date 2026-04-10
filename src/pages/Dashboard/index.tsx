import CardTreino from "../../components/cardtreino";
import CardDieta from "../../components/carddieta";
import Footer from "../../components/footer";
import Header from "../../components/header";
 
function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />
 
      <main className="flex-1 flex flex-col items-center px-4 pt-5 pb-24 space-y-4">
 
        {/* Saudação */}
        <div className="w-full max-w-md">
          <h2 className="text-xl font-bold text-white">Bem vindo </h2>
          <p className="text-slate-400 text-sm mt-0.5">Pronto para mais um dia de foco?</p>
        </div>
 
        {/* Card Treino */}
        <div className="w-full max-w-md">
          <CardTreino
            titulo="Treino A"
            descricao="Peito, ombro e tríceps"
            duracao="50 min"
            exercicios={8}
          />
        </div>
 
        {/* Card Dieta */}
        <div className="w-full max-w-md">
          <CardDieta
            meta={0}
            consumido={0}
            objetivo="manutencao"
          />
        </div>
 
        {/* Atalhos rápidos */}
        <div className="w-full max-w-md">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Acesso rápido</p>
          <div className="grid grid-cols-2 gap-3">
            <a href="/calculadora" className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 flex flex-col gap-2 hover:border-emerald-500/40 transition-all group">
              <div className="w-9 h-9 bg-emerald-500/15 border border-emerald-500/25 rounded-xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/25 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Calcular TDEE</p>
                <p className="text-xs text-slate-500">Meta calórica</p>
              </div>
            </a>
 
            <a href="/dieta" className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 flex flex-col gap-2 hover:border-blue-500/40 transition-all group">
              <div className="w-9 h-9 bg-blue-500/15 border border-blue-500/25 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-500/25 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Registrar Dieta</p>
                <p className="text-xs text-slate-500">Adicionar refeição</p>
              </div>
            </a>
          </div>
        </div>
 
      </main>
 
      <Footer />
    </div>
  );
}
 
export default Dashboard;