-- Sistema de Gestão Agrícola SEDAG Cantá-RR
-- Criação das tabelas base com RLS

-- Tabela de perfis de usuários
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  cpf TEXT,
  telefone TEXT,
  email TEXT,
  cargo TEXT,
  papel TEXT NOT NULL CHECK (papel IN ('administrador', 'gestor', 'tecnico', 'atendente', 'financeiro', 'leitor')),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de produtores
CREATE TABLE public.produtores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  cpf TEXT NOT NULL UNIQUE,
  rg TEXT,
  data_nascimento DATE,
  telefone TEXT,
  whatsapp TEXT,
  email TEXT,
  caf_numero TEXT,
  caf_validade DATE,
  endereco TEXT,
  comunidade TEXT,
  aldeia TEXT,
  associacao_id UUID,
  observacoes TEXT,
  status TEXT DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Tabela de propriedades
CREATE TABLE public.propriedades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  produtor_id UUID NOT NULL REFERENCES public.produtores(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  area_hectares DECIMAL(10,2),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  vila TEXT,
  vicinal TEXT,
  uso_solo TEXT[],
  sistema_irrigacao BOOLEAN DEFAULT false,
  licencas TEXT[],
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de associações/cooperativas
CREATE TABLE public.associacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  cnpj TEXT UNIQUE,
  dirigente TEXT,
  telefone TEXT,
  email TEXT,
  endereco TEXT,
  participa_paa BOOLEAN DEFAULT false,
  participa_pnae BOOLEAN DEFAULT false,
  observacoes TEXT,
  status TEXT DEFAULT 'ativa' CHECK (status IN ('ativa', 'inativa')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de agroindústrias
CREATE TABLE public.agroindustrias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  cnpj TEXT UNIQUE,
  responsavel TEXT,
  telefone TEXT,
  email TEXT,
  endereco TEXT,
  tipo_industria TEXT,
  produtos TEXT[],
  licencas TEXT[],
  status TEXT DEFAULT 'ativa' CHECK (status IN ('ativa', 'inativa')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de processos de crédito rural
CREATE TABLE public.credito_rural (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  produtor_id UUID NOT NULL REFERENCES public.produtores(id),
  banco TEXT NOT NULL,
  linha_credito TEXT NOT NULL,
  valor_solicitado DECIMAL(12,2),
  finalidade TEXT,
  status TEXT DEFAULT 'triagem' CHECK (status IN ('triagem', 'documentacao', 'analise', 'aprovado', 'encaminhado', 'concedido', 'negado')),
  data_solicitacao DATE DEFAULT CURRENT_DATE,
  data_encaminhamento DATE,
  observacoes TEXT,
  documentos_anexos TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  responsavel_id UUID REFERENCES auth.users(id)
);

-- Tabela de atendimentos ATER
CREATE TABLE public.atendimentos_ater (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  produtor_id UUID NOT NULL REFERENCES public.produtores(id),
  tecnico_id UUID NOT NULL REFERENCES auth.users(id),
  data_visita DATE NOT NULL,
  tipo_atendimento TEXT,
  culturas TEXT[],
  recomendacoes TEXT,
  observacoes TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  fotos TEXT[],
  documentos TEXT[],
  status TEXT DEFAULT 'realizado' CHECK (status IN ('agendado', 'realizado', 'cancelado')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Tabela de eventos
CREATE TABLE public.eventos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descricao TEXT,
  tipo TEXT CHECK (tipo IN ('realizacao', 'participacao')),
  data_inicio DATE NOT NULL,
  data_fim DATE,
  local TEXT,
  autoridades_convidadas TEXT[],
  participantes_esperados INTEGER,
  participantes_confirmados INTEGER,
  custo_estimado DECIMAL(10,2),
  status TEXT DEFAULT 'planejamento' CHECK (status IN ('planejamento', 'confirmado', 'realizado', 'cancelado')),
  responsavel_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.produtores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.propriedades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.associacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agroindustrias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credito_rural ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.atendimentos_ater ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;

-- Políticas RLS básicas para perfis
CREATE POLICY "Usuários podem ver seus próprios perfis" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios perfis" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Políticas para produtores (acesso geral para usuários autenticados)
CREATE POLICY "Usuários autenticados podem visualizar produtores" ON public.produtores
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Usuários autenticados podem criar produtores" ON public.produtores
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Usuários autenticados podem atualizar produtores" ON public.produtores
  FOR UPDATE TO authenticated USING (true);

-- Políticas para propriedades
CREATE POLICY "Usuários autenticados podem acessar propriedades" ON public.propriedades
  FOR ALL TO authenticated USING (true);

-- Políticas para associações
CREATE POLICY "Usuários autenticados podem acessar associações" ON public.associacoes
  FOR ALL TO authenticated USING (true);

-- Políticas para agroindústrias
CREATE POLICY "Usuários autenticados podem acessar agroindústrias" ON public.agroindustrias
  FOR ALL TO authenticated USING (true);

-- Políticas para crédito rural
CREATE POLICY "Usuários autenticados podem acessar crédito rural" ON public.credito_rural
  FOR ALL TO authenticated USING (true);

-- Políticas para ATER
CREATE POLICY "Usuários autenticados podem acessar ATER" ON public.atendimentos_ater
  FOR ALL TO authenticated USING (true);

-- Políticas para eventos
CREATE POLICY "Usuários autenticados podem acessar eventos" ON public.eventos
  FOR ALL TO authenticated USING (true);

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualização automática de updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_produtores_updated_at BEFORE UPDATE ON public.produtores
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_propriedades_updated_at BEFORE UPDATE ON public.propriedades
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_associacoes_updated_at BEFORE UPDATE ON public.associacoes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_agroindustrias_updated_at BEFORE UPDATE ON public.agroindustrias
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_credito_rural_updated_at BEFORE UPDATE ON public.credito_rural
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_atendimentos_ater_updated_at BEFORE UPDATE ON public.atendimentos_ater
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_eventos_updated_at BEFORE UPDATE ON public.eventos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, nome, email, papel)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', NEW.email),
    NEW.email,
    'atendente'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Adicionar referência de associação à tabela de produtores
ALTER TABLE public.produtores 
ADD CONSTRAINT fk_produtores_associacao 
FOREIGN KEY (associacao_id) REFERENCES public.associacoes(id);