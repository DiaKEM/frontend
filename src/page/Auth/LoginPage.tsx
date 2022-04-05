import { Card, Stack, Link, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import illustration from './login.png';
import Page from '../../components/Page';
import { useScopedTranslation } from '../../core/utils/hook/useScopedTranslation';
import AuthLayout from '../../layouts/Auth/AuthLayout';

const RootStyle = styled(Page)<{ title: string }>(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

export const LoginPage = () => {
  const { t } = useScopedTranslation('page.login');
  return (
    <RootStyle title={t('title')}>
      <AuthLayout>
        {t('not-registered')} &nbsp;
        <Link
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to="/register"
        >
          {t('register-now')}
        </Link>
      </AuthLayout>

      <SectionStyle sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
          {t('welcome-back')}
        </Typography>
        <img src={illustration} alt="login" />
      </SectionStyle>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              {t('login')}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {t('enter-credentials')}
            </Typography>
          </Stack>
          <LoginForm />

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 3,
              display: { sm: 'none' },
            }}
          >
            {t('not-registered')}&nbsp;
            <Link
              variant="subtitle2"
              component={RouterLink}
              to="register"
              underline="hover"
            >
              {t('register-now')}
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};
