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
                $('#edit-task-form-status').append(`<option value="${key}">${value}</option>`);
            }
            for(let [key, value] of Object.entries(response.priorities))
            {
                $('#new-task-form-priority').append(`<option value="${key}">${value}</option>`);
                $('#edit-task-form-priority').append(`<option value="${key}">${value}</option>`);
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
                $('#new-task-form-assigned-to').append(`<option value="${value.id}">${value.first_name} ${value.last_name}</option>`);
                $('#edit-task-form-assigned-to').append(`<option value="${value.id}">${value.first_name} ${value.last_name}</option>`);
            }
        }
    }
    catch(error)
    {
        // console.log(error);
    }
}


async function updateTaskList()
{
    try
    {
        const response = await $.ajax({
            type: 'GET',
            url: API_URL + 'task/get-all',
            headers: {
                "accessToken": getCookie('accessToken'),
                "refreshToken": getCookie('refreshToken')
            },
            success: function(response){
                if(response)
                {
                    let tempTask = '';
                    let deadline = '';
                    let level    = '';
                    if(response.pending)
                    {
                        tempTask = '';
                        deadline = '';
                        level    = '';
                        for(let [key, value] of Object.entries(response.pending))
                        {
                            deadline    = new Date(value.deadline).toLocaleDateString();
                            levelClass  = value.level == 'low' ? ('bg-secondary') : (value.level == 'medium' ? 'bg-info' : 'bg-danger'); 
                            tempTask += `<div class="pending-task-item task-items alert alert-light" style="padding:0;">`;
                                tempTask += `<div class="d-flex">`;
                                    tempTask += `<div class="p-2 w-100">`;
                                        tempTask += `<h5 class="pending-task-title">${value.title}</h5>`;
                                    tempTask += `</div>`;
                                    tempTask += `<div class="p-2 flex-shrink-1">`;
                                        tempTask += `<i class="bi bi-pencil-square edit-task" task-id="${value.id}"></i>`;
                                    tempTask += `</div>`;
                                tempTask += `</div>`;
                                tempTask += `<div class="d-flex justify-content-between">`;
                                    tempTask += `<span class="badge bg-light text-danger">${deadline}</span>`;
                                    tempTask += `<span class="badge rounded-pill ${levelClass}">${(value.level).toUpperCase()}</span>`;
                                    tempTask += `<span class="badge bg-light text-dark">By: ${value.createdBy.first_name}</span>`;
                                tempTask += `</div>`;
                                // tempTask += `<p class="pending-task-content">${value.content}</p>`;
                            tempTask += `</div>`;
                        }
                        $('.pending-task-container').html(tempTask);
                        $( ".pending-task-container").sortable();
                    }
                    if(response.in_progress)
                    {
                        tempTask = '';
                        deadline = '';
                        level    = '';
                        for(let [key, value] of Object.entries(response.in_progress))
                        {
                            deadline = new Date(value.deadline).toLocaleDateString();
                            levelClass  = value.level == 'low' ? ('bg-secondary') : (value.level == 'medium' ? 'bg-info' : 'bg-danger');
                                tempTask += `<div class="in-progress-task-item task-items alert alert-light" style="padding:0">`;
                                    tempTask += `<div class="d-flex">`;
                                    tempTask += `<div class="p-2 w-100">`;
                                        tempTask += `<h5 class="pending-task-title">${value.title}</h5>`;
                                    tempTask += `</div>`;
                                    tempTask += `<div class="p-2 flex-shrink-1">`;
                                        tempTask += `<i class="bi bi-pencil-square edit-task" task-id="${value.id}"></i>`;
                                    tempTask += `</div>`;
                                tempTask += `</div>`;
                                tempTask += `<div class="d-flex justify-content-between">`;
                                    tempTask += `<span class="badge bg-light text-danger">${deadline}</span>`;
                                    tempTask += `<span class="badge rounded-pill ${levelClass}">${(value.level).toUpperCase()}</span>`;
                                    tempTask += `<span class="badge bg-light text-dark">By: ${value.createdBy.first_name}</span>`;
                                tempTask += `</div>`;
                                // tempTask += `<p class="pending-task-content">${value.content}</p>`;
                            tempTask += `</div>`;
                        }
                        $('.in-progress-task-container').html(tempTask);
                        $( ".in-progress-task-container").sortable();
                    }
                    if(response.completed)
                    {
                        tempTask = '';
                        deadline = '';
                        level    = '';
                        for(let [key, value] of Object.entries(response.completed))
                        {
                            deadline = new Date(value.deadline).toLocaleDateString();
                            levelClass  = value.level == 'low' ? ('bg-secondary') : (value.level == 'medium' ? 'bg-info' : 'bg-danger');
                                tempTask += `<div class="completed-task-item task-items alert alert-light" style="padding:0">`;
                                    tempTask += `<div class="d-flex">`;
                                    tempTask += `<div class="p-2 w-100">`;
                                        tempTask += `<h5 class="pending-task-title">${value.title}</h5>`;
                                    tempTask += `</div>`;
                                    tempTask += `<div class="p-2 flex-shrink-1">`;
                                        tempTask += `<i class="bi bi-pencil-square edit-task" task-id="${value.id}"></i>`;
                                    tempTask += `</div>`;
                                tempTask += `</div>`;
                                tempTask += `<div class="d-flex justify-content-between">`;
                                    tempTask += `<span class="badge bg-light text-danger">${deadline}</span>`;
                                    tempTask += `<span class="badge rounded-pill ${levelClass}">${(value.level).toUpperCase()}</span>`;
                                    tempTask += `<span class="badge bg-light text-dark">By: ${value.createdBy.first_name}</span>`;
                                tempTask += `</div>`;
                                // tempTask += `<p class="pending-task-content">${value.content}</p>`;
                            tempTask += `</div>`;
                        }
                        $('.completed-task-container').html(tempTask);
                        $( ".completed-task-container").sortable();
                    }
                    if(response.tested)
                    {
                        tempTask = '';
                        deadline = '';
                        level    = '';
                        for(let [key, value] of Object.entries(response.tested))
                        {
                            deadline = new Date(value.deadline).toLocaleDateString();
                            levelClass  = value.level == 'low' ? ('bg-secondary') : (value.level == 'medium' ? 'bg-info' : 'bg-danger');
                            tempTask += `<div class="tested-task-item task-items alert alert-success" style="padding:0">`;
                                tempTask += `<div class="d-flex">`;
                                    tempTask += `<div class="p-2 w-100">`;
                                        tempTask += `<h5 class="pending-task-title">${value.title}</h5>`;
                                    tempTask += `</div>`;
                                    tempTask += `<div class="p-2 flex-shrink-1">`;
                                        tempTask += `<i class="bi bi-pencil-square edit-task" task-id="${value.id}"></i>`;
                                    tempTask += `</div>`;
                                tempTask += `</div>`;
                                tempTask += `<div class="d-flex justify-content-between">`;
                                    tempTask += `<span class="badge bg-light text-danger">${deadline}</span>`;
                                    tempTask += `<span class="badge rounded-pill ${levelClass}">${(value.level).toUpperCase()}</span>`;
                                    tempTask += `<span class="badge bg-light text-dark">By: ${value.createdBy.first_name}</span>`;
                                tempTask += `</div>`;
                                // tempTask += `<p class="pending-task-content">${value.content}</p>`;
                            tempTask += `</div>`;
                        }
                        $('.tested-task-container').html(tempTask);
                        $( ".tested-task-container").sortable();
                    }

                    $('.task-containers').sortable({
                        // connectWith: '.menu-gategories',
                        connectWith: '.task-containers',
                        // update: function(event, ui) {
                        //     var order = $(this).sortable('toArray');
                        //     console.log(order);
                        // }
                    }).disableSelection();


                    $('.edit-task').click(function(){
                        showUpdateForm($(this).attr('task-id'));
                    });
                }
            },
            error: function(){
                alert('Error: Something went wrong');
            }
        });
    }
    catch(error)
    {
        // console.log(error);
    }
}


