function onPageLoad() {
    console.log(" Document Loaded");
    var url = "http://127.0.0.1:5000/get_location_names";
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uilocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i])
                $('#uiLocations').append(opt)
            }
        }
    });
}
function onClickedEstimatedPrice()
{
    console.log("Estimated price button clicked")
    var bhk = getBHKValue();
    var sqrt = document.getElementById("uiSqft");
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");
    var url = "http://127.0.0.1:5000/predict_home_price";
    $.post(url, {
        total_sqft : parseFloat(sqrt.value),
        bhk : bhk,
        bath : bathrooms,
        location: location.value
    },function(data,status){
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + "Lakh</h2>";
        console.log(status);
    });
}

function getBathValue()
{
    var uiBathrooms = document.getElementsByName('uiBathrooms');
    for(var i in uiBathrooms){
        console.log(i);
        if(uiBathrooms[i].checked){
            return parseInt(i)+1;
        }
    }
    return -1;
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    console.log(uiBHK);
    for(var i in uiBHK){
        if(uiBHK[i].checked){
            return parseInt(i)+1;
        }
    }
}
window.onload = onPageLoad();