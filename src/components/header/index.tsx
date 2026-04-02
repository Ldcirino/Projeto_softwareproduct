import { FiBell, FiLogOut } from "react-icons/fi";
import { logout } from "../../utils/api";

function Header() {
  return (
    <header className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50 px-4 py-3 flex justify-between items-center sticky top-0 z-40">
      {/* Avatar + nome */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
          U
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 leading-none">Bem-vindo de volta</span>
          <h1 className="text-sm font-semibold text-white leading-snug">User</h1>
        </div>
      </div>

      {/* Logo + ações */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 mr-1">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-sm font-bold text-white">GymFocus</span>
        </div>

        <button className="w-9 h-9 rounded-xl bg-slate-700/60 border border-slate-600/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-all">
          <FiBell size={16} />
        </button>

        <button
          onClick={logout}
          title="Sair"
          className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-500/20 hover:border-red-500/60 transition-all"
        >
          <FiLogOut size={16} />
        </button>
      </div>
    </header>
  );
}

export default Header;