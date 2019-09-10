const animals = ["giraffes", "elephants", "horses", "pigs", "turkeys"];

function displayGifs() {
    let animal = $(this).attr("data-name");


    const apiKey = "MoXWPXC3Ih0aybP4vBhlR0xQfMGdCJcX";

    const queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + animal + "&limit=10&offset=0&rating=PG&lang=en";

    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (res) {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
            let rating = res.data[i].rating;
            let p = $("<p>").text(`Rating: ${rating}`);
            let animated = res.data[i].images.fixed_height.url;
            let still = res.data[i].images.fixed_height_still.url;
            let image = $("<img>");
            image.attr("src", still);
            image.attr("data-still", still);
            image.attr("data-animated", animated);
            image.attr("data-state", "still");
            image.addClass("gif");
            $("#images").prepend(image, p);
        }

    })

};

function renderButtons() {

    $("#buttons-view").empty();

    for (let i = 0; i < animals.length; i++) {
        let a = $("<button>");
        a.addClass("animal-btn");
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#buttons-view").append(a);
    }
}


$("#add-animal").on("click", function (event) {
    event.preventDefault();
    let newAnimal = $("#animal-input").val().trim();
    animals.push(newAnimal);
    renderButtons();
    $("#animal-input").val("");
});


renderButtons();

$(document).on("click", ".animal-btn", displayGifs);

$(document).on("click", ".gif" , function() {

    let state = $(this).attr('data-state');
    if (state == `still`){
        $(this).attr(`src`, $(this).data(`animated`));
        $(this).attr(`data-state`, `animated`);
    } else {
        $(this).attr(`src`, $(this).data(`still`));
        $(this).atter(`data-state`, `still`);
    }
});