class CustomErrorHandler extends Error{
    constructor(status,message){
        super();
        this.status=status;
        this.message=message;
    }
    static saleAlreadyExists(message){
        return new CustomErrorHandler(403,message)
    }
    static purchaseAlreadyExists(message){
        return new CustomErrorHandler(403,message)
    }
}
module.exports=CustomErrorHandler;