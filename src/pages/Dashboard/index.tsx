import PostCard from "../../components/cardpost";
import CardTreino from "../../components/cardtreino";
import Footer from "../../components/footer";
import Header from "../../components/header";

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800">
      <Header />

      <main className="p-4 space-y-4">
        <CardTreino 
          titulo="Treino A" 
          descricao="Treino previsto para hoje" 
        />

        <PostCard nome={""} data={""} conteudo={""}          
        />
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;