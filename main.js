

setInterval(function() {
    var class_to_delete = document.getElementsByClassName("_ovg3g");
    for(var i = 0 ; i < class_to_delete.length; i++) 
        class_to_delete.item(i).remove();
    console.log("Conde");
},1000);

