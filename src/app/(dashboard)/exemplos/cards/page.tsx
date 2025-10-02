export default function CardsExemploPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Exemplo: Cards</h1>
      <p className="text-muted-foreground">
        Demonstração do componente Card da biblioteca @seplan/diti-ds
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Card Simples</h3>
            <p className="text-muted-foreground">Exemplo básico de um card</p>
          </div>
          <div className="p-4">
            <p>Conteúdo do card aqui...</p>
          </div>
        </div>
        
        <div className="bg-white border rounded-lg">
          <div className="p-4 border-b">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">Card com Badge</h3>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Online</span>
            </div>
            <p className="text-muted-foreground">Card com status badge</p>
          </div>
          <div className="p-4">
            <p>Sistema funcionando normalmente</p>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4">
        <a href="/exemplos" className="text-blue-600 hover:text-blue-800">
          ← Voltar aos Exemplos
        </a>
        <a href="/exemplos/filtros" className="text-blue-600 hover:text-blue-800">
          Próximo: Filtros →
        </a>
      </div>
    </div>
  )
}