const express = require("express");
const router = express.Router();
const controller = require("../controllers/customers");
//const accountsController = require("../controllers/accounts");

router.get("/", async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
  const page = req.query.page ? parseInt(req.query.page) : 0;

  res.json(await controller.getAllCustomers(pageSize, page));
});

// router.get("/:id", async (req, res) => {
//   res.json(await controller.getCustomer(req.params.id));
// });

router.get("/email/:email", async (req, res) => {
  console.log("ok");
  res.json(await controller.findCustomerByEmail(req.params.email));
});

router.get("/4AccountsOrMore", async (req, res) => {
  res.json(await controller.getCustomer4accountsOrMore());
});

router.get("/clientescuentaslimit=10000", async (req, res) => {
  res.json(await controller.getAccountlimit10000());
});

router.get("/transacciones/name/:name", async (req, res) => {
  const formattedName = formatName(req.params.name);
  res.json(await controller.getCustomerTransactionsFromAccounts(formattedName));
});

//funcion para validar que si entran dos palabras que empiezan con mayuscula separarla.

function formatName(name) {
  const words = name.match(/[A-Z][a-z]+/g);

  if (words) {
    // Unir las palabras con un espacio en blanco para formatear el nombre
    return words.join(" ");
  }

  // Si no se encontraron palabras separadas por mayúsculas, devolver el nombre original
  return name;
}

module.exports = router;
