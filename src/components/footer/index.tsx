import { useNavigate, useLocation } from "react-router-dom";
import { PiCalculatorDuotone } from "react-icons/pi";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { GiBerriesBowl } from "react-icons/gi";
import { FaHeartPulse } from "react-icons/fa6";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { path: "/", label: "Início", icon: <FaHome /> },
    { path: "/treino", label: "Treino", icon: <GiWeightLiftingUp /> },
    { path: "/calculadora", label: "Calc TDEE", icon: <PiCalculatorDuotone /> },
    { path: "/dieta", label: "Dieta", icon: <GiBerriesBowl /> },
    { path: "/cardio", label: "Cardio", icon: <FaHeartPulse /> },
  ];

  return (
    <footer className="fixed bottom-0 w-full bg-gray-900 text-white border-t border-gray-700 z-50">
      <div className="flex justify-around items-center py-2">

        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center text-xs transition ${
                isActive
                  ? "text-blue-400"
                  : "text-gray-400 hover:text-blue-400"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          );
        })}

      </div>
    </footer>
  );
}

export default Footer;