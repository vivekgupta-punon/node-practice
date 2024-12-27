function updateSelections()
{
    $.ajax({
        url: API_URL + 'user/get-user-enums',
        type: 'GET',
        success: function(response){
            if(response.roles)
            {
                var roles = response.roles;
                var select = $('#new-user-form-roles');
                select.append('<h5 for="roles">Roles</h5>');
                for(let [key, value] of Object.entries(roles))
                {
                    select.append(`
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="role" id="role-${key}" value="${key}">
                            <label class="form-check-label" for="role-${key}">${value}</label>
                        </div>
                    `);
                }
                $('#new-user-form-roles').show();
            }
            if(response.departments)
            {
                var departments = response.departments;
                var select = $('#new-user-form-departments');
                select.append('<h5 for="departments">Departments</h5>');
                for(let [key, value] of Object.entries(departments))
                {
                    select.append(`
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="department" id="department-${key}" value="${key}">
                            <label class="form-check-label" for="department-${key}">${value}</label>
                        </div>
                    `);
                }
                $('#new-user-form-departments').show();
            }
        },
        error: function(){
            // alert('Error: Something went wrong');
        }
    });
}

$(function(){

    updateSelections();
    
    $('#new-user-form-submit').click(function(e){
        e.preventDefault();
        
        var form                = $('#new-user-form');
        let firstName           = $('#new-user-form-first-name').val();
        let lastName            = $('#new-user-form-last-name').val();
        let email               = $('#new-user-form-email').val();
        let mobile              = $('#new-user-form-mobile').val();
        let password            = $('#new-user-form-password').val();
        let confirmPassword     = $('#new-user-form-confirm-password').val();
        let role                = $('#new-user-form-roles input:checked').val();
        let department          = $('#new-user-form-departments input:checked').val();

        
        $.ajax({
            url: API_URL + 'user/create',
            type: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                first_name      : firstName,
                last_name       : lastName,
                email           : email,
                mobile          : mobile,
                password        : password,
                confirm_password: confirmPassword,
                role            : role,
                department      : department
            },
            success: function(response){
                if(response.success)
                {
                    alert('User created successfully');
                    window.location.href = '/user';
                }
                else
                {
                    alert('Error: ' + response.message);
                }
            },
            error: function(){
                alert('Error: Something went wrong');
            }
        });
    });

});