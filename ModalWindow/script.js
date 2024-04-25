'use strict';

const buttons = document.querySelectorAll('.modalbutton');
const window1 = document.querySelector('.window');
const X = document.querySelector('.x');
const outer = document.querySelector('.outer');

outer.addEventListener('click', closewindow);
X.addEventListener('click' , closewindow);

document.addEventListener('keydown', function (q) {
    if(q.key == 'Escape')
    {
        console.log('esc');
        closewindow();
    }
});

for (let i = 0; i < buttons.length; i++) {
    const element = buttons[i];
    element.addEventListener('click', decidewindow)
    
}


function closewindow(){
    window1.classList.add('hidden');
    outer.classList.add('hidden');
}

function openwindow(){
    window1.classList.remove('hidden');
    outer.classList.remove('hidden');
}
function decidewindow()
{
    if(window1.classList.contains('hidden'))
    {
        openwindow();
    }
    else{
        closewindow();
    }
}