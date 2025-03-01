const getHome = async (req, res) => {
  try {
    res.json({message: "Welcome Home"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
    getHome
};