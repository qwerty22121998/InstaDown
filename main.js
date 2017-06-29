
var overlays = document.getElementsByClassName("_ovg3g");
var number_of_overlays = overlays.length;
if (number_of_overlays > 0) {
    for (var i = 0; i < number_of_overlays; i++)
        if (overlays.item(i) != null) overlays.item(i).remove();
    console.log("Script Executed!");
};


