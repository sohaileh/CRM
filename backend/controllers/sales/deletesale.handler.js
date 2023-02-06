const { Sale } = require("../../model");
const deleteSale = async (req, res, next) => {
  try {
    const result=await Sale.deleteOne({_id:req.params.sell_id});
    if(result.deletedCount===0){
      return next(new Error("Something went wrong please refresh the page"));
    }
  } catch (error) {
    return next(error);
  }
  res.status(200).json({message:`Sale having sell id : ${req.params.sell_id} deleted successfully`});
  }
module.exports = deleteSale;