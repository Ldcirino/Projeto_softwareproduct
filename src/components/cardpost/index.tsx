type PostCardProps = {
  nome: string;
  data: string;
  conteudo: string;
};

function PostCard({ nome, data, conteudo }: PostCardProps) {
  return (
    <div className="bg-gray-800 text-white rounded-2xl overflow-hidden">
      <div className="p-4">
        <h3 className="font-bold">{nome}</h3>
        <p className="text-sm opacity-70">{data}</p>
      </div>
      <div className="bg-black text-center p-6 text-white">
        {conteudo}
      </div>
    </div>
  );
}

export default PostCard;