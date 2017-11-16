var queue = function() {
    var api = null, self = this;
    var queueElements = [], queueElementsSource = [];
    var isNumber = function(n) { return !isNaN(parseFloat(n)) && isFinite(n); };
    var flags = {}, interval = null;
    var processing = function() {
        if(queueElements.length > 0) {
            var item = queueElements.shift();
            if(flags.stop !== true) {
                if(isNumber(item)) { // delay
                    interval = setTimeout(api, item);
                } else if(typeof item === 'function') { // functions
                    item();
                    api();
                }
            } else {
                clearTimeout(interval);
            }
        } else {
            if(typeof flags.callback !== 'undefined') flags.callback();
            if(flags.loop) {
                queueElements = [];
                for(var i=0; el=queueElementsSource[i]; i++) {
                    queueElements.push(el);
                }
                api();
            }
        }   
    }
    var filling = function() {
        var item = arguments[0];
        if(isNumber(item) || typeof item === 'function') {
            queueElements.push(item);
            queueElementsSource.push(item); 
        } else if(typeof item === 'string') {
            flags[item] = arguments[1] || true;
        }
    }
    return api = function() {
        arguments.length === 0 ? processing() : filling.apply(self, arguments);
        return api;
    }
    return api;
}


document.addEventListener('DOMContentLoaded', function(){


    var queue = (function() {
        var anim = document.getElementById("anim");
        anim.addEventListener("webkitAnimationEnd", callfunction);

        var notifications = [];
        var notificationsQueue = [];
        
        function callfunction() {
            console.log("done");
            notifications.shift();
            anim.classList.remove("animate");
            notifications = notificationsQueue;
            console.log("done length", notifications.length)
            if(notifications.length > 0) {
                console.log("yes")
                animate();
            }
        }
        

        function notification(string){
            notifications.push({
                "string": string
            });
            animate();
        }

        function animate(){ 
            console.log(notifications[0].string)
            anim.classList.add("animate");
            anim.innerHTML = notifications[0].string
            
            if(notifications.length > 1) {
                processing();
            }
        }

        function processing() {
            notificationsQueue = notifications;
            var items = notifications.shift();
            console.log(notifications.length);
            notificationsQueue.push(items);
        }

        return {
            notification: notification
        }
    })();
    window.queue = queue;
});