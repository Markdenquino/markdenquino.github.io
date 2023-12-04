let words = document.querySelectorAll(".word");
words.forEach((word)=>{
    let letter = word.textContent.split("");
    word.textContent=""
    letter.forEach((letter)=>{
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length -1;
words[currentWordIndex].style.opacity = "1";

let changeText = ()=>{
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter,i)=>{
        setTimeout(()=>{
            letter.className = "letter out";
        },i * 80);
    });
    nextWord.style.opacity="1";
    Array.from(nextWord.children).forEach((letter,i)=>{
        letter.className = "letter behind"
        setTimeout(()=>{
            letter.className = "letter in";
        },340 + i * 80);
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 3000);

//Itlog//
const circles = document.querySelectorAll('.circle');
circles.forEach(elem => {
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor((dots * marked) / 100);
    var points = "";
    var rotate = 360 / dots;

    for (let i = 0; i < dots; i++) {
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }
    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll('.points');
    for(let i = 0; i < percent ; i++){
        pointsMarked[i].classList.add('marked')
    }

});  

// mixitup portfolio
var mixer = mixitup('.portfolio-gallery');

// active menu
let menuli = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');

function activeMenu(){
    let len = section.length;
    while(len-- && window.scrollY + 97 < section[len].offsetTop){}
    menuli.forEach(sec => sec.classList.remove("active"));
    menuli[len].classList.add("active");
};

activeMenu();
window.addEventListener("scroll", activeMenu);

// malagkit
const header = document.querySelector("header");
window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 50)
});

// toggle
let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menuIcon.onclick = ()=>{
    menuIcon.classList.toggle("bx-x");
    navlist.classList.toggle("open");
}

window.onscroll = ()=>{
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open");
}

// Parralax

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("scroll-items");
        }else{
            entry.target.classList.remove("scroll-items");
        }
    });
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el)=>observer.observe(el));


const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el)=>observer.observe(el));


const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el)=>observer.observe(el));

const fetchEmails = async (access_token, labelId) => {
  try {
    const emails = await getInbox(access_token, labelId);
    const messages = emails.map(email => {
      let content;
      if (email.payload.parts) {
        content = atob(email.payload.parts[0].body.data);
      } else {
        content = atob(email.payload.body.data);
      }
      return { content };
    });
    return messages;
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw error;
  }
};

const fetchEmails2 = async (access_token, labelId2) => {
  try {
    const emails = await getInbox(access_token, labelId2);
    const messages = emails.map(email => {
      let content;
      if (email.payload.parts) {
        content = atob(email.payload.parts[0].body.data);
      } else {
        content = atob(email.payload.body.data);
      }
      return { content };
    });
    return messages;
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw error;
  }
};

const fetchEmails3 = async (access_token, labelId3) => {
  try {
    const emails = await getInbox(access_token, labelId3);
    const messages = emails.map(email => {
      const headers = email.payload.headers;
      const subject = headers.find(header => header.name === 'Subject').value;
      const from = headers.find(header => header.name === 'From').value;
      let content;
      if (email.payload.parts) {
        content = atob(email.payload.parts[0].body.data);
      } else {
        content = atob(email.payload.body.data);
      }
      return { subject, from, content };
    });
    return messages;
  } catch (error) {
    console.error("Error fetching emails:", error);
    throw error;
  }
};

const getInbox = async (access_token, labelId) => {
  try {
    const response = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10&labelIds=${labelId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const emails = await Promise.all(data.messages.map(async (message) => {
      const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const email = await res.json();
      return email;
    }));

    return emails;
  } catch (error) {
    console.error("Error getting inbox:", error);
    throw error;
  }
};

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Assuming a basic implementation of useState and useEffect
// This is a simplified version, and you may need to adapt it based on your environment.
function useState(initialValue) {
  let value = initialValue;
  const getValue = () => value;
  const setValue = (newValue) => (value = newValue);
  return [getValue, setValue];
}

function useEffect(callback, dependencies) {
  // Assuming a basic implementation of useEffect
  // This is a simplified version, and you may need to adapt it based on your environment.
  callback();
}

function atob(data) {
  // Assuming a basic implementation of atob
  // This is a simplified version, and you may need to adapt it based on your environment.
  return Buffer.from(data, 'base64').toString('utf-8');
}
