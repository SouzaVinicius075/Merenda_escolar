import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../services/api';
import './styles.css';

interface DashboardData {
  userDashboard: any[];
  nome: string;
  email: string;
  nomeEscola: string;
}

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await apiRequest('/api/school/dashboard');
        console.log('Dados do dashboard:', data); // Log para debug
        setDashboardData(data);
      } catch (err) {
        console.error('Erro ao carregar dashboard:', err); // Log para debug
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados do dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="user-info">
          <div className="school-name">
            <h1>{dashboardData?.nomeEscola || 'Escola'}</h1>
          </div>
          <div className="director-info">
            <h2>Diretor: {dashboardData?.nome || 'Nome do Diretor'}</h2>
            <p>{dashboardData?.email || 'email@escola.com'}</p>
          </div>
        </div>
      </header>
      <main className="dashboard-content">
        {dashboardData?.userDashboard && (
          <div className="dashboard-data">
            <pre>{JSON.stringify(dashboardData.userDashboard, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
} 