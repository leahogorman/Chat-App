
async function load(){
    let list = await fetch ('/api/rooms').then(r=>r.text());
    list = JSON.parse(list);
    if (list !== null){
        list.forEach(el=>{
            console.log(el);
            let g = document.createElement('div')
            g.innerHTML = `<div class="chat" id="3"><a href="#">
            <i class="far fa-comments fa-5x"></i>
            <p class="chatroomName">Chatroom</p>
            </a></div>`
            g.addEventListener('click',async function(e){
                console.log(el.roomname)
                await chooseroom(el.roomname)
                window.location = 'chatroom.html'
            })
            $('.chatroom').append(g)

        })
    }
}

load()