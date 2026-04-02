import { useNavigate, useLocation } from "react-router-dom";
import { PiCalculatorDuotone } from "react-icons/pi";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { GiBerriesBowl } from "react-icons/gi";
import { FaHeartPulse } from "react-icons/fa6";
import type { JSX } from "react";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu: {
    path: string;
    label: string;
    icon: JSX.Element;
    color: ColorType;
  }[] = [
      { path: "/Dashboard", label: "Início", icon: <FaHome size={18} />, color: "sky" },
      { path: "/treino", label: "Treino", icon: <GiWeightLiftingUp size={18} />, color: "emerald" },
      { path: "/calculadora", label: "TDEE", icon: <PiCalculatorDuotone size={18} />, color: "emerald" },
      { path: "/dieta", label: "Dieta", icon: <GiBerriesBowl size={18} />, color: "emerald" },
      { path: "/cardio", label: "Cardio", icon: <FaHeartPulse size={18} />, color: "emerald" },
    ];

  const colorMap = {
    sky: "text-sky-400 bg-sky-500/10",
    emerald: "text-emerald-400 bg-emerald-500/10",
    yellow: "text-yellow-400 bg-yellow-500/10",
    rose: "text-rose-400 bg-rose-500/10",
    red: "text-red-400 bg-red-500/10",
  } as const;

  type ColorType = keyof typeof colorMap;

  return (
    <footer className="fixed bottom-0 w-full bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50 z-50 pb-safe">
      <div className="flex justify-around items-center py-2 px-2">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ${isActive
                ? colorMap[item.color]
                : "text-slate-500 hover:text-slate-300"
                }`}
            >
              <span
                className={`transition-transform duration-200 ${isActive ? "scale-110" : ""
                  }`}
              >
                {item.icon}
              </span>

              <span
                className={`text-[10px] font-medium ${isActive ? colorMap[item.color].split(" ")[0] : ""
                  }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </footer>
  );
}

export default Footer;