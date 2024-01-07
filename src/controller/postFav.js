const { user_favorite } = require("../DB_connection");
//!----------------------------------------------------+/

const postFav = async (req, res) => {
  const { id, name, origin, status, image, species, gender } = req.body;

  try {
    if (!id || !name || !origin || !status || !image || !species || !gender) {
      return res.status(401).json({ error: "Data is missing" });
    }
    const [created] = await user_favorite.findOrCreate({
      where: {
        id,
        name,
        origin,
        status,
        image,
        species,
        gender,
      },
    });
    if (!created)
      return res
        .status(400)
        .json({ message: "This character has already been added" });
    const allFavs = await user_favorite.findAll();
    return res.status(200).json(allFavs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postFav;
