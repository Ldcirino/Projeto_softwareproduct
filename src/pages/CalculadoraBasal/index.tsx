import { MdHeight } from "react-icons/md";
import { GiWeightScale } from "react-icons/gi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { authFetch } from "../../utils/api";

interface FormData {
  peso: number | "";
  altura: number | "";
  idade: number | "";
  sexo: string;
  nivelAtividade: number;
}

interface ApiResponse {
  caloriasTotais: number;
  resultado: number;
}

const atividadeLabels = [
  { value: 0, label: "Sedentário", desc: "Sem exercícios" },
  { value: 1, label: "Levemente ativo", desc: "1–2x por semana" },
  { value: 2, label: "Moderadamente ativo", desc: "3–5x por semana" },
  { value: 3, label: "Muito ativo", desc: "6–7x por semana" },
  { value: 4, label: "Extremamente ativo", desc: "2x por dia" },
];

export default function CalculadoraBasal() {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>({
    peso: "",
    altura: "",
    idade: "",
    sexo: "masculino",
    nivelAtividade: 1,
  });

  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<ApiResponse | null>(null);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === "") { setForm({ ...form, [name]: "" }); return; }
    if (!/^\d*\.?\d*$/.test(value)) return;
    let num = Number(value);
    if (name === "peso" && num > 300) num = 300;
    if (name === "altura" && num > 250) num = 250;
    if (name === "idade" && num > 120) num = 120;
    setForm({ ...form, [name]: num });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authFetch("/api/calculadora-basal/calcular", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const data: ApiResponse = await response.json();
      setResultado(data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelecionarObjetivo = (tipo: string) => {
    if (!resultado) return;
    let calorias = resultado.caloriasTotais;
    if (tipo === "bulking") calorias += 500;
    if (tipo === "cutting") calorias -= 500;
    navigate("/dieta", { state: { tdee: calorias, objetivo: tipo } });
  };

  const bulking = resultado ? resultado.caloriasTotais + 500 : 0;
  const cutting = resultado ? resultado.caloriasTotais - 500 : 0;
  const manutencao = resultado?.caloriasTotais || 0;

  const inputClass = "w-full pl-10 pr-4 py-3 bg-slate-900/60 border border-slate-600/60 text-white placeholder-slate-500 rounded-xl text-sm focus:outline-none focus:border-emerald-500/70 focus:ring-1 focus:ring-emerald-500/40 transition-all";
  const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500";

  return (
    <div className="min-h-screen flex flex-col bg-slate-900">
      <Header />

      <main className="flex-1 flex flex-col items-center px-4 pt-6 pb-28">
        <div className="w-full max-w-md">

          {/* Título */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Calculadora Calórica</h2>
            <p className="text-slate-400 text-sm mt-0.5">Descubra seu gasto energético diário</p>
          </div>

          {/* Formulário */}
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5 mb-4">
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Peso */}
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1.5 block">Peso</label>
                <div className="relative">
                  <span className={iconClass}><GiWeightScale size={16} /></span>
                  <input type="text" name="peso" placeholder="kg" value={form.peso} onChange={handleNumberChange} required className={inputClass} />
                </div>
              </div>

              {/* Altura */}
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1.5 block">Altura</label>
                <div className="relative">
                  <span className={iconClass}><MdHeight size={16} /></span>
                  <input type="text" name="altura" placeholder="cm" value={form.altura} onChange={handleNumberChange} required className={inputClass} />
                </div>
              </div>

              {/* Idade */}
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1.5 block">Idade</label>
                <div className="relative">
                  <span className={iconClass}><LiaBirthdayCakeSolid size={16} /></span>
                  <input type="text" name="idade" placeholder="anos" value={form.idade} onChange={handleNumberChange} required className={inputClass} />
                </div>
              </div>

              {/* Sexo */}
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1.5 block">Sexo biológico</label>
                <div className="grid grid-cols-2 gap-2">
                  {["masculino", "feminino"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, sexo: s })}
                      className={`py-2.5 rounded-xl text-sm font-medium border transition-all ${
                        form.sexo === s
                          ? "bg-emerald-500/20 border-emerald-500/60 text-emerald-400"
                          : "bg-slate-900/40 border-slate-600/50 text-slate-400 hover:border-slate-500"
                      }`}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nível de atividade */}
              <div>
                <label className="text-xs font-medium text-slate-400 mb-1.5 block">Nível de atividade</label>
                <div className="space-y-2">
                  {atividadeLabels.map((a) => (
                    <button
                      key={a.value}
                      type="button"
                      onClick={() => setForm({ ...form, nivelAtividade: a.value })}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm border transition-all ${
                        form.nivelAtividade === a.value
                          ? "bg-emerald-500/15 border-emerald-500/50 text-white"
                          : "bg-slate-900/40 border-slate-600/50 text-slate-400 hover:border-slate-500"
                      }`}
                    >
                      <span className="font-medium">{a.label}</span>
                      <span className="text-xs opacity-60">{a.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-semibold rounded-xl py-3 text-sm transition-all shadow-lg shadow-emerald-500/20 mt-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Calculando...
                  </span>
                ) : "Calcular TDEE"}
              </button>
            </form>
          </div>

          {/* Resultado */}
          {resultado && (
            <div className="space-y-4">
              {/* TDEE */}
              <div className="bg-slate-800/50 border border-emerald-500/30 rounded-2xl p-5 text-center">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Seu TDEE</p>
                <p className="text-4xl font-bold text-white">
                  {resultado.caloriasTotais.toFixed(0)}
                  <span className="text-lg text-slate-400 font-normal ml-1">kcal/dia</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">Taxa metabólica basal: {resultado.resultado.toFixed(0)} kcal</p>
              </div>

              {/* Objetivos */}
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Escolha seu objetivo</p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleSelecionarObjetivo("bulking")}
                  className="bg-green-500/10 border border-green-500/40 hover:border-green-500/70 p-4 rounded-2xl text-center transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <p className="text-[10px] uppercase font-semibold text-green-400/70 mb-1">Bulking</p>
                  <p className="text-lg font-bold text-green-400">{bulking.toFixed(0)}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">kcal</p>
                </button>

                <button
                  onClick={() => handleSelecionarObjetivo("manutencao")}
                  className="bg-blue-500/10 border border-blue-500/40 hover:border-blue-500/70 p-4 rounded-2xl text-center transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <p className="text-[10px] uppercase font-semibold text-blue-400/70 mb-1">Manutenção</p>
                  <p className="text-lg font-bold text-blue-400">{manutencao.toFixed(0)}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">kcal</p>
                </button>

                <button
                  onClick={() => handleSelecionarObjetivo("cutting")}
                  className="bg-red-500/10 border border-red-500/40 hover:border-red-500/70 p-4 rounded-2xl text-center transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <p className="text-[10px] uppercase font-semibold text-red-400/70 mb-1">Cutting</p>
                  <p className="text-lg font-bold text-red-400">{cutting.toFixed(0)}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">kcal</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}