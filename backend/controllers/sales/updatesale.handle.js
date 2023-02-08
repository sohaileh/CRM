const { Sale } = require("../../model");
const CustomErrorHandler = require("../../services/customErrorHandler");
const editSale = async (req, res, next) => {
    const { vehicle_no, fullName, email, phone_no, address, postal_code, sold_date, sold_amount, balance_amount, documents } = req.body;
    try {
       const result= await Sale.updateOne({ vehicle_no: vehicle_no }, {
            fullName, email, phone_no, address, postal_code, sold_date, sold_amount, balance_amount,
            documents: {
                adhaar_card: documents[0],
                agreement: documents[1]
            }
        });
        
        if(result.modifiedCount===0){
            return next(CustomErrorHandler.noChanges("No changes detected! sale is not modified"));
        }
    } catch (error) {
        return next(error);
    }
    res.status(201).json({ message: `Sale having vehicle no: ${vehicle_no} updated successfully` });
}
module.exports = editSale;