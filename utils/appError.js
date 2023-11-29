class AppError extends Error {
    constructor(){
        super()
    }

    creat(message , statusCode , statusText){
        this.message = message;
        this.statusCode = statusCode;
        this.statusText = statusText;
        return this;
    }

}

module.exports = new AppError(); /* we export an instance of the module so when we 
                                    use is it we make an object from the creat() function */