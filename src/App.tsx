import React from 'react';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import ScrollToTop from './components/ScrollToTop';
import ThemeConfig from './core/theme';
import GlobalStyles from './core/theme/globalStyles';
import Router from './routes';

export const App = () => (
  <ThemeConfig>
    <ScrollToTop />
    <GlobalStyles />
    <BaseOptionChartStyle />
    <Router />
  </ThemeConfig>
);
