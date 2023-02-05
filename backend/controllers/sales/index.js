const {getSaleDocs,getSales}=require("./getsales.handler");
require("../../services/db.connection");
const handle={
    addSale:require("./addsale.handler"),
    editSale:require("./editsale.handle"),
    deleteSale:require("./deletesale.handler"),
    getSales,
    getSaleDocs
}
module.exports=handle;