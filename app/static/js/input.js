document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByClassName("feature-option")
    Array.prototype.forEach.call(buttons, function(item) {
        item.addEventListener('click', function(){
            let val = this.innerText
            let fList = document.getElementById("selected-features-list")
            var items = fList.getElementsByTagName("li");
            let inList = -1
            for (var i = 0; i < items.length; ++i) {
                if(val == items[i].innerText){
                    inList = i
                    break
                }
            }
            if(inList != -1){
                fList.removeChild(fList.childNodes[inList])
                this.classList.remove("feature-selected")
            }else{
                let item = document.createElement("li");
                item.appendChild(document.createTextNode(val))
                let input = document.createElement("input");
                input.setAttribute("type", "hidden")
                input.setAttribute("name", "params");
                input.setAttribute("value", val)
                item.appendChild(input)
                item.setAttribute("class", "selected-features-item")
                fList.appendChild(item)
                this.setAttribute("class", "feature-selected feature-option")
            }
        })
    });
    store = window.localStorage
    document.getElementById("start-train-btn").addEventListener('click', function() {
        let items = document.getElementById("selected-features-list").getElementsByTagName("li");
        let data = []
        for(var i = 0; i < items.length; i++){
            console.log(items[i].innerText)
            if(items[i].innerText != "" && items[i].innerText != "Other") data.push(items[i].innerText)
            else if(items[i].innerText == "Other") data.push("Not Specified")
        }
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/train_model');
        xhr.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log("Received model: " + this.responseText)
                var data = this.responseText.split("|")
                store.clear()
                store.setItem('model', data[0])
                store.setItem("precision", data[1])
                store.setItem("recall", data[2])
                window.location = "results"
            }
        }
        xhr.send(data);
        startLoadingAnimation(document.getElementById("start-train-btn"));
    })
    
    //Attach popup dialog on mouseover with info about the feature
    featureOptionBtns = document.getElementsByClassName('feature-option');
    for (var i = 0; i < featureOptionBtns.length; i++) {
        currBtn = featureOptionBtns.item(i);
        currBtnTxt = currBtn.innerText;

        createAndApplyInfoBox(currBtn, currBtnTxt);
    }


}) //End of on 'document loaded' event


/**
 * Takes in an HTML element and Text within it to create a popup dialog with info.
 * 
 * @param {HTML Element} btnElem 
 * @param {String} btnTxt 
 */
function createAndApplyInfoBox(btnElem, btnTxt) {
    var originalText = "Machine learning models are created by analyzing multiple categories of information\ncalled features. Feature selection is performed by the humans that are responsible\nfor coding the model. Please select the features you would like to train your model with."
    var topTextBox = document.getElementById("feature-instructions");
    var warningBox = document.getElementById("warning-box");
    console.log(warningBox)

    var dialogText = "";
    let warningText = "";

    if (btnTxt.localeCompare("Age") == 0) {
        dialogText = "Age of each individual"
        warningText = "NOTE: Age can often be a problematic feature to include in models, and can introduce bias into the model. Are you sure you want to select Age?"
    }

    if (btnTxt.localeCompare("Sex") == 0) {
        dialogText = "Biological sex of each individual"
        warningText = "NOTE: Sex can often be a problematic feature to include in models, and can introduce bias into the model. Are you sure you want to select Sex?"
    }

    if (btnTxt.localeCompare("Race") == 0) {
        dialogText = "Race of each individual as determined on first infraction"
        warningText = "NOTE: Race can often be a problematic feature to include in models, and can introduce bias into the model. Are you sure you want to select Race?"
    }
    
    if (btnTxt.localeCompare("Juvenile Felony Count") == 0) {
        dialogText = "Number of felonies received as a minor (under 18 years old)"
    }

    if (btnTxt.localeCompare("Juvenile Misdemeanor Count") == 0) {
        dialogText = "Number of misdemeanors received as a minor (under 18 years old)"
    }

    if (btnTxt.localeCompare("Juvenile Other Count") == 0) {
        dialogText = "Number of other crimes/charges not including misdemeanors and felonies received as a minor (under 18 years old)"
    }

    if (btnTxt.localeCompare("Priors Count") == 0) {
        dialogText = "Number of a criminal defendant's previous record of criminal charges, convictions, or other judicial disposal of criminal cases (such as probation, dismissal or acquittal)."
    }
    
    if (btnTxt.localeCompare("Charge Degree") == 0) {
        dialogText = "Level of severity of the criminal charge brought against an individual"
    }

    warningText = document.createTextNode(warningText);

    // Add to button
    btnElem.addEventListener('mouseover', () => {
        topTextBox.innerText = dialogText;
        warningBox.appendChild(warningText);
    });

    btnElem.addEventListener('mouseout', () => {
        topTextBox.innerText = originalText;
        warningBox.innerText = "";
    })
}


/**
 * Attach loading animation to the button.
 * 
 * @param {HTML Element} btnElem
 */
function startLoadingAnimation(btnElem) {
    loadingElem = document.createElement("i");
    loadingElem.classList.add("fa");
    loadingElem.classList.add("fa-circle-o-notch");
    loadingElem.classList.add("fa-spin");
    btnElem.appendChild(loadingElem);
}