// import './functions.js'
//MAKE everythiNG based OFF OF THE GLOBAL VARIABLE AND RESET IT?
document.addEventListener("DOMContentLoaded", function () {

  let i = 0
  let tabGroupI = 0
  let currentWindowID =  0
  const x = []
  let storedTabsGlobal = []
  let clear = false;
  let checkedToggle = true;

  chrome.windows.getAll({ populate: false }, function (windows) {
      windows.forEach(function (window) {
        const listItem = document.createElement("li");
        listItem.textContent = window.id;
        x.push(listItem)
      });
  });

  chrome.tabs.query({}, function (tabs) {

    const title = document.getElementById("title")
    
    addElement(title, "lp", "Open Tabs")
    const retrieveButtons = document.getElementById("savedButtons")
    retrieveButtons.style.display = "none"

    const bulletList = document.getElementById("bulletList")
    bulletList.style.display = "none"
    bulletList.style.border = "none"
    bulletList.style.backgroundColor = "none"


    const deleteButton = document.getElementById("deleteTab")
    deleteButton.style.display = "none"
    
    const checkAllButton = document.getElementById("checkAllButton")
    checkAllButton.style.display = "block"
    const advanceTabGroup = document.getElementById("advanceTabGroup")
    advanceTabGroup.style.display = "none"

    const info = document.getElementById("info")
    info.style.display = "none"

    const warning = document.getElementById("warning")
    warning.style.display = "none"

    const tabNumber = document.getElementById("TabNumber")
    const litem = document.createElement("ls")
    litem.textContent = "Tab 1"
    tabNumber.appendChild(litem)
    currentWindowID = parseInt(x[0].textContent)
    populateTabs(currentWindowID)
    
  });

  getSavedTabs.addEventListener("click", function(){

    const info = document.getElementById("info")
    info.style.display = "none"

    const warning = document.getElementById("warning")
    warning.style.display = "none"

    const inputForm = document.getElementById("inputForm")
    inputForm.style.display = "none"

    const deleteButton = document.getElementById("deleteTab")
    deleteButton.style.display = "block"

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

    const advanceTabGroup = document.getElementById("advanceTabGroup")
    advanceTabGroup.style.display = "block"

    const backList = document.getElementById("bulletList");
    backList.classList.add("makeBackVisible");
    backList.style.display = "block"
    backList.style.border = "block"

    backList.innerHTML = ''

    const retrieveButtons = document.getElementById("savedButtons")
    retrieveButtons.style.display = "block"

    tabGroupI = 0

    
    chrome.storage.local.get("storedTabs", function (result) {
      const storedTabs = result.storedTabs || [];
      console.log(storedTabs)

      storedTabsGlobal = storedTabs
      
      

      console.log(storedTabs.length == 0)

      if(storedTabs.length == 0){
        console.log("YOOOOOOOOOOOOOOO")
        const backList = document.getElementById("bulletList");
        backList.classList.add("makeBackInvisible");
        backList.style.display = "none"
        backList.style.border = "none"
        changeElement(savedTabTitle, "ls", "No Remaining Tab Groups")
      }

      // console.log(storedTabs.length)

      let w = tabGroupI + 1

      if(!clear && storedTabs.length != 0){
        changeElement(savedTabTitle, "ls", "Tab Group: " + storedTabsGlobal[0].name + " " + w + "/" + storedTabs.length)
      }
      
      const tabList = document.getElementById("bulletList");
      
      if(storedTabs.length != 0){
        storedTabsLink = storedTabs[0].tabs
        storedTabsLink.forEach(function (tabLink) {
          const listItem = document.createElement("li");

          listItem.addEventListener("mousedown", function () {
            // Change the background color on mouse press
            if(checkbox.checked == false){
              checkbox.checked = true;
            }else{
              checkbox.checked = false;
            }
            listItem.classList.add("clicked");
      
          });
      
          listItem.addEventListener("mouseup", function () {
            // Remove the background color on mouse release
            listItem.classList.remove("clicked");
          });
      
          listItem.addEventListener("clicked", function () {
            // Remove the background color on mouse release
            listItem.classList.remove("clicked");
      
          });

          const link = document.createElement("a");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = true;
          listItem.appendChild(checkbox);
          link.textContent = tabLink.title;
          link.href = tabLink.url;
          link.target = "_blank"; // Open links in a new tab
          listItem.appendChild(link);
          tabList.appendChild(listItem);
        });
      }
      
    });
  })

  

  deleteTab.addEventListener("click", function(){

 
    chrome.storage.local.get("storedTabs", function (result) {

      const savedTabTitle = document.getElementById("SavedTabs")
      const tabList = document.getElementById("bulletList");
      let globalStoredTabsLink = ""
      let name = ""
      const storedTabs = result.storedTabs || [];
      console.log(storedTabs)
      urlsToOpen = []

      if(storedTabs.length == 1){
        storedTabsGlobal = []
        changeElement(savedTabTitle, "ls", "No Remaining Tabs")
        tabList.style.display = "none"

        chrome.storage.local.set({ storedTabs: storedTabsGlobal }, function () {
          console.log("Selected tabs stored.");
        });
        
      } else if(tabGroupI == storedTabs.length - 1){
        // name = storedTabsGlobal[tabGroupI].name
        // storedTabsGlobalLink = storedTabsGlobal[tabGroupI].tabs
        storedTabs.splice(tabGroupI, 1)
        
        storedTabsGlobal = storedTabs
  
        chrome.storage.local.set({ storedTabs: storedTabs }, function () {
          console.log("Selected tabs stored.");
        });
  
        console.log(tabGroupI)
        tabGroupI = 0
        let p = tabGroupI + 1
        console.log(storedTabsGlobal)

        changeElement(savedTabTitle, "ls", "Tab Group: " + storedTabsGlobal[tabGroupI].name + " " + p + "/" + storedTabsGlobal.length)
        storedTabsLink = storedTabsGlobal[tabGroupI].tabs
        console.log(storedTabsLink)
        storedTabsLink.forEach(function (tabLink) {
          const listItem = document.createElement("li");
          const link = document.createElement("a");
          link.textContent = tabLink.title;
          link.href = tabLink.url;
          link.target = "_blank"; // Open links in a new tab
          listItem.appendChild(link);
          tabList.appendChild(listItem);
        });
      }else{
        storedTabs.splice(tabGroupI, 1)
        
        storedTabsGlobal = storedTabs
  
        chrome.storage.local.set({ storedTabs: storedTabs }, function () {
          console.log("Selected tabs stored.");
        });
  
        console.log(tabGroupI)
        
        let p = tabGroupI + 1
        console.log(storedTabsGlobal)

        changeElement(savedTabTitle, "ls", "Tab Group: " + storedTabsGlobal[tabGroupI].name + " " + p + "/" + storedTabsGlobal.length)
        storedTabsLink = storedTabsGlobal[tabGroupI].tabs
        console.log(storedTabsLink)
        storedTabsLink.forEach(function (tabLink) {
          const listItem = document.createElement("li");
          const link = document.createElement("a");
          link.textContent = tabLink.title;
          link.href = tabLink.url;
          link.target = "_blank"; // Open links in a new tab
          listItem.appendChild(link);
          tabList.appendChild(listItem);
        });
      }                       

      
      
      
    });
  })

  saveTabs.addEventListener("click", function(){
    const tabList = document.getElementById("tabList");
    const checkedCheckboxes = tabList.querySelectorAll('input[type="checkbox"]:checked');
    const selectedTabs = [];
    unCheckAll()

    const nameInput = document.getElementById("nameInput");
    const userName = nameInput.value;
    nameInput.value = "";

    const info = document.getElementById("info")
    const warning = document.getElementById("warning")

    info.style.display = "none"
    warning.style.display = "none"



    checkedCheckboxes.forEach(function (checkbox) {
      const listItem = checkbox.closest("li"); // Find the parent <li> element
      const link = listItem.querySelector("a"); // Find the associated link
      const tabInfo = {
        title: link.textContent,
        url: link.href,
      };

      selectedTabs.push(tabInfo);
    });

    console.log(selectedTabs)

    clear = false


    if(selectedTabs.length != 0){

     info.style.display = "block"

     setTimeout(function() {
      info.style.display = "none"
     }, 5000); // 5000 milliseconds (5 seconds)
      // const userName = nameInput.value;
      let namedTabs = {tabs: selectedTabs, name: userName}

      chrome.storage.local.get("storedTabs", function (result){
        const storedTabs = result.storedTabs || [];
        const updatedTabs = storedTabs.concat(namedTabs);
  
        chrome.storage.local.set({ storedTabs: updatedTabs }, function () {
          console.log("Selected tabs stored.");
        });

        const logTimeout = setTimeout(function() {
          console.log("HIHI")
          // const info = document.getElementById("info")
          // info.style.display = "none"

          // const warning = document.getElementById("warning")
          // warning.style.display = "none"
        }, 5000); // 5000 milliseconds (5 seconds)

        setTimeout(function() {
          clearTimeout(logTimeout);
        }, 5000); // 5000 milliseconds (5 seconds)
        
  
      })

    } else {
      warning.style.display = "block"
      setTimeout(function() {
        warning.style.display = "none"
      }, 5000); // 5000 milliseconds (5 seconds)
    }

    

  })

  back.addEventListener("click", function(){
    const savedTabTitle = document.getElementById("SavedTabs")
    savedTabTitle.style.display = "none "

    const backList = document.getElementById("bulletList");
    backList.style.display = "none"
    backList.classList.add("makeBackInvisible");
    backList.style.border = "none"

    const deleteButton = document.getElementById("deleteTab")
    deleteButton.style.display = "none"

    const tabList = document.getElementById("tabList");
    tabList.style.display = "block"

    const buttonContainer = document.getElementById("button-container")
    buttonContainer.style.display = "block"

    const tabNumber = document.getElementById("TabNumber");
    tabNumber.style.display = "block"

    const inputForm = document.getElementById("inputForm")
    inputForm.style.display = "block"

    const advanceTabGroup = document.getElementById("advanceTabGroup")
    advanceTabGroup.style.display = "none"



    // tabList.innerHTML = ''

    const checkAllButton = document.getElementById("checkAllDiv")
    checkAllButton.style.display = "block"

    const retrieveButtons = document.getElementById("savedButtons")
    retrieveButtons.style.display = "none"

    const title = document.getElementById("title")
    changeElement(title, "li", "Open Tabs")

    i = 0
  })
    

  // openTabs.addEventListener("click", function(){
  //   chrome.storage.local.get("storedTabs", function (result) {
      
  //     const storedTabs = result.storedTabs || [];
  //     console.log(storedTabs)
  //     urlsToOpen = []

  //     wantedTabGroup = storedTabs[tabGroupI]

  //     for(let i = 0; i++; i <= 4){
  //       // urlsToOpen.push(wantedTabGroup.tabs[i].url)
  //       urlsToOpen.push(i)

  //     }   

  //     console.log(wantedTabGroup.tabs[0].url)
  //     console.log(urlsToOpen)

  //     // storedTabsLink = storedTabsGlobal[tabGroupI].tabs
  //     // console.log(storedTabsLink)
  //     // storedTabsLink.forEach(function (tabLink) {
  //     //   const listItem = document.createElement("li");
  //     //   const link = document.createElement("a");
  //     //   link.textContent = tabLink.title;
  //     //   link.href = tabLink.url;
  //     //   link.target = "_blank"; // Open links in a new tab
  //     //   listItem.appendChild(link);
  //     //   tabList.appendChild(listItem);
  //     // });
  //   });
  // })

  openTabs.addEventListener("click", function(){

    chrome.storage.local.get("storedTabs", function (result) {
          const tabList = document.getElementById("bulletList");
          const checkedCheckboxes = tabList.querySelectorAll('input[type="checkbox"]:checked');
          // console.log("CHECKED" +checkedCheckboxes)
          selectedTabs = []
      
          const storedTabs = result.storedTabs || [];
          console.log(storedTabs)
          urlsToOpen = []

          wantedTabGroup = storedTabs[tabGroupI]

          // console.log(wantedTabGroup.tabs.length)

          checkedCheckboxes.forEach(function (checkbox) {
            console.log("HIII")
            const listItem = checkbox.closest("li"); // Find the parent <li> element
            const link = listItem.querySelector("a"); // Find the associated link
            const tabInfo = {
              title: link.textContent,
              url: link.href,
            };
      
            selectedTabs.push(tabInfo);
          });

          console.log("Selected TABS" + selectedTabs.length)

          for (let i = 0; i < selectedTabs.length; i++) {
            // console.log(wantedTabGroup.tabs[i].url)
            // console.log("TABSSSS: " + wantedTabGroup.tabs[i].checkbox)
            urlsToOpen.push(selectedTabs[i].url)
          }

          console.log(urlsToOpen)

          const tabsToOpen = urlsToOpen.map((url) => ({ url: url }));

          // console.log(tabsToOpen)

          urlsToOpen.forEach(function (url) {
            chrome.tabs.create({ url: url });
          });

          chrome.windows.create({ url: urlsToOpen[0], type: "normal" }, function (newWindow) {
             console.log("New window opened with the first tab:", newWindow.tabs[0]);

             // Open additional tabs in the same window
            for (let i = 1; i < urlsToOpen.length; i++) {
              chrome.tabs.create({ url: urlsToOpen[i], windowId: newWindow.id });
            }
          });
          
    });

    
  })

  nextWindow.addEventListener("click", function (){
    const tabList = document.getElementById("tabList");
    tabList.innerHTML = ''

    if(i >= x.length-1){
      i = 0
    } else {
      i++
    }

    let num = i + 1
    console.log(num)
    const tabNumber = document.getElementById("TabNumber")
    const litemm = document.createElement("ls")
    litemm.textContent = "Tab " + num
    tabNumber.textContent = litemm.textContent
    currentWindowID = x[i].textContent

    populateTabs(x[i].textContent)

  })

  previousTabGroup.addEventListener("click", function(){
    const bulletList = document.getElementById("bulletList");
    bulletList.innerHTML = ''

    if(tabGroupI <= 0){
      tabGroupI =  storedTabsGlobal.length-1
    } else {
      tabGroupI--
    }

    console.log(tabGroupI)
    let t = tabGroupI + 1



    chrome.storage.local.get("storedTabs", function (result) {
      let savedTabTitle = document.getElementById("SavedTabs")
      const storedTabs = result.storedTabs || [];
      // console.log(storedTabs[i].tabs)
      storedTabsGlobal = storedTabs
      
      // if(!clear){
      changeElement(savedTabTitle, "ls", "Tab Group: " + storedTabsGlobal[tabGroupI].name)
      // }

      

      if(storedTabsGlobal.length != 0){
        changeElement(savedTabTitle, "ls", "Tab Group: " + storedTabsGlobal[tabGroupI].name + " " + t + "/" + storedTabsGlobal.length)
      }
      const tabList = document.getElementById("bulletList");
      

      storedTabsLink = storedTabsGlobal[tabGroupI].tabs
      console.log(storedTabsLink)
      storedTabsLink.forEach(function (tabLink) {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = true;
        listItem.appendChild(checkbox);
        link.textContent = tabLink.title;
        link.href = tabLink.url;
        link.target = "_blank"; // Open links in a new tab
        listItem.appendChild(link);
        tabList.appendChild(listItem);
      });
    });
  })

  nextTabGroup.addEventListener("click", function(){
    const bulletList = document.getElementById("bulletList");
    bulletList.innerHTML = ''

    if(tabGroupI >= storedTabsGlobal.length-1){
      tabGroupI = 0
    } else {
      tabGroupI++
    }

    console.log(tabGroupI)
    let t = tabGroupI + 1



    chrome.storage.local.get("storedTabs", function (result) {
      let savedTabTitle = document.getElementById("SavedTabs")
      const storedTabs = result.storedTabs || [];
      // console.log(storedTabs[i].tabs)
      storedTabsGlobal = storedTabs
      
      // if(!clear){
      changeElement(savedTabTitle, "ls", "Tab Group: " + storedTabsGlobal[tabGroupI].name)
      // }

      

      if(storedTabsGlobal.length != 0){
        changeElement(savedTabTitle, "ls", "Tab Group: " + storedTabsGlobal[tabGroupI].name + " " + t + "/" + storedTabsGlobal.length)
      }
      const tabList = document.getElementById("bulletList");
      

      storedTabsLink = storedTabsGlobal[tabGroupI].tabs
      console.log(storedTabsLink)
      storedTabsLink.forEach(function (tabLink) {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = true;
        listItem.appendChild(checkbox);
        link.textContent = tabLink.title;
        link.href = tabLink.url;
        link.target = "_blank"; // Open links in a new tab
        listItem.appendChild(link);
        tabList.appendChild(listItem);
      });
    });

    
  })

  clearStorage.addEventListener("click", function(){

    
    chrome.storage.local.clear(function () {
      console.log("Storage cleared.");
    });
    clear = true;

    console.log(storedTabsGlobal)
    const savedTabTitle = document.getElementById("SavedTabs")
    savedTabTitle.style.display = "none "
    changeElement(savedTabTitle, "ls", "No Remaining Tab")

    const backList = document.getElementById("bulletList");
    backList.style.display = "none"

    const tabList = document.getElementById("tabList");
    tabList.style.display = "block"

    const buttonContainer = document.getElementById("button-container")
    buttonContainer.style.display = "block"

    const tabNumber = document.getElementById("TabNumber");
    tabNumber.style.display = "block"

    // tabList.innerHTML = ''

    const advanceTabGroup = document.getElementById("advanceTabGroup")
    advanceTabGroup.style.display = "none"

    const inputForm = document.getElementById("inputForm")
    inputForm.style.display = "block"

    const retrieveButtons = document.getElementById("savedButtons")
    retrieveButtons.style.display = "none"

    const title = document.getElementById("title")
    changeElement(title, "li", "Open Tabs")

    i = 0

    storedTabsGlobal = []


  })


  checkAllButton.addEventListener("click", function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    if(!checkedToggle){
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = false
      });
      checkedToggle = true
    } else {
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = true
      });
      checkedToggle = false
    }

    console.log(checkedToggle)
    
  });

  

});

  

  



  


