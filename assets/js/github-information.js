function userInformationHTML(user) {
    console.log(user);

    return `
    <h2>${user.name}
        <span class="small-name">
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
        </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar">
            <a href="${user.html_url}" target="_blank">
                <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
            </a>
        </div>
        <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
    </div>`;
}

function fetchGitHubInformation(event) {
    var userName = $("#gh-username").val();
    if (!userName) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub User name<\h2>`);
        return;
    }

    $("#gh-user-data").html( 
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading"</div>`
    );

    $.when(
        $.getJSON(`https://api.github.com/users/${userName}`)
    ).then(
        function(response) {
            var userData = response;
            $("#gh-user-data").html(userInformationHTML(userData));
        }, 
        function(errorResponse) {
            if (errorResponse === 404) {
                $("#gh-user-data").html(`<h2>No information found for user ${userName}<\h2>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        }
    )
}

