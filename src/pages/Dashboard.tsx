import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MapPin, 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  FileText,
  Sprout,
  Building2,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import heroImage from '@/assets/hero-agricultura.jpg';

const Dashboard = () => {
  const stats = [
    {
      title: "Produtores Cadastrados",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Processos de Crédito",
      value: "89",
      change: "+5",
      trend: "up", 
      icon: CreditCard,
      color: "text-secondary"
    },
    {
      title: "Atendimentos ATER",
      value: "156",
      change: "+23",
      trend: "up",
      icon: Sprout,
      color: "text-success"
    },
    {
      title: "Eventos Programados",
      value: "12",
      change: "+3",
      trend: "up",
      icon: Calendar,
      color: "text-tertiary"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "credito",
      description: "Nova solicitação de crédito Pronaf - João Silva",
      time: "2 horas atrás",
      status: "pendente"
    },
    {
      id: 2,
      type: "ater",
      description: "Visita técnica realizada - Propriedade Santo Antônio",
      time: "4 horas atrás",
      status: "concluido"
    },
    {
      id: 3,
      type: "evento",
      description: "Workshop de Agricultura Sustentável confirmado",
      time: "1 dia atrás",
      status: "confirmado"
    },
    {
      id: 4,
      type: "cadastro",
      description: "Novo produtor cadastrado - Maria Santos",
      time: "2 dias atrás",
      status: "concluido"
    }
  ];

  const quickActions = [
    {
      title: "Cadastrar Produtor",
      description: "Adicionar novo produtor ao sistema",
      icon: Users,
      href: "/produtores/novo",
      variant: "agriculture" as const
    },
    {
      title: "Nova Visita ATER",
      description: "Agendar assistência técnica",
      icon: Sprout,
      href: "/ater/nova",
      variant: "success" as const
    },
    {
      title: "Processo de Crédito",
      description: "Iniciar análise de crédito rural",
      icon: CreditCard,
      href: "/credito/novo",
      variant: "secondary" as const
    },
    {
      title: "Criar Evento",
      description: "Programar novo evento",
      icon: Calendar,
      href: "/eventos/novo",
      variant: "tertiary" as const
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'bg-warning text-warning-foreground';
      case 'concluido': return 'bg-success text-success-foreground';
      case 'confirmado': return 'bg-tertiary text-tertiary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl">
        <div 
          className="h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-nature opacity-80"></div>
          <div className="relative h-full flex items-center justify-center text-center">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">
                Sistema de Gestão Agrícola
              </h1>
              <p className="text-xl text-white/90 mb-6">
                SEDAG - Secretaria de Agricultura de Cantá, Roraima
              </p>
              <Button variant="hero" size="xl">
                Acessar Relatórios Completos
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-medium transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success">{stat.change}</span> em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Acesse as principais funcionalidades do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <div
                      key={index}
                      className="group p-4 rounded-lg border border-border hover:shadow-soft transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {action.description}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Atividades Recentes
              <Badge variant="secondary" className="ml-2">
                {recentActivities.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      {activity.description}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getStatusColor(activity.status)}`}
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas e Notificações */}
      <Card className="border-warning bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center text-warning">
            <AlertCircle className="w-5 h-5 mr-2" />
            Alertas e Pendências
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-card rounded-lg">
              <div>
                <p className="text-sm font-medium">15 CAFs vencendo nos próximos 30 dias</p>
                <p className="text-xs text-muted-foreground">Produtores precisam renovar o cadastro</p>
              </div>
              <Button variant="warning" size="sm">Verificar</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg">
              <div>
                <p className="text-sm font-medium">8 processos de crédito aguardando análise</p>
                <p className="text-xs text-muted-foreground">Pendente de revisão técnica</p>
              </div>
              <Button variant="warning" size="sm">Analisar</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;