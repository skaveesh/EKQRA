// ==UserScript==
// @name         Elakiri Quick Reply Advanced
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Samintha Kaveesh
// @run-at       document-end
// @match        http://www.elakiri.com/forum/showthread.php?*=*
// @grant        none
// ==/UserScript==

var fontsArray = Array("Fonts", "Arial", "Arial Black", "Arial Narrow", "Book Antiqua", "Century Gothic", "Comic Sans MS", "Courier New", "Fixedsys", "Franklin Gothic Medium", "Garamond", "Georgia", "Impact", "Lucida Console", "Lucida Sans Unicode", "Microsoft Sans Serif", "Palatino Linotype", "System", "Tahoma", "Times New Roman", "Trebuchet MS", "Verdana");
var iframe = document.getElementById('vB_Editor_QR_iframe');
var innerDoc = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
var fontSizesSelectDropdown = document.createElement("select");
var fontTypesSelectDropdown = document.createElement("select");


(function() {
    'use strict';

    var buttonPosition = document.querySelector("div.controlbar > table > tbody > tr");


    var mainTrElement = document.createElement("tr");

    var firstTdElement = document.createElement("td");
    firstTdElement.setAttribute("colspan","3");

    var secondTdElement = document.createElement("td");
    secondTdElement.setAttribute("colspan","9");

    //var clickButton = document.createElement("input");
    //clickButton.setAttribute("id","myButton");
    //clickButton.setAttribute("type","button");
    //clickButton.setAttribute("value","click here!");

    //clickButton.addEventListener('click', modifyText("fontSize",7), false);

    //***************************************
    /////////////////font size select
    //***************************************


    //fontSizesSelectDropdown.addEventListener('change',modifyText("fontSize",fontSizesSelectDropdown.options[fontSizesSelectDropdown.selectedIndex]), false);


    //size option

    // Loop through the size array
    for (var i = 0; i < 8; ++i) {
        fontSizesSelectDropdown[fontSizesSelectDropdown.length] = new Option(i, i);
    }
    //modify first option to string 'Sizes'
    fontSizesSelectDropdown.options[0].innerHTML = "Sizes";
    fontSizesSelectDropdown.options[0].setAttribute("value",0);
    fontSizesSelectDropdown.options[0].setAttribute("disabled","disabled");
    fontSizesSelectDropdown.options[0].setAttribute("selected",true);


    //***************************************
    /////////////////font type select
    //***************************************

    //type option
    // Loop through the font type array
    for (var j = 0; j < fontsArray.length; ++j) {
        fontTypesSelectDropdown[fontTypesSelectDropdown.length] = new Option(fontsArray[j],fontsArray[j]);
    }
    //modify first option to string 'Fonts'
    fontTypesSelectDropdown.options[0].setAttribute("value",0);
    fontTypesSelectDropdown.options[0].setAttribute("disabled","disabled");
    fontTypesSelectDropdown.options[0].setAttribute("selected",true);


    firstTdElement.appendChild(fontSizesSelectDropdown);
    secondTdElement.appendChild(fontTypesSelectDropdown);
    mainTrElement.appendChild(firstTdElement);
    mainTrElement.appendChild(secondTdElement);


    var parentNode = buttonPosition.parentNode;

    parentNode.insertBefore(mainTrElement, buttonPosition.nextSibling);


    fontSizesSelectDropdown.addEventListener('change',modifyText("fontSize",fontSizesSelectDropdown), false);
    fontTypesSelectDropdown.addEventListener('change',modifyText("fontName",fontTypesSelectDropdown), false);

    //var iframex = document.getElementById('vB_Editor_QR_iframe');
    //var innerDoc = (iframex.contentDocument) ? iframex.contentDocument : iframe.contentWindow.document;

    //position element
    innerDoc.addEventListener('click',detectFontSizeAndTypeWherePoiterAt(), false);


})();


function detectFontSizeAndTypeWherePoiterAt(){
    return function fontSizeAndTypeWherePoiterAt(e){

        var x = e.clientX, y = e.clientY,
            elementMouseIsOver = innerDoc.elementFromPoint(x, y);


        if(elementMouseIsOver !== null){
            var elem = elementMouseIsOver;
            var sizeDropdownIndex = 0;
            var fontDropdownIndex = 0;
            var sizeFound = false;
            var fontFound = false;

            while(elem.nodeName === "FONT"){

                if(sizeFound && fontFound){break;}

                if(elem.getAttribute("size") !== null && elem.getAttribute("face") !== null ){
                    sizeDropdownIndex =elem.getAttribute("size");
                    fontDropdownIndex =fontsArray.indexOf(elem.getAttribute("face"));
                    sizeFound = fontFound = true;
                    break;
                }else if(!sizeFound && elem.getAttribute("size") !== null){
                    sizeDropdownIndex =elem.getAttribute("size");
                    sizeFound = true;
                    elem = elem.parentNode;
                }else if(!fontFound && elem.getAttribute("face") !== null){
                    fontDropdownIndex =fontsArray.indexOf(elem.getAttribute("face"));
                    fontFound = true;
                    elem = elem.parentNode;
                }else{
                    elem = elem.parentNode;
                }

            }

            fontSizesSelectDropdown.selectedIndex = sizeDropdownIndex;
            fontTypesSelectDropdown.selectedIndex = fontDropdownIndex;

        }else{
            fontSizesSelectDropdown.selectedIndex = 0;
            fontTypesSelectDropdown.selectedIndex = 0;
        }

    };
}

function modifyText(commandName,valueArg) {
    return function(event) {

        //messageBody.setAttribute("value","");
        //var targ = event.target || event.srcElement;
        //messageBody.value += targ.textContent || targ.innerText;


        //var iframe = document.getElementById('vB_Editor_QR_iframe');
        //var innerDoc = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;


        //innerDoc.querySelector("body.wysiwyg").innerHTML = '<img src="http://www.elakiri.com/forum/images/smilies/sq/laugh8kb.gif" class="inlineimg" smilieid="22" border="0">';

        //innerDoc.querySelector("body.wysiwyg").innerHTML = '<div align="center"><b>hello</b></div>';
        var range;
        var sel = innerDoc.getSelection();
        if (sel.rangeCount && sel.getRangeAt) {
            range = sel.getRangeAt(0);
        }
        // Set design mode to on
        innerDoc.designMode = "on";
        if (range) {
            sel.removeAllRanges();
            sel.addRange(range);
        }
        // Colorize text
        innerDoc.execCommand(commandName, false, valueArg.value);
        // Set design mode to off
        document.designMode = "off";
        innerDoc.childNodes[0].focus();
    };
}
