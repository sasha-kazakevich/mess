// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

keystone.init({
	'name': 'messka',
	'brand': 'messka',

	'stylus': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});
keystone.import('models');
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});
keystone.set('routes', require('./routes'));
keystone.set('nav', {
	// posts: ['posts', 'post-categories'],
	// enquiries: 'enquiries',
	users: 'users',
	news: 'news'
});

keystone.set('cloudinary config', require('./config/cloudinary').url );

// optional, will prefix all built-in tags with 'keystone_'
//keystone.set('cloudinary prefix', 'keystone');

// optional, will prefix each image public_id with [{prefix}]/{list.path}/{field.path}/
keystone.set('cloudinary folders', true);

// optional, will force cloudinary to serve images over https
keystone.set('cloudinary secure', true);

keystone.start();
