
let baseUrl = 'http://localhost:3000'



$(document).ready(function () {
    console.log('ready')

    defaultLogout()

    if (localStorage.getItem('token')) {
        defaultHome()
    }

});


function defaultLogout(){
    $("#loginForm").show()
    $("#registerForm").hide()
    $("#mainMenu").hide()
    $("#loginError").hide()
    $("#loginNotif").hide()
    $("#registerError").hide()
    $("#logout").hide()

    $("#mainMenu").hide()
    $("#menuWelcome").hide()
    $("#artHarvard").hide()
}

function defaultHome() {
    $("#loginForm").hide()
    $("#loginError").hide()
    $("#registerForm").hide()
    $("#registerError").hide()
    $("#logout").show()

    $("#mainMenu").show()
    $("#menuWelcome").show()
    $("#artHarvard").hide()
    $("#zomato").hide()
    $("#weather").hide()
}

$("#toRegister").click(() => {
    $("#loginForm").hide()
    $("#registerForm").show()
})

$("#toLogin").click(() => {
    $("#loginForm").show()
    $("#registerForm").hide()
})

$("#register").click((e) => {
    e.preventDefault()

    $.ajax({
        url: baseUrl+'/register',
        method: 'post',
        data: {
            name: $("#registerName").val(),
            email: $("#registerEmail").val(),
            password: $("#registerPassword").val()
        }
    })
    .done((result)=>{
        
        $("#loginForm").show()
        $("#registerForm").hide()

        $("#loginNotifMessage").text(`Hi ${result.name}, account anda telah dibuat`)
        $("#loginNotif").show()

        setTimeout(() => {
            $("#loginNotif").hide()
        }, 3000);
    })
    .fail((err)=>{
        console.log(err.message)
        $("#registerError").show()
        $("#registerErrorMessage").text(JSON.stringify(err))
    })

})


$("#login").click((e) => {
    e.preventDefault()


    $.ajax({
        url: baseUrl+'/login',
        method: 'post',
        data: {
            email: $("#loginEmail").val(),
            password: $("#loginPassword").val()
        }
    })
    .done((result)=>{
        console.log(result)

        localStorage.setItem('token', result.access_token)
        
        defaultHome()
    })
    .fail((err)=>{
        console.log(err.message)
        $("#loginError").show()
        $("#loginErrorMessage").text(JSON.stringify(err))
    })

})

$("#logout").click(()=>{
    console.log('logout')

    localStorage.removeItem('token')
    defaultLogout()
})

$("#publicApiArt").click(()=>{

    loadArts(1)

})

$("#publicApiZomato").click(()=>{
    loadFoodCollections()
    loadFoodCategories()
    loadZomato()
})

$("#publicApiWeather").click(()=>{
    loadWeather()
})


