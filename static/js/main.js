 
// signup page---------------------------------------------------------
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
            $('#footer').show(150);
        },
        'error':function(xhr, status, error){
            var msg = JSON.parse(xhr.responseText);
            $('#status').text(status +':'+ error +':'+ msg.error);
        }  
    })
}

// signin showing page-----------------------------------------------------------
function show_signin(){
    $('#signup').hide(100);
    $('#signin').show(150);
    $('#footer').show(150);

}

// signin page-------------------------------------------------------------------
function signin(){
    var user = $('#username').val();
    var pwd = $('#password').val();

    var data = {
        'username':user,
        'password':pwd,
    };
    var headers={'X-CSRFToken':$('meta[name="csrf_token"]').attr('content')};


    $.ajax({
        'url':'auth/signin',
        'type':'POST',
        'headers':headers,
        'data':data,
        'success':function(response){
            console.log(response);
            console.log(response['status']);
            $('#homepage').show();
            $('#status').text(response['status']);
            $('#signin').hide(100);
            $('#footer').hide(100);
            // $('#homepage').hide(150);
            // $('#status').hide(150);
            $('#sign_out').show(); 
            $('#project_add').show(150);
            if(response.username){
                $('#title').text("Jira" +" "+response.username);
                $('#hometext').text("Welcome to Jira"+" "+response.username);
            };
        },
        'error':function(xhr, status, error){
            var msg = JSON.parse(xhr.responseText);
            $('#status').text(status +':'+ error +':'+ msg.error)
        },
    })
}


function clear_all(){
    $('#username').val("");
    $('#password').val("");
}

// For project Details ------------------------------------------------------------
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

// function for check valid project id and get members------------------------------------------------
function check_project_id(){
    console.log("Initiating project ID check...");
    var project_id = $('#tid').val();
    console.log("Project ID:", project_id);

    $.ajax({
        url: 'project/team',
        type: 'POST',
        headers: {'X-CSRFToken': $('meta[name="csrf_token"]').attr('content')},
        data: {'project_id': project_id},
        success: function(response){
            $('#email2').empty().append('<option value="">-- Select Email --</option>');

            // Check the response format and contents
            console.log("Response received:", response);

            // Populate dropdown options
            $.each(response.user_email, function(email, username) {
                console.log("Adding email:", email, "with username:", username);
                
                // Append each email as an option with the email as both value and display text
                $('#email2').append($('<option>', {
                    value: email,
                    text: email
                }));
            });

            // Handle change event to update username in #mem_name on selection
            $('#email2').on('change', function() {
                var selectedEmail = $(this).val(); // Get the selected email
                console.log("Selected email:", selectedEmail);

                // Get the associated username for the selected email
                var username = response.user_email[selectedEmail];
                if (selectedEmail==""){
                    $('#mem_name').val("");
                    $('#status').text("Please selected a Email addresss");
                    $('#status').fadeOut(3000);
                }
                if (username) {
                    console.log("Setting username in #mem_name:", username);
                    $('#mem_name').val(username);
                } else {
                    console.log("No username found for selected email:", selectedEmail);
                }
            });
        },
        error: function(xhr, status, error){
            $('#email2').empty().append('<option value="">-- Select Email --</option>');
            var msg = JSON.parse(xhr.responseText);
            $('#status').text(status + ":" + error + ":" + msg.status);
        }
    });
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
        headers: {'X-CSRFToken': $('meta[name="csrf_token"]').attr('content')},
        'success':function(response){
            $('#status').text(response['status'])
            $('#status').show()
        },
        'error':function(xhr,status,error){
            var msg=JSON.parse(xhr.responseText);
            $('#status').text(status+":"+error+":"+msg.status)
        }
    })
}

// Logout function

function logout(){
    // console.log("headers"),

    $.ajax({
        'url':'user/logout',
        'type':'GET',
        'success':function(response){
            if(response.reload){
                location.reload()
            }
        },
        'error':function(xhr,status,error){
            var msg=JSON.parse(xhr.responseText);
            $('#status').text(status+":"+error+":"+msg.status);
        },
    })
}