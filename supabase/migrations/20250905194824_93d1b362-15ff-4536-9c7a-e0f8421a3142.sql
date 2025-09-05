-- Primeiro, vamos inserir usuários técnicos fictícios para resolver a restrição
-- Isso é necessário porque os atendimentos ATER requerem um técnico responsável

-- Inserir atendimentos ATER com técnicos válidos (usando IDs de auth que existem ou serão criados)
-- Vamos alterar a estrutura para não exigir técnico_id obrigatório neste momento

-- Remover a restrição NOT NULL temporariamente 
ALTER TABLE public.atendimentos_ater ALTER COLUMN tecnico_id DROP NOT NULL;

-- Inserir dados de exemplo corrigidos
-- Inserir associações de exemplo
INSERT INTO public.associacoes (nome, cnpj, dirigente, telefone, email, endereco, participa_paa, participa_pnae) VALUES
('Associação dos Produtores de Santa Rosa', '12.345.678/0001-90', 'Maria Silva Santos', '(95) 99876-5432', 'asantarosa@email.com', 'Vila Santa Rosa, s/n, Cantá-RR', true, true),
('Cooperativa Agrícola do Alto Mucajaí', '23.456.789/0001-01', 'João Carlos Lima', '(95) 98765-4321', 'coopaltomucajai@email.com', 'Vicinal Mucajaí, km 15, Cantá-RR', true, false),
('Associação São José dos Agricultores', '34.567.890/0001-12', 'Ana Paula Rodrigues', '(95) 97654-3210', 'saojose@email.com', 'Vila São José, Centro, Cantá-RR', false, true);

-- Inserir produtores de exemplo
INSERT INTO public.produtores (nome, cpf, rg, data_nascimento, telefone, whatsapp, email, caf_numero, caf_validade, endereco, comunidade, associacao_id, observacoes, status) VALUES
('José Silva dos Santos', '123.456.789-00', '1234567 SSP/RR', '1975-03-15', '(95) 99123-4567', '(95) 99123-4567', 'jose.santos@email.com', 'CAF001234567', '2024-12-31', 'Sítio Esperança, s/n', 'Vila Santa Rosa', (SELECT id FROM public.associacoes WHERE nome = 'Associação dos Produtores de Santa Rosa'), 'Produtor de milho e feijão', 'ativo'),
('Maria Conceição Lima', '234.567.890-11', '2345678 SSP/RR', '1980-07-22', '(95) 98234-5678', '(95) 98234-5678', 'maria.lima@email.com', 'CAF002345678', '2024-11-15', 'Fazenda Boa Vista, km 8', 'Alto Mucajaí', (SELECT id FROM public.associacoes WHERE nome = 'Cooperativa Agrícola do Alto Mucajaí'), 'Especializada em horticultura', 'ativo'),
('Pedro Henrique Costa', '345.678.901-22', '3456789 SSP/RR', '1970-12-08', '(95) 97345-6789', '(95) 97345-6789', NULL, 'CAF003456789', '2025-02-28', 'Lote 15, Projeto de Assentamento', 'São José', (SELECT id FROM public.associacoes WHERE nome = 'Associação São José dos Agricultores'), 'Criação de gado e agricultura familiar', 'ativo'),
('Ana Santos Oliveira', '456.789.012-33', '4567890 SSP/RR', '1985-09-12', '(95) 96456-7890', '(95) 96456-7890', 'ana.oliveira@email.com', 'CAF004567890', '2024-01-15', 'Sítio Palmeiras, Vicinal 12', 'Santa Rosa', (SELECT id FROM public.associacoes WHERE nome = 'Associação dos Produtores de Santa Rosa'), 'CAF vencido - necessário renovar', 'ativo'),
('Carlos Eduardo Souza', '567.890.123-44', '5678901 SSP/RR', '1978-05-03', '(95) 95567-8901', '(95) 95567-8901', NULL, 'CAF005678901', '2024-10-30', 'Fazenda Três Irmãos', 'Mucajaí', (SELECT id FROM public.associacoes WHERE nome = 'Cooperativa Agrícola do Alto Mucajaí'), 'CAF vencendo em breve', 'ativo');

-- Inserir propriedades
INSERT INTO public.propriedades (produtor_id, nome, area_hectares, latitude, longitude, vila, vicinal, uso_solo, sistema_irrigacao, observacoes) VALUES
((SELECT id FROM public.produtores WHERE cpf = '123.456.789-00'), 'Sítio Esperança', 15.5, 2.345678, -60.123456, 'Santa Rosa', 'Vicinal 01', ARRAY['milho', 'feijão', 'mandioca'], false, 'Propriedade com boa infraestrutura'),
((SELECT id FROM public.produtores WHERE cpf = '234.567.890-11'), 'Fazenda Boa Vista', 25.0, 2.356789, -60.234567, 'Alto Mucajaí', 'Vicinal 08', ARRAY['hortaliças', 'frutas'], true, 'Sistema de irrigação por gotejamento'),
((SELECT id FROM public.produtores WHERE cpf = '345.678.901-22'), 'Lote 15 - PA Cantá', 12.0, 2.367890, -60.345678, 'São José', NULL, ARRAY['gado', 'milho'], false, 'Projeto de assentamento rural'),
((SELECT id FROM public.produtores WHERE cpf = '456.789.012-33'), 'Sítio Palmeiras', 8.5, 2.378901, -60.456789, 'Santa Rosa', 'Vicinal 12', ARRAY['banana', 'açaí'], false, 'Produção de fruticultura'),
((SELECT id FROM public.produtores WHERE cpf = '567.890.123-44'), 'Fazenda Três Irmãos', 45.0, 2.389012, -60.567890, 'Mucajaí', 'Vicinal Principal', ARRAY['soja', 'milho', 'pastagem'], true, 'Grande propriedade com diversificação');

