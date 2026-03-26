import PostCard from "../../components/cardpost";
import CardTreino from "../../components/cardtreino";
import Footer from "../../components/footer";
import Header from "../../components/header";

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-900">
      <Header />

      <main className="flex flex-col items-center p-4 space-y-4">
        
        <div className="w-full max-w-md">
          <CardTreino 
            titulo="Treino A" 
            descricao="Treino previsto para hoje" 
          />
        </div>

        <div className="w-full max-w-md">
          <PostCard 
            nome={""} 
            data={""} 
            conteudo={""}          
          />
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;