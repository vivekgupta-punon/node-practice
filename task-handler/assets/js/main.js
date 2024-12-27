function setCookie(name, value, days) 
{
    var expires = "";
    if(days)
    {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name)
{
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function removeCookie(name)
{
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 UTC; path=/;`;
}


$(document).ready(function () {
    $('#logout-user').click(function(e){
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: API_URL + 'user/logout',
            headers: {
                // "Content-Type": "application/json",
                "accessToken": getCookie('accessToken'),
                "refreshToken": getCookie('refreshToken')
            },
            success: function(response){
                if(response.status == 200)
                {
                    alert(response.message);

                    // remove cookies
                    removeCookie('accessToken');
                    removeCookie('refreshToken');
            
                    window.location.href = BASE_URL + 'login';
                }
                else
                {
                    alert('Error: ' + response.message);
                }
            },
            error: function(){ 
                alert('Something went wrong');
            }
        });
    })
});