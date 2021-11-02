const conn = require("./../db/knexconn");
const cron = require("node-cron");
let config = {
  timezone: "America/Sao_Paulo",
  scheduled: true,
};

exports.StartJobs = async () => {
  console.log("Inicializando Jobs Internos");
  cron.schedule("*/15 * * * * *", exportaAprovados, config);
};

async function exportaAprovados() {
  let payments = await conn.knex
    .select("*")
    .from("payments")
    .where("status", "APROVADO")
    .whereNotNull("aprovado_em")
    .whereNull("exportado_em");

  console.log("");
  console.log("+-- Execução Automática JOB de Exportação --+");
  console.log("| Buscando pagamentos aprovados ...         |");
  console.log("|                                           |");
  if (payments.length > 0) {
    console.log(`| Encontrado pagamentos para exportar       |`);
  } else {
    console.log(`| Nenhum pagamento a ser exportado          |`);

    console.log("+-------------------------------------------+");
  }

  if (payments.length > 0) {
    let exportar = false;
    console.log(`| Gerando lotes                             |`);
    payments.forEach(async (payment) => {
      exportar = false;

      switch (payment.cod_banco) {
        case "001":
          console.log("| Banco do Brasil S.A.                      |");
          exportar = true;
          break;
        case "033":
          console.log("| Banco Santander (Brasil) S.A.             |");
          exportar = true;
          break;
        case "054":
          console.log("| Caixa Econômica Federal.                  |");
          exportar = true;
          break;
        case "237":
          console.log("| Banco Bradesco S.A.                       |");
          exportar = true;
          break;
        case "341":
          console.log("| Banco Itaú S.A.                           |");
          exportar = true;
          break;
        default:
          console.log("| Banco desconhecido Nao Exportar !         |");
          exportar = false;
          break;
      }

      //Alterando Status
      if (exportar)
        await conn.knex.transaction(async (trx) => {
          data = await trx("payments")
            .where("id", payment.id)
            .update({
              status: "EXPORTADO",
              exportado_em: conn.knex.fn.now(),
            })
            .returning("*");
        });

      console.log("+-------------------------------------------+");
    });
  }
}