function loadArts(pageNum){
    $("#mainMenu").hide()
    $("#artHarvard").show()


    $("#arts").empty()
    $("#arts").append(`
        <div class="ui segment">
            <div class="ui active inverted dimmer">
            <div class="ui large text loader">Loading</div>
            </div>
            <p></p>
            <p></p>
            <p></p>
        </div>
    `)

    $.ajax({
        url: `${baseUrl}/harvard/${pageNum}`,
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done((result)=>{
        console.log(result)

        $("#arts").empty()

        result.records.forEach(art => {
            $("#arts").append(`
            <div class="ui card">
                <div class="image">
                <img src="${art.primaryimageurl}" onError="this.onerror=null;this.src='https://s3.amazonaws.com/speedsport-news/speedsport-news/wp-content/uploads/2018/07/01082232/image-not-found.png';">
                </div>
                <div class="content">
                <a class="header">${art.title}</a>
                <div class="meta">
                    <span class="date">${art.dated}</span>
                </div>
                <div class="description">
                    ${art.creditline}
                </div>
                </div>
                <div class="extra content">
                <a>
                    <i class="user icon"></i>
                    ${art.division}
                </a>
                </div>
            </div>
            `)

        })

        $("#arts").append(`
        <div id="artHarvardBtn" style="margin: 60px auto 30px; text-align:center; width: 100%;">
            <button onclick="defaultHome()" class="ui basic button">
            <i class="icon user"></i>
                Back to Menu
            </button>
            <button class="ui right labeled icon button" onclick="loadArts(${pageNum+1})">
            <i class="right arrow icon"></i>
                Next
            </button>
        </div>
        `)

    })
    .fail((err)=>{
        console.log(err)
    })
}


function loadZomato(){
    $("#mainMenu").hide()
    $("#zomato").show()

    $("#foods").empty()
    $("#foods").append(`
        <div class="ui segment">
            <div class="ui active inverted dimmer">
            <div class="ui large text loader">Loading</div>
            </div>
            <p></p>
            <p></p>
            <p></p>
        </div>
    `)

    $.ajax({
        url: `${baseUrl}/foods/search`,
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done((result)=>{
        // console.log(result)

        $("#foods").empty()

        result.forEach(el => {
            $("#foods").append(`
            <div class="ui card">
                <div class="image">
                <img src="${el.restaurant.featured_image}" onError="this.onerror=null;this.src='https://s3.amazonaws.com/speedsport-news/speedsport-news/wp-content/uploads/2018/07/01082232/image-not-found.png';">
                </div>
                <div class="content">
                <a class="header">${el.restaurant.name}</a>
                <div class="meta">
                    <span class="date">${el.restaurant.cuisines}</span>
                </div>
                <div class="description">
                    ${el.restaurant.location.address}
                </div>
                </div>
                <div class="extra content">
                    <span class="right floated">
                        Review(${el.restaurant.all_reviews_count})
                    </span>
                    <span>
                        Rating: <span style="font-weight:bold; color:black;">${el.restaurant.user_rating.aggregate_rating}</span>
                        <div class="ui star rating" data-rating="1"></div>
                        <i class="star icon" style="color:orange;"></i>
                        (${el.restaurant.user_rating.votes})
                    </span>
                </div>
            </div>
            `)

        })

        $("#foods").append(`
        <div id="artHarvardBtn" style="margin: 60px auto 30px; text-align:center; width: 100%;">
            <button onclick="defaultHome()" class="ui basic button">
            <i class="icon user"></i>
                Back to Menu
            </button>
        </div>
        `)

    })
    .fail((err)=>{
        console.log(err)
    })

}

function loadFoodCategories(){
    $.ajax({
        url: `${baseUrl}/foods/categories`,
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done((result)=>{
        $("#foodCategories").empty()

        // console.log(result.categories)

        result.categories.forEach((el)=>{
            $("#foodCategories").append(`
                <a class="item">${el.categories.name}</a>
            `)

        })


    })
    .fail((err)=>{
        console.log(err)
    })
}

function loadFoodCollections(){
    $.ajax({
        url: `${baseUrl}/foods/collections`,
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done((result)=>{
        // console.log(result)
        try{
            result.collections.forEach((el, index) => {
                if(index>5){
                    throw 'max 5 collections'
                }
                $("#foodCollections").append(`
                    <div class="item">
                        <i class="large github middle aligned icon"></i>
                        <div class="content">
                            <a class="header" href="${el.collection.url}">${el.collection.title}</a>
                            <div class="description">${el.collection.description}</div>
                        </div>
                    </div>
                `)
            })
        }catch(err){
            console.log(err)
        }
    })
    .fail((err)=>{
        console.log(err)
    })
}



function loadWeather(){
    $("#mainMenu").hide()
    $("#weather").show()

    $("weatherInfo").empty()
    $("#weatherInfo").append(`
        <div class="ui">
            <div class="ui active inverted dimmer">
            <div class="ui large text loader">Loading</div>
            </div>
            <p></p>
            <p></p>
            <p></p>
        </div>
    `)

    $.ajax({
        url: `${baseUrl}/weather`,
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .done((result)=>{
        $("#weatherInfo").empty()
        $("#weatherInfo").append(`
        <div class="ui card" style="margin:auto;">
            <div class="content">
                <img class="ui avatar image" src="https://semantic-ui.com/images/logo.png"> Weather
            </div>
            <div class="content">
                <div class="center aligned header">${result.location.name}</div>
                <div class="center aligned description">
                    ${result.current.weather_descriptions.map(el => {
                        return `<p>"${el}"</p>`
                    })}
                </div>
                <div class="center aligned author" style="margin: 20px 0;">
                    ${result.current.weather_icons.map(el => {
                        return `<img class="ui avatar image" src="${el}">`
                    })}
                </div>
            </div>
            <div class="extra content">
                <span class="left floated like">
                    <i class="time icon"></i>
                    ${result.current.observation_time}
                </span>
                <span class="right floated star">
                    ${result.location.country}
                </span>
            </div>
        </div>
        `)

        $("#weatherInfo").append(`
        <div id="artHarvardBtn" style="margin: 60px auto 30px; text-align:center; width: 100%;">
            <button onclick="defaultHome()" class="ui basic button">
            <i class="icon user"></i>
                Back to Menu
            </button>
        </div>
        `)
    })
    .catch((err)=>{
        console.log(err)
    })
}

















//FUNCTION GOOGLE SIGN IN
function onSignIn(googleUser) {
    var id_token = googleUSer.getAuthResponse().id_token
    console.log(id_token);

    $.ajax({
        url: baseUrl + 'user/googlelogin',
        method: 'POST',
        data: {
            googleToken: id_token
        }
    })
        .done((response) => {
            localStorage.setItem('acces_token', response.access_token)
            auth()
        })
        .fail((err) => {
            console.log(err);
        })
}

function login() {
    const email = $('#emailInput').val()
    const password = $('#passwordInput').val()
    $.ajax({
        url: baseUrl + 'user/login',
        method: 'POST',
        data: {
            email,
            password
        }
    })
        .done((response) => {
            localStorage.setItem('access_token', response.acces_token)
            auth()
        })
        .fail((xhr, text) => {
            console.log(xhr, text);
        })
        .always(_ => {
            $('#loginForm').trigger('reset')
        })
}

function logout() {
    localStorage.removeItem('access_token')
    auth()
}