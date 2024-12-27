async function updateTaskCreateForm()
{
    try
    {
        const response = await $.ajax({
            type: 'GET',
            url: API_URL + 'task/get-task-enums',
            headers: {
                "accessToken": getCookie('accessToken'),
                "refreshToken": getCookie('refreshToken')
            }
        });

        if(response)
        {
            for(let [key, value] of Object.entries(response.statuses))
            {
                $('#new-task-form-status').append(`<option value="${key}">${value}</option>`);
            }
            for(let [key, value] of Object.entries(response.priorities))
            {
                $('#new-task-form-priority').append(`<option value="${key}">${value}</option>`);
            }
        }
    }
    catch(error)
    {
        // console.log(error);
    }

}

async function updateUserSelections()
{
    try
    {
        const response = await $.ajax({
            type: 'GET',
            url: API_URL + 'user/',
            headers: {
                "accessToken": getCookie('accessToken'),
                "refreshToken": getCookie('refreshToken')
            }
        });

        if(response)
        {
            for(let [key, value] of Object.entries(response))
            {
                $('#new-task-form-assigned-to').append(`<option value="${value.id}">${value.first_name} ${value.last_name} (${value.department})</option>`);
            }
        }
    }
    catch(error)
    {
        // console.log(error);
    }
}

$(function(){
    $( ".pending-task-container" ).sortable();
    $( ".in-progress-task-container" ).sortable();
    $( ".completed-task-container" ).sortable();
    $( ".tested-task-container" ).sortable();

    var quill = new Quill('#new-task-form-content', {
        theme: 'snow'
    });


    
    updateTaskCreateForm();
    updateUserSelections();


    $('#new-task-form-submit').click(function(e){
        e.preventDefault();

        let form        = $(this).closest('form');
        let title       = form.find('#new-task-form-title').val();
        let content     = quill.getSemanticHTML();
        let priority    = form.find('#new-task-form-priority').val();
        let status      = form.find('#new-task-form-status').val();
        let assignedTo  = form.find('#new-task-form-assigned-to').val();
        let deadline    = form.find('#new-task-form-expires').val();


        $.ajax({
            type: 'POST',
            url: API_URL + 'task/create',
            headers: {
                // "Content-Type": "application/json",
                "accessToken": getCookie('accessToken'),
                "refreshToken": getCookie('refreshToken')
            },
            data: {
                title       : title,
                content     : content,
                priority    : priority,
                status      : status,
                assigned_to : assignedTo,
                deadline    : deadline,
            },
            success: function(response){
                if(response.status == 200)
                {
                    alert(response.message);
                    window.location.reload();
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