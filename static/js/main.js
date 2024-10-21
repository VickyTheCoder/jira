function signup(){
    var userid = $('#userid').val();
    var pwd1 = $('#pwd1').val();
    var pwd2 = $('#pwd2').val();
    var email = $('#email').val();
    var mobile = $('#mobile').val();

    var data = {
        'userid':userid,
        'pwd1':pwd1,
        'pwd2':pwd2,
        'email':email,
        'mobile':mobile,
    }

    $.ajax({
        'url':'auth/signup',
        'type': 'POST',
        'data':data,
        'headers': {
            'X-CSRFToken': $('meta[name="csrf_token"]').attr("content")
            },
        'success': function(response){
            $('#status').text(response['status']);
            $('#signup').hide(100);
            $('#signin').show(150);
        },
        'error':function(xhr, status, error){
            var msg = JSON.parse(xhr.responseText);
            $('#status').text(status +':'+ error +':'+ msg.error);
        }  
    })
}

function show_signin(){
    $('#signup').hide(100);
    $('#signin').show(150);

}

function signin(){
    var user = $('#username').val();
    var pwd = $('#password').val();
    var data = {
        'username':user,
        'password':pwd,
    };
    var headers = $('meta[name="csrf_token"]').attr('content');

    $.ajax({
        url:'auth/signin',
        type:'POST',
        headers:headers,
        data:data,
        success:function(response){
            $('#sigin').hide(100);
            $('#footer').hide(100);
            $('#status').hide(100);
            $('#homepage').show(150);
        }
    })
}


function clear_all(){
    alert("Clear Clicked!!")
}

