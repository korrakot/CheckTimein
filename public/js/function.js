$( document ).ready(function() {
  $('.datepicker').datepicker({
    format: 'dd-mm-yyyy',
    language: "th"
  });
  $('#savedataintime').click(function(){
    swal({
      title: "ต้องการบันทึกเวลาหรือไม่?",   
      text: "",   
      type: "warning",
      showCancelButton: true,   
      confirmButtonColor: "primary",  
      confirmButtonText: "บันทึก", 
      cancelButtonText:'ยกเลิก',  
      closeOnConfirm: false 
     }, function(){
      var name =  $('#dataselectName').val();
      var dataTime = $('#dataTime').html();
      var dataDate = $('#dataDete').html();
      // 05-10-2016 datebase 2016-10-05
      $.post( "/insertTime", { "name": name, 'time': dataTime, 'date': dataDate,}).done(function( data ) {
        if (data == "OK") {
          swal({
            title: "บันทึกเรียบร้อยแล้ว",   
            text: "",   
            type: "success",   
          },function(){
            window.location.reload(); 
          });
        }else if(data == "UPDATE"){
          swal({
            title: "แก้ไขเรียบร้อยแล้ว",   
            text: "",   
            type: "success",   
          },function(){
            window.location.reload(); 
          });
        } else{
          swal("ผิดพลาด");
        }
      });
    });
  });

var pro = null;
var table = "";
var countscorll = 0;

$.get("/selectdata", function(data){
  $.each(data,function(i,v){
    pro += '<option value="'+ v.id +'">'+v.sex+''+v.name+' '+v.surname+' &nbsp &nbsp '+v.university+'</option>';
  });
  $("#dataselectName").append(pro);
});


$.get("/getdata", function(data){
  $.each(data,function(i,v){
    $("#dataprofile").append(v.table);
    countscorll+=1;
  });
  
});

$(".searchdatadatesubmit").click(function(){
  $.get("/search",{"date":$(".searchdatadate").val(),"dateEnd":$(".searchdatadateEnd").val(),"name":$("#dataselectName").val()}).done(function(data){
    $("#dataprofile").html(data);
  });
});

$(".searchdatadate").change(function(e){
  $(".searchdatadateEnd").val($(this).val());
});

function timedUpdate () {
      updateClock();
      setTimeout(timedUpdate, 1000);
}
function updateClock(){
  var date = moment().format('DD/MM/YYYY');
  var time = moment().format('HH:mm:ss');
  $('#dataTime').html(time);
  $('#dataDete').html(date);
}
timedUpdate();


$(window).scroll(function(){
  if($("#dataselectName").val() == "" && $(".searchdatadate").val()==""){
    if($(window).scrollTop()+$(window).height()==$(document).height()){
      $.get("/getdataSC",{ 'limit':countscorll }).done(function( data ) {
        $.each(data,function(i,v){
          $("#dataprofile").append(v.table);
          countscorll+=1;
        });
      });
    }}
  });
});

