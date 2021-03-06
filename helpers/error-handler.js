module.exports =  function errorHandler(err, req, res, next) {
    if(err.name === 'Unauthorized'){
        return res.status(401).json({message: "No authorization token was found"});
    }
    if(err.name === 'ValidationError'){
        return  res.status(401).json({message: err });
    }

    return res.status(500).json({message: err });
}