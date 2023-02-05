const {Sale,SaleDocuments}=require("../../model");
const CustomErrorHandler = require("../../services/customErrorHandler");
const addSale = async (req, res, next) => {
    const existingSale = await Sale.exists({ vehicle_no: req.body.vehicle_no });
    if (existingSale) {
        return next(CustomErrorHandler.saleAlreadyExists(`Existing sale found for vehicle no: ${req.body.vehicle_no.toUpperCase()}`));
    }
    const { vehicle_no, fullName, email, phone_no, address, postal_code, sold_date, sold_amount, balance_amount } = req.body;
    const saledocs = new SaleDocuments({
        documents: {
            adhaar_card: req.body.documents[0],
            agreement: req.body.documents[1],
        }
    });
    try {
        await saledocs.save(async (err, result) => {
            if (err) {
                return next(err);
            }
            const sale = new Sale({ document_id: result._id, vehicle_no, fullName, email, phone_no, address, postal_code, sold_date, sold_amount, balance_amount });

            try {
                await sale.save((err, rest) => {
                    if (err) {
                        return next(err)
                    }
                });
            } catch (error) {
                return next(err)
            }
        });

    } catch (err) {
        return next(err);
    }
    res.status(201).json({ message: `Sale having vehicle no: ${req.body.vehicle_no} saved successfully` });
}

module.exports = addSale;