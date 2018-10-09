firebase.initializeApp({
  apiKey: '"AIzaSyD6TBZeJztDVb8HedL7jonuv7hmPgTm7Fo"',
  authDomain: 'comentariosreto.firebaseapp.com',
  projectId: 'comentariosreto',
});
const db = firebase.firestore();

// Initialize Cloud Firestore through Firebase
function saveComment() {
  const comment = document.getElementById('comment').value;

  db.collection('posts').add({
    post: comment,
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
      document.getElementById('comment').value = '';
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
}
// leer y obtener comentarios en tiempo real
const post = document.getElementById('post');

db.collection('posts')
  .onSnapshot((querySnapshot) => {
    post.innerHTML = '';
    querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data().post}`);
    // console.log(doc.data());

      post.innerHTML += `
        <div class="message">
            <p>${doc.data().post}</p>
            <button class="delete" onclick="deletePost('${doc.id}')">Eliminar</button>
        </div>`;
    });
  });

function deletePost(id) {
  db.collection('posts').doc(id).delete().then(() => {
  // console.log("Document successfully deleted!");
  })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
}

deletePost();
saveComment();
