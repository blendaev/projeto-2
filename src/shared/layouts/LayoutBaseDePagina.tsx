import { Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode } from 'react';

import { useDrawerContext } from '../contexts';

interface ILayoutBaseDePaginaProps {
  children: React.ReactNode;
  titulo: string;
  ferramentasDaListagem?: ReactNode | undefined;
  barraDeFerramentas?: ReactNode | undefined;
}
export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, titulo, barraDeFerramentas: barraDeFerramentas, ferramentasDaListagem: ferramentasDaListagem }) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display='flex' flexDirection='column' gap={1}>
      <Box padding={1} display='flex' alignItems="center" height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} gap={1}>
        {smDown && (<IconButton onClick={toggleDrawerOpen}>
          <Icon>menu</Icon>
        </IconButton>)}

        <Typography
          whiteSpace='nowrap'
          overflow="hidden"
          textOverflow='ellipsis'
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
        >
          {titulo}
        </Typography>
      </Box>

      {ferramentasDaListagem && (
        <Typography>
          <Box>
            {ferramentasDaListagem}
          </Box>
        </Typography>
      )}

      {barraDeFerramentas && (
        <Typography>
          <Box>
            {barraDeFerramentas}
          </Box>
        </Typography>
      )}

      <Typography>
        <Box flex={1} overflow="auto">
          {children}
        </Box>
      </Typography>
    </Box>
  );
};