var keystone = require('keystone');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

exports = module.exports = function(req,res) {
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      auth: {
        user: 'messka.rebis@gmail.com',
        pass: 'rf;lsqj[jnybr'
      }
    })
  );

  var mainOptions = {
    from: req.body.name + '' + req.body.email,
    to: 'S2601995@yandex.ru',
    subject: 'Website Messka',
    text: 'New text Name: ' + req.body.name + ' Email ' + req.body.email + ' number ' + req.body.number + ' message ' + req.body.message,
    html: '<p>Отправка с формы Messka</p><ul><li>Имя: '+req.body.name+'</li><li>Телефон: '+req.body.number+'</li><li>Email: '+req.body.email+'</li><li>Сообщение: '+req.body.message+'</li></ul>'
  };

  transporter.sendMail(mainOptions, function(error,info){
    if(error){
      console.log(error);
      res.redirect('/')
    } else {
      console.log("massege Sent" + info.response);
      res.redirect('/thank')
    }
  });
}
