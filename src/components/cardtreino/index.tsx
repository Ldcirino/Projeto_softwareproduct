import { useNavigate } from "react-router-dom";

type CardTreinoProps = {
  titulo: string;
  descricao: string;
};

function CardTreino({ titulo, descricao }: CardTreinoProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 text-white p-5 rounded-2xl shadow-md flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold">{titulo}</h2>
        <p className="text-sm opacity-70">{descricao}</p>

        <button
          onClick={() => navigate("/treinos")}
          className="mt-4 bg-sky-500 px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Começar treino
        </button>
      </div>

      <div className="w-20 h-20 bg-gray-700 rounded-full" />
    </div>
  );
}

export default CardTreino;