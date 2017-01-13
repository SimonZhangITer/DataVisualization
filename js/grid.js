/**
 * Created by chinghsu on 17/1/10.
 */
if (!window.StyleHelpers) {
    var StyleHelpers = (function() {
        var applyElementStyle = function(element, styleObj) {
                Object.keys(styleObj).forEach(function(key) {
                    if (element.style[key] != styleObj[key]) {
                        element.style[key] = styleObj[key];
                    }
                })
            },

            applyTransformStyle = function(element, transformValue) {
                var styleObject = {};
                ['webkit', ''].forEach(function(prefix) {
                    styleObject[prefix + 'Transform'] = transformValue;
                });
                applyElementStyle(element, styleObject);
            };
        return {
            applyElementStyle: applyElementStyle,
            applyTransformStyle: applyTransformStyle
        }
    })();
    window.StyleHelpers = StyleHelpers;
}

for (var items = document.querySelectorAll(".item"), i = 0; i < items.length; i++)
    if (items[i].hasAttribute("data-color")) {
        var color = items[i].getAttribute("data-color");
        items[i].style.backgroundColor = "#" + color
    }

document.querySelector(".flex-container").addEventListener("click", function(e) {
    var _arr = Array.prototype.slice.call(e.target.classList);
    var selected = e.target;
    var active = this.querySelector(".active");
    if (_arr.indexOf("active") < 0) {

        var selectedStyle = window.getComputedStyle(selected);

        var selectedOrder = selectedStyle.getPropertyValue("order");
        selectedStyle = {
            width: selected.offsetWidth,
            height: selected.offsetHeight,
            center_x: selected.offsetLeft - selected.parentNode.offsetLeft + selected.offsetWidth / 2,
            center_y: selected.offsetTop - selected.parentNode.offsetTop + selected.offsetHeight / 2
        };
        var activeStyle = window.getComputedStyle(active);
        var activeOrder = activeStyle.getPropertyValue("order");
        activeStyle = {
            width: active.offsetWidth,
            height: active.offsetHeight,
            center_x: active.offsetLeft - active.parentNode.offsetLeft + active.offsetWidth / 2,
            center_y: active.offsetTop - active.parentNode.offsetTop + active.offsetHeight / 2
        };

        active.style.transform = "translate(" + (selectedStyle.center_x - activeStyle.center_x) + "px," + (selectedStyle.center_y - activeStyle.center_y) + "px) scale(" + selectedStyle.width / activeStyle.width + "," + selectedStyle.height / activeStyle.height + ")";
        selected.style.transform = "translate(" + (activeStyle.center_x - selectedStyle.center_x) + "px," + (activeStyle.center_y - selectedStyle.center_y) + "px) scale(" + activeStyle.width / selectedStyle.width + "," + activeStyle.height / selectedStyle.height + ")";
        setTimeout(function() {
            active.style.transition = "none";
            selected.style.transition = "none";
            active.style.transform="";
            selected.style.transform="";
            active.classList.remove("active");
            selected.classList.add("active");
            active.style.order = selectedOrder;
            selected.style.order = activeOrder;
            setTimeout(function(){
                active.style.transition = "all 1s ease-in";
                selected.style.transition = "all 1s ease-in";
            },500);
        }, 1000);

        //     StyleHelpers.applyTransformStyle(active,"translate("+(selectedStyle.center_x-activeStyle.center_x)+"px,"+(selectedStyle.center_y-activeStyle.center_y)+"px)");
        // active.style.width=selectedStyle.width+"px";
        // active.style.height=selectedStyle.height+"px";
        //      StyleHelpers.applyTransformStyle(selected,"translate("+(activeStyle.center_x-selectedStyle.center_x)+"px,"+(activeStyle.center_y-selectedStyle.center_y)+"px)");

    }
})
