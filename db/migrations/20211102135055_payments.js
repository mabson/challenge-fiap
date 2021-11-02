exports.up = function (knex) {
    return knex.schema.createTable("payments", function (table) {
      table.bigIncrements("id");
      table.string("cnpj_deb", 255).notNullable();
      table.string("cnpj_fav", 255).notNullable();
      table.string("cod_banco");
      table.string("agencia", 100);
      table.string("conta", 100);
      table.string("tipo_pagamento", 100);
      table.datetime('data_venc', { precision: 6 }).defaultTo(knex.fn.now(6))
      table.string("moeda", 100);
      table.decimal('valor', 18, 2)
      table.string('status')
      table.timestamp("criado_em").defaultTo(knex.fn.now(6));
      table.timestamp("aprovado_em");
      table.timestamp("exportado_em");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("payments");
  };
  