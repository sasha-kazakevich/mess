var keystone = require('keystone');
var Intl = require('intl');

exports = module.exports = function (req, res) {


	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'news';

	view.on('init',function(next){
		keystone.list('News').model.find().exec(function(err,result){
			if(result){
				// var formatter = new Intl.DateTimeFormat("ru");

				var options = {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				};

					locals.newss = result.reverse().map(function(news) {
						return {title: news.title,
										date: new Intl.DateTimeFormat("ru-RU",options).format(news.date),
										short_news: news.content.short_news,
										images: news.content.images,
										full_news: news.content.full_news,
										id: news.slug
									}
					});

					next(err);
			} else {
					res.redirect('/404');
			}
		});
	});

	view.render('news');
};
