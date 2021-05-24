const router = require('express').Router();

const routes = [
    'auth',
    'blogs',
    'category'
];


router.post('/',(req,res)=>{

})

module.exports = {
    init: function() {
        routes.forEach(route => {
            const defination = require(`./${route}`);
            // console.log(defination)
            router.use(defination.basePath, defination.router)
        });
        return router;
    }
}

