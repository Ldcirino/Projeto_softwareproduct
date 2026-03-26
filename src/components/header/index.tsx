function Header() {
  return (
    <header className="bg-gradient-to-tr from-sky-600 to-steal-700 p-4 flex justify-between items-center text-gray-900 rounded-b-2xl shadow-md">
      
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gray-300 rounded-full" />

        <div className="flex flex-col">
          <h1 className="text-lg font-bold leading-none">User</h1>
          <p className="text-sm opacity-70">Bem-vindo</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* botões ou ícones */}
      </div>

    </header>
  );
}

export default Header;