    document.addEventListener("DOMContentLoaded", function() {
        startIntroChat();
    });

    function startIntroChat() {
        chat.createChatMessage("Hallo Zane, wir haben keine Zeit für Fragen. Ich helfe dir zu entkommen!", 1);
        setTimeout(function() { chat.createChatMessage("Du musst so schnell wie möglich da raus kommen!", 1) }, 1500);
        setTimeout(function() { chat.createChatMessage("Siehst das Tasteneingabefeld neben der Tür?", 1) }, 5000);
        setTimeout(function() { chat.createChatMessage("Der Chief Inspektor nutzt als Passwort die alphabetische Reihenfolge jedes Buchstabens als Zahl für den aktuellen Monat", 1) }, 10000);
        setTimeout(function() { chat.createChatMessage("Zum Beispiel war für den Monat 'January' die Kombination 10 1 14 21 1 18 25", 1) }, 15000);
        setTimeout(function() { chat.createChatMessage("Zähle schnell die Nummern für den aktellen Monat 'July', beeil dich!", 1) }, 25000);
        setTimeout(function() { chat.createChatMessage("Achso und vergiss nicht die Autoschlüssel auf dem Tisch aufzuheben!", 1) }, 28000);
        setTimeout(function() { chat.createChatMessage("Verdammt, ich muss hier weg, sie haben geschafft diese Verbindung zu entschlüsseln. BEEILUNG!", 1) }, 50000);
    }

    window.chat = {
        containerMessages: document.querySelector(".main_chat"),

        createChatMessage: function createChatMessage(message, cycles) {

            let bubble = document.createElement("span");
            bubble.classList += "bubble";
            this.containerMessages.appendChild(bubble);

            let createMessage = function() {
                let bubbleMessage = document.createElement("span");
                bubbleMessage.classList += "chat__message";
                bubbleMessage.innerText = message;
                bubble.appendChild(bubbleMessage);
                return bubbleMessage;
            };
            let bubbleMessage = createMessage();

            let createCircles = function() {
                let container = document.createElement("div");
                container.classList += "chat__loading";
                bubble.appendChild(container);

                for (let i = 0; i < 3; i++) {
                    let circle = document.createElement("b");
                    circle.classList += "chat__loading-circle";
                    circle.appendChild(document.createTextNode(String.fromCharCode(8226)));
                    container.appendChild(circle);
                }
                return container;
            };
            let containerCircles = createCircles();

            let pulseAnimation = (function() {
                let circles = containerCircles.children;
                let currentCycle = 0,
                    i = 0;

                return function() {
                    if (i === 0) {
                        circles[2].style.color = "rgba(0,0,0,.15)";
                        circles[2].style.transform = "scale(1)";
                    }

                    circles[i].style.color = "rgba(0,0,0,.5)";
                    circles[i].style.transform = "scale(1)";

                    if (i > 0) {
                        circles[i - 1].style.color = "rgba(0,0,0,.15)";
                        circles[i - 1].style.transform = "scale(1)";
                    }

                    i++;

                    if (i === 3) {
                        i = 0;
                        currentCycle++;
                    }

                    if (currentCycle === cycles) {
                        clearInterval(interval_pulseAnimation);
                        let circleScaleOutAnimation = (function() {
                            let x = 0;
                            return function() {
                                circles[x].style.transform = "scale(0)";
                                x++;
                                if (x === 3) {
                                    clearInterval(interval_circleScaleOutInterval);
                                    setTimeout(function() {
                                        containerCircles.style.display = "none";
                                        bubbleMessage.style.display = "block";
                                    }, 200);
                                    setTimeout(function() { bubbleMessage.style.opacity = "1"; }, 300);
                                }
                            };
                        })();
                        let interval_circleScaleOutInterval = setInterval(circleScaleOutAnimation, 100);
                    }
                };
            })();
            var interval_pulseAnimation = setInterval(pulseAnimation, 200);
        }
    };

    document.getElementById("placeholder").addEventListener("click", () => {
        alphabet = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0");
        letter_count = 0;
        el = $("#placeholder");
        word = "You´ve been hacked"; //el.html().trim();
        finished = false;

        el.html("");
        for (var i = 0; i < word.length; i++) {
            el.append("<span>" + word.charAt(i) + "</span>");
        }

        setTimeout(write, 75);
        incrementer = setTimeout(inc, 5);

        function write() {
            for (var i = letter_count; i < word.length; i++) {
                var c = Math.floor(Math.random() * 36);
                $("#placeholder").find("span")[i].innerHTML = alphabet[c];
            }
            if (!finished) {
                setTimeout(write, 75);
            }
        }

        function inc() {
            $("#placeholder").find("span")[letter_count].innerHTML = word[letter_count];
            $("#placeholder").find("span:eq(" + letter_count + ")").addClass("glow");
            letter_count++;
            if (letter_count >= word.length) {
                finished = true;
                setTimeout(reset, 1500);
            } else {
                setTimeout(inc, 200);
            }
        }

        function reset() {
            letter_count = 0;
            finished = false;
            // setTimeout(inc, 1000);
            // setTimeout(write, 75);
            $("span").removeClass("glow");
            setInterval(function() {
                $("#placeholder").toggleClass("glow");
            }, 1000);
        }
    })