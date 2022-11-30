const service = require('./Service');

exports.get_HomePage = (req,res) => {
    const page = service.getByPage('home-page');
    res.render('products/home-page', page);
}
exports.get_Pages = (req,res) => {
    //res.render('products/list');
    res.render('products/' + req.params.slug);
}
exports.get_Page = (req, res) => {
    const pages = req.params.page;
    const page = service.getByPage(pages);
    res.render('products/' + pages, page); 
}