function showUpdateForm(taskID)
{
    if(taskID)
    {
        $.ajax({
            url: API_URL + 'task/' + taskID,
            type: 'GET',
            headers: {
                "accessToken": getCookie('accessToken'),
                "refreshToken": getCookie('refreshToken')
            },
            success: function(response){
                if(response)
                {
                    let date        = new Date(response.deadline);
                    let editModal   = $('#edit-task-modal');

                    $(editModal).find('#edit-task-form-id').val(response.id);
                    $(editModal).find('#edit-task-form-title').val(response.title);
                    $(editModal).find('#edit-task-form-priority').find(`option[value="${response.level}"]`).prop('selected', true);
                    $(editModal).find('#edit-task-form-status').find(`option[value="${response.status}"]`).prop('selected', true);
                    $(editModal).find('#edit-task-form-assigned-to').find(`option[value="${response.user_id}"]`).prop('selected', true);
                    $(editModal).find('#edit-task-form-expires').val(date.toLocaleDateString('en-CA'));

                    $('#edit-task-form-content').find('.ql-editor').html(response.content);
                    // editTaskQuill.insertEmbed(response.content);
                    // editTaskQuill.quill.container.firstChild.innerHTML = response.content;

                    $(editModal).modal('show');
                }
                else
                {
                    console.log("response not found");
                }
            },
            error: function(error){
                alert("Something went wrong.");
            }
        });
    }
    else
    {
        alert("Something went wrong, Please try again!");
    }
}


