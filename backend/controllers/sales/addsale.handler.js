const { Sale } = require("../../model");
const CustomErrorHandler = require("../../services/customErrorHandler");
const addSale = async (req, res, next) => {
    const existingSale = await Sale.exists({ vehicle_no: req.body.vehicle_no });
    if (existingSale) {
        return next(CustomErrorHandler.saleAlreadyExists(`Existing sale found for vehicle no: ${req.body.vehicle_no.toUpperCase()}`));
    }
    const { vehicle_no, fullName, email, phone_no, address, postal_code, sold_date, sold_amount, balance_amount, documents } = req.body;
    const sale = new Sale({
        vehicle_no, fullName, email, phone_no, address, postal_code, sold_date, sold_amount, balance_amount,
        documents: {
            adhaar_card: documents[0],
            agreement: documents[1]
        }
    });

    try {
        await sale.save(async (err, rest) => {
            if (err) {
                return next(err);
            }
        });
    } catch (error) {
        return next(err)
    }
    res.status(201).json({ message: `Sale having vehicle no: ${req.body.vehicle_no} saved successfully` });
}
module.exports = addSale;