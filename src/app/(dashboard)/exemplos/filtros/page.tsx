export default function FiltrosExemploPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Exemplo: Sistema de Filtros</h1>
      <p className="text-muted-foreground">
        Demonstração do sistema de filtros da biblioteca @seplan/diti-ds
      </p>
      
      <div className="space-y-6">
        <div className="bg-white border rounded-lg">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Filtro Simples</h3>
            <p className="text-muted-foreground">Campo de busca básico</p>
          </div>
          <div className="p-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Buscar</label>
                  <input 
                    type="text"
                    placeholder="Digite para buscar..."
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white border rounded-lg">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Filtro com Select</h3>
            <p className="text-muted-foreground">Filtro com seleção de opções</p>
          </div>
          <div className="p-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option value="">Selecione o status</option>
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                    <option value="pendente">Pendente</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4">
        <a href="/exemplos" className="text-blue-600 hover:text-blue-800">
          ← Voltar aos Exemplos
        </a>
        <a href="/exemplos/busca" className="text-blue-600 hover:text-blue-800">
          Próximo: Busca →
        </a>
      </div>
    </div>
  )
}