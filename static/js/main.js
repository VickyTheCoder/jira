function signup(){
    var userid = $('#userid').val();
    var pwd1 = $('#pwd1').val();
    var pwd2 = $('#pwd2').val();
    var email = $('#email').val();
    var mobile = $('#mobile').val(); 
    var data = {
        "userid":userid,
        "pwd1":pwd1,
        "pwd2":pwd2,
        "email":email,
        "mobile":mobile,
    }
    
    // ajax
    $.ajax({
        url:'/auth/signup',
        type:'POST',
        data:data,
        headers: {
            'X-CSRFToken': $('meta[name="csrf"]').attr('content')
        },
        success: function(response){
            $("#status").text(response['status']); 
        },
        error: function(xhr, status, err){
            var msg = JSON.parse(xhr.responseText);
            $("#status").text(status + ":" + err +":" + msg.error);  
        }
    })
}

function clear_all(){
    alert("Clear Clicked!!")
}

function login(){
    $('#signup').hide();
    $('#signin').show();
}

function user_login(){
    var user = $('#userlogin').val();
    var pass = $('#user_pwd').val();

    var data = {
        'username':user,
        'password':pass,
    }
    console.log(data);
    $.ajax({
        url:'auth/signin',
        type:'POST',
        data:data,
        headers:{'X-CSRFToken':$('meta[name="csrf"]').attr('content')},
        success:function(response){
            $("#status").text(response['status']);  
        },
        error: function(xhr, status, err){
            var msg = JSON.parse(xhr.responseText);
            $("#status").text(status + ":" + err +":" + msg.error);  
        }
    })
}
