import { Box, Button, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import React from 'react';
import { MotionContainer, varBounceIn } from '../../components/animate';
import Page from '../../components/Page';
import { useScopedTranslation } from '../../core/utils/hook/useScopedTranslation';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)<{ title: string }>(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export const TechnicalProblem = () => {
  const { t } = useScopedTranslation('technical-problem');
  return (
    <RootStyle title={t('title')}>
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                {t('caption')}
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }}>
              {t('description')}
            </Typography>

            <motion.div variants={varBounceIn}>
              <Box
                component="img"
                src="/static/oops.svg"
                sx={{ height: 400, mx: 'auto', my: { xs: 5, sm: 10 } }}
              />
            </motion.div>

            <Button
              onClick={() => window.location.reload()}
              size="large"
              variant="contained"
            >
              {t('reload-page')}
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
};
