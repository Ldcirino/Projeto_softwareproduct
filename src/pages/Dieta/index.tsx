import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FiSearch, FiTrash2, FiPlus } from "react-icons/fi";
import Header from "../../components/header";
import Footer from "../../components/footer";

interface AlimentoAPI {
  label: string;
  calories: number;
  weight: number;
}

interface Refeicao {
  id: number;
  nome: string;
  calorias: number;
  quantidade: number;
}

const traduzir: Record<string, string> = {
  arroz: "rice", frango: "chicken", carne: "beef", batata: "potato",
  banana: "banana", ovo: "egg", leite: "milk", pão: "bread",
};

export default function DietaPage() {
  const location = useLocation();
  const tdee = location.state?.tdee || 0;
  const objetivo = location.state?.objetivo || "manutencao";

  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState<AlimentoAPI[]>([]);
  const [quantidade, setQuantidade] = useState(100);
  const [refeicoes, setRefeicoes] = useState<Refeicao[]>([]);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [buscando, setBuscando] = useState(false);

  const objetivoConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
    bulking: { label: "Bulking", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30" },
    manutencao: { label: "Manutenção", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
    cutting: { label: "Cutting", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
  };
  const obj = objetivoConfig[objetivo] || objetivoConfig["manutencao"];

  useEffect(() => {
    if (!busca) { setResultados([]); setMostrarDropdown(false); return; }
    const delay = setTimeout(() => buscarAlimentos(), 500);
    return () => clearTimeout(delay);
  }, [busca]);

  const buscarAlimentos = async () => {
    setBuscando(true);
    try {
      const termo = traduzir[busca.toLowerCase()] || busca;
      const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${termo}&api_key=Y6E3OhPslfHdbtCNQqejMoBY6azMNXPOidvVSEb0`
      );
      const data = await res.json();
      const foods = data.foods
        .filter((item: any) => item.dataType === "Foundation" || item.dataType === "SR Legacy")
        .map((item: any) => {
          const energia = item.foodNutrients.find(
            (n: any) => n.nutrientName === "Energy" && n.unitName === "KCAL"
          );
          return { label: item.description, calories: energia ? energia.value : 0, weight: 100 };
        });
      setResultados(foods);
      setMostrarDropdown(true);
      setSelectedIndex(-1);
    } catch (error) {
      console.error("Erro ao buscar alimentos:", error);
    } finally {
      setBuscando(false);
    }
  };

  const adicionarRefeicao = (food: AlimentoAPI) => {
    const caloriasCalculadas = (food.calories / 100) * quantidade;
    setRefeicoes([...refeicoes, { id: Date.now(), nome: food.label, calorias: caloriasCalculadas, quantidade }]);
    setMostrarDropdown(false);
    setBusca("");
    setSelectedIndex(-1);
  };

  const removerRefeicao = (id: number) => setRefeicoes(refeicoes.filter(r => r.id !== id));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!mostrarDropdown) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex(p => Math.min(p + 1, resultados.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex(p => Math.max(p - 1, 0)); }
    if (e.key === "Enter") { e.preventDefault(); if (selectedIndex >= 0) adicionarRefeicao(resultados[selectedIndex]); }
  };

  const totalConsumido = refeicoes.reduce((acc, r) => acc + r.calorias, 0);
  const restante = Math.max(tdee - totalConsumido, 0);
  const progresso = tdee > 0 ? Math.min((totalConsumido / tdee) * 100, 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />

      <main className="flex-1 flex flex-col items-center px-4 pt-6 pb-28">
        <div className="w-full max-w-xl space-y-4">

          {/* Card de meta */}
          <div className={`${obj.bg} border ${obj.border} rounded-2xl p-5`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Meta diária</p>
                <p className="text-3xl font-bold text-white mt-0.5">
                  {tdee.toFixed(0)}<span className="text-base font-normal text-slate-400 ml-1">kcal</span>
                </p>
              </div>
              <span className={`text-xs font-semibold ${obj.color} px-2.5 py-1 rounded-full bg-slate-800/60`}>
                {obj.label}
              </span>
            </div>

            {/* Barra de progresso */}
            <div className="w-full bg-slate-700/60 rounded-full h-2 mb-3">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  progresso >= 100 ? "bg-red-400" : "bg-emerald-400"
                }`}
                style={{ width: `${progresso}%` }}
              />
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-400">
                Consumido: <span className="text-white font-semibold">{totalConsumido.toFixed(0)}</span>
              </span>
              <span className={progresso >= 100 ? "text-red-400 font-semibold" : "text-emerald-400 font-semibold"}>
                {progresso >= 100 ? "Meta atingida!" : `Restante: ${restante.toFixed(0)} kcal`}
              </span>
            </div>
          </div>

          {/* Busca de alimentos */}
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 space-y-3">
            <p className="text-sm font-semibold text-white">Adicionar alimento</p>

            {/* Quantidade */}
            <div className="flex gap-2 items-center">
              <label className="text-xs text-slate-400 whitespace-nowrap">Quantidade (g):</label>
              <input
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
                className="w-24 bg-slate-900/60 border border-slate-600/60 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/40 transition-all"
              />
            </div>

            {/* Campo de busca */}
            <div className="relative">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  {buscando
                    ? <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>
                    : <FiSearch size={15} />
                  }
                </span>
                <input
                  type="text"
                  placeholder="Buscar alimento..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-9 pr-4 py-3 bg-slate-900/60 border border-slate-600/60 text-white placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/40 transition-all"
                />
              </div>

              {/* Dropdown */}
              {mostrarDropdown && resultados.length > 0 && (
                <div className="absolute top-[calc(100%+6px)] w-full bg-slate-800 border border-slate-700/60 rounded-xl max-h-56 overflow-y-auto z-20 shadow-xl">
                  {resultados.map((food, index) => (
                    <div
                      key={index}
                      onClick={() => adicionarRefeicao(food)}
                      className={`px-4 py-3 cursor-pointer flex justify-between items-center transition-colors ${
                        index === selectedIndex ? "bg-emerald-500/15" : "hover:bg-slate-700/60"
                      } ${index !== 0 ? "border-t border-slate-700/40" : ""}`}
                    >
                      <span className="text-sm text-white truncate mr-3">{food.label}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-slate-400">{food.calories} kcal/100g</span>
                        <div className="w-6 h-6 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400">
                          <FiPlus size={12} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Lista de refeições */}
          {refeicoes.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Refeições de hoje ({refeicoes.length})
              </p>
              {refeicoes.map((r) => (
                <div
                  key={r.id}
                  className="bg-slate-800/50 border border-slate-700/60 rounded-xl px-4 py-3 flex justify-between items-center"
                >
                  <div className="flex-1 min-w-0 mr-3">
                    <p className="text-sm text-white font-medium truncate">{r.nome}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{r.quantidade}g</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-semibold text-emerald-400">{r.calorias.toFixed(0)} kcal</span>
                    <button
                      onClick={() => removerRefeicao(r.id)}
                      className="w-7 h-7 bg-red-500/15 border border-red-500/30 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/25 transition-all"
                    >
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {refeicoes.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-500 text-sm">Nenhuma refeição adicionada ainda</p>
              <p className="text-slate-600 text-xs mt-1">Busque um alimento acima para começar</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}