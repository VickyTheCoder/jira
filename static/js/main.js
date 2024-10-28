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

// For project Details
function project_details(){
    var name=$('#name').val();
    var description=$('#desc').val(); 
    var count =$('#count').val();
    var pid=$('#pid').val();
    var budget=$('#budget').val();

    $('#members_add').show();
    $('#project_add').hide();
    
    var data={
        'name':name,
        'description':description,
        'count':count,
        'pid':pid,
        'budget':budget,
    }
    console.log(data);

    $.ajax({
        'url':'/project/details',
        'type':'POST',
        'data':data,
        'headers':{'X-CSRFToken':$('meta[name="csrf_token"]').attr('content')},
        'success':function(response){
            $('#status').text(response['status'])
        },
        'error':function(xhr, status, error){
            var msg = JSON.parse(xhr.responseText);
            $('#status').text(status +':'+ error +':'+ msg.error)
        },
    })
} 

// function for check valid project id and get members
function check_project_id(){
    console.log("helo");
    var project_id = $('#tid').val();
    console.log(project_id);
    alert(project_id+"--------");
    $.ajax({
        url:'project/team',
        type: 'POST',
        headers:{'X-CSRFToken':$('meta[name="csrf_token"]').attr('content')},
        data: {'project_id': project_id},
        success: function(response){

            $('#email2').empty().append('<option value="">-- Select Email --</option>');
                        // Loop through the user_emails from the response
                        $.each(response.user_email, function(index, email) {
                            $('#email2').append($('<option>', {
                                value: email,
                                text: email
                            }));
                        });
        },
        error:function(xhr, status, error){
            $('#email2').empty().append('<option value="">-- Select Email --</option>');
            var msg=JSON.parse(xhr.responseText);
            $('#status').text(status+":"+error+":"+msg.status)
        }
    })
}

// To save team member data in DB
function team_member(){
    var mname=$('#mem_name').val();
    var position=$('#position').val();
    var email=$('#email2').val();
    var tid=$('#tid').val();
    var mobile=$('#number').val();

    var data={
        'mname':mname,
        'position':position,
        'email':email,
        'id':tid,
        'mobile':mobile,
    }
    console.log(data,44444444444);
    $.ajax({
        'url':'project/team/save',
        'type':'POST',
        'data':data,
        'headers':{'X-CSRFToken':$('meta[name="csrf_token"]').attr('content')},
        'success':function(response){
            $('#status').text(response['status'])
        },
        'error':function(xhr,status,error){
            var msg=JSON.parse(xhr.responseText);
            $('#status').text(status+":"+error+":"+msg.status)
        }
    })
}

// to get username after selecting email
function user_details(){
    var selected_email=$('#email2').val();
    console.log(selected_email);

    
    $.ajax({
        'url':'project/data',
        'type':'POST',
        'headers':{'X-CSRFToken':$('meta[name="csrf_token"]').attr('content')},
        'data':{'selected_email':selected_email},
        'success':function(response){
            $('#mem_name').val(response['name'])
            // $('#position').val(response['position'])
            $('#number').val(response['number'])
        },
        'error':function(xhr,status,error){
            var msg=JSON.parse(xhr.responseText);
            $('#status').text(status+":"+error+":"+msg.status)
        }
    })
}