$( document ).ready(function() {
    $('#clickLogin').click(function(e){
      if($('#email').val() != "" && $('#password').val() != ""){
        $.ajax({
          type: "POST",
          url: 'login',
          data: {email:$('#email').val(),password:$('#password').val()},
          success: function(data){
            if(data=='ok'){
                alert("Login Success.");
                location.reload();
            }else{
              alert("Email or Password is incorrect.");
            }
          }
        });
      }
    });
    $('#clickLogout').click(function(e){
      $.get( "/logout", function( data ) {
        if(data=='ok'){
              location.reload();
        }
      });
    });

    // val
    var Frommail = false;
    var Fromarticle = false;
    var Fromname = false;
    var Fromsurname = false;
    var FromUniversity = false;
    var Frompassword = false;

    // check mail
    $('#FormuserEmail').on('keyup',function(){
      Frommail = false;
      var me = $(this);
      var error = $('#errorFormuserEmail');
      error.css('visibility','hidden');
      error.html('');
      var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      if(me.val()!==''){
        if(filter.test(me.val())){
          Frommail = true;
          error.css('visibility','hidden');
          error.html('');
        }else{
          error.css('visibility','visible');
          error.html('รูปเเบบ "อีเมล์" ไม่ถูกต้อง');
        }
      }else{
        error.css('visibility','visible');
        error.html('"อีเมล์" ไม่ควรเป็นค่าว่าง');
      }
    });

    // check article
     $('#Formuserarticle').on('keyup',function(){
      Fromarticle = false;
      var me = $(this);
      var error = $('#errorFormuserarticle');
      error.css('visibility','hidden');
      error.html('');
      if(me.val()!==''){
        if(me.val()=='นาย' || me.val()=='นาง' || me.val()=='นางสาว'){
          Fromarticle = true;
          error.css('visibility','hidden');
          error.html('');
        }else{
          error.css('visibility','visible');
          error.html('รูปเเบบ นาย,นาง,นางสาว');
        }
      }else{
        error.css('visibility','visible');
        error.html('"คำนำหน้า" ไม่ควรมีช่อว่าง');
      }
    });

     // check name
     $('#FormuserName').on('keyup',function(){
      Fromname = false;
      var me = $(this);
      var error = $('#errorFormuserName');
      error.css('visibility','hidden');
      error.html('');
      var filter=/^[a-zA-Zก-๙]*$/;
      if(me.val()!==''){
        Fromname = true;
        if(filter.test(me.val())){
          error.css('visibility','hidden');
          error.html('');
        }else{
          error.css('visibility','visible');
          error.html('รูปเเบบ "ชื่อ" ไม่ถูกต้อง');
        }
      }else{
        error.css('visibility','visible');
        error.html('"ชื่อ" ไม่ควรมีช่อว่าง');
      }
    });

    // check surname
     $('#FormuserSurName').on('keyup',function(){
       Fromsurname = false;
      var me = $(this);
      var error = $('#errorFormuserSurName');
      error.css('visibility','hidden');
      error.html('');
      var filter=/^[a-zA-Zก-๙]*$/;
      if(me.val()!==''){
        if(filter.test(me.val())){
          Fromsurname = true;
          error.css('visibility','hidden');
          error.html('');
        }else{
          error.css('visibility','visible');
          error.html('รูปเเบบ "นามสกุล" ไม่ถูกต้อง');
        }
      }else{
        error.css('visibility','visible');
        error.html('"นามสกุล" ไม่ควรมีช่อว่าง');
      }
    });

    // check University
     $('#FormuserUniversity').on('keyup',function(){
       FromUniversity = false;
      var me = $(this);
      var error = $('#errorFormuserUniversity');
      error.css('visibility','hidden');
      error.html('');
      var filter=/^[a-zA-Zก-๙]*$/;
      if(me.val()!==''){
        if(filter.test(me.val())){
          FromUniversity = true;
          error.css('visibility','hidden');
          error.html('');
        }else{
          error.css('visibility','visible');
          error.html('รูปเเบบ "มหาวิทยาลัย" ไม่ถูกต้อง');
        }
      }else{
        error.css('visibility','visible');
        error.html('"มหาวิทยาลัย" ไม่ควรมีช่อว่าง');
      }
    });

    // check password
     $('#Formuserpassword').on('keyup',function(){
       Frompassword = false;
      var me = $(this);
      var error = $('#errorFormuserpassword');
      error.css('visibility','hidden');
      error.html('');
      var filter=/^[a-zA-Zก-ฮ0-9]*$/;
      if(me.val()!==''){
        if(filter.test(me.val())){
          Frompassword = true;
          error.css('visibility','hidden');
          error.html('');
        }else{
          error.css('visibility','visible');
          error.html('ไม่ถูกต้อง');
        }
      }else{
        error.css('visibility','visible');
        error.html('"password" ไม่ควรมีช่อว่าง');
      }
    });

   $("#AddSaveUser").click(function(){
     if(Frommail == true && Fromarticle == true && Fromname == true && Fromsurname == true && FromUniversity == true && Frompassword == true ){
       var data = {
         'sex':$('#Formuserarticle').val(),
         'Name':$('#FormuserName').val(),
         'Surname':$('#FormuserSurName').val(),
         'University':$('#FormuserUniversity').val(),
         'Email':$('#FormuserEmail').val(),
         'password':$('#Formuserpassword').val()
       };
        $.post('/Adduser',data).done(function( data ) {
          if(data=='ok'){
            location.reload();
          }
       });
     }else{
       alert("ข้อมูลไม่ครับ หรือ ข้อมูลบางอย่างไม่ถูกต้อง");
     }
   });
});