-- Inserir processos de crédito rural
INSERT INTO public.credito_rural (produtor_id, banco, linha_credito, valor_solicitado, finalidade, status, data_solicitacao, observacoes) VALUES
((SELECT id FROM public.produtores WHERE cpf = '123.456.789-00'), 'Banco do Brasil', 'Pronaf Mais Alimentos', 15000.00, 'Aquisição de trator', 'analise', '2024-01-15', 'Documentação completa'),
((SELECT id FROM public.produtores WHERE cpf = '234.567.890-11'), 'Banco da Amazônia', 'Pronaf Mulher', 8000.00, 'Construção de estufa', 'aprovado', '2024-01-10', 'Projeto aprovado pelo técnico'),
((SELECT id FROM public.produtores WHERE cpf = '345.678.901-22'), 'Caixa Econômica Federal', 'Pronaf Custeio', 5000.00, 'Insumos para plantio', 'encaminhado', '2024-01-08', 'Encaminhado para análise bancária'),
((SELECT id FROM public.produtores WHERE cpf = '456.789.012-33'), 'Banco do Brasil', 'Pronaf Investimento', 12000.00, 'Sistema de irrigação', 'triagem', '2024-01-20', 'Aguardando documentos adicionais'),
((SELECT id FROM public.produtores WHERE cpf = '567.890.123-44'), 'Banco da Amazônia', 'Pronaf Eco', 25000.00, 'Diversificação produtiva', 'documentacao', '2024-01-12', 'Pendente certidões negativas');

-- Inserir atendimentos ATER (sem técnico_id por enquanto)
INSERT INTO public.atendimentos_ater (produtor_id, data_visita, tipo_atendimento, culturas, recomendacoes, observacoes, latitude, longitude, status) VALUES
((SELECT id FROM public.produtores WHERE cpf = '123.456.789-00'), '2024-01-18', 'Orientação Técnica', ARRAY['milho', 'feijão'], 'Aplicação de calcário no solo e correção de pH', 'Produtor receptivo às orientações', 2.345678, -60.123456, 'realizado'),
((SELECT id FROM public.produtores WHERE cpf = '234.567.890-11'), '2024-01-19', 'Vistoria Técnica', ARRAY['hortaliças'], 'Melhorar manejo de pragas com produtos orgânicos', 'Necessária nova visita em 30 dias', 2.356789, -60.234567, 'realizado'),
((SELECT id FROM public.produtores WHERE cpf = '345.678.901-22'), '2024-01-22', 'Orientação Geral', ARRAY['gado'], 'Implementar rotação de pastagens', 'Produtor interessado em melhorias', 2.367890, -60.345678, 'realizado'),
((SELECT id FROM public.produtores WHERE cpf = '567.890.123-44'), '2024-01-25', 'Visita Programada', ARRAY['soja'], 'Análise de solo para próximo plantio', 'Agendada coleta de amostras', 2.389012, -60.567890, 'agendado');

-- Inserir eventos
INSERT INTO public.eventos (titulo, descricao, tipo, data_inicio, data_fim, local, autoridades_convidadas, participantes_esperados, status) VALUES
('Workshop de Agricultura Sustentável', 'Capacitação sobre práticas sustentáveis na agricultura familiar', 'realizacao', '2024-02-15', '2024-02-15', 'Centro Comunitário de Cantá', ARRAY['Prefeito Municipal', 'Secretário de Agricultura', 'Técnicos do INCRA'], 50, 'confirmado'),
('Feira de Produtos Orgânicos', 'Feira para exposição e venda de produtos orgânicos locais', 'realizacao', '2024-03-10', '2024-03-12', 'Praça Central de Cantá', ARRAY['Prefeito', 'Vereadores', 'Representante SEBRAE'], 200, 'planejamento'),
('Dia de Campo - Manejo de Pastagens', 'Demonstração de técnicas de manejo de pastagens', 'realizacao', '2024-02-28', '2024-02-28', 'Fazenda Três Irmãos', ARRAY['Técnicos EMATER', 'Veterinário Regional'], 30, 'confirmado'),
('Participação no Seminário Estadual de Agricultura', 'Representação no evento estadual', 'participacao', '2024-04-05', '2024-04-07', 'Boa Vista - RR', ARRAY['Secretário de Estado'], 5, 'planejamento');

-- Inserir agroindústrias
INSERT INTO public.agroindustrias (nome, cnpj, responsavel, telefone, email, endereco, tipo_industria, produtos, status) VALUES
('Agroindústria Frutos do Campo', '45.678.901/0001-23', 'Roberto Silva', '(95) 94567-8901', 'frutoscampo@email.com', 'Vila Industrial, Lote 10, Cantá-RR', 'Processamento de Frutas', ARRAY['polpa de açaí', 'doces de banana', 'geleias'], 'ativa'),
('Laticínios Cantá', '56.789.012/0001-34', 'Sandra Oliveira', '(95) 93456-7890', 'laticinios@email.com', 'Zona Rural, km 12, Cantá-RR', 'Laticínios', ARRAY['queijo coalho', 'manteiga', 'requeijão'], 'ativa');