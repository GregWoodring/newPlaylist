module.exports = {
    userOnly: (req,res,next) => {
        console.log(req.session);
        if(req.session.user){
            console.log('user logged in');
            next();
        } else {
            res.send('Please log in').status(401);
        }
    }
}