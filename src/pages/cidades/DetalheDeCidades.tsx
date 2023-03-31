import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { FerramentasDeDetalhe } from '../../shared/components';
import { VTextField, VForm, useVForm, IVFormsErrors } from '../../shared/forms';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { IDetalheCidade, CidadeService } from '../../shared/services/api/cidades/CidadesService';

interface IFormData {
  nomeCidade: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object().shape({
  nomeCidade: yup.string().required().min(3)
});

export const DetalheDeCidades: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const [isLoading, setIsLoading] = useState(false);
  // const [nome, setNome] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      CidadeService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
            navigate('/cidades');
          } else {
            // setNome(result.nomeCompleto);
            // console.log(result);
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        nomeCidade: ''
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {

    formValidationSchema.
      validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        /*
        if (dados.nomeCompleto.length < 3) {
          formRef.current?.setFieldError('nomeCompleto', 'O campo precisa ser preenchido!');
          setIsLoading(false);
          return;
        } */

        if (id === 'nova') {
          CidadeService
            .create(dadosValidados)
            .then((result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/cidades');
                } else {
                  navigate(`/cidades/detalhe/${result}`);
                }
              }
            });
        } else {
          CidadeService
            .updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setIsLoading(false);
              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/cidades');
                }
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormsErrors = {};
        errors.inner.forEach(error => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });
        // console.log(errors.inner);
        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Deseja realmente excluir o registro?')) {
      CidadeService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro excluido com sucesso!');
            navigate('/cidades');
          }
        });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id == 'nova' ? 'Cadastro de nova pessoa' : 'Edição de registro'}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEVoltar={saveAndClose}
          aoClicarEmVoltar={() => navigate('/cidades')}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
        />
      }>

      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">

          <Grid container direction="column" padding={2} spacing={2}>

            {isLoading && (
              <Grid item >
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item >
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField fullWidth label='Cidade' name='nomeCidade' disabled={isLoading} />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};