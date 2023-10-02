function populateTabs(windowID){
    chrome.tabs.query({windowId:parseInt(windowID)}, function (tabs) {
      const tabList = document.getElementById("tabList");
  
      tabs.forEach(function (tab) {
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.value = tab.url;
        listItem.appendChild(checkbox);
        const link = document.createElement("a");
        link.textContent = tab.title;
        link.href = tab.url;
        link.target = "_blank"; // Open links in a new tab
        
        listItem.appendChild(link);
        tabList.appendChild(listItem);
      });
    });
  }



function unCheckAll(){
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = false
  });
}

function changeElement(element, type, text){
  element.innerHTML = ''
  addElement(element, type, text)

}


function addTabData(tabs){

  const tabList = document.getElementById("tabList");

    tabs.forEach(function (tab) {
      const listItem = document.createElement("li");
      const checkbox = document.createElement("input");

      checkbox.type = "checkbox";
      checkbox.value = tab.url;
      listItem.appendChild(checkbox);
      const link = document.createElement("a");
      link.textContent = tab.title;
      link.href = tab.url;
      link.target = "_blank"; // Open links in a new tab
      
      listItem.appendChild(link);
      tabList.appendChild(listItem);
    });
  
}


// const tabNumber = document.getElementById("TabNumber")
function addElement(element, type, text){
  const litem = document.createElement(type)
  litem.textContent = text
  element.appendChild(litem)
}

function saveTabHW(){
  const tabNumber = document.getElementById("TabNumber");
  tabNumber.style.display = "none"

  const tabList = document.getElementById("tabList");
  tabList.style.display = "none"

  const checkAll = document.getElementById("checkAllDiv");
  checkAll.style.display = "none"

  const title = document.getElementById("title")
  changeElement(title, "li", "Saved Tabs")

  const savedTabTitle = document.getElementById("SavedTabs")
  savedTabTitle.style.display = "block"

  const buttonContainer = document.getElementById("button-container")
  buttonContainer.style.display = "none"

  const backList = document.getElementById("bulletList");
  backList.style.display = "block"

  backList.innerHTML = ''

  const retrieveButtons = document.getElementById("savedButtons")
  retrieveButtons.style.display = "block"
}

function backButton(){
  const savedTabTitle = document.getElementById("SavedTabs")
  savedTabTitle.style.display = "none "

  const backList = document.getElementById("bulletList");
  backList.style.display = "none"

  const tabList = document.getElementById("tabList");
  tabList.style.display = "block"

  const buttonContainer = document.getElementById("button-container")
  buttonContainer.style.display = "block"

  const tabNumber = document.getElementById("TabNumber");
  tabNumber.style.display = "block"

  // tabList.innerHTML = ''

  const retrieveButtons = document.getElementById("savedButtons")
  retrieveButtons.style.display = "none"

  const title = document.getElementById("title")
  changeElement(title, "li", "Open Tabs")
}

function clearButton(){
  const savedTabTitle = document.getElementById("SavedTabs")
    
    savedTabTitle.style.display = "none "
    changeElement(savedTabTitle, "ls", "No Remaining Tab Groups")

    const backList = document.getElementById("bulletList");
    backList.style.display = "none"

    const tabList = document.getElementById("tabList");
    tabList.style.display = "block"

    const buttonContainer = document.getElementById("button-container")
    buttonContainer.style.display = "block"

    const tabNumber = document.getElementById("TabNumber");
    tabNumber.style.display = "block"

    // tabList.innerHTML = ''

    const retrieveButtons = document.getElementById("savedButtons")
    retrieveButtons.style.display = "none"

    const title = document.getElementById("title")
    changeElement(title, "li", "Open Tabs")

}