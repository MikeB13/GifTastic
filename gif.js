//initial array of animal buttons
var animals = ["dragonfly", "flamingo", "bird", "butterfly", "ladybug", "bee", "tiger", "peacock", "zebra", "eagle"];

//use this to display gifs
function displayGif() {

    //grab value found in "data-name". This is the name of the gif to be generated
    var theAnimal = $(this).attr("data-name");

    //Plug in name of gif to be generated into the query URL. 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theAnimal + "&limit=4&api_key=dc6zaTOxFJmzC";

    //Performing an AJAX GET request to our query URL
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    // After the data from the AJAX request comes back
    .done(function(response) {

        //Each time this function runs, ensure you're working with a blank slate. 
        $("#addAnimal").empty();

        //for every object in the response data array of objects...
        for (var i = 0; i < response.data.length; i++) {

            //Create Figure tag so that you can give each giphy a caption that'll include it's rating.
            //Give this tag an ID. This ID will be used to add each giphy to it's respective figure tag.
            var containGif = $("<figure>");
            containGif.attr("id", [i]);
            $("#addAnimal").append(containGif);

            //grab the giphy's rating from the data array of objects
            var rating = response.data[i].rating;

            //grab the image URL from data array of objects
            var imageURL = response.data[i].images.original.url;

            //create and set the gif image tag and it's attributes. Each giphy will be dumped into an image tag.
            var theGif = $("<img>");
            var animatedImage = response.data[i].images.original.url;
            var stillImage = response.data[i].images.original_still.url;
            theGif.attr("src", imageURL);
            theGif.attr("class", "box");
            theGif.attr("alt", "giphy image");
            theGif.attr("data-still", stillImage);
            theGif.attr("data-animate", animatedImage);
            theGif.attr("data-state", "animate");

            $("#addAnimal").append(theGif);

            $("#" + [i].toString()).append(theGif, "<figcaption> Rated: " + rating + "</figcaption>");
        }

        renderButtons();
    })
}

//function for displaying animal buttons
function renderButtons() {
    // Delete content inside the animal-view div prior to adding new movies
    // this is necessary otherwise you will have repeat buttons
    $("#animalView").empty();

    for (var i = 0; i < animals.length; i++) {
        var animalButton = $("<button>");
        //Add a class
        animalButton.addClass("animal");
        //Add a data attribute
        animalButton.attr("data-name", animals[i]);
        //Provide the initial button text
        animalButton.text(animals[i]);
        //Add button to the html
        $("#animalView").append(animalButton);

        //$("#animalView").append("<button>" + animals[i] + "</button>");
    }
}



//function handles events where button is clicked
$("#addGif").on("click", function(event) {

    //event.preventDefault() prevents submit button from trying to send a form.   Using a submit button instead of a regular button allows the user to hit "Enter" instead of clicking the button if desired
    // "Enter" instead of clicking the button if desired
    event.preventDefault();

    //grab input from text box and trim extra space
    var userInput = $("#animalInput").val().trim();

    animals.push(userInput);
    console.log(animals);
    renderButtons();
});





// Function for displaying the movie info
// We're adding a click event listener to all elements with the class "movie"
// We're adding the event listener to the document itself because it will
// work for dynamically generated elements
// $(".animal").on("click") will only add listeners to elements that are on the page at that time
$(document).on("click", ".animal", displayGif);


renderButtons();

//function to pause gif
$("img").on("click", function() {
    console.log("hi");

});