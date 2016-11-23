var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment = require('moment');

var connect = mysql.createPool({
	connectionLimit : 100,
  	connectTimeout  : 50000,
  	host: "localhost",
	user: "root",
	password: "",
	database: "checkintime",
	charset: "utf8_general_ci"
});

var data ="";
var name = "";

 

/* GET home page. */
router.get('/', function(req, res, next) {
  var sess = (typeof req.session.success=='undefined' ||req.session.success=='' ) ? [{'id':'','status':''}] : req.session.success;
  console.log(sess[0].id);
  if(sess[0].id){
    connect.query("SELECT * FROM profile where id='"+sess[0].id+"'",function(err,res){
      for(var i=0; i<res.length; i++ ){
          name = res[i].name+' '+res[i].surname;
      }
        
     });
     
  }
  
  res.render('index', { title: 'บันทึกรายวัน', 'sess':sess, 'name':name });
});


router.get('/selectdata', function(req, res){
      connect.getConnection(function(err,connection) {
        connect.query("SELECT * FROM profile",function(err,result){
          data = result;
          res.json(data);
      });
  });
});


router.post('/insertTime', function(req,res){
  var datetime = moment(req.body.date+' '+req.body.time, 'DD-MM-YYYY HH:mm:ss').format('DD/MM/YYYY HH:mm:ss');
  var date = moment(datetime, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
  var then = datetime;
  var datenow = moment().format('DD/MM/YYYY');
  var now = moment(datenow+' '+'10:05:00','DD/MM/YYYY HH:mm:ss').format('DD/MM/YYYY HH:mm:ss'); 
  if (then > now ) {
    var timelate = moment.duration(moment.utc(moment(then,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")).asMinutes()
  }else{
    var timelate = "";
  }
  var insert = { 
    time: date, 
    profile_id: req.session.success[0].id,
    timelate : timelate
  };
  var update = [req.body.time, req.session.success[0].id];
  var from = moment(datetime, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD');
  connect.query("SELECT * FROM dataday where profile_id='"+req.session.success[0].id+"' AND time LIKE '"+from+"%'",function(err,result){
  // connect.query("SELECT * FROM dataday where profile_id = ? AND time LIKE = ? ",[req.session.success[0].id,'2016-11-18 10:53:43'],function(err,result){
    // console.log(result);
    if (result=='') {
      connect.query('INSERT INTO dataday SET ?', insert, function(err,resinsert){
        res.send('OK');  
      });
    }else{
      connect.query("UPDATE dataday SET timeout = ? where profile_id = ? AND time LIKE '"+from+"%'", update, function(err,resinsert){
        res.send('UPDATE');
      });
    }
  });
});

router.get('/getdata', function(req, res){
      connect.getConnection(function(err,connection) {
        var table =""; var json = [];
        connect.query("SELECT * FROM dataday JOIN profile ON id = dataday.profile_id ORDER BY id_dataDAY DESC LIMIT 0,15",function(err,result){
            result.forEach(function(v,i,arr){
              var timelate = v.timelate == 0? '<td class="text-center"><span>'+v.timelate+' นาที</span></td>':'<td class="text-center"><span style="color:red;">'+v.timelate+' นาที</span></td>';
              // var date = v.time = v.time? '<td class="text-center">วันนี้</td>':'<td class="text-center">'+moment(v.time).format('DD-MM-YYYY')+'</td>'
              table += '<tr>';
              table += '<th class="text-center">'+(i+1)+'</th>'
              table += '<td class="text-center">'+v.sex+''+v.name+' '+v.surname+'</td>'
              table += '<td class="text-center">'+moment(v.time).format('DD-MM-YYYY')+'</td>'
              table += '<td class="text-center">'+moment(v.time).format('HH:mm:ss')+'</td>'
              table += '<td class="text-center">'+v.timeout+'</td>'
              table += timelate;
              table += '<td class="text-center">'+v.timelate*5+' บาท</td>'
              table += '</tr>';
              json.push({'table':table});
              table ="";
            });
          res.json(json);
      });
  });
});

router.get('/getdataSC', function(req, res){
      connect.getConnection(function(err,connection) {
        var table =""; var json = []; var num = +req.query.limit;
        connect.query("SELECT * FROM dataday JOIN profile ON id = dataday.profile_id ORDER BY id_dataDAY DESC LIMIT "+req.query.limit+",15",function(err,result){
            result.forEach(function(v,i,arr){
              var timelate = v.timelate == 0? '<td class="text-center"><span>'+v.timelate+' นาที</span></td>':'<td class="text-center"><span style="color:red;">'+v.timelate+' นาที</span></td>';
              table += '<tr>';
              table += '<th class="text-center">'+(num+=1)+'</th>'
              table += '<td class="text-center">'+v.sex+''+v.name+' '+v.surname+'</td>'
              table += '<td class="text-center">'+moment(v.time).format('DD-MM-YYYY')+'</td>'
              table += '<td class="text-center">'+moment(v.time).format('HH:mm:ss')+'</td>'
              table += '<td class="text-center">'+v.timeout+'</td>'
              table += timelate;
              table += '<td class="text-center">'+v.timelate*5+' บาท</td>'
              table += '</tr>';
              json.push({'table':table});
              table ="";
            });
          res.json(json);
      });
  });
});


router.get('/search', function(req, res){
  if(req.query.date != '' && req.query.dataEnd != ''){
    var dateNow = moment(req.query.date, 'DD-MM-YYYY').format('YYYY-MM-DD')+ ' 00:00:00';
    var dateLast = moment(req.query.dateEnd, 'DD-MM-YYYY').format('YYYY-MM-DD')+ ' 23:59:59';
        connect.getConnection(function(err,connection) {
          var table ="";
            var  user = req.query.name ;
            var sql ='';
            if(user!=''){
              sql = "SELECT * FROM dataday JOIN profile ON id = dataday.profile_id where profile.id='"+user+"' AND time between '"+dateNow+"%' AND '"+dateLast+"' ORDER BY id_dataDAY DESC";
            }else{
              sql = "SELECT * FROM dataday JOIN profile ON id = dataday.profile_id where time between '"+dateNow+"%' AND '"+dateLast+"' ORDER BY id_dataDAY DESC";
            }
          connect.query(sql,function(err,result){
            result.forEach(function(v,i,arr){
              var timelate = v.timelate == 0? '<td class="text-center"><span>'+v.timelate+' นาที</span></td>':'<td class="text-center"><span style="color:red;">'+v.timelate+' นาที</span></td>';
              table += '<tr>';
              table += '<th class="text-center">'+(i+1)+'</th>'
              table += '<td class="text-center">'+v.sex+''+v.name+' '+v.surname+'</td>'
              table += '<td class="text-center">'+moment(v.time).format('DD-MM-YYYY')+'</td>'
              table += '<td class="text-center">'+moment(v.time).format('HH:mm:ss')+'</td>'
              table += '<td class="text-center">'+v.timeout+'</td>'
              table += timelate;
              table += '<td class="text-center">'+v.timelate*5+' บาท</td>'
              table += '</tr>';
            });
          res.send(table);
      });
  });
  }else{
    connect.getConnection(function(err,connection) {
      var table ="";
       var  user = req.query.name ;
            var sql ='';
            if(user!=''){
              sql = "SELECT * FROM dataday JOIN profile ON id = dataday.profile_id where profile.id='"+user+"' ORDER BY id_dataDAY DESC"
            }else{
              sql = "SELECT * FROM dataday JOIN profile ON id = dataday.profile_id ORDER BY id_dataDAY DESC"
            }
        connect.query(sql,function(err,result){
          result.forEach(function(v,i,arr){
            var timelate = v.timelate == 0? '<td class="text-center"><span>'+v.timelate+' นาที</span></td>':'<td class="text-center"><span style="color:red;">'+v.timelate+' นาที</span></td>';
            table += '<tr>';
            table += '<th class="text-center">'+(i+1)+'</th>'
            table += '<td class="text-center">'+v.sex+''+v.name+' '+v.surname+'</td>'
            table += '<td class="text-center">'+moment(v.time).format('DD-MM-YYYY')+'</td>'
            table += '<td class="text-center">'+moment(v.time).format('HH:mm:ss')+'</td>'
            table += '<td class="text-center">'+v.timeout+'</td>'
            table += timelate;
            table += '<td class="text-center">'+v.timelate*5+' บาท</td>'
            table += '</tr>';
          });
        res.send(table);
      });
    });
  }
});


router.post('/login', function(req,res){
  var data = {
    email: req.body.email,
    pass: req.body.password
  };
  connect.getConnection(function(err,connection) {
    var count = 0;
    connect.query("SELECT * FROM profile WHERE email='"+req.body.email+"' AND password='"+req.body.password+"'",function(err, results){
      for(var i=0; i<results.length; i++ ){
        if(req.body.email==results[i].email && req.body.password==results[i].password){
          req.session.success = [{'id':results[i].id,'status':results[i].status}];
          count++;
        }
      }
      if(count == 0){
        res.send('fail');
      }else{
        res.send('ok');
      }
    });
  });
});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
      res.send('ok');
});

router.post('/Adduser', function(req,res){
  console.log(req.body);
  var data = { 
    sex: req.body.sex,
    name: req.body.Name, 
    surname: req.body.Surname,
    university: req.body.University,
    email: req.body.Email,
    password: req.body.password
     };
    connect.query('INSERT INTO profile SET ?', data, function(err,result){
      res.send('ok');
    });
});

module.exports = router;


