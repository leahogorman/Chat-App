// function postUrl( url, data={} ){
//     const postData = {
//         headers: { 'Content-Type': 'application/json' },
//         method: 'post',
//         body: JSON.stringify( data )
//     }
//     return fetch( url,postData ).then( res=>res.json() )
// }


$(async function () {
    const list = await fetch( '/saved').then( r=>r.json() )

    list.forEach(el=>{
        $('#messages').append($('<li>').text(el.message));
        console.log(el); 
    })

    const result = await fetch('/api/data')
        .then(r=>r.json())
    console.log('result: ',result)

    var socket = io('/my-namespace');
    $('form').submit(async function(e) {
        e.preventDefault();
        socket.emit('chat message', $('#m').val());
        let message = $('#m').val()
        // const result2 = await postUrl('/api/send',$('#m').val())
        // console.log(result2);
        $.ajax('/api/send', {
            type: 'POST',
            data: {message}
        }).then(
            function() {
                console.log('messsage sent');
            }
        );

        $('#m').val('');

        return false;
    });
    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });
});