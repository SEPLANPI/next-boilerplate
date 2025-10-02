export default function BreadcrumbsExemploPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Exemplo: Breadcrumbs</h1>
      <p className="text-muted-foreground">
        Demonstração do componente Breadcrumbs da biblioteca @seplan/diti-ds
      </p>
      
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Breadcrumb Simples</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/exemplos" className="hover:text-gray-900 hover:underline">
              Exemplos
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">Breadcrumbs</span>
          </nav>
        </div>
      </div>
      
      <div className="flex gap-4">
        <a href="/exemplos" className="text-blue-600 hover:text-blue-800">
          ← Voltar aos Exemplos
        </a>
        <a href="/exemplos/cards" className="text-blue-600 hover:text-blue-800">
          Próximo: Cards →
        </a>
      </div>
    </div>
  )
}