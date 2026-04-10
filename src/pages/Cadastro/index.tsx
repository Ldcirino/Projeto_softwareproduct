import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [termos, setTermos] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro("");

        if (senha !== confirmar) {
            setErro("As senhas não coincidem.");
            return;
        }

        if (!termos) {
            setErro("Você precisa aceitar os termos de uso.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, email, senha }),
            });

            if (!response.ok) {
                const msg = await response.text();
                throw new Error(msg || "Erro ao criar conta");
            }

            setSucesso(true);
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        } catch (err: any) {
            setErro(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-900 px-4 py-8">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-sm">
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-500/20 border border-sky-500/30 mb-4">
                        <svg className="w-7 h-7 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">GymFocus</h1>
                    <p className="text-slate-400 text-sm mt-1">Crie sua conta gratuita</p>
                </div>

                {/* Sucesso */}
                {sucesso ? (
                    <div className="bg-sky-500/10 border border-sky-500/30 rounded-2xl p-6 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-500/20 mb-3">
                            <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-sky-400 font-semibold">Conta criada com sucesso!</p>
                        <p className="text-slate-400 text-sm mt-1">Redirecionando para o login...</p>
                    </div>
                ) : (
                    /* Card */
                    <div className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
                        <form onSubmit={handleRegister} className="space-y-4">
                            {/* Nome */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required
                                    placeholder="Seu nome"
                                    className="w-full bg-slate-900/60 border border-slate-600/60 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500/70 focus:ring-1 focus:ring-sky-500/40 transition-all"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="seu@email.com"
                                    className="w-full bg-slate-900/60 border border-slate-600/60 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500/70 focus:ring-1 focus:ring-sky-500/40 transition-all"
                                />
                            </div>

                            {/* Senha */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-slate-900/60 border border-slate-600/60 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-sky-500/70 focus:ring-1 focus:ring-sky-500/40 transition-all"
                                />
                            </div>

                            {/* Confirmar Senha */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                    Confirmar senha
                                </label>
                                <input
                                    type="password"
                                    value={confirmar}
                                    onChange={(e) => setConfirmar(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className={`w-full bg-slate-900/60 border text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all
                    ${confirmar && senha !== confirmar
                                            ? "border-red-500/60 focus:border-red-500/70 focus:ring-1 focus:ring-red-500/30"
                                            : "border-slate-600/60 focus:border-sky-500/70 focus:ring-1 focus:ring-sky-500/40"
                                        }`}
                                />
                                {confirmar && senha !== confirmar && (
                                    <p className="text-red-400 text-xs mt-1">As senhas não coincidem</p>
                                )}
                            </div>

                            {/* Termos de uso */}
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <div className="relative mt-0.5 shrink-0">
                                    <input
                                        type="checkbox"
                                        checked={termos}
                                        onChange={(e) => setTermos(e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div
                                        className={`w-5 h-5 rounded-md border flex items-center justify-center
                                            ${termos
                                                ? "bg-sky-500 border-sky-500"
                                                : "bg-slate-900/60 border-slate-600/60 group-hover:border-sky-500/50"
                                            }`}
                                    >
                                        {termos && (
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                                <span className="text-sm text-slate-400 leading-snug">
                                    Li e aceito os{" "}
                                    <a href="/termos" className="text-sky-400 hover:text-sky-300 transition-colors underline underline-offset-2">
                                        Termos de Uso
                                    </a>{" "}
                                    e a{" "}
                                    <a href="/privacidade" className="text-sky-400 hover:text-sky-300 transition-colors underline underline-offset-2">
                                        Política de Privacidade
                                    </a>
                                </span>
                            </label>

                            {/* Erro */}
                            {erro && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2.5 text-red-400 text-sm">
                                    {erro}
                                </div>
                            )}

                            {/* Botões */}
                            <div className="flex flex-col gap-2 mt-2">
                                <button
                                    type="submit"
                                    disabled={loading || !termos}
                                    className="w-full bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-2.5 text-sm transition-all duration-200 shadow-lg shadow-sky-500/20"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                            </svg>
                                            Criando conta...
                                        </span>
                                    ) : "Criar conta"}
                                </button>

                                <a
                                    href="/"
                                    className="w-full flex items-center justify-center gap-2 border border-slate-600/60 hover:border-slate-500 text-slate-400 hover:text-slate-300 font-medium rounded-xl py-2.5 text-sm transition-all duration-200"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Voltar para o login
                                </a>
                            </div>
                        </form>
                    </div>
                )}

                {/* Link para login */}
                <p className="text-center text-slate-500 text-sm mt-6">
                    Já tem conta?{" "}
                    <a href="/" className="text-sky-400 hover:text-sky-300 font-medium transition-colors">
                        Fazer login
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Register;