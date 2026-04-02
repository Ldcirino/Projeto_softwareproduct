import { useNavigate } from "react-router-dom";
import { GiBerriesBowl } from "react-icons/gi";
import { FiArrowRight } from "react-icons/fi";

type CardDietaProps = {
  meta?: number;
  consumido?: number;
  objetivo?: string;
};

function CardDieta({ meta = 0, consumido = 0, objetivo = "manutencao" }: CardDietaProps) {
  const navigate = useNavigate();

  const restante = Math.max(meta - consumido, 0);
  const progresso = meta > 0 ? Math.min((consumido / meta) * 100, 100) : 0;

  const objetivoLabel: Record<string, { label: string; color: string }> = {
    bulking: { label: "Bulking", color: "text-green-400" },
    manutencao: { label: "Manutenção", color: "text-blue-400" },
    cutting: { label: "Cutting", color: "text-red-400" },
  };

  const obj = objetivoLabel[objetivo] || objetivoLabel["manutencao"];

  const semMeta = meta === 0;

  return (
    <div className="relative bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 left-0 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative">
        {/* Header do card */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500/15 border border-blue-500/25 rounded-xl flex items-center justify-center text-blue-400">
              <GiBerriesBowl size={16} />
            </div>
            <span className="text-sm font-semibold text-white">Dieta de hoje</span>
          </div>
          {!semMeta && (
            <span className={`text-xs font-semibold ${obj.color} bg-slate-700/60 px-2 py-0.5 rounded-full`}>
              {obj.label}
            </span>
          )}
        </div>

        {semMeta ? (
          /* Estado vazio — sem meta definida */
          <div className="text-center py-4">
            <p className="text-slate-400 text-sm mb-1">Nenhuma meta calórica definida</p>
            <p className="text-slate-500 text-xs mb-4">Calcule seu TDEE para começar</p>
            <button
              onClick={() => navigate("/calculadora")}
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20"
            >
              Calcular TDEE
              <FiArrowRight size={14} />
            </button>
          </div>
        ) : (
          <>
            {/* Calorias */}
            <div className="flex justify-between items-end mb-3">
              <div>
                <p className="text-xs text-slate-400">Consumido</p>
                <p className="text-2xl font-bold text-white">{consumido.toFixed(0)}<span className="text-sm text-slate-400 font-normal ml-1">kcal</span></p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Restante</p>
                <p className="text-lg font-semibold text-emerald-400">{restante.toFixed(0)}<span className="text-xs text-slate-400 font-normal ml-1">kcal</span></p>
              </div>
            </div>

            {/* Barra de progresso */}
            <div className="w-full bg-slate-700/60 rounded-full h-2 mb-4">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${progresso}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500">Meta: {meta.toFixed(0)} kcal</p>
              <button
                onClick={() => navigate("/dieta")}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                Ver dieta <FiArrowRight size={12} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CardDieta;