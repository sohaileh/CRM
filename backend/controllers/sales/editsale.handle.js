const { Sale, SaleDocuments } = require("../../model");
const editSale = async (req, res, next) => {
    const { vehicle_no, fullName, email, phone_no, address, postal_code, sold_date, sold_amount, balance_amount } = req.body;
    try {
        await SaleDocuments.updateOne({ _id: req.params.doc_id }, { "documents": req.body.documents }, async (err, resl) => {
            if (err) {
                return next(err);
            }
            try {
                await Sale.updateOne({ vehicle_no: vehicle_no }, {
                    fullName, email, phone_no, address, postal_code, sold_date, sold_amount, balance_amount
                }, (err, _) => {
                    if (err) {
                        return next(err)
                    }
    res.status(201).json({ message: `Sale having vehicle no: ${vehicle_no} updated successfully` });
                }).clone();
            } catch (err) {
                return next(err);
            }
        }).clone();
    } catch (error) {
        return next(error);
    }
}
module.exports = editSale;