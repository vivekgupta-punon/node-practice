function setStatics()
{
    $.ajax({
        url: API_URL + 'app/get-statics',
        type: 'GET',
        headers: {
            "accessToken": getCookie('accessToken'),
            "refreshToken": getCookie('refreshToken')
        },
        success: function(response){
            if(response)
            {
                let total = response.pending + response.completed + response.tested;
                $('#total-task').text(total);
                $('#pending-task').text(response.pending);
                $('#completed-task').text(response.completed);
                $('#tested-task').text(response.tested);
            }
        },
        error: function(error){
            console.log(error);
        }
    });
}


function updateSelections()
{
    $.ajax({
        url: API_URL + 'user/get-user-enums',
        type: 'GET',
        success: function(response){
            if(response.roles)
            {
                var roles = response.roles;
                var select = $('#edit-user-form-roles');
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
                $('#edit-user-form-roles').show();
            }
            if(response.departments)
            {
                var departments = response.departments;
                var select = $('#edit-user-form-departments');
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
                $('#edit-user-form-departments').show();
            }
            if(response.statuses)
            {
                var statuses = response.statuses;
                var select = $('#edit-user-form-status');
                for(let [key, value] of Object.entries(statuses))
                {
                    select.append(`
                        <option value="${key}">${value}</option>
                    `);
                }
                $('#edit-user-form-status').show();
            }
        },
        error: function(){
            // alert('Error: Something went wrong');
        }
    });
}


async function getUser(id)
{
    if(!id)
        return false;

    let userModel = await fetch(API_URL + 'user/' + id, {
        method: 'GET',
        headers: {
            "accessToken": getCookie('accessToken'),
            "refreshToken": getCookie('refreshToken')
        }
    }).catch(error => console.log(error));
    
    if(!userModel)
        return false;
    
    return userModel.json();
}


function setUserList()
{
    $.ajax({
        url: API_URL + 'user/',
        type: 'GET',
        headers: {
            "accessToken": getCookie('accessToken'),
            "refreshToken": getCookie('refreshToken')
        },
        success: function(response){
            if(response)
            {
                let tableString = "";
                let addedOn = "";
                for(let [key, value] of Object.entries(response))
                {
                    addedOn = new Date(value.created_at).toDateString("en-CA");
                    tableString += `<tr>`;
                        tableString += `<td>${value.first_name} ${value.last_name}</td>`;
                        tableString += `<td>${value.email}</td>`;
                        tableString += `<td>${value.mobile}</td>`;
                        tableString += `<td>${value.role}</td>`;
                        if(value.status)
                        {
                            if(value.status == 'Active')
                                tableString += `<td><span class="badge bg-success">${value.status}</span></td>`;
                            else
                                tableString += `<td><span class="badge bg-danger">${value.status}</span></td>`;
                        }
                        tableString += `<td>${addedOn}</td>`;
                        tableString += `<td>
                                        <button type="button" id="edit-user-${value.id}" class="btn btn-link edit-user" user-id="${value.id}"><i class="bi bi-pencil-square text-info"></i></button>
                                        <button type="button" id="delete-user-${value.id}" class="btn btn-link delete-user" user-id="${value.id}"><i class="bi bi-trash text-danger"></i></button>
                                    </td>`;
                    tableString += `</tr>`;
                }
                $('#user-list').find('tbody').html(tableString);

                var table = new DataTable('#user-list', {
                                layout: {
                                    topStart: 'buttons'
                                },
                                // dom: 'Bfrtip',
                                buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
                                paging: true,
                                ordering: true,
                                search: true,
                                initComplete: function(){
                                    var api = this.api();
                                    $('#user-list thead tr')
                                        .clone(true)
                                        .addClass('filters')
                                        .appendTo('#user-list thead');

                                    api.columns().every(function(index){
                                        var column = this;
                                        $('thead tr.filters th')
                                                .eq(index)
                                                .html('<input type="text" placeholder="Search ' + $(column.header()).text() + '" style="width:100%" />')
                                                .find('input')
                                                .on('click', function (e) {
                                                    e.stopPropagation();
                                                })
                                                .on('keyup change clear', function () {
                                                    if (column.search() !== this.value) {
                                                        column.search(this.value).draw();
                                                    }
                                                });
                                    });
                                }
                            });

                $('.delete-user').click(function(e){
                    e.preventDefault();
            
                    let acknowledgement = confirm("Are you sure you want to delete this user?");
            
                    if(!acknowledgement)
                    {
                        return false;
                    }
                    
                    let id = $(this).attr('user-id');
                    $.ajax({
                        url: API_URL + 'user/delete',
                        type: 'POST',
                        headers: {
                            "accessToken": getCookie('accessToken'),
                            "refreshToken": getCookie('refreshToken')
                        },
                        data: {
                            id: id
                        },
                        success: function(response){
                            if(response)
                            {
                                setUserList();
                            }
                        },
                        error: function(error){
                            console.log(error);
                        }
                    });
                });

                $('.edit-user').click(function(e){
                    e.preventDefault();
                    
                    let id = $(this).attr('user-id');

                    getUser(id).then(user => {
                        if(user)
                        {
                            let editModal   = $('#edit-user-modal');
                            let form        = $(editModal).find('#edit-user-form');

                            $(form).attr('user-id', user.id);

                            $(form).find('#edit-user-form-first-name').val(user.first_name);
                            $(form).find('#edit-user-form-last-name').val(user.last_name);
                            $(form).find('#edit-user-form-designation').val(user.designation);
                            $(form).find('#edit-user-form-email').val(user.email);
                            $(form).find('#edit-user-form-mobile').val(user.mobile);
                            $(form).find('#edit-user-form-status').find(`option[value="${user.status}"]`).prop('selected', true);
                            $(form).find('#edit-user-form-manager').find(`option[value="${user.manager}"]`).prop('selected', true);
                            $(form).find('#edit-user-form-roles').find(`.form-check-input[value="${user.role}"]`).prop('checked', true);
                            $(form).find('#edit-user-form-departments').find(`.form-check-input[value="${user.department}"]`).prop('checked', true);

                            $(editModal).modal('show');
                        }
                    });

                });
            }
        },
        error: function(error){
            console.log(error);
        }
    });
}


