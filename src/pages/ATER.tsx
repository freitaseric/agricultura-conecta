import React from 'react';

const ATER = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">ATER - Assistência Técnica</h1>
          <p className="text-muted-foreground">
            Assistência Técnica e Extensão Rural
          </p>
        </div>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-gradient-subtle p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Módulo em Desenvolvimento</h2>
          <p className="text-muted-foreground mb-6">
            Este módulo facilitará o agendamento e registro de visitas técnicas, 
            planos de trabalho personalizados e acompanhamento de recomendações.
          </p>
          <div className="bg-card p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Funcionalidades planejadas: Agenda de visitas, geolocalização, 
              registro fotográfico e indicadores de atendimento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATER;