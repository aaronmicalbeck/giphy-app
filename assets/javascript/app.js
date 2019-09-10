//Global variables
const animals = ["giraffes", "elephants", "horses", "pigs", "turkeys"];

// Grab all items in array and append corresponding buttons to page

function renderButtons() {

    $("#buttons-view").empty();

    for (let i = 0; i < animals.length; i++) {
        let a = $("<button>");
        // gives each button a class
        a.addClass("animal-btn");
        // gives each button an attribute
        a.attr("data-name", animals[i]);
        //gives each button text
        a.text(animals[i]);
        $("#buttons-view").append(a);
    }
}

// Submit button pushes user input to animals array and appends a new animal button based on user input
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    let newAnimal = $("#animal-input").val().trim();
    animals.push(newAnimal);
    renderButtons();
    $("#animal-input").val("");
});


renderButtons();


// Pull data from GiphyApp API and adds them to the page
function displayGifs() {
    $(`#images`).empty();
    let animal = $(this).attr("data-name");

    const apiKey = "MoXWPXC3Ih0aybP4vBhlR0xQfMGdCJcX";

    const queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + animal + "&limit=10&offset=0&rating=PG&lang=en";

    //AJAX call
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (res) {

        // take 10 objects from API and run a for loop to add a <p> tag for rating, the still gif img and add them to the page(prepend)     
        // console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
            let rating = res.data[i].rating;
            let p = $("<p>").text(`Rating: ${rating}`);
            let animated = res.data[i].images.fixed_height.url;
            let still = res.data[i].images.fixed_height_still.url;
            let image = $("<img>");
            // add attributes/classes accordingly
            image.attr("src", still);
            image.attr("data-still", still);
            image.attr("data-animated", animated);
            image.attr("data-state", "still");
            image.addClass("gif");
            $("#images").prepend(image, p);
        }

    })

};

// run the displayGifs function when animal button is clicked

$(document).on("click", ".animal-btn", displayGifs);

// change the animation state of each gif upon click event
$(document).on("click", ".gif", function () {

    let state = $(this).attr('data-state');
    if (state == `still`) {
        $(this).attr(`src`, $(this).data(`animated`));
        $(this).attr(`data-state`, `animated`);
    } else {
        $(this).attr(`src`, $(this).data(`still`));
        $(this).atter(`data-state`, `still`);
    }
});