const clock = document.querySelector('.clock')

let Time = clock.querySelector("h1")

// console.log(Time);

function getTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    Time.innerText = hours + ":" + minutes + ":" + seconds;
}

function init(){
    getTime();
    setInterval(getTime, 1000);
}

init();


