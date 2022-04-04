import React from 'react';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import ScrollToTop from './components/ScrollToTop';
import { Router } from './core/router/Router';
import ThemeConfig from './core/theme';
import GlobalStyles from './core/theme/globalStyles';

export const App = () => (
  <ThemeConfig>
    <ScrollToTop />
    <GlobalStyles />
    <BaseOptionChartStyle />
    <Router />
  </ThemeConfig>
);
