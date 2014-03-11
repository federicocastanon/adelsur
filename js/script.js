function resizeAltura() {
	$("#cuerpo").css({
		"height" : $("#tabContent").height() * 1.1
	});

}


$(document).ready(function() {

	$("#header").click(function() {
		window.location.href = 'index.html';
	});
	$("#header").css({
		cursor : 'hand'
	});
	/* This code is executed after the DOM has been completely loaded */

	var paginaActual = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
	/* Defining an array with the tab text and AJAX pages: */
	var Tabs = [];
	var colors = [];
	var topLineColor = [];
	if(paginaActual == 'institucional.html') {
		Tabs = {
			'Calendario' : 'calendario.html',
			'Novedades' : 'institucional/novedades.html',
			'Admisiones' : 'institucional/admisiones.html',
			'Documentación' : 'institucional/documentacion.html'
		};
		/* The available colors for the tabs: */
		colors = ['blue', 'green', 'red', 'orange'];

		/* The colors of the line above the tab when it is active: */
		topLineColor = {
			blue : 'lightblue',
			green : 'lightgreen',
			red : 'red',
			orange : 'orange'
		};
	} else if (paginaActual == 'formacion.html') {
		Tabs = {
			'Nivel Inicial' : 'formacion/inicial.html',
			'Nivel Primario' : 'formacion/primario.html',
			'Inglés' : 'formacion/ingles.html',
			'Informática' : 'formacion/informatica.html',
			'Educación Física' : 'formacion/edfisica.html',
			'Extraescolares' : 'formacion/extraescolar.html'
		};

		/* The available colors for the tabs: */
		colors = ['blue', 'green', 'red', 'orange', 'yellow'];

		/* The colors of the line above the tab when it is active: */
		topLineColor = {
			blue : 'lightblue',
			green : 'lightgreen',
			red : 'red',
			orange : 'orange',
			yellow: 'yellow'
		};
	}  else if (paginaActual == 'vision.html') {
		Tabs = {
			'Proyecto' : 'vision/proyecto.html',			
			'Como aprendemos' : 'vision/aprendemos.html',
			'Proyectos Institucionales' : 'vision/proyectos.html',
			'Inclusión' : 'vision/inclusion.html'
		}		;

		/* The available colors for the tabs: */
		colors = ['blue', 'green', 'red', 'orange', 'yellow'];

		/* The colors of the line above the tab when it is active: */
		topLineColor = {
			blue : 'lightblue',
			green : 'lightgreen',
			red : 'red',
			orange : 'orange',
			yellow: 'yellow'
		};
	}else if (paginaActual == 'extraescolar.html') {
		Tabs = {
			'Convivencia' : 'masque/convivencia.html',
			'Salidas' : 'masque/salidas.html',
			'Naturaleza' : 'masque/naturaleza.html',
			'Familia' : 'masque/familia.html',
			'Ex Alumnos' : 'masque/exalumnos.html'
		}		;

		/* The available colors for the tabs: */
		colors = ['blue', 'green', 'red', 'orange', 'yellow'];

		/* The colors of the line above the tab when it is active: */
		topLineColor = {
			blue : 'lightblue',
			green : 'lightgreen',
			red : 'red',
			orange : 'orange',
			yellow: 'yellow'
		};
	}else if (paginaActual == 'index.html') {
		$('#cuerpo > .superior').height($(document).height() * 0.37);
		$('#carrousel').bjqs({
            height      : $(document).height() * 0.36,
            width       : $(document).width() * 0.6,
            showmarkers : false, 
            responsive  : true
          });
          $('.inferior').height($(document).height() * 0.26);
          $('.imgHome > img').height($(document).height() * 0.08);
	}
	
	/* Looping through the Tabs object: */
	var z = 0;
	$.each(Tabs, function(i, j) {
		/* Sequentially creating the tabs and assigning a color from the array: */

		var tmp = $('<li><a href="#" class="tab ' + colors[(z++ % 4)] + '">' + i + ' <span class="left" /><span class="right" /></a></li>');

		/* Setting the page data for each hyperlink: */

		tmp.find('a').data('page', j);

		/* Adding the tab to the UL container: */
		$('ul.tabContainer').append(tmp);
	})
	/* Caching the tabs into a variable for better performance: */
	var the_tabs = $('.tab');

	the_tabs.click(function(e) {

		/* "this" points to the clicked tab hyperlink: */
		var element = $(this);

		/* If it is currently active, return false and exit: */
		if(element.find('#overLine').length)
			return false;

		/* Detecting the color of the tab (it was added to the class attribute in the loop above): */

		var bg = element.attr('class').replace('tab ', '');

		/* Removing the line: */
		$('#overLine').remove();

		/* Creating a new div element with jQuery 1.4 by passing an additional object parameter: */

		$('<div>', {
			id : 'overLine',
			css : {
				display : 'none',
				width : element.outerWidth() - 2,
				background : topLineColor[bg] || 'white'
			}
		}).appendTo(element).fadeIn('slow');

		/* Checking whether the AJAX fetched page has been cached: */

		if(!element.data('cache')) {
			/* If no cache is present, show the gif preloader and run an AJAX request: */
			$('#contentHolder').html('<img src="css/img/ajax_preloader.gif" width="64" height="64" class="preloader" />');

			$.get(element.data('page'), function(msg) {
				$('#contentHolder').html(msg);
				resizeAltura();
				/* After page was received, add it to the cache for the current hyperlink: */
				element.data('cache', msg);
			});
		} else {
			$('#contentHolder').html(element.data('cache'));
			resizeAltura();
		}

		e.preventDefault();
	})
	/* Emulating a click on the first tab, so that the content area is not empty: */
	the_tabs.eq(0).click();

});
