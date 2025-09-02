import React from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Layout } from '@/components/Layout';
import Dashboard from './Dashboard';
import Auth from './Auth';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Carregando sistema...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default Index;
