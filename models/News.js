var keystone = require('keystone');
var Types = keystone.Field.Types;

var News = new keystone.List('News', {
  map: { name: 'title'},
  autokey: {path: 'slug', from: 'title', unique: true}
});

News.add({
  title: { type: String, required: true},
  date: { type: Types.Date, default: Date.now, format: 'DD MMM YY'},
  content:{
    short_news: {type: Types.Html, wysiwyg: true, height: 100},
    images: { type: Types.CloudinaryImages, folder: 'news', label: "Images" },
    full_news: { type: Types.Html, wysiwyg: true, height: 150}
  }
});

News.schema.virtual('news.full').get(function(){
  return this.content.news;
});

News.defaultColumns = 'title';
News.register();
