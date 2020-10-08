"use strict";

let longTermStorage = {};
let shortTermStorage = {};

let bStorageSupported = false;
let popup;

function Initialize()
{
    if(typeof(Storage) !== "undefined")
    {
        bStorageSupported = true;
        let tempLongTerm = window.localStorage.getItem("longTermStorage");
        if(tempLongTerm)
        {
            longTermStorage = JSON.parse(tempLongTerm);
        }
        let tempShortTerm = window.sessionStorage.getItem("shortTermStorage");
        if(tempShortTerm)
        {
            shortTermStorage = JSON.parse(tempShortTerm);
        }
    }
    SetInputName();
    SetInputMenuName();
    popup = new Popup();
}

function SaveStorage()
{
    if(bStorageSupported)
    {
        window.localStorage.setItem("longTermStorage",JSON.stringify(longTermStorage));
        window.sessionStorage.setItem("shortTermStorage",JSON.stringify(shortTermStorage));
    }
}

function OnResetStorageClick()
{
    if(bStorageSupported)
    {
        window.localStorage.removeItem("longTermStorage");
        window.sessionStorage.removeItem("shortTermStorage");
    }
}

function GetLongTerm(key)
{
    return longTermStorage[key] ? longTermStorage[key] : "";
}

function GetShortTerm(key)
{
    return shortTermStorage[key] ? shortTermStorage[key] : "";
}

function SetInputName()
{
    document.getElementById("inputName").value = GetLongTerm("Name");
}

function OnInputNameChange()
{
    let name = document.getElementById("inputName").value;
    longTermStorage.Name = name;
    SaveStorage();
}

function SetInputMenuName()
{
    document.getElementById("inputMenuName").value = GetShortTerm("MenuName");
}

function OnInputMenuNameChange()
{
    let menuName = document.getElementById("inputMenuName").value;
    shortTermStorage.MenuName = menuName;
    SaveStorage();
}

class Popup
{
    constructor()
    {
        window.onkeydown = function(event) 
        { 
            if(event.key === "Escape") 
            {
                popup.Close();
            } 
        }
        this.GetCloseBtn().onclick = function() { popup.Close(); }
    }

    GetModal()
    {
        return document.getElementById("popup");
    }

    GetCloseBtn()
    {
        return this.GetModal().getElementsByClassName("modal-close")[0];
    }

    Close()
    {
        popup.GetModal().style.display = "none";
    }

    Show()
    {
        popup.GetModal().style.display = "block";
    }
}