const router = require("express").Router();
const controllers = require("../../controllers/savedController");

router.route("/").get((req, res) => res.send("books routes are working"));

// router.route("/").get(controllers.findAll).post(controllers.create);
router.route("/:id").get(controllers.findById).delete(controllers.remove);

module.exports = router;