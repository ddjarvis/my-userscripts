// ==UserScript==
// @name         [YP] Collections Title
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the world!
// @author       You
// @match        https://www.youporn.com/collections/videos/*
// @include      /https:\/\/www\.youporn\.com\/collections\/videos\/\d+\//
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youporn.com
// @grant        none
// @require      https://cdn.jsdelivr.net/gh/ddjarvis/JS-Snippets@master/js-functions/copyText.min.js
// ==/UserScript==

// Source: https://github.com/ddjarvis/my-userscripts/blob/YP--Collections-Title/site/youporn.com/%5BYP%5D%20Collections%20Title.user.js

(function() {
    'use strict';

    // Your code here...

function main () {
	setPageName();
	addPlaylistName();
	setPlaylistName();
	setPlaylistAction();
}


function setPageName() {
	var ypcPrefix = '[YP Collections]';
	var ypcName = document.querySelector('div.collection-infos h4').innerText.replace('Collection: ','');
	var ypcBy = document.querySelector('.collectionBy a')?.innerText;
	var ypcId = document.URL.match(/(?<=collections\/videos\/)\d+/)[0];
	var ypcPage = `${ypcPrefix} ${ypcName} «${ypcBy}» {${ypcId}}`;
	document.title = ypcPage;
}


function addPlaylistName() {
	var plnCheck = document.querySelectorAll('.collection-infos div.playlistName').length;
	if(plnCheck >= 1) { return; }

	const plName = new DocumentFragment();
	const plnBr = document.createElement('br');
	const plnWs = document.createTextNode('\u00A0');
	const plnBox = document.createElement('div');
	const plnLabel = document.createElement('span');
	const plnName = document.createElement('a');
	const plnCopy = document.createElement('a');
	let plnText, plnLabelText, plnNameText, plnCopyText;
	plnText, plnLabelText = plnNameText = plnCopyText = '';

	plName.appendChild(plnBox);
	plName.appendChild(plnBr);
	plnBox.classList.add('playlistName');

	plnBox.appendChild(plnLabel);
	plnBox.appendChild(plnWs);
	plnBox.appendChild(plnName);
	plnBox.appendChild(plnWs);
	plnBox.appendChild(plnCopy);

	plnText = plnLabelText = 'Playlist Name: ';
	plnLabel.appendChild(document.createTextNode(plnText));
	plnLabel.classList.add('pln-label');

	plnText = plnNameText = 'PLN_Placeholder';
	plnName.appendChild(document.createTextNode(plnText));
	plnName.classList.add('pln-action');
	plnName.id = 'pln-name';

	plnText = plnCopyText = '(Copy)';
	plnCopy.appendChild(document.createTextNode(plnText));
	plnCopy.classList.add('pln-action');
	plnCopy.id = 'pln-copy';

	const plnBefore = document.querySelector('.collection-infos div.collectionBy');
	const plnParent = plnBefore.parentElement;
	plnParent.insertBefore(plName, plnBefore);
}

function setPlaylistName() {
	const id = getYPC().id;
	const page = getYPC().page;
	let plname = ['YPC',id,page].filter(x=>x).join('-');
	document.getElementById('pln-name').innerText = plname;
}

function copyPlaylistName() {
	setPlaylistName();
	const plName = document.getElementById('pln-name')?.innerText;
	copyText(plName);
}

function setPlaylistAction() {
	const plnAction = document.querySelectorAll('a.pln-action');
	plnAction.forEach(x => x.onclick = x.onclick ?? copyPlaylistName);
}

function getYPC() {
	const url = document.URL;
	const r_site = '.+youporn.com', r_path = 'collections/videos';
	const r_sitepath = [r_site,r_path].join('/');
	const r_num = '\\d+', r_query = '?.*page=';
	const r_lb_id = `(?<=^${r_sitepath}/)`;
	const r_lb_page = `(?<=^${r_sitepath}/${r_num}/${r_query})`;
	const reg_id = new RegExp(r_lb_id + r_num);
	const reg_page = new RegExp(r_lb_page + r_num);
	const ypc_id = url.match(reg_id);
	const ypc_page = url.match(reg_page);
	return {
		id: ypc_id?.[0],
		page: ypc_page?.[0]
	}
}


main();

})();

