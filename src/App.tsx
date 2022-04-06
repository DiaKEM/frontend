import React from 'react';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import ScrollToTop from './components/ScrollToTop';
import { Router } from './core/router/Router';
import ThemeConfig from './core/theme';
import GlobalStyles from './core/theme/globalStyles';
import { AuthCheck } from './page/AuthCheck/AuthCheck';
import { HealthCheck } from './page/HealthCheck/HealthCheck';

export const App = () => (
  <ThemeConfig>
    <HealthCheck>
      <AuthCheck>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <Router />
      </AuthCheck>
    </HealthCheck>
  </ThemeConfig>
);
