var express = require("express");
var router = express.Router();
var conn = require("./../db/knexconn");

router.get("/", async function (req, res, next) {
  let response = await conn.knex.select("*").from("payments");
  res.status(200).json(response);
});

router.post("/new", async function (req, res, next) {
  let data = "";

  await conn.knex.transaction(async (trx) => {
    data = await trx("payments").insert(req.body).returning("*");
  });

  res.status(200).json(data);
});

router.put("/edit", async function (req, res, next) {
  let data = "";
  let id = req.body.id;
  delete req.body.id;

  await conn.knex.transaction(async (trx) => {
    data = await trx("payments")
      .where("id", id)
      .update(req.body)
      .returning("*");
  });

  res.status(200).json(data);
});

router.delete("/del", async function (req, res, next) {
  let id = req.query.id;
  await conn.knex.select("id").from("payments").where("id", id).del();
  res.status(200).json({ id, action: "removed" });
});

module.exports = router;
