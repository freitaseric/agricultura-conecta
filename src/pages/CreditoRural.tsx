import React from 'react';
import { Layout } from '@/components/Layout';

const CreditoRural = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Crédito Rural</h1>
          <p className="text-muted-foreground">
            Gerencie processos de crédito rural e financiamento
          </p>
        </div>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-gradient-subtle p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Módulo em Desenvolvimento</h2>
          <p className="text-muted-foreground mb-6">
            Este módulo permitirá o gerenciamento completo de processos de crédito rural, 
            incluindo análise de documentos, geração de pareceres técnicos e acompanhamento 
            de aprovações bancárias.
          </p>
          <div className="bg-card p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Funcionalidades planejadas: Pipeline de processos, documentos automatizados, 
              integração bancária e relatórios de acompanhamento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditoRural;