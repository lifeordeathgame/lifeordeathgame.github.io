const CLIENT_ID = '2494d0K9JURCsFh2';



const drone = new ScaleDrone(CLIENT_ID, {
  
  data: { // Will be sent out as clientData via events
    
    name: getName(),
    color: getRandomColor(),
  },
});

let members = [];

drone.on('open', error => {
  if (error) {
    return console.error(error);
  }
  console.log('Successfully connected to Scaledrone');

  const room = drone.subscribe('observable-room');
  room.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined room');
  });

  room.on('members', m => {
    members = m;
    updateMembersDOM();
  });

  room.on('member_join', member => {
    members.push(member);
    updateMembersDOM();
  });

  room.on('member_leave', ({id}) => {
    const index = members.findIndex(member => member.id === id);
    members.splice(index, 1);
    updateMembersDOM();
  });

  room.on('data', (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
    } else {
      // Message is from server
    }
  });
});

drone.on('close', event => {
  console.log('Connection was closed', event);
});

drone.on('error', error => {
  console.error(error);
});



function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}
function getName() {
  var pswrd = prompt("Enter your password"); 
  if (pswrd.toLowerCase() == "stoptheships") {
    alert("Password Accepted. Hello Vivian.");
    return (
    "Vivian"
    );
  }
  else if (pswrd.toLowerCase() == "sinduisamazing") {
    alert("Password Accepted. Hello Sindu.");
    return (
    "Sindu"
    );
  }
  else if (pswrd.toLowerCase() == "dev") {
    alert("Password Accepted. Hello Julian.");
    return (
    "Julian"
    );
  }
  else if (pswrd.toLowerCase() == "hubburt") {
    alert("Password Accepted. Hello Hubert.");
    return (
    "Hubert"
    );
  }
  else if (pswrd.toLowerCase() == "anjanapravi1") {
    alert("Password Accepted. Hello Sanjay.");
    return (
    "Sanjay"
    );
  }
  else if (pswrd.toLowerCase() == "invincibletkd") {
    alert("Password Accepted. Hello Yama.");
    return (
    "Yama"
    );
  }
  else if (pswrd.toLowerCase() == "urmomgay123") {
    alert("Password Accepted. Hello Gavin.");
    return (
    "Gavin"
    );
  }
  else {
    alert("Nice Try");
    window.location.reload(true);
  }
}
//------------- DOM STUFF

const DOM = {
  membersCount: document.querySelector('.members-count'),
  membersList: document.querySelector('.members-list'),
  messages: document.querySelector('.messages'),
  input: document.querySelector('.message-form__input'),
  form: document.querySelector('.message-form'),
};

DOM.form.addEventListener('submit', sendMessage);

function sendMessage() {
  const value = DOM.input.value;
  if (value === '') {
    return;
  }
  DOM.input.value = '';
  drone.publish({
    room: 'observable-room',
    message: value,
  });
}

function createMemberElement(member) {
  const { name, color } = member.clientData;
  const el = document.createElement('div');
  el.appendChild(document.createTextNode(name));
  el.className = 'member';
  el.style.color = color;
  return el;
}

function updateMembersDOM() {
  DOM.membersCount.innerText = `${members.length} users in room:`;
  DOM.membersList.innerHTML = '';
  members.forEach(member =>
    DOM.membersList.appendChild(createMemberElement(member))
  );
}

function createMessageElement(text, member) {
  const el = document.createElement('div');
  el.appendChild(createMemberElement(member));
  el.appendChild(document.createTextNode(text));
  el.className = 'message';
  return el;
}

function addMessageToListDOM(text, member) {
  const el = DOM.messages;
  const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
  el.appendChild(createMessageElement(text, member));
  if (wasTop) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
}
