var keystone = require('keystone');

exports = module.exports = function (req, res) {


	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	view.on('init',function(next){
		keystone.list('News').model.find().exec(function(err,result){
			if(result){
				if (result.length > 3) result = result.slice(-3)

				var formatter = new Intl.DateTimeFormat("ru");

					locals.newss = result.reverse().map(function(news){
						return {title: news.title,
										date: formatter.format(news.date),
										id: news.slug}
					});

					next(err);
			} else {
					res.redirect('/404');
			}
		});
	});

	view.render('home');
};
