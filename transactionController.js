const Transaction = require("../models/Transaction");

exports.getHome = async (req, res) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  const total = transactions.reduce((acc, t) =>
    t.type === "income" ? acc + t.amount : acc - t.amount, 0);
  res.render("index", { transactions, total });
};

exports.addTransaction = async (req, res) => {
  const { title, amount, type } = req.body;
  await Transaction.create({ title, amount: parseFloat(amount), type });
  res.redirect("/");
};

// exports.deleteTransaction = async (req, res) => {
//   await Transaction.findByIdAndDelete(req.params.id);
//   res.redirect("/");
// };
exports.deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;

    // Optionally validate ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Invalid ID format.");
    }

    await Transaction.findByIdAndDelete(id);
    res.redirect("/");
  } catch (err) {
    console.error("Delete Error:", err.message);
    res.status(500).send("Something went wrong while deleting.");
  }
};