function setMangers()
{
    $.ajax({
        url: API_URL + 'user/get-managers',
        type: 'GET',
        headers: {
            "accessToken": getCookie('accessToken'),
            "refreshToken": getCookie('refreshToken')
        },
        success: function(response){
            if(response)
            {
                for(let [key, value] of Object.entries(response))
                {
                    $('#edit-user-form-manager').append(`<option value="${value.id}">${value.first_name} ${value.last_name}</option>`);
                }
            }
        },
        error: function(error){
            console.log(error);
        }
    });
}

$(function(){
    setStatics();
    setUserList();
    updateSelections();
    setMangers();


    $('#edit-user-form-submit').click(function(e){
        e.preventDefault();

        let form            = $('#edit-user-form');
        let id              = $(form).attr('user-id');
        let firstName       = $('#edit-user-form-first-name').val();
        let lastName        = $('#edit-user-form-last-name').val();
        let designation     = $('#edit-user-form-designation').val();
        let email           = $('#edit-user-form-email').val();
        let mobile          = $('#edit-user-form-mobile').val();
        let status          = $('#edit-user-form-status').val();
        let manager         = $('#edit-user-form-manager').val();
        let role            = $('input[name="role"]:checked').val();
        let department      = $('input[name="department"]:checked').val();


        if(!firstName || !lastName || !designation || !email || !mobile || !status || !role || !department)
        {
            alert('Please fill all the required fields');
            return false;
        }

        $.ajax({
            type: 'POST',
            url: API_URL + 'user/update',
            headers: {
                "accessToken": getCookie('accessToken'),
                "refreshToken": getCookie('refreshToken')
            },
            data: {
                id          : id,
                first_name  : firstName,
                last_name   : lastName,
                designation : designation,
                email       : email,
                mobile      : mobile,
                status      : status,
                manager     : manager,
                role        : role,
                department  : department
            },
            success: function(response){
                if(response)
                {
                    alert(response.message);
                    $('#edit-user-modal').modal('hide');
                    // setUserList();
                    location.reload();
                }
            },
            error: function(error){ 
                console.log(error);
            }
        });
    });
});