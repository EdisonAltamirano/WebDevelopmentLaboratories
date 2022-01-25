$(document).ready(function () {            
    // Start your code from here
    let animals = ["dog", "cat", "rabbit", "hamster", "frog"]
    function addSearchBtns() {

    for (let i = 0; i < animals.length; i++) {
        let a = $("<button>")
        a.addClass("animal-button")
        a.attr("data-type", animals[i])
        a.text(animals[i])
        $("#animal-buttons").append(a)
    }
      }
      function addSearchNewBtns(query) {


            let a = $("<button>")
            a.addClass("animal-button")
            a.attr("data-type", query)
            a.text(query)
            $("#animal-buttons").append(a)
        
          }
      addSearchBtns();
    $("#animal-buttons").on("click", ".animal-button", function () {
        $("#animals").empty()
        let search = $(this).attr("data-type")
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL
        })
            .then(function (response) {
                let results = response.data
                for (let i = 0; i < results.length; i++) {

                    var $img = $("<img>");
                    var $div = $("<div class= \"animal-item\">");
                    let rating = results[i].rating;
                    
                    var $rating = $("<p>").text("Rating: " + rating)
                    var gifObj = response.data[i];
                    var gif = gifObj.images;
            
                    // Image builder object
                    $img.attr({
                      src: gif.fixed_height_still.url,
                      "data-animate": gif.fixed_height.url,
                      "data-still": gif.fixed_height_still.url,
                      "data-state": "still",
                      class: "gif"
                    });
                    $div.addClass("gif-box");
                    $rating.text("Rating: " + gifObj.rating);
                    $div.append($img, $rating);
                    $("#animals").append($div);
                  }
            
                  $(".gif").on("click", function() {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                      $(this).attr("src", $(this).attr("data-animate"));
                      $(this).attr("data-state", "animate");
                    } else {
                      $(this).attr("src", $(this).attr("data-still"));
                      $(this).attr("data-state", "still");
                    }
                  });
                
            })
    })



    $("#addanimal").on("click", function (e) {
        e.preventDefault();
        if($("#animal-input").val()!==""){   
            query = $("#animal-input").val();
            addSearchNewBtns(query)

        }
    })
});