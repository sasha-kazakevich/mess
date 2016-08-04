var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.home);
	app.get('/technology', routes.views.technology);
	app.get('/kinds', routes.views.characteristicsKinds);
	app.get('/advantages', routes.views.characteristicsAdvantages);
	app.get('/options', routes.views.characteristicsOptions);
	app.get('/functions', routes.views.characteristicsFunction);
	app.get('/clients', routes.views.clients);
	app.get('/contacts', routes.views.contacts);
	app.post('/contacts/send', routes.views.contactsSend);
	app.get('/thank', routes.views.thank);
	app.get('/about', routes.views.about);
	app.get('/news', routes.views.news);


};
