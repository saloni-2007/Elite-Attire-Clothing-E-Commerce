function asyncHandler(fn){
    return function(req,res,next){
        try{
           fn(req,res,next);
        }
        catch(err){
            console.log(err);
            res.status(500).send({
                success:false,
                message:"Internal server Error",
                error: err.message,
                
            });

        }
    };
}
module.exports=asyncHandler;