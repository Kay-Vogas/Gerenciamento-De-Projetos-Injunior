const cron = require('node-cron');
const { buscarAtividadesProximas } = require('../services/atividadeService');
const { enviarEmailAtividade } = require('../services/mailer');

function iniciarCronNotificacoes() {
  // roda a cada 15 minutos
  cron.schedule('*/15 * * * *', async () => {
    console.log('[CRON] Verificando atividades pendentes...');
    try {
      const atividades = await buscarAtividadesProximas();

      for (const atividade of atividades) {
        await enviarEmailAtividade(atividade.responsavel.email, atividade);
        atividade.notificado = true;
        await atividade.save();
      }

      console.log(`[CRON] ${atividades.length} e-mail(s) enviado(s).`);
    } catch (erro) {
      console.error('[CRON] Erro ao enviar notificações:', erro);
    }
  }, { timezone: 'America/Sao_Paulo' });
}

module.exports = { iniciarCronNotificacoes };