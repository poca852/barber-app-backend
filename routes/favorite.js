const router = require("express").Router();

const {
  addFavorite,
  getFavorite,
  deleteFavorite,
  deleteFavoriteParams,
} = require("../controllers/favorite.js");

router.post("/", addFavorite);
router.get("/", getFavorite);
// router.get("/:id", [check("id", "Id is not valid").isUUID()], getDate);
router.delete(
  "/", // [check("id", "Id is not valid").isUUID()],
  deleteFavorite
);
router.delete(
  "/:idUser/:idProduct",
  // [check("id", "Id is not valid").isUUID()],
  deleteFavoriteParams
);

module.exports = router;
