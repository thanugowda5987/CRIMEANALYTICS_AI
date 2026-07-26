import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import FIRList from '../pages/FIRList';
import FIRDetail from '../pages/FIRDetail';
import Criminals from '../pages/Criminals';
import CriminalDetail from '../pages/CriminalDetail';
import Cases from '../pages/Cases';
import CaseDetail from '../pages/CaseDetail';
import Analytics from '../pages/Analytics';
import Hotspots from '../pages/Hotspots';
import AIChat from '../pages/AIChat';
import AuditLogs from '../pages/AuditLogs';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/firs"
        element={
          <ProtectedRoute>
            <FIRList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/firs/:id"
        element={
          <ProtectedRoute>
            <FIRDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/criminals"
        element={
          <ProtectedRoute>
            <Criminals />
          </ProtectedRoute>
        }
      />
      <Route
        path="/criminals/:id"
        element={
          <ProtectedRoute>
            <CriminalDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cases"
        element={
          <ProtectedRoute>
            <Cases />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cases/:id"
        element={
          <ProtectedRoute>
            <CaseDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/hotspots"
        element={
          <ProtectedRoute>
            <Hotspots />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai-chat"
        element={
          <ProtectedRoute>
            <AIChat />
          </ProtectedRoute>
        }
      />

      <Route
        path="/audit-logs"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AuditLogs />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;