let prompt = document.querySelector("#prompt")
let btn = document.querySelector("#btn")
let chatContainer = document.querySelector(".chat-container")
let container = document.querySelector(".container")
let userMessage=null;

let Api_url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBXZ9kKY8URkKVZzWXMcCaDXihO7CYfoe0'

function createChatBox(html,className){
let div = document.createElement("div")
div.classList.add(className)
div.innerHTML=html
return div
}

async function getApiResponse(aiChatBox) {
let textElement = aiChatBox.querySelector(".text")

    try{
      let response = await fetch(Api_url,{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({
            contents:[{"parts":[{text:userMessage}]}]
        })
      })
      let data = await response.json();
      let apiResponse = data?.candidates[0].content.parts[0].text;
    //   console.log(apiResponse)
    textElement.innerText = apiResponse
    }
    catch(error){
        console.log("Sorry Tryin' After Sometime :", error);
    }
    finally{
        aiChatBox.querySelector("#loading").style.display="none";
    }
}

function showLoading(){
    let html=` <div class="img">
                <img src="ai.png" alt="Ai" width="40">
             </div>
             <p class="text"></p>
             <img id="loading" src="loading.gif" alt="loading" height="50">`
             let aiChatBox =  createChatBox(html,"ai-chatbox")
             chatContainer.appendChild(aiChatBox)

             getApiResponse(aiChatBox)
}

btn.addEventListener("click",()=>{
    userMessage=prompt.value
    // console.log(userMessage)
    if(userMessage==""){
       container.style.display="flex"
    }{
        container.style.display="none"
    }
    if(!userMessage) return;
    let html = `<div class="img">
                <img src="user.png" alt="user" width="40">
            </div>
            <p class="text" ></p>`;
   let userChatBox =  createChatBox(html,"user-chatbox")
   userChatBox.querySelector(".text").innerText=userMessage
   chatContainer.appendChild(userChatBox)
   prompt.value=""

   setTimeout(showLoading,500)
});