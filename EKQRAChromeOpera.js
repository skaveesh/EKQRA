// ==UserScript==
// @name         Elakiri Quick Reply Advanced
// @namespace    https://github.com/skaveesh/EKQRA/
// @version      1.0
// @description  Try to take over the world! nahh.. Just quick reply
// @author       skaveesh
// @run-at       document-idle
// @match        http://www.elakiri.com/forum/showthread.php?*=*
// @grant        none
// @require      https://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==



//////////////////////below code is waitForKeyElements
//////////////////////detects and handles AJAXed content.
//////////////////////https://gist.github.com/BrockA/2625891
function waitForKeyElements ( selectorTxt, actionFunction, bWaitOnce, iframeSelector ) { var targetNodes, btargetsFound; if (typeof iframeSelector == "undefined") targetNodes = $(selectorTxt); else targetNodes = $(iframeSelector).contents () .find (selectorTxt); if (targetNodes && targetNodes.length > 0) { btargetsFound = true; targetNodes.each ( function () { var jThis = $(this); var alreadyFound = jThis.data ('alreadyFound') || false; if (!alreadyFound) { var cancelFound = actionFunction (jThis); if (cancelFound) btargetsFound = false; else jThis.data ('alreadyFound', true); } } ); } else { btargetsFound = false; } var controlObj = waitForKeyElements.controlObj || {}; var controlKey = selectorTxt.replace (/[^\w]/g, "_"); var timeControl = controlObj [controlKey]; if (btargetsFound && bWaitOnce && timeControl) { clearInterval (timeControl); delete controlObj [controlKey]; } else { if ( ! timeControl) { timeControl = setInterval ( function () { waitForKeyElements ( selectorTxt, actionFunction, bWaitOnce, iframeSelector ); }, 300 ); controlObj [controlKey] = timeControl; } } waitForKeyElements.controlObj = controlObj; }


//////////////////////below code is leanModal.js
//////////////////////leanModal v1.1 by Ray Stone - https://finelysliced.com.au
//////////////////////Dual licensed under the MIT and GPL
//////////////////////https://github.com/FinelySliced/leanModal.js
(function($){$.fn.extend({leanModal:function(options){var defaults={top:100,overlay:0.5,closeButton:null};var overlay=$("<div id='lean_overlay'></div>");$("body").append(overlay);options=$.extend(defaults,options);return this.each(function(){var o=options;$(this).click(function(e){var modal_id=$(this).attr("href");$("#lean_overlay").click(function(){close_modal(modal_id);});$(o.closeButton).click(function(){close_modal(modal_id);});var modal_height=$(modal_id).outerHeight();var modal_width=$(modal_id).outerWidth(); $("#lean_overlay").css({"display":"block",opacity:0});$("#lean_overlay").fadeTo(200,o.overlay);$(modal_id).css({"display":"block","position":"fixed","opacity":0,"z-index":11000,"left":50+"%","margin-left":-(modal_width/2)+"px","top":o.top+"px"});$(modal_id).fadeTo(200,1);e.preventDefault();});});function close_modal(modal_id){$("#lean_overlay").fadeOut(200);$(modal_id).css({"display":"none"});}}});})(jQuery);


//////////////////////below code is simple-undo.js
//////////////////////License
//////////////////////simple-undo is licensed under the terms of the Beerware license.
//////////////////////2014 - Matthias Jouan
//////////////////////https://github.com/mattjmattj/simple-undo
var SimpleUndo = function(options) {var settings = options ? options : {};var defaultOptions = {provider: function() {throw new Error("No provider!");},maxLength: 30,onUpdate: function() {}};	this.provider = (typeof settings.provider != 'undefined') ? settings.provider : defaultOptions.provider;this.maxLength = (typeof settings.maxLength != 'undefined') ? settings.maxLength : defaultOptions.maxLength;this.onUpdate = (typeof settings.onUpdate != 'undefined') ? settings.onUpdate : defaultOptions.onUpdate;this.initialItem = null;this.clear();};function truncate (stack, limit) {	while (stack.length > limit) {stack.shift();}}SimpleUndo.prototype.initialize = function(initialItem) {	this.stack[0] = initialItem;this.initialItem = initialItem;};SimpleUndo.prototype.clear = function() {	this.stack = [this.initialItem];this.position = 0;this.onUpdate();};SimpleUndo.prototype.save = function() {this.provider(function(current) {truncate(this.stack, this.maxLength);this.position = Math.min(this.position,this.stack.length - 1);this.stack = this.stack.slice(0, this.position + 1);this.stack.push(current);this.position++;this.onUpdate();}.bind(this));};SimpleUndo.prototype.undo = function(callback) {if (this.canUndo()) {var item =  this.stack[--this.position];this.onUpdate();	if (callback) {	callback(item);	}}};SimpleUndo.prototype.redo = function(callback) {if (this.canRedo()) {var item = this.stack[++this.position];this.onUpdate();if (callback) {	callback(item);	}}};SimpleUndo.prototype.canUndo = function() {	return this.position > 0;};SimpleUndo.prototype.canRedo = function() {return this.position < this.count();};SimpleUndo.prototype.count = function() {return this.stack.length - 1;};if (typeof module != 'undefined') {	module.exports = SimpleUndo;}if (typeof window != 'undefined') {window.SimpleUndo = SimpleUndo;}


