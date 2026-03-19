import { MdHeight } from "react-icons/md";
import { GiWeightScale } from "react-icons/gi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

import { useState } from "react";

import Header from "../../components/header";
import Footer from "../../components/footer";

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

export default function CalculadoraBasal() {
  const [form, setForm] = useState<FormData>({
    peso: "",
    altura: "",
    idade: "",
    sexo: "masculino",
    nivelAtividade: 1,
  });

  const [resultado, setResultado] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (value === "") {
      setForm({ ...form, [name]: "" });
      return;
    }

    if (!/^\d*\.?\d*$/.test(value)) return;

    let num = Number(value);

    if (name === "peso" && num > 300) num = 300;
    if (name === "altura" && num > 250) num = 250;
    if (name === "idade" && num > 120) num = 120;

    setForm({
      ...form,
      [name]: num,
    });
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "sexo" ? value : Number(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setResultado(null);

    try {
      const response = await fetch(
        "http://localhost:8080/api/calculadora-basal/calcular",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data: ApiResponse = await response.json();
      setResultado(data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  const bulking =
    resultado?.caloriasTotais && resultado.caloriasTotais + 500;

  const cutting =
    resultado?.caloriasTotais && resultado.caloriasTotais - 500;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800">
      <Header />

      {/* 🔥 Layout com scroll + espaçamento */}
      <main className="flex-1 flex flex-col items-center justify-start py-10 px-4 overflow-y-auto">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 text-white mb-8">

          <h2 className="text-2xl font-bold text-center mb-6">
            Calculadora Calórica
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="relative">
              <span className=" mt-1 absolute left-3 top-3 text-gray-400">
                <GiWeightScale />
              </span>
              <input
                type="text"
                name="peso"
                placeholder="Peso (kg)"
                value={form.peso}
                onChange={handleNumberChange}
                required
                className="w-full pl-10 p-3 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="relative">
              <span className="mt-1 absolute left-3 top-3 text-gray-400">
                <MdHeight />
              </span>
              <input
                type="text"
                name="altura"
                placeholder="Altura (cm)"
                value={form.altura}
                onChange={handleNumberChange}
                required
                className="w-full pl-10 p-3 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="relative">
              <span className="mt-1 absolute left-3 top-3 text-gray-400">
                <LiaBirthdayCakeSolid />
              </span>
              <input
                type="text"
                name="idade"
                placeholder="Idade"
                value={form.idade}
                onChange={handleNumberChange}
                required
                className="w-full pl-10 p-3 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <select
              name="sexo"
              value={form.sexo}
              onChange={handleSelectChange}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            >
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>

            <select
              name="nivelAtividade"
              value={form.nivelAtividade}
              onChange={handleSelectChange}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            >
              <option value={0}>Sedentário</option>
              <option value={1}>Leve (1-2)</option>
              <option value={2}>Moderado (3-5)</option>
              <option value={3}>Ativo (6-7)</option>
              <option value={4}>Atleta</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 rounded-lg bg-blue-500 hover:bg-blue-700 transition font-bold"
            >
              {loading ? "Calculando..." : "Calcular"}
            </button>
          </form>

          {resultado && (
            <div className="mt-6 space-y-4">
              <div className="bg-slate-800 p-4 rounded-xl">
                <p className="text-sm text-gray-400">
                  TMB (taxa metabólica basal)
                </p>
                <p className="text-xl font-bold">
                  {resultado.resultado.toFixed(2)} kcal
                </p>
              </div>

              <div className="bg-slate-800 p-4 rounded-xl">
                <p className="text-sm text-gray-400">Gasto Diário (TDEE)</p>
                <p className="text-xl font-bold">
                  {resultado.caloriasTotais.toFixed(2)} kcal
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">

                {/* ✅ Bulking corrigido */}
                <div className="bg-green-600/20 border border-green-500 p-4 rounded-xl text-center">
                  <p className="text-xs font-medium uppercase mb-1">
                    Bulking
                  </p>
                  <p className="text-sm text-gray-300">
                    Superávit 500 kcal
                  </p>
                  <p className="text-lg font-bold text-green-400">
                    {bulking?.toFixed(0)} kcal
                  </p>
                </div>

                {/* ✅ Cutting corrigido */}
                <div className="bg-red-600/20 border border-red-500 p-4 rounded-xl text-center">
                  <p className="text-xs font-medium uppercase mb-1">
                    Cutting
                  </p>
                  <p className="text-sm text-gray-300">
                    Déficit 500 kcal
                  </p>
                  <p className="text-lg font-bold text-red-400">
                    {cutting?.toFixed(0)} kcal
                  </p>
                </div>

              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}