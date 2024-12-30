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
                        tableString += `<td>${value.status}</td>`;
                        tableString += `<td>${addedOn}</td>`;
                    tableString += `</tr>`;
                }
                $('#user-list').find('tbody').html(tableString);
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
});