$(document).ready(function() {


    //add css styles
    var cssStyle = document.createElement("style");
    cssStyle.innerHTML = ".editorButton {background: rgb(225, 225, 226) none repeat scroll 0% 0%;color: rgb(0, 0, 0); padding: 1px; border: medium none;} .editorButton:hover {background: rgb(193, 210, 238) none repeat scroll 0% 0%; color: rgb(0, 0, 0); padding: 0px; border: 1px solid rgb(49, 106, 197);}  #lean_overlay {position: fixed; z-index:100; top: 0px; left: 0px; height:100%; width:100%; background: #000; display: none;} #modalDiv {text-align:center; position:absolute; width: 300px; vertical-align: middle; height: 20px; top: 50%; left: 50%; padding: 30px;display: none;background: #fbfbfb;border-radius: 25px; -webkit-border-radius: 25px;box-shadow: 0px 0px 4px rgba(0,0,0,0.7);-webkit-box-shadow: 0 0 4px rgba(0,0,0,0.7); font-family:'Calibri'; font-weight:200; font-size:18px;}";
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(cssStyle);


    //////////////////////app variables
    var fontsArray = Array("Fonts", "Arial", "Arial Black", "Arial Narrow", "Book Antiqua", "Century Gothic", "Comic Sans MS", "Courier New", "Fixedsys", "Franklin Gothic Medium", "Garamond", "Georgia", "Impact", "Lucida Console", "Lucida Sans Unicode", "Microsoft Sans Serif", "Palatino Linotype", "System", "Tahoma", "Times New Roman", "Trebuchet MS", "Verdana");
    var cssFontSizeArray = Array("1.0em", "0.63em", "0.82em", "1.0em", "1.13em", "1.5em", "2em", "3em");
    var innerTextArea = document.getElementById("vB_Editor_QR_textarea");
    var fontSizesSelectDropdown = document.createElement("select");
    var fontTypesSelectDropdown = document.createElement("select");
    var lastUsedFont = null;
    var lastUsedSize = null;
    var history;
    var lsKey = "localStorageTextEKQR";
    var modalDiv;

    (function() {
        'use strict';

        var positionBeforeMainTrElement = document.querySelector("div.controlbar > table > tbody > tr");
        positionBeforeMainTrElement.setAttribute("style","display:block");

        var mainTrElement = document.createElement("tr");

        var mainTdElement = document.createElement("td");
        mainTdElement.setAttribute("colspan","100");

        var mainTableElement = document.createElement("table");
        mainTableElement.setAttribute("width","100%");

        var mainTbodyElement = document.createElement("tbody");


        var tr1Element = document.createElement("tr");
        tr1Element.setAttribute("style","display:block");

        var tr1firstTdElement = document.createElement("td");
        tr1firstTdElement.setAttribute("colspan","10");

        var tr1secondTdElement = document.createElement("td");
        tr1secondTdElement.setAttribute("colspan","4");

        var tr1thirdTdElement  = document.createElement("td");

        var tr1fourthTdElement = document.createElement("td");

        var tr1fifthTdElement = document.createElement("td");

        var tr1sixthTdElement = document.createElement("td");

        var tr1seventhTdElement = document.createElement("td");

        var tr1eighthTdElement = document.createElement("td");

        var tr1ninethTdElement = document.createElement("td");

        var tr1tenthTdElement = document.createElement("td");

        var tr1eleventhTdElement = document.createElement("td");

        var tr1towelthTdElement = document.createElement("td");

        var tr1thirteenthTdElement = document.createElement("td");


        var tr2Element = document.createElement("tr");
        tr2Element.setAttribute("style","display:block");

        var tr2firstTdElement = document.createElement("td");
        tr2firstTdElement.setAttribute("colspan","20");


        var tr3Element = document.createElement("tr");

        var tr3firstTdElement = document.createElement("td");
        tr3firstTdElement.setAttribute("style","display:block; float: right;");

        var tr3secondTdElement = document.createElement("td");
        tr3secondTdElement.setAttribute("style","display:block; float: right;");



        //***************************************
        /////////////////font type select
        //***************************************

        //type option
        // Loop through the font type array
        for (var j = 0; j < fontsArray.length; ++j) {
            fontTypesSelectDropdown[fontTypesSelectDropdown.length] = new Option(fontsArray[j],fontsArray[j]);

            fontTypesSelectDropdown.options[0].style.fontSize = "1em";
            if(j !== 0)
                fontTypesSelectDropdown.options[j].setAttribute("style","font-family:'"+fontTypesSelectDropdown.options[j].getAttribute("value")+"'; font-size:small");
        }
        //modify first option to string 'Fonts'
        fontTypesSelectDropdown.options[0].setAttribute("value",0);
        fontTypesSelectDropdown.options[0].setAttribute("disabled","disabled");
        fontTypesSelectDropdown.options[0].setAttribute("selected",true);


        //***************************************
        /////////////////font size select
        //***************************************

        // Loop through the size array
        for (var i = 0; i < 8; ++i) {
            fontSizesSelectDropdown[fontSizesSelectDropdown.length] = new Option(i, i);

            fontSizesSelectDropdown.options[i].setAttribute("style","font-size:" + cssFontSizeArray[i] + ";");
        }
        //modify first option to string 'Sizes'
        fontSizesSelectDropdown.options[0].innerHTML = "Sizes";
        fontSizesSelectDropdown.options[0].setAttribute("disabled","disabled");
        fontSizesSelectDropdown.options[0].setAttribute("selected",true);


        //***************************************
        /////////////////display | symbol
        //***************************************

        var verticalLine1 = document.createElement("img");
        verticalLine1.setAttribute("src","http://www.elakiri.com/forum/images/bluesaint/editor/separator.gif");
        verticalLine1.setAttribute("width","6");
        verticalLine1.setAttribute("height","20");


        //***************************************
        /////////////////left align symbol
        //***************************************

        var leftAlignDiv = document.createElement("div");
        leftAlignDiv.setAttribute("class","editorButton");

        var leftAlignImg = document.createElement("img");
        leftAlignImg.setAttribute("src","http://www.elakiri.com/forum/images/bluesaint/editor/justifyleft.gif");
        leftAlignImg.setAttribute("alt","Align Left");
        leftAlignImg.setAttribute("title","Align Left");
        leftAlignImg.setAttribute("width","21");
        leftAlignImg.setAttribute("height","20");

        leftAlignDiv.appendChild(leftAlignImg);

        //***************************************
        /////////////////center align symbol
        //***************************************

        var centerAlignDiv = document.createElement("div");
        centerAlignDiv.setAttribute("class","editorButton");

        var centerAlignImg = document.createElement("img");
        centerAlignImg.setAttribute("src","http://www.elakiri.com/forum/images/bluesaint/editor/justifycenter.gif");
        centerAlignImg.setAttribute("alt","Align Center");
        centerAlignImg.setAttribute("title","Align Center");
        centerAlignImg.setAttribute("width","21");
        centerAlignImg.setAttribute("height","20");

        centerAlignDiv.appendChild(centerAlignImg);

        //***************************************
        /////////////////right align symbol
        //***************************************

        var rightAlignDiv = document.createElement("div");
        rightAlignDiv.setAttribute("class","editorButton");

        var rightAlignImg = document.createElement("img");
        rightAlignImg.setAttribute("src","http://www.elakiri.com/forum/images/bluesaint/editor/justifyright.gif");
        rightAlignImg.setAttribute("alt","Align Right");
        rightAlignImg.setAttribute("title","Align Right");
        rightAlignImg.setAttribute("width","21");
        rightAlignImg.setAttribute("height","20");

        rightAlignDiv.appendChild(rightAlignImg);


        //***************************************
        /////////////////display | symbol
        //***************************************

        var verticalLine2 = document.createElement("img");
        verticalLine2.setAttribute("src","http://www.elakiri.com/forum/images/bluesaint/editor/separator.gif");
        verticalLine2.setAttribute("width","6");
        verticalLine2.setAttribute("height","20");


        //***************************************
        /////////////////YouTube symbol
        //***************************************

        var youtubeDiv = document.createElement("div");
        youtubeDiv.setAttribute("class","editorButton ");

        var youtubeImg = document.createElement("img");
        youtubeImg.setAttribute("src","http://www.elakiri.com/forum/images/editor/utube.gif");
        youtubeImg.setAttribute("alt","Wrap [YOUTUBE] tags around selected text");
        youtubeImg.setAttribute("title","Wrap [YOUTUBE] tags around selected text");
        youtubeImg.setAttribute("width","21");
        youtubeImg.setAttribute("height","20");
        youtubeImg.setAttribute("border","0");

        youtubeDiv.appendChild(youtubeImg);


        //***************************************
        /////////////////display | symbol
        //***************************************

        var verticalLine3 = document.createElement("img");
        verticalLine3.setAttribute("src","http://www.elakiri.com/forum/images/bluesaint/editor/separator.gif");
        verticalLine3.setAttribute("width","6");
        verticalLine3.setAttribute("height","20");


        //***************************************
        /////////////////Bump symbol
        //***************************************

        var bumpDiv = document.createElement("div");
        bumpDiv.setAttribute("id","bumpButton");
        bumpDiv.setAttribute("class","editorButton");

        var bumpText = document.createElement("span");
        bumpText.innerHTML = "BP";
        bumpText.setAttribute("style","color:Black; font:bold 13px Arial; cursor:default;");
        bumpText.setAttribute("width","21");
        bumpText.setAttribute("height","20");

        bumpDiv.appendChild(bumpText);

        //***************************************
        /////////////////display | symbol
        //***************************************

        var verticalLine4 = document.createElement("img");
        verticalLine4.setAttribute("src","http://www.elakiri.com/forum/images/bluesaint/editor/separator.gif");
        verticalLine4.setAttribute("width","6");
        verticalLine4.setAttribute("height","20");

        //***************************************
        /////////////////Undo symbol
        //***************************************

        var undoDiv = document.createElement("div");
        undoDiv.setAttribute("id","undoButton");
        undoDiv.setAttribute("class","editorButton");

        var undoImg = document.createElement("img");
        undoImg.setAttribute("src","http://www.elakiri.com/forum/images/bluesaint/editor/undo.gif");
        undoImg.setAttribute("alt","Undo");
        undoImg.setAttribute("title","Undo");
        undoImg.setAttribute("width","21");
        undoImg.setAttribute("height","20");
        undoImg.setAttribute("border","0");

        undoDiv.appendChild(undoImg);

        //***************************************
        /////////////////Redo symbol
        //***************************************

        var redoDiv = document.createElement("div");
        redoDiv.setAttribute("id","redoButton");
        redoDiv.setAttribute("class","editorButton");

        var redoImg = document.createElement("img");
        redoImg.setAttribute("src","http://www.elakiri.com/forum/images/bluesaint/editor/redo.gif");
        redoImg.setAttribute("alt","Redo");
        redoImg.setAttribute("title","Redo");
        redoImg.setAttribute("width","21");
        redoImg.setAttribute("height","20");
        redoImg.setAttribute("border","0");

        redoDiv.appendChild(redoImg);


        //***************************************
        /////////////////smilies
        //***************************************


        var smilieFieldset = document.createElement("fieldset");
        smilieFieldset.setAttribute("title","Smilies");

        var smilieLegend = document.createElement("legend");
        smilieLegend.innerHTML = "Smilies";

        smilieFieldset.appendChild(smilieLegend);

        var smilieTable = document.createElement("table");
        smilieTable.setAttribute("cellspacing","0");
        smilieTable.setAttribute("cellpadding","4");
        smilieTable.setAttribute("border","0");

        smilieFieldset.appendChild(smilieTable);

        var smilieTableTBody = document.createElement("tbody");

        smilieTable.appendChild(smilieTableTBody);

        var tr1smilies = document.createElement("tr");
        var tr2smilies = document.createElement("tr");

        var tr1smiliesFirstTdElement = document.createElement("td");
        var tr1smiliesSecondTdElement = document.createElement("td");
        var tr1smiliesThirdTdElement = document.createElement("td");
        var tr1smiliesFourthTdElement = document.createElement("td");
        var tr1smiliesFifthTdElement = document.createElement("td");
        var tr1smiliesSixthTdElement = document.createElement("td");
        var tr1smiliesSeventhTdElement = document.createElement("td");
        var tr1smiliesEighthTdElement = document.createElement("td");
        var tr1smiliesNinethTdElement = document.createElement("td");
        var tr1smiliesTenthTdElement = document.createElement("td");
        var tr1smiliesEleventhTdElement = document.createElement("td");
        var tr2smiliesFirstTdElement = document.createElement("td");
        var tr2smiliesSecondTdElement = document.createElement("td");
        var tr2smiliesThirdTdElement = document.createElement("td");
        var tr2smiliesFourthTdElement = document.createElement("td");
        var tr2smiliesFifthTdElement = document.createElement("td");
        var tr2smiliesSixthTdElement = document.createElement("td");
        var tr2smiliesSeventhTdElement = document.createElement("td");
        var tr2smiliesEighthTdElement = document.createElement("td");
        var tr2smiliesNinethTdElement = document.createElement("td");
        var tr2smiliesTenthTdElement = document.createElement("td");
        var tr2smiliesEleventhTdElement = document.createElement("td");


        tr1smilies.appendChild(tr1smiliesFirstTdElement);
        tr1smilies.appendChild(tr1smiliesSecondTdElement);
        tr1smilies.appendChild(tr1smiliesThirdTdElement);
        tr1smilies.appendChild(tr1smiliesFourthTdElement);
        tr1smilies.appendChild(tr1smiliesFifthTdElement);
        tr1smilies.appendChild(tr1smiliesSixthTdElement);
        tr1smilies.appendChild(tr1smiliesSeventhTdElement);
        tr1smilies.appendChild(tr1smiliesEighthTdElement);
        tr1smilies.appendChild(tr1smiliesNinethTdElement);
        tr1smilies.appendChild(tr1smiliesTenthTdElement);
        tr1smilies.appendChild(tr1smiliesEleventhTdElement);
        tr2smilies.appendChild(tr2smiliesFirstTdElement);
        tr2smilies.appendChild(tr2smiliesSecondTdElement);
        tr2smilies.appendChild(tr2smiliesThirdTdElement);
        tr2smilies.appendChild(tr2smiliesFourthTdElement);
        tr2smilies.appendChild(tr2smiliesFifthTdElement);
        tr2smilies.appendChild(tr2smiliesSixthTdElement);
        tr2smilies.appendChild(tr2smiliesSeventhTdElement);
        tr2smilies.appendChild(tr2smiliesEighthTdElement);
        tr2smilies.appendChild(tr2smiliesNinethTdElement);
        tr2smilies.appendChild(tr2smiliesTenthTdElement);
        tr2smilies.appendChild(tr2smiliesEleventhTdElement);

        smilieTableTBody.appendChild(tr1smilies);
        smilieTableTBody.appendChild(tr2smilies);


        var happySmilie = document.createElement("img");
        happySmilie.setAttribute("id","smilie_21");
        happySmilie.setAttribute("class","inlineimg");
        happySmilie.setAttribute("_moz_dirty","");
        happySmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/happy8se.gif");
        happySmilie.setAttribute("alt",":)");
        happySmilie.setAttribute("title","Happy");
        happySmilie.setAttribute("style","cursor: pointer;");

        var sadSmilie = document.createElement("img");
        sadSmilie.setAttribute("id","smilie_28");
        sadSmilie.setAttribute("class","inlineimg");
        sadSmilie.setAttribute("_moz_dirty","");
        sadSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/sad9cd.gif");
        sadSmilie.setAttribute("alt",":(");
        sadSmilie.setAttribute("title","Sad");
        sadSmilie.setAttribute("style","cursor: pointer;");

        var laughSmilie = document.createElement("img");
        laughSmilie.setAttribute("id","smilie_22");
        laughSmilie.setAttribute("class","inlineimg");
        laughSmilie.setAttribute("_moz_dirty","");
        laughSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/laugh8kb.gif");
        laughSmilie.setAttribute("alt",":lol:");
        laughSmilie.setAttribute("title","Laugh");
        laughSmilie.setAttribute("style","cursor: pointer;");

        var growlSmilie = document.createElement("img");
        growlSmilie.setAttribute("id","smilie_16");
        growlSmilie.setAttribute("class","inlineimg");
        growlSmilie.setAttribute("_moz_dirty","");
        growlSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/growl5cj.gif");
        growlSmilie.setAttribute("alt",":growl:");
        growlSmilie.setAttribute("title","Growl");
        growlSmilie.setAttribute("style","cursor: pointer;");

        var nerdSmilie = document.createElement("img");
        nerdSmilie.setAttribute("id","smilie_23");
        nerdSmilie.setAttribute("class","inlineimg");
        nerdSmilie.setAttribute("_moz_dirty","");
        nerdSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/nerd6bs.gif");
        nerdSmilie.setAttribute("alt",":nerd:");
        nerdSmilie.setAttribute("title","Nerd");
        nerdSmilie.setAttribute("style","cursor: pointer;");

        var frownSmilie = document.createElement("img");
        frownSmilie.setAttribute("id","smilie_15");
        frownSmilie.setAttribute("class","inlineimg");
        frownSmilie.setAttribute("_moz_dirty","");
        frownSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/frown3qg.gif");
        frownSmilie.setAttribute("alt",":frown:");
        frownSmilie.setAttribute("title","Frown");
        frownSmilie.setAttribute("style","cursor: pointer;");

        var noSmilie = document.createElement("img");
        noSmilie.setAttribute("id","smilie_24");
        noSmilie.setAttribute("class","inlineimg");
        noSmilie.setAttribute("_moz_dirty","");
        noSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/no6xn.gif");
        noSmilie.setAttribute("alt",":no:");
        noSmilie.setAttribute("title","No");
        noSmilie.setAttribute("style","cursor: pointer;");

        var dullSmilie = document.createElement("img");
        dullSmilie.setAttribute("id","smilie_14");
        dullSmilie.setAttribute("class","inlineimg");
        dullSmilie.setAttribute("_moz_dirty","");
        dullSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/dull8ay.gif");
        dullSmilie.setAttribute("alt",":dull:");
        dullSmilie.setAttribute("title","Dull");
        dullSmilie.setAttribute("style","cursor: pointer;");

        var ooSmilie = document.createElement("img");
        ooSmilie.setAttribute("id","smilie_25");
        ooSmilie.setAttribute("class","inlineimg");
        ooSmilie.setAttribute("_moz_dirty","");
        ooSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/oo7dt.gif");
        ooSmilie.setAttribute("alt",":oo:");
        ooSmilie.setAttribute("title","Oo");
        ooSmilie.setAttribute("style","cursor: pointer;");

        var baffledSmilie = document.createElement("img");
        baffledSmilie.setAttribute("id","smilie_13");
        baffledSmilie.setAttribute("class","inlineimg");
        baffledSmilie.setAttribute("_moz_dirty","");
        baffledSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/baffled5wh.gif");
        baffledSmilie.setAttribute("alt",":baffled:");
        baffledSmilie.setAttribute("title","Baffled");
        baffledSmilie.setAttribute("style","cursor: pointer;");

        var roflSmilie = document.createElement("img");
        roflSmilie.setAttribute("id","smilie_26");
        roflSmilie.setAttribute("class","inlineimg");
        roflSmilie.setAttribute("_moz_dirty","");
        roflSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/rofl8yi.gif");
        roflSmilie.setAttribute("alt",":rofl:");
        roflSmilie.setAttribute("title","Rofl");
        roflSmilie.setAttribute("style","cursor: pointer;");

        var pSmilie = document.createElement("img");
        pSmilie.setAttribute("id","smilie_34");
        pSmilie.setAttribute("class","inlineimg");
        pSmilie.setAttribute("_moz_dirty","");
        pSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/P.gif");
        pSmilie.setAttribute("alt",":P");
        pSmilie.setAttribute("title",":P");
        pSmilie.setAttribute("style","cursor: pointer;");

        var angrySmilie = document.createElement("img");
        angrySmilie.setAttribute("id","smilie_12");
        angrySmilie.setAttribute("class","inlineimg");
        angrySmilie.setAttribute("_moz_dirty","");
        angrySmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/angry6wn.gif");
        angrySmilie.setAttribute("alt",":angry:");
        angrySmilie.setAttribute("title","Angry");
        angrySmilie.setAttribute("style","cursor: pointer;");

        var rolleyesSmilie = document.createElement("img");
        rolleyesSmilie.setAttribute("id","smilie_27");
        rolleyesSmilie.setAttribute("class","inlineimg");
        rolleyesSmilie.setAttribute("_moz_dirty","");
        rolleyesSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/rolleyes5cz.gif");
        rolleyesSmilie.setAttribute("alt",":rolleyes:");
        rolleyesSmilie.setAttribute("title","Rolleyes");
        rolleyesSmilie.setAttribute("style","cursor: pointer;");

        var loveSmilie = document.createElement("img");
        loveSmilie.setAttribute("id","smilie_33");
        loveSmilie.setAttribute("class","inlineimg");
        loveSmilie.setAttribute("_moz_dirty","");
        loveSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/love.gif");
        loveSmilie.setAttribute("alt",":love:");
        loveSmilie.setAttribute("title","Love");
        loveSmilie.setAttribute("style","cursor: pointer;");

        var biggrinSmilie = document.createElement("img");
        biggrinSmilie.setAttribute("id","smilie_17");
        biggrinSmilie.setAttribute("class","inlineimg");
        biggrinSmilie.setAttribute("_moz_dirty","");
        biggrinSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/biggrin9gp.gif");
        biggrinSmilie.setAttribute("alt",":D");
        biggrinSmilie.setAttribute("title","Biggrin");
        biggrinSmilie.setAttribute("style","cursor: pointer;");

        var yesSmilie = document.createElement("img");
        yesSmilie.setAttribute("id","smilie_32");
        yesSmilie.setAttribute("class","inlineimg");
        yesSmilie.setAttribute("_moz_dirty","");
        yesSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/yes4lo.gif");
        yesSmilie.setAttribute("alt",":yes:");
        yesSmilie.setAttribute("title","Yes");
        yesSmilie.setAttribute("style","cursor: pointer;");

        var confusedSmilie = document.createElement("img");
        confusedSmilie.setAttribute("id","smilie_18");
        confusedSmilie.setAttribute("class","inlineimg");
        confusedSmilie.setAttribute("_moz_dirty","");
        confusedSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/confused1bb.gif");
        confusedSmilie.setAttribute("alt",":confused:");
        confusedSmilie.setAttribute("title","Confused");
        confusedSmilie.setAttribute("style","cursor: pointer;");

        var winkSmilie = document.createElement("img");
        winkSmilie.setAttribute("id","smilie_31");
        winkSmilie.setAttribute("class","inlineimg");
        winkSmilie.setAttribute("_moz_dirty","");
        winkSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/wink0st.gif");
        winkSmilie.setAttribute("alt",";)");
        winkSmilie.setAttribute("title","Wink");
        winkSmilie.setAttribute("style","cursor: pointer;");

        var coolSmilie = document.createElement("img");
        coolSmilie.setAttribute("id","smilie_19");
        coolSmilie.setAttribute("class","inlineimg");
        coolSmilie.setAttribute("_moz_dirty","");
        coolSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/cool.gif");
        coolSmilie.setAttribute("alt",":cool:");
        coolSmilie.setAttribute("title","Cool");
        coolSmilie.setAttribute("style","cursor: pointer;");

        var sorrySmilie = document.createElement("img");
        sorrySmilie.setAttribute("id","smilie_30");
        sorrySmilie.setAttribute("class","inlineimg");
        sorrySmilie.setAttribute("_moz_dirty","");
        sorrySmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/sorry8bj.gif");
        sorrySmilie.setAttribute("alt",":sorry:");
        sorrySmilie.setAttribute("title","Sorry");
        sorrySmilie.setAttribute("style","cursor: pointer;");

        var shockedSmilie = document.createElement("img");
        shockedSmilie.setAttribute("id","smilie_29");
        shockedSmilie.setAttribute("class","inlineimg");
        shockedSmilie.setAttribute("_moz_dirty","");
        shockedSmilie.setAttribute("src","http://www.elakiri.com/forum/images/smilies/sq/shocked7fl.gif");
        shockedSmilie.setAttribute("alt",":shocked:");
        shockedSmilie.setAttribute("title","Shocked");
        shockedSmilie.setAttribute("style","cursor: pointer;");


        //***************************************
        /////////////////Save Preset symbol
        //***************************************

        var savePresetDiv = document.createElement("div");
        savePresetDiv.setAttribute("id","savePresetButton");
        savePresetDiv.setAttribute("class","editorButton");
        savePresetDiv.setAttribute("style","cursor:pointer;");

        var saveText = document.createElement("span");
        saveText.innerHTML = "SAVE";
        saveText.setAttribute("style","color:Black; font:bold 13px Arial; cursor:pointer; padding-left:5px; padding-right:5px");
        saveText.setAttribute("title","Save Preset");
        saveText.setAttribute("width","21");
        saveText.setAttribute("height","20");

        savePresetDiv.appendChild(saveText);

        //***************************************
        /////////////////Reset Preset symbol
        //***************************************

        var resetPresetDiv = document.createElement("div");
        resetPresetDiv.setAttribute("id","resetPresetButton");
        resetPresetDiv.setAttribute("class","editorButton");
        resetPresetDiv.setAttribute("style","cursor:pointer;");

        var resetText = document.createElement("span");
        resetText.innerHTML = "RESET";
        resetText.setAttribute("style","color:Black; font:bold 13px Arial; cursor:pointer; padding-left:5px; padding-right:5px");
        resetText.setAttribute("title","Reset Preset");
        resetText.setAttribute("width","21");
        resetText.setAttribute("height","20");

        resetPresetDiv.appendChild(resetText);


        tr1smiliesFirstTdElement.appendChild(happySmilie);
        tr1smiliesSecondTdElement.appendChild(sadSmilie);
        tr1smiliesThirdTdElement.appendChild(laughSmilie);
        tr1smiliesFourthTdElement.appendChild(growlSmilie);
        tr1smiliesFifthTdElement.appendChild(nerdSmilie);
        tr1smiliesSixthTdElement.appendChild(frownSmilie);
        tr1smiliesSeventhTdElement.appendChild(noSmilie);
        tr1smiliesEighthTdElement.appendChild(dullSmilie);
        tr1smiliesNinethTdElement.appendChild(ooSmilie);
        tr1smiliesTenthTdElement.appendChild(baffledSmilie);
        tr1smiliesEleventhTdElement.appendChild(roflSmilie);
        tr2smiliesFirstTdElement.appendChild(pSmilie);
        tr2smiliesSecondTdElement.appendChild(angrySmilie);
        tr2smiliesThirdTdElement.appendChild(rolleyesSmilie);
        tr2smiliesFourthTdElement.appendChild(loveSmilie);
        tr2smiliesFifthTdElement.appendChild(biggrinSmilie);
        tr2smiliesSixthTdElement.appendChild(yesSmilie);
        tr2smiliesSeventhTdElement.appendChild(confusedSmilie);
        tr2smiliesEighthTdElement.appendChild(winkSmilie);
        tr2smiliesNinethTdElement.appendChild(coolSmilie);
        tr2smiliesTenthTdElement.appendChild(sorrySmilie);
        tr2smiliesEleventhTdElement.appendChild(shockedSmilie);

        tr1firstTdElement.appendChild(fontTypesSelectDropdown);
        tr1secondTdElement.appendChild(fontSizesSelectDropdown);
        tr1thirdTdElement.appendChild(verticalLine1);
        tr1fourthTdElement.appendChild(leftAlignDiv);
        tr1fifthTdElement.appendChild(centerAlignDiv);
        tr1sixthTdElement.appendChild(rightAlignDiv);
        tr1seventhTdElement.appendChild(verticalLine2);
        tr1eighthTdElement.appendChild(youtubeDiv);
        tr1ninethTdElement.appendChild(verticalLine3);
        tr1tenthTdElement.appendChild(bumpDiv);
        tr1eleventhTdElement.appendChild(verticalLine4);
        tr1towelthTdElement.appendChild(undoDiv);
        tr1thirteenthTdElement.appendChild(redoDiv);
        tr2firstTdElement.appendChild(smilieFieldset);
        tr3firstTdElement.appendChild(savePresetDiv);
        tr3secondTdElement.appendChild(resetPresetDiv);

        tr1Element.appendChild(tr1firstTdElement);
        tr1Element.appendChild(tr1secondTdElement);
        tr1Element.appendChild(tr1thirdTdElement);
        tr1Element.appendChild(tr1fourthTdElement);
        tr1Element.appendChild(tr1fifthTdElement);
        tr1Element.appendChild(tr1sixthTdElement);
        tr1Element.appendChild(tr1seventhTdElement);
        tr1Element.appendChild(tr1eighthTdElement);
        tr1Element.appendChild(tr1ninethTdElement);
        tr1Element.appendChild(tr1tenthTdElement);
        tr1Element.appendChild(tr1eleventhTdElement);
        tr1Element.appendChild(tr1towelthTdElement);
        tr1Element.appendChild(tr1thirteenthTdElement);
        tr2Element.appendChild(tr2firstTdElement);
        tr3Element.appendChild(tr3firstTdElement);
        tr3Element.appendChild(tr3secondTdElement);

        mainTbodyElement.appendChild(tr1Element);
        mainTbodyElement.appendChild(tr2Element);
        mainTbodyElement.appendChild(tr3Element);

        mainTableElement.appendChild(mainTbodyElement);
        mainTdElement.appendChild(mainTableElement);
        mainTrElement.appendChild(mainTdElement);

        var parentNode = positionBeforeMainTrElement.parentNode;

        parentNode.insertBefore(mainTrElement, positionBeforeMainTrElement.nextSibling);


        //***************************************
        /////////////////Event Listeners
        //***************************************

        /////////////////buttons

        fontSizesSelectDropdown.addEventListener('change',fontTypeOrSizeSelect("size",fontSizesSelectDropdown), false);
        fontTypesSelectDropdown.addEventListener('change',fontTypeOrSizeSelect("font",fontTypesSelectDropdown), false);
        leftAlignDiv.addEventListener('click',surroundSelectionEvent("[LEFT]","[/LEFT]"), false);
        centerAlignDiv.addEventListener('click',surroundSelectionEvent("[CENTER]","[/CENTER]"), false);
        rightAlignDiv.addEventListener('click',surroundSelectionEvent("[RIGHT]","[/RIGHT]"), false);
        youtubeDiv.addEventListener('click',surroundSelectionEvent("[YOUTUBE]", "[/YOUTUBE]"), false);
        bumpDiv.addEventListener('click',modifyText("Bump"), false);
        savePresetDiv.addEventListener('click', savePresetButtonEvent(), false);
        resetPresetDiv.addEventListener('click', resetPresetButtonEvent(), false);

        /////////////////smilies

        happySmilie.addEventListener('click',modifyText(":)"), false);
        sadSmilie.addEventListener('click',modifyText(":("), false);
        laughSmilie.addEventListener('click',modifyText(":lol:"), false);
        growlSmilie.addEventListener('click',modifyText(":growl:"), false);
        nerdSmilie.addEventListener('click',modifyText(":nerd:"), false);
        frownSmilie.addEventListener('click',modifyText(":frown:"), false);
        noSmilie.addEventListener('click',modifyText(":no:"), false);
        dullSmilie.addEventListener('click',modifyText(":dull:"), false);
        ooSmilie.addEventListener('click',modifyText(":oo:"), false);
        baffledSmilie.addEventListener('click',modifyText(":baffled:"), false);
        roflSmilie.addEventListener('click',modifyText(":rofl:"), false);
        pSmilie.addEventListener('click',modifyText(":P"), false);
        angrySmilie.addEventListener('click',modifyText(":angry:"), false);
        rolleyesSmilie.addEventListener('click',modifyText(":rolleyes:"), false);
        loveSmilie.addEventListener('click',modifyText(":love:"), false);
        biggrinSmilie.addEventListener('click',modifyText(":D"), false);
        yesSmilie.addEventListener('click',modifyText(":yes:"), false);
        confusedSmilie.addEventListener('click',modifyText(":confused:"), false);
        winkSmilie.addEventListener('click',modifyText(";)"), false);
        coolSmilie.addEventListener('click',modifyText(":cool:"), false);
        sorrySmilie.addEventListener('click',modifyText(":sorry:"), false);
        shockedSmilie.addEventListener('click',modifyText(":shocked:"), false);



        //***************************************
        /////////////////Save/Reset Modal
        //***************************************
        var mainModal = document.createElement("a");
        mainModal.setAttribute("id","modal");
        mainModal.setAttribute("name","OpenModal");
        mainModal.setAttribute("style","display:none");
        mainModal.setAttribute("href","#modalDiv");

        modalDiv = document.createElement("div");
        modalDiv.setAttribute("id","modalDiv");

        var pageBody = document.querySelector("body");
        pageBody.appendChild(mainModal);
        pageBody.appendChild(modalDiv);

        $("#modal").leanModal();


        //insert user code when document load
        if(localStorage.getItem(lsKey))
            innerTextArea.value += localStorage.getItem(lsKey);

    })();


    function fontTypeOrSizeSelect(fontOrSize,elem) {
        return function(event) {

            if(fontOrSize === "font")
                surroundSelection("[FONT=\"" + elem.value + "\"]", "[/FONT]");
            else if(fontOrSize === "size")
                surroundSelection("[SIZE=\"" + elem.value + "\"]", "[/SIZE]");

            elem.selectedIndex = 0;
        };
    }


    function executeCommand(command) {
        return function(event) {

            document.execCommand(command, false , null);

        };
    }


    function surroundSelectionEvent(textBefore, textAfter) {
        return function(event) {

            surroundSelection(textBefore, textAfter);

        };
    }


    function modifyText(text) {
        return function(event) {

            text = text || '';

            if (innerTextArea.selectionStart || innerTextArea.selectionStart === 0) {
                var startPos = innerTextArea.selectionStart;
                var endPos = innerTextArea.selectionEnd;
                innerTextArea.value = innerTextArea.value.substring(0, startPos) + text + innerTextArea.value.substring(endPos, innerTextArea.value.length);
                innerTextArea.selectionStart = startPos + text.length;
                innerTextArea.selectionEnd = startPos + text.length;
                innerTextArea.focus();
            } else {
                innerTextArea.value += text;
                innerTextArea.focus();
            }

        };
    }


    function surroundSelection(textBefore, textAfter){
        if (document.selection) {

            innerTextArea.focus();
            document.selection.createRange().text = textBefore + document.selection.createRange().text + textAfter;


        } else if (innerTextArea.selectionStart || innerTextArea.selectionStart == '0') {

            var startPos = innerTextArea.selectionStart;
            var endPos = innerTextArea.selectionEnd;
            innerTextArea.value = innerTextArea.value.substring(0, startPos)+ textBefore + innerTextArea.value.substring(startPos, endPos)+ textAfter + innerTextArea.value.substring(endPos, innerTextArea.value.length);
            innerTextArea.focus();
            innerTextArea.selectionStart = startPos + textBefore.length;
            innerTextArea.selectionEnd = endPos + textBefore.length;
        }

        //save changes to undo/redo history
        history.save();
    }

    //undo redo functions in jquery
    //when surrounding elements with javascript ctrl+z and ctrl+y doesn't work
    //jQuery has been used to fix this issue

    function updateButtons(history) {
        $('#undoButton').attr('disabled',!history.canUndo());
        $('#redoButton').attr('disabled',!history.canRedo());
    }

    function setEditorContents(contents) {
        $(innerTextArea).val(contents);
    }


    $(function(){
        history = new SimpleUndo({
            maxLength: 200,
            provider: function(done) {
                done($(innerTextArea).val());
            },
            onUpdate: function() {
                //onUpdate is called in constructor, making history undefined
                if (!history) return;

                updateButtons(history);
            }
        });

        $('#undoButton').click(function() {
            history.undo(setEditorContents);
        });
        $('#redoButton').click(function() {
            history.redo(setEditorContents);
        });

        $("[id*='vB_Editor_QR_cmd']").click(function() {
            history.save();
        });

        $("[id*='smilie']").click(function() {
            history.save();
        });
        $("#bumpButton").click(function() {
            history.save();
        });

        $(innerTextArea).on('input', function() {
            history.save();
        });

        //waiting for ajax to load (when user click on color)
        waitForKeyElements ("#vB_Editor_QR_popup_forecolor_menu", addEventListenerToColorPallet);

        updateButtons(history);
    });


    function addEventListenerToColorPallet () {
        $("[id*='vB_Editor_QR_color']").click(function() {
            history.save();
        });
    }


    function savePresetButtonEvent(){
        return function(event){
            try{
                localStorage.setItem(lsKey, innerTextArea.value);

                modalDiv.innerHTML = "Your preset saved successfully!";
                $('#modal').click();
            }catch(err){}
        };
    }


    function resetPresetButtonEvent(){
        return function(event){
            try{
                localStorage.removeItem(lsKey);

                modalDiv.innerHTML = "Your preset deleted!";
                $('#modal').click();
            }catch(err){}
        };

    }

});
