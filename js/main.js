$(function(){

	$('ul#components > li > a').click(function(){
		return false;
	});
	/*var int_setTela = setInterval(),
		int_setCode = setInterval(setCode, 300);
	//var getHtmlCode = setInterval(atualiza_tey, 2000);

	function setCode () {
		editor.setValue($('#tela').html());
	}
	function setTela() {
		$('#tela').html($('#html-code').val());
	}*/

	/*editor.click(function(){
		int_setTela = setInterval(setTela, 300);
		clearInterval(int_setCode);
	});
	$('#editor').blur(function(){
		int_setCode = setInterval(setCode, 300);
		clearInterval(int_setTela);
	});
	$('#editor').keydown(function(){
		clearProperties();
	});*/

	$('#refresh-code').click(function(){
		var code = $('#tela').html().trim();
		editor.setValue(code);
	});

	$('#slc-viewport').change(function(){
		var width = '100%',
			$this = $(this);
		$('#tela').removeClass('simulate-sm');	
		$('#tela').removeClass('simulate-xs');	
		switch($this.val()) {
			case 'lg':
				width = '100%';
			break;
			case 'md':
				width = '100%';
			break;
			case 'sm':
				$('#tela').addClass('simulate-sm');
				width = '80%';
			break;
			case 'xs':
				$('#tela').addClass('simulate-xs');
				width = '50%';
			break;
		};
		$('#tela').animate({width: width});
	});

	var $current_component;
	var current_family = [];
	
	var btnTypes = [
		{'label': 'Default', 'value': 'btn-default'},
		{'label': 'Primary', 'value': 'btn-primary'},
		{'label': 'Success', 'value': 'btn-success'},
		{'label': 'Info', 'value': 'btn-info'},
		{'label': 'Warning', 'value':'btn-warning'},
		{'label': 'Danger', 'value':'btn-danger'},
		{'label': 'Link', 'value': 'btn-link'}
	];
	var btnSizes = [
		{'label': 'Normal', 'value': ''},
		{'label': 'Extra small', 'value': 'btn-xs'},
		{'label': 'Small', 'value': 'btn-sm'},
		{'label': 'Large', 'value': 'btn-lg'}
	];
	var floatOptions = [
		{'label': 'None', 'value': ''},
		{'label': 'Left', 'value': 'pull-left'},
		{'label': 'Right', 'value': 'pull-right'}
	];
	var wellSizeOptions = [
		{'label': 'Regular', 'value': ''},
		{'label': 'Small', 'value': 'well-sm'},
	];
	var properties = [
		{
			type: 'well',
			itens: [
				{
					label: 'Size',
					type: 'select',
					behavior: 'select-class',
					options: wellSizeOptions
				},
				{
					label: 'Remover',
					type: 'button',
					behavior: 'remove-self',
					classes: 'btn-danger btn-sm'
				}
			]
		},
		{
			type: 'grid-row',
			itens: [
				{
					label: 'Insert col',
					type: 'button',
					behavior: 'add-grid-col'
				},
				{
					label: 'Remover',
					type: 'button',
					behavior: 'remove-self'
				}
			]
		},
		{
			type: 'paragraph',
			itens: [
				{
					label: 'Texto',
					type: 'textarea',
					behavior: 'property-text'
				},
				{
					label: 'Remover',
					type: 'button',
					behavior: 'remove-self'
				}
			]
		},
		{
			type: 'grid-col',
			itens: [
				{
					label: 'Width',
					type: 'textarea',
					behavior: 'extra-class'
				},
				{
					label: 'Remover',
					type: 'button',
					behavior: 'remove-self'
				}
			]
		},
		{
			type: 'button',
			itens: [
				{
					label: 'Duplicate',
					type: 'button',
					behavior: 'duplicate-self'
				},
				{
					label: 'Remover',
					type: 'button',
					behavior: 'remove-self'
				},
				{
					label: 'Block',
					type: 'checkbox',
					behavior: 'switch-class-checkbox',
					classToSwitch: 'btn-block'
				},
				{
					label: 'Text',
					type: 'text',
					behavior: 'property-text'
				},
				{
					label: 'Extra class',
					type: 'textarea',
					behavior: 'extra-class'
				},
				{
					label: 'Type',
					type: 'select',
					behavior: 'select-class',
					options: btnTypes
				},
				{
					label: 'Size',
					type: 'select',
					behavior: 'select-class',
					options: btnSizes
				},
				{
					label: 'Float',
					type: 'select',
					behavior: 'select-class',
					options: floatOptions
				},
			]
		}
	];
	
	var components = [
		{
			type: 'button',
			content: '<button type="button" class="btn btn-default" name="button">\n\tButton\n</button>\n'
		},
		{
			type: 'button-group',
			content: '<div class="btn-group" name="btn-group"><button type="button" name="button" class="btn btn-default">Button</button><button type="button" class="btn btn-default" name="button">Button</button></div>'
		},
		{
			type: 'well',
			content: '<div class="well connected-custom connected" name="well">\n\t<p name="paragraph">Hello World!</p>\n</div>\n'
		},
		{
			type: 'label',
			content: '<label class="label label-info components" name="label">Label</label>'
		},
		{
			type: 'alert',
			content: '<div class="alert alert-success" data-type="alert" name="alert">Sucesso!</div>'
		},
		{
			type: 'header',
			content: '<h3 name="header" class="components" data-type="header">Header 3</h3>'
		},
		{
			type: 'paragraph',
			content: '<p name="paragraph" class="components">Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.</p>'
		},
		{
			type: 'grid-row',
			content: '<div class="row editor-grid-row" name="grid-row">\n\t<div class="editor-grid-col col-md-6 connected-custom connected" name="grid-col">\n\t\t<p name="paragraph">col-md-6</p>\n\t</div>\n\t<div class="col-md-6 connected-custom connected editor-grid-col" name="grid-col">\n\t\t<p name="paragraph">col-md-6</p>\n\t</div>\n</div>\n'
		}
	];
	
	var opts = {
		cancel: '',
		helper: 'clone',
		connectWith: '#tela, .connected-custom',
		stop: function(event, ui){
			replaceWith(ui.item.attr('data-type'), ui.item);
			$('.connected-custom').sortable(opts);
		}
	}
	
	$( "#tela" ).sortable({
		connectWith: ".connected",
		cancel: '',
		helper: 'clone',
		stop: function(event, ui){
			replaceWith(ui.item.attr('data-type'), ui.item);
			$('.connected-custom').sortable(opts);
		}
	}).disableSelection();
	
	$( "#components li" ).draggable({
		helper: 'clone',
		connectToSortable: '.connected',
	}).disableSelection();
	
	function replaceWith(type, item) {
		$.each(components, function(index, value){
			if (value.type == type) {
				item.replaceWith(value.content);
			}
		});
	}
	
	$('#tela').on('click', '*', function(e){
		e.stopPropagation();
		var $this = $(this);
		$current_component = $this;
		buildProperties();
		getFamily($this);
		console.log()
/*		e.stopPropagation();
		var w = $(this).width();
		var h = $(this).height();
		var pos = $(this).position();
		var top = pos.top + h;
		console.log(h);
		var type = $(this).attr('data-type');
		$selector.text(type).css({left: pos.left, top: pos.top}).show();*/
	});
	$('#family').on('click', '#item-family', function(){
		var index = $(this).attr('data-index');
		$current_component = current_family[index];
		buildProperties();
	});
	function getFamily($this){
		var parents = $this.parents();

		var retorno = [];
		current_family = [];
		//O zero vai ser o atual
		var total = parents.length;
		var i = total;
		//Pega somente os dentro do body
		$.each(parents, function(index, value){
			if ($(value).attr('id') != 'tela') {
				current_family.push($(value));
			} else {
				return false;
			};
		});
		current_family.reverse().push($current_component);
		$.each(current_family, function(index, value){
			retorno.push('<span data-index="'+index+'" id="item-family">'+value.attr('name')+'</span>');
		});
		//console.log(retorno);
		$('#family').html('').html(retorno.join(' <span class="glyphicon glyphicon-chevron-right"></span> '));
	}
	$('#tela').click(function(){
		$selector.hide();
	});
	$('#properties').on('click', 'input#switch-class-checkbox', function(){
		var classToSwitch = $(this).attr('classToSwitch');
		if ($(this).is(':checked')) {
			$current_component.addClass(classToSwitch);
		} else {
			$current_component.removeClass(classToSwitch);
		}
	});
	$('#properties').on('click', 'button#add-grid-col', function(){
		$current_component.append('<div name="grid-col" class="col-md-6 connected-custom connected editor-grid-col">Olá</div>');
	});
	$('#properties').on('click', 'button#remove-self', function(){
		$current_component.remove();
		clearProperties();
		clearFamily();
	});
	$('#properties').on('click', 'button#duplicate-self', function(){
		var $parent = $current_component.parent();
		$current_component.clone().appendTo($parent);
	});
	$('#properties').on('keyup', '#property-text', function(e){
		$current_component.html($(this).val());
	});
	$('#properties').on('change', 'select#select-class', function(e){
		var $this = $(this);
		$(this).find('option').each(function(){
			$current_component.removeClass($(this).val());
		});
		$current_component.addClass($this.val());
		refreshClassInput();
	});
	function clearProperties() {
		$('#properties').html('');
	}
	function clearFamily() {
		$('#family').html('');
	}
	$('#properties').on('keyup', 'textarea#extra-class', function(e){
		getClasses($(this));
	});
	function refreshClassInput() {
		$('textarea#extra-class').val($current_component.attr('class'));
	}
	function getClasses($this) {
		var classes = $this.val();
		$current_component.attr({'class': classes});
		console.log(classes);
	}
	
	function buildProperties () {
		var $properties = $('#properties');
		var textValue = $current_component.text();
		var current_name = $current_component.attr('name'),
			current_component_classes = $current_component.attr('class').split(' '),
			selected = '';
		$properties.html('');
		var $component;

		$properties.append('<h4>'+current_name+'</h4>');
		
		$.each(properties, function(index, value){
			if (value.type == current_name) {
				if (value.itens.length > 0) {
					$.each(value.itens, function(k, i){

						switch(i.type) {
							case 'text':
								$formGroup = $('<div/>').addClass('form-group').appendTo($properties);
								$label = $('<label/>').text(i.label).appendTo($formGroup); 
								$component = $('<input/>')
									.attr({'id': i.behavior, 'type': 'text'})
									.addClass('form-control')
									.appendTo($formGroup);
							break;
							case 'textarea':
								$formGroup = $('<div/>').addClass('form-group').appendTo($properties);
								$label = $('<label/>').text(i.label).appendTo($formGroup); 
								$component = $('<textarea/>')
									.attr({'id': i.behavior})
									.addClass('form-control')
									.appendTo($formGroup);
							break;
							case 'select':
								$formGroup = $('<div/>').addClass('form-group').appendTo($properties);
								$label = $('<label/>').text(i.label).appendTo($formGroup); 
								$component = $('<select/>').attr({'id': i.behavior}).addClass('form-control').appendTo($formGroup);
								$.each(i.options, function(ind, val){
									$.each(current_component_classes, function(key, classe){
										if (classe == val.value) {
											selected = "selected";
											return false;
										} else {
											selected = "";
										}
									});
									$component.append('<option value="'+val.value+'" '+selected+'>'+val.label+'</option>');
								});
							break;
							case 'checkbox':
								$formGroup = $('<div/>').addClass('checkbox').appendTo($properties);
								$label = $('<label/>').appendTo($formGroup); 
								$component = $('<input/>')
									.attr({'id': i.behavior, 'type': 'checkbox'})
									.appendTo($label);
								$label.append(i.label);
								if (i.behavior == 'switch-class-checkbox') {
									$component.attr({'classToSwitch': i.classToSwitch});
									if ($current_component.hasClass(i.classToSwitch)) {
										$component.attr({'checked': true});
									}
								}
							case 'button':
								$formGroup = $('<div/>').addClass('checkbox').appendTo($properties);
								$component = $('<button/>')
									.attr({'id': i.behavior, 'type': 'button'})
									.text(i.label)
									.addClass('btn')
									.addClass(i.classes)
									.appendTo($formGroup);
							break;
						}
						if ($component.length > 0) {
							if (i.behavior == 'property-text') {
								$component.val(textValue);
							} else if(i.behavior == 'extra-class') {
								 $component.val($current_component.attr('class') || '');
							}
						}
					});
				}
			}
		})
	}
});
