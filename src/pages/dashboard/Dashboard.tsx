import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components/ferramentas-de-detalhe/FerramentasDeDetalhe';

export const Dashboard = () => {

  return (
    <LayoutBaseDePagina
      titulo='Página inicial'
      ferramentasDaListagem={(
        <FerramentasDeDetalhe mostrarBotaoSalvarEVoltar />
      )}>
      Testando
    </LayoutBaseDePagina>
  );
};