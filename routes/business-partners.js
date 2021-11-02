var express = require("express");
var router = express.Router();
var axios = require("./../utils/axios");
var _ = require("lodash");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let route = Number.isNaN(Number(req.query.q))
    ? `/BusinessPartnerSet?$filter=CompanyName eq '${req.query.q}'&$format=json`
    : `/BusinessPartnerSet?$filter=BusinessPartnerID eq '${req.query.q}'&$format=json`;
  let response = await axios.get(route);
  if (response?.data?.d?.results.length > 0) {
    response = response?.data?.d?.results.map((bp) => {
      delete bp.Address["__metadata"];
      return {
        BusinessPartnerID: bp.BusinessPartnerID,
        CompanyName: bp.CompanyName,
        WebAddress: bp.WebAddress,
        EmailAddress: bp.EmailAddress,
        PhoneNumber: bp.PhoneNumber,
        FaxNumber: bp.FaxNumber,
        LegalForm: bp.LegalForm,
        CurrencyCode: bp.CurrencyCode,
        BusinessPartnerRole: bp.BusinessPartnerRole,
        Address: bp.Address,
      };
    });
  }
  res.status(200).json(response);
});

module.exports = router;
