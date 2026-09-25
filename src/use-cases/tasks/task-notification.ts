const Atividade = require('../models/Atividade');

async function buscarAtividadesProximas() {
  const agora = new Date();
  const em1Hora = new Date(agora.getTime() + 60 * 60 * 1000);

  return Atividade.find({
    dataLimite: { $gte: agora, $lte: em1Hora },
    notificado: false, // evita reenviar o mesmo e-mail várias vezes
  }).populate('responsavel');
}

module.exports = { buscarAtividadesProximas };