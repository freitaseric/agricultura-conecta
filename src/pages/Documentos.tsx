import React from 'react';

const Documentos = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Documentos</h1>
          <p className="text-muted-foreground">
            Editor de documentos oficiais e templates
          </p>
        </div>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-gradient-subtle p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Módulo em Desenvolvimento</h2>
          <p className="text-muted-foreground mb-6">
            Este módulo permitirá a criação de ofícios, memorandos e relatórios 
            com templates pré-definidos e numeração automática.
          </p>
          <div className="bg-card p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Funcionalidades planejadas: Editor com placeholders, numeração automática, 
              assinaturas digitais e exportação em PDF.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentos;