import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Search, 
  Plus, 
  Filter, 
  Eye, 
  Edit, 
  MapPin,
  Phone,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Produtor {
  id: string;
  nome: string;
  cpf: string;
  telefone?: string;
  comunidade?: string;
  caf_numero?: string;
  caf_validade?: string;
  status: string;
  created_at: string;
}

const Produtores = () => {
  const [produtores, setProdutores] = useState<Produtor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchProdutores();
  }, []);

  const fetchProdutores = async () => {
    try {
      const { data, error } = await supabase
        .from('produtores')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProdutores(data || []);
    } catch (error) {
      console.error('Erro ao carregar produtores:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os produtores.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProdutores = produtores.filter(produtor =>
    produtor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    produtor.cpf.includes(searchTerm) ||
    (produtor.comunidade && produtor.comunidade.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const isCAFExpiring = (validade?: string) => {
    if (!validade) return false;
    const today = new Date();
    const validadeDate = new Date(validade);
    const diffDays = Math.ceil((validadeDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return diffDays <= 30 && diffDays >= 0;
  };

  const isCAFExpired = (validade?: string) => {
    if (!validade) return false;
    const today = new Date();
    const validadeDate = new Date(validade);
    return validadeDate < today;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativo':
        return <Badge variant="default" className="bg-success text-success-foreground">Ativo</Badge>;
      case 'inativo':
        return <Badge variant="secondary">Inativo</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCAFStatus = (validade?: string) => {
    if (!validade) return null;
    
    if (isCAFExpired(validade)) {
      return <Badge variant="destructive" className="text-xs">CAF Vencido</Badge>;
    }
    
    if (isCAFExpiring(validade)) {
      return <Badge variant="outline" className="text-xs border-warning text-warning">CAF Vencendo</Badge>;
    }
    
    return <Badge variant="outline" className="text-xs text-success border-success">CAF Válido</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando produtores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Produtores</h1>
          <p className="text-muted-foreground">
            Gerencie o cadastro de produtores rurais do município
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button variant="agriculture" className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Novo Produtor
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, CPF ou comunidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Total de Produtores</p>
                <p className="text-2xl font-bold">{produtores.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-success/10 rounded-lg">
                <Eye className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium">Ativos</p>
                <p className="text-2xl font-bold">
                  {produtores.filter(p => p.status === 'ativo').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-warning/10 rounded-lg">
                <AlertCircle className="w-4 h-4 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium">CAF Vencendo</p>
                <p className="text-2xl font-bold">
                  {produtores.filter(p => isCAFExpiring(p.caf_validade)).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertCircle className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium">CAF Vencido</p>
                <p className="text-2xl font-bold">
                  {produtores.filter(p => isCAFExpired(p.caf_validade)).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Produtores Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Produtores</CardTitle>
          <CardDescription>
            {filteredProdutores.length} produtor(es) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>Comunidade</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>CAF</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProdutores.map((produtor) => (
                  <TableRow key={produtor.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {produtor.nome}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {produtor.cpf}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{produtor.comunidade || '-'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {produtor.telefone ? (
                        <div className="flex items-center space-x-1">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">{produtor.telefone}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {produtor.caf_numero && (
                          <p className="text-xs font-mono">{produtor.caf_numero}</p>
                        )}
                        {getCAFStatus(produtor.caf_validade)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(produtor.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredProdutores.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {searchTerm ? 'Nenhum produtor encontrado com os filtros aplicados.' : 'Nenhum produtor cadastrado ainda.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Produtores;