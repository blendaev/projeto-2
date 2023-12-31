import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';
import { Enviroment } from '../../enviroments';

interface IFerramentasDaListagemProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
  textoDaBusca = '',
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  aoClicarEmNovo,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true

}) => {
  const theme = useTheme();
  return (
    <Box
      gap={1}
      marginX={1}
      padding={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}>

      {mostrarInputBusca && (
        <TextField
          size='small'
          value={textoDaBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
          placeholder={Enviroment.INPUT_DE_BUSCA} />
      )}

      <Box flex={1} display='flex' justifyContent='end'>
        {mostrarBotaoNovo && (
          <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={aoClicarEmNovo}
            startIcon={<Icon>add</Icon>}
          >{textoBotaoNovo}</Button>
        )}
      </Box>
    </Box>
  );
};