$(function(){


    
    updateTaskCreateForm();
    updateUserSelections();
    updateTaskList();


    // $('.task-containers').sortable({
    //     // connectWith: '.menu-gategories',
    //     connectWith: '.task-containers',
    //     // update: function(event, ui) {
    //     //     var order = $(this).sortable('toArray');
    //     //     console.log(order);
    //     // }
    // }).disableSelection();


    // $('.task-items').sortable({
    //     connectWith: '.task-items',
    //     tolerance: 'pointer',
    //     helper: 'clone',
    //     placeholder: 'ui-state-highlight',
    //     forcePlaceholderSize: true,
    //     scroll: true,
    //     scrollSensitivity: 100,
    //     scrollSpeed: 100,
    //     start: function(event, ui) {
    //         ui.item.addClass('dragging');
    //     }
    // });


    var newTaskQuill = new Quill('#new-task-form-content', {
        theme: 'snow'
    });

    var editTaskQuill = new Quill('#edit-task-form-content', {
        theme: 'snow'
    });


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


    $('#edit-task-form-submit').click(function(e){
        e.preventDefault();

        let form        = $(this).closest('form');
        let taskID      = form.find('#edit-task-form-id').val();
        let title       = form.find('#edit-task-form-title').val();
        let content     = editTaskQuill.getSemanticHTML();
        let priority    = form.find('#edit-task-form-priority').val();
        let status      = form.find('#edit-task-form-status').val();
        let assignedTo  = form.find('#edit-task-form-assigned-to').val();
        let deadline    = form.find('#edit-task-form-expires').val();


        if(!taskID || !title || !content || !priority || !status || !assignedTo || !deadline)
        {
            alert('Please fill all the required fields');
            return false;
        }
        else
        {
            $.ajax({
                type: 'POST',
                url: API_URL + 'task/update',
                headers: {
                    // "Content-Type": "application/json",
                    "accessToken": getCookie('accessToken'),
                    "refreshToken": getCookie('refreshToken')
                },
                data: {
                    id          : taskID,
                    title       : title,
                    content     : content,
                    level       : priority,
                    status      : status,
                    assigned_to : assignedTo,
                    deadline    : deadline,
                },
                success: function(response){
                    if(response.status == 200)
                    {
                        // alert(response.message);
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
        }
    });


    $('#edit-task-modal').on('hidden.bs.modal', function () {
        let editModal   = $('#edit-task-modal');
        $(editModal).find('#edit-task-form-id').val('');
        $(editModal).find('#edit-task-form-title').val('');
        // $(editModal).find('select option:eq(0)').prop('selected', true);
        $(editModal).find('#edit-task-form-priority').find('option:eq(0)').prop('selected', true);
        $(editModal).find('#edit-task-form-status').find('option:eq(0)').prop('selected', true);
        $(editModal).find('#edit-task-form-assigned-to').find('option:eq(0)').prop('selected', true);
        $(editModal).find('#edit-task-form-expires').val('');

        $('#edit-task-form-content').find('.ql-editor').html('');
    });

});