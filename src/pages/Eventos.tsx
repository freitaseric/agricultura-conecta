import React from 'react';

const Eventos = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Eventos</h1>
          <p className="text-muted-foreground">
            Gerencie eventos, capacitações e protocolo oficial
          </p>
        </div>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-gradient-subtle p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Módulo em Desenvolvimento</h2>
          <p className="text-muted-foreground mb-6">
            Este módulo organizará todo o calendário de eventos, desde o planejamento 
            até a execução, incluindo geração de convites e relatórios.
          </p>
          <div className="bg-card p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Funcionalidades planejadas: Calendário de eventos, convites automáticos, 
              lista de presença e prestação de contas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventos;