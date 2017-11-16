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