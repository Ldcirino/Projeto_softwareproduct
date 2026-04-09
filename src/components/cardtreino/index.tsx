import { useNavigate } from "react-router-dom";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FiClock, FiZap } from "react-icons/fi";

type CardTreinoProps = {
  titulo: string;
  descricao: string;
  duracao?: string;
  exercicios?: number;
};

function CardTreino({ titulo, descricao, duracao = "45 min", exercicios = 6 }: CardTreinoProps) {
  const navigate = useNavigate();

  return (
    <div className="relative bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 overflow-hidden">
      {/* Glow de fundo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-full">
              Hoje
            </span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1">{titulo}</h2>
          <p className="text-sm text-slate-400 mt-0.5">{descricao}</p>

          {/* Métricas */}
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-slate-400">
              <FiClock size={13} />
              <span className="text-xs">{duracao}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <FiZap size={13} />
              <span className="text-xs">{exercicios} exercícios</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/treinos")}
            className="mt-4 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all duration-200 shadow-lg shadow-sky-500/20"
          >
            Começar treino
          </button>
        </div>

        {/* Ícone decorativo */}
        <div className="w-14 h-14 bg-sky-500/15 border border-sky-500/25 rounded-2xl flex items-center justify-center text-sky-400 shrink-0 ml-4">
          <GiWeightLiftingUp size={26} />
        </div>
      </div>
    </div>
  );
}

export default CardTreino;