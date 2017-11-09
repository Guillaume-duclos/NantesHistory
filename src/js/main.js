import '../style.css';
import tilt from 'tilt.js';
import mousewheel from 'jquery-mousewheel';
import { Event } from './Event.js';
import { Magnifier } from './Magnifier.js';

//========================== GLOBALS VARIABLES ==========================

const nbScreen = $('.screen').length;
const wrapperWidth = nbScreen * 100;
const screenWidth = 100 / nbScreen;
const maxScroll = screenWidth * nbScreen;

var activeScreen = 1;

$('#wrapper').css('width', wrapperWidth + '%');
$('.screen').css('width', screenWidth + '%');

//========================== TIMELINE ==========================

var li = $('#timeline ul li:nth-child(' + activeScreen + ')').css('opacity', '1');

$('#timeline ul li').click(function() {
	console.log($(this).index());
});

//========================== ZOOM ==========================

$('.up-scale').click(function() {
	$(this)
		.parent()
		.css('width', '95%');
	$(this)
		.parent()
		.css('border-right', '0px');
	$(this)
		.parent()
		.siblings('.desc')
		.css('width', '0%');
	$('body').css('background-color', '#323232');
	$(this).css('display', 'none');
});

$('.up-scale-resp').click(function() {
	$(this)
		.prev()
		.addClass('height');
	$(this)
		.prev()
		.children()
		.addClass('height');
	$(this)
		.prev()
		.children()
		.removeClass('img-doc-width');
});

$('.img-doc-resp').click(function() {
	$(this)
		.parent()
		.removeClass('height');
	$(this).addClass('img-doc-width');
	$(this).removeClass('height');
});

$('.img-doc').click(function() {
	rescale();
});

//========================== ARROW EVENT ==========================

var count = 0;

$('#button').click(function() {
	count += screenWidth;
	activeScreen++;
	$('#home').css('margin-left', '-' + count + '%');
	$('.screen').css('transition', '1s');
	timeline();
});

$('.left-arrow').click(function() {
	count -= screenWidth;
	activeScreen--;
	$('#home').css('margin-left', '-' + count + '%');
	$('.screen').css('transition', '1s');
	timeline();
	rescale();
	rescaleResp();
});

$('.right-arrow').click(function() {
	count += screenWidth;
	activeScreen++;
	$('#home').css('margin-left', '-' + count + '%');
	$('.screen').css('transition', '1s');
	timeline();
	rescale();
	rescaleResp();
});

//========================== SCROLL EVENT ==========================

$('body').on('mousewheel', function(event) {
	if (event.deltaY < 0) {
		if (count < 100 - screenWidth) {
			count += screenWidth;
			activeScreen++;
			$('#home').css('margin-left', '-' + count + '%');
			timeline();
			rescale();
			rescaleResp();
		}
	} else {
		count -= screenWidth;
		activeScreen--;
		$('#home').css('margin-left', '-' + count + '%');
		timeline();
		rescale();
		rescaleResp();
	}
	if (count < 0) {
		count = 0;
		activeScreen = 1;
	}
});

function timeline() {
	$('#timeline ul li').css('opacity', 0.5);
	$('#timeline ul li:nth-child(' + activeScreen + ')').css('opacity', 1);
}

function rescale() {
	$('.doc').css('width', '48%');
	$('.doc').css('border-right', '1px solid #bdc3c7');
	$('.desc').css('width', '48%');
	$('body').css('background-color', '#ecf0f1');
	$('.up-scale').css('display', 'block');
}

function rescaleResp() {
	$('.img-doc-resp')
		.parent()
		.removeClass('height');
	$('.img-doc-resp').addClass('img-doc-width');
	$('.img-doc-resp').removeClass('height');
}

$('.screen:last-child .right-arrow')
	.parent()
	.css('display', 'none');
