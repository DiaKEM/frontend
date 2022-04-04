import React from 'react';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import ScrollToTop from './components/ScrollToTop';
import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';

export const App = () => (
  <ThemeConfig>
    <ScrollToTop />
    <GlobalStyles />
    <BaseOptionChartStyle />
    <Router />
  </ThemeConfig>
);
