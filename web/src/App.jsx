/*
Copyright (C) 2025 QuantumNous
Modified by LobClaw Team
*/

import React, { lazy, Suspense, useContext, useMemo } from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import Loading from './components/common/ui/Loading';
import User from './pages/User';
import { AuthRedirect, PrivateRoute, AdminRoute } from './helpers';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import NotFound from './pages/NotFound';
import Forbidden from './pages/Forbidden';
import Setting from './pages/Setting';
import { StatusContext } from './context/Status';

import PasswordResetForm from './components/auth/PasswordResetForm';
import PasswordResetConfirm from './components/auth/PasswordResetConfirm';
import Channel from './pages/Channel';
import Token from './pages/Token';
import Redemption from './pages/Redemption';
import TopUp from './pages/TopUp';
import Log from './pages/Log';
import Chat from './pages/Chat';
import Chat2Link from './pages/Chat2Link';
import Midjourney from './pages/Midjourney';
import Pricing from './pages/Pricing';
import Task from './pages/Task';
import ModelPage from './pages/Model';
import ModelDeploymentPage from './pages/ModelDeployment';
import Playground from './pages/Playground';
import Subscription from './pages/Subscription';
import OAuth2Callback from './components/auth/OAuth2Callback';
import PersonalSetting from './components/settings/PersonalSetting';
import Setup from './pages/Setup';
import SetupCheck from './components/layout/SetupCheck';

// LobClaw Components
import CyberLayout from './components/lobclaw/CyberLayout';
import LobClawDashboard from './pages/Home/LobClawDashboard';
const AISkills = lazy(() => import('./pages/LobClaw/AISkills'));
const RevenueShare = lazy(() => import('./pages/LobClaw/RevenueShare'));
const BurnTracker = lazy(() => import('./pages/LobClaw/BurnTracker'));
const AgencyHub = lazy(() => import('./pages/LobClaw/AgencyHub'));

const About = lazy(() => import('./pages/About'));
const UserAgreement = lazy(() => import('./pages/UserAgreement'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

function DynamicOAuth2Callback() {
  const { provider } = useParams();
  return <OAuth2Callback type={provider} />;
}

function App() {
  const location = useLocation();
  const [statusState] = useContext(StatusContext);

  // 决定是否使用 CyberLayout
  // 我们在首页 (/) 以及所有的控制台页面 (/console/*) 使用赛博布局
  const useCyberLayout = location.pathname === '/' || location.pathname.startsWith('/console');

  const content = (
    <Routes>
      <Route
        path='/'
        element={
          <Suspense fallback={<Loading />}>
            <LobClawDashboard />
          </Suspense>
        }
      />
      <Route
        path='/setup'
        element={
          <Suspense fallback={<Loading />}>
            <Setup />
          </Suspense>
        }
      />
      <Route path='/forbidden' element={<Forbidden />} />
      
      {/* Console Routes */}
      <Route path='/console/models' element={<AdminRoute><ModelPage /></AdminRoute>} />
      <Route path='/console/deployment' element={<AdminRoute><ModelDeploymentPage /></AdminRoute>} />
      <Route path='/console/subscription' element={<AdminRoute><Subscription /></AdminRoute>} />
      <Route path='/console/channel' element={<AdminRoute><Channel /></AdminRoute>} />
      <Route path='/console/token' element={<PrivateRoute><Token /></PrivateRoute>} />
      <Route path='/console/playground' element={<PrivateRoute><Playground /></PrivateRoute>} />
      <Route path='/console/redemption' element={<AdminRoute><Redemption /></AdminRoute>} />
      <Route path='/console/user' element={<AdminRoute><User /></AdminRoute>} />
      <Route path='/console/setting' element={<AdminRoute><Suspense fallback={<Loading />}><Setting /></Suspense></AdminRoute>} />
      <Route path='/console/personal' element={<PrivateRoute><Suspense fallback={<Loading />}><PersonalSetting /></Suspense></PrivateRoute>} />
      <Route path='/console/topup' element={<PrivateRoute><Suspense fallback={<Loading />}><TopUp /></Suspense></PrivateRoute>} />
      <Route path='/console/log' element={<PrivateRoute><Log /></PrivateRoute>} />
      <Route path='/console/midjourney' element={<PrivateRoute><Suspense fallback={<Loading />}><Midjourney /></Suspense></PrivateRoute>} />
      <Route path='/console/task' element={<PrivateRoute><Suspense fallback={<Loading />}><Task /></Suspense></PrivateRoute>} />
      <Route path='/console/skills' element={<PrivateRoute><Suspense fallback={<Loading />}><AISkills /></Suspense></PrivateRoute>} />
      <Route path='/console/revenue' element={<PrivateRoute><Suspense fallback={<Loading />}><RevenueShare /></Suspense></PrivateRoute>} />
      <Route path='/console/burn' element={<Suspense fallback={<Loading />}><BurnTracker /></Suspense>} />
      <Route path='/console/agency' element={<PrivateRoute><Suspense fallback={<Loading />}><AgencyHub /></Suspense></PrivateRoute>} />
      <Route path='/console/chat/:id?' element={<Suspense fallback={<Loading />}><Chat /></Suspense>} />
      <Route path='/console' element={<PrivateRoute><Suspense fallback={<Loading />}><LobClawDashboard /></Suspense></PrivateRoute>} />

      {/* Auth Routes */}
      <Route path='/login' element={<Suspense fallback={<Loading />}><AuthRedirect><LoginForm /></AuthRedirect></Suspense>} />
      <Route path='/register' element={<Suspense fallback={<Loading />}><AuthRedirect><RegisterForm /></AuthRedirect></Suspense>} />
      <Route path='/reset' element={<Suspense fallback={<Loading />}><PasswordResetForm /></Suspense>} />
      <Route path='/user/reset' element={<Suspense fallback={<Loading />}><PasswordResetConfirm /></Suspense>} />
      
      {/* OAuth */}
      <Route path='/oauth/:provider' element={<Suspense fallback={<Loading />}><DynamicOAuth2Callback /></Suspense>} />
      <Route path='/oauth/github' element={<Suspense fallback={<Loading />}><OAuth2Callback type='github' /></Suspense>} />
      
      {/* Other */}
      <Route path='/pricing' element={<Suspense fallback={<Loading />}><Pricing /></Suspense>} />
      <Route path='/about' element={<Suspense fallback={<Loading />}><About /></Suspense>} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );

  return (
    <SetupCheck>
      {useCyberLayout ? (
        <CyberLayout>
          {content}
        </CyberLayout>
      ) : (
        content
      )}
    </SetupCheck>
  );
}

export default App;
