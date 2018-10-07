firebase.initializeApp({
    apiKey: '"AIzaSyD6TBZeJztDVb8HedL7jonuv7hmPgTm7Fo"',
    authDomain: 'comentariosreto.firebaseapp.com',
    projectId: 'comentariosreto'
  });
  
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();
function saveComment(){

    const comment = document.getElementById('comment').value

    db.collection("posts").add({
        post: comment,
    })
    .then(function(docRef) {
        // console.log("Document written with ID: ", docRef.id);
        document.getElementById('comment').value = '';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
 // leer y obtener comentarios en tiempo real
const post = document.getElementById('post');

db.collection("posts")
.onSnapshot((querySnapshot) => {
    
    post.innerHTML = '';
    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().post}`);
        // console.log(doc.data());

        post.innerHTML += `
        <div class="message">
            <p>${doc.data().post}</p>
            <button class="delete" onclick="deletePost('${doc.id}')">Eliminar</button>
        </div>`
    });
});

function deletePost (id) {
    db.collection("posts").doc(id).delete().then(function() {
        // console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}