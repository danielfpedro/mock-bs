$(function(){

	var $selected = $('<div/>').addClass('selected').appendTo('body');
	var $selectedOver = $('<div/>').addClass('selectedOver').appendTo('body');

	var $selectedBtnNegative = $('<button/>')
			.attr({'title': 'Deletar'})
			.addClass('selectedBtnNegative')
			.html('<span class="glyphicon glyphicon-trash"></span>')
			.appendTo($selected),
		$selectedBtnPositive = $('<button/>')
			.attr({'title': 'Duplicar', 'data-nice-behavior': 'duplicate-self'})
			.addClass('selectedBtnPositive')
			.html('<span class="glyphicon glyphicon-share-alt"></span>')
			.appendTo($selected);

	var $selectedTitle = $('<div/>')
		.addClass('selectedTitle').appendTo($selected);

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

	// $('#refresh-code').click(function(){
	// 	var code = $('#tela').html().trim();
	// 	editor.setValue(code);
	// });

	$('#slc-viewport').change(function(){
		var newClass,
			width = '100%',
			marginLeft = 0,
			$this = $(this);

		switch($this.val()) {
			case 'lg':
				newClass = 'force-lg';
				width = '100%';
			break;
			case 'md':
				newClass = 'force-md';
				width = '85%';
				marginLeft = '7.5%';
			break;
			case 'sm':
				newClass = 'force-sm';
				marginLeft = '17.5%';
				width = '65%';
			break;
			case 'xs':
				newClass = 'force-xs';
				marginLeft = '30%';
				width = '40%';
			break;
		};
		$('#tela').animate({width: width}, function(){
			$('#tela').removeClass('force-xs force-sm force-md force-lg');
			$('#tela').addClass(newClass).animate({'margin-left': marginLeft});
		});
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
			type: 'header',
			itens: [
				{
					label: 'Texto',
					type: 'textarea',
					behavior: 'property-text'
				},
			]
		},
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
					label: 'Text',
					type: 'text',
					behavior: 'property-text'
				},
				{
					label: 'Classes',
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
					label: 'Block',
					type: 'checkbox',
					behavior: 'switch-class-checkbox',
					classToSwitch: 'btn-block'
				},				
				{
					label: 'Float',
					type: 'select',
					behavior: 'select-class',
					options: floatOptions
				},
				{
					label: 'Duplicate',
					type: 'button',
					behavior: 'duplicate-self',
					classes: 'btn-primary btn-xs'
				},
				{
					label: 'Remover',
					type: 'button',
					behavior: 'remove-self',
					classes: 'btn-danger btn-xs'
				},				
			]
		}
	];
	
	var components = [
		{
			type: 'button',
			content: '<button type="button" class="btn btn-default" data-nice-type="button">\n\tButton\n</button>\n'
		},
		{
			type: 'button-group',
			content: '<div class="btn-group" data-nice-type="btn-group"><button type="button" data-nice-type="button" class="btn btn-default">Button</button><button type="button" class="btn btn-default" data-nice-type="button">Button</button></div>'
		},
		{
			type: 'well',
			content: '<div class="well connected-custom connected" data-nice-type="well">\n\t<p data-nice-type="paragraph">Hello World!</p>\n</div>\n'
		},
		{
			type: 'label',
			content: '<label class="label label-info components" data-nice-type="label">Label</label>'
		},
		{
			type: 'alert',
			content: '<div class="alert alert-success" data-type="alert" data-nice-type="alert">Sucesso!</div>'
		},
		{
			type: 'header',
			content: '<h3 data-nice-type="header" class="components">Header 3</h3>'
		},
		{
			type: 'paragraph',
			content: '<p data-nice-type="paragraph" class="components">Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.</p>'
		},
		{
			type: 'grid-row',
			content: '<div class="row editor-grid-row" data-nice-type="grid-row">\n\t<div class="editor-grid-col col-md-6 connected-custom connected" data-nice-type="grid-col"></div>\n\t<div class="col-md-6 connected-custom connected editor-grid-col" data-nice-type="grid-col"></div>\n</div>\n'
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
		getFamily();
		setSelected($this);
	});
	// $("#tela").on({
	// 	mouseenter: function (e) {
	// 		// e.stopPropagation();
	// 		setSelected($(this), $selectedOver);
	// 	},
	// 	mouseleave: function (e) {
	// 		// e.stopPropagation();
	// 		removeSelected($selectedOver);
	// 	}
	// }, '*');
	function removeSelected() {
		$selected.hide();
	}
	function getObjDimensions($this){
		return {
			width: $this.outerWidth(),
			height: $this.outerHeight(),
			left: $this.offset().left,
			top: $this.offset().top
		};
	}
	function setSelected ($this){
		var dim = getObjDimensions($this);
		$selected.css({left: dim.left, top: dim.top, height: dim.height, width: dim.width}).show();
		$selectedBtnNegative.css({'margin-top': dim.height - 1}).show();
		$selectedBtnPositive.css({'margin-top': dim.height - 1}).show();
		$selectedTitle.text($this.prop('tagName')).css({'margin-top': -$selectedTitle.outerHeight()	}).show();
	}
	function setSelectedOver ($this){
		var pos = getObjDimensions($this);
		$selectedOver.css({left: pos.left, top: pos.top, height: pos.height, width: pos.width}).show();
	}
	$('#family').on('click', '#item-family', function(e){
		e.stopPropagation();
		var index = $(this).attr('data-index');
		$current_component = current_family[index];
		buildProperties();
		setSelected($current_component, $selected);
	});
	$('body').click(function(e){
		e.stopPropagation();
		removeSelected();
	});
	function getFamily(){
		var parents = $current_component.parents();
		console.log($current_component);

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
			retorno.push('<span data-index="'+index+'" id="item-family">'+value.attr('data-nice-type')+'</span>');
		});
		//console.log(retorno);
		$('#family').html('').html(retorno.join(' <span class="glyphicon glyphicon-chevron-right"></span> '));
	}
	$('#properties').on('click', 'input[data-nice-behavior="switch-class-checkbox"]', function(){
		var classToSwitch = $(this).attr('classToSwitch');
		if ($(this).is(':checked')) {
			$current_component.addClass(classToSwitch);
		} else {
			$current_component.removeClass(classToSwitch);
		}
	});
	$('#properties').on('click', 'button[data-nice-behavior="add-grid-col"]', function(){
		$current_component.append('<div data-nice-type="grid-col" class="col-md-6 connected-custom connected editor-grid-col">Olá</div>');
	});
	$('#properties').on('click', 'button[data-nice-behavior="remove-self"]', function(){
		$current_component.remove();
		clearProperties();
		clearFamily();
		removeSelected();
	});
	$('body').on('click', 'button[data-nice-behavior="duplicate-self"]', function(){
		var $parent = $current_component.parent();
		var newComponent = $current_component.clone();
		newComponent.appendTo($parent);
		setSelected(newComponent);
	});
	$('#properties').on('keyup', 'input[data-nice-behavior="property-text"]', function(e){
		$current_component.text($(this).val());
		setSelected($current_component);
	});
	$('#properties').on('keyup', 'textarea[data-nice-behavior="property-text"]', function(e){
		$current_component.html($(this).val());
		setSelected($current_component);
	});
	$('#properties').on('change', 'select[data-nice-behavior="select-class"]', function(e){
		var $this = $(this);
		$(this).find('option').each(function(){
			$current_component.removeClass($(this).val());
		});
		$current_component.addClass($this.val());
		refreshClassInput();
		setSelector($current_component);
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
		$('textarea[data-nice-behavior="extra-class"]').val($current_component.attr('class'));
	}
	function getClasses($this) {
		var classes = $this.val();
		$current_component.attr({'class': classes});
	}
	
	function buildProperties () {
		var $properties = $('#properties'),
			uid = 1;
		var textValue = $current_component.text();
		var current_name = $current_component.attr('data-nice-type'),
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
								$label = $('<label for="'+uid+'"/>').text(i.label).appendTo($formGroup); 
								$component = $('<input/>')
									.attr({'id': uid, 'data-nice-behavior': i.behavior, 'type': 'text'})
									.addClass('form-control')
									.appendTo($formGroup);
							break;
							case 'textarea':
								$formGroup = $('<div/>').addClass('form-group').appendTo($properties);
								$label = $('<label for="'+uid+'"/>').text(i.label).appendTo($formGroup); 
								$component = $('<textarea/>')
									.attr({'id':uid, 'data-nice-behavior': i.behavior})
									.addClass('form-control')
									.appendTo($formGroup);
							break;
							case 'select':
								$formGroup = $('<div/>').addClass('form-group').appendTo($properties);
								$label = $('<label for="'+uid+'"/>').text(i.label).appendTo($formGroup); 
								$component = $('<select/>').attr({'id': uid, 'data-nice-behavior': i.behavior}).addClass('form-control').appendTo($formGroup);
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
									.attr({'data-nice-behavior': i.behavior, 'id': uid, 'type': 'checkbox'})
									.appendTo($label);
								$label.append(i.label);
							break;
							case 'button':
								$formGroup = $('<div/>').addClass('form-group').appendTo($properties);
								$component = $('<button/>')
									.attr({'data-nice-behavior': i.behavior, 'type': 'button'})
									.text(i.label)
									.addClass('btn')
									.addClass(i.classes)
									.appendTo($formGroup);
							break;
						}
						if ($component.length > 0) {
							if (i.behavior == 'property-text') {
								$component.val(textValue.trim());
							} else if(i.behavior == 'extra-class') {
								 $component.val($current_component.attr('class') || '');
							} else if (i.behavior == 'switch-class-checkbox') {
								$component.attr({'classToSwitch': i.classToSwitch});
								if ($current_component.hasClass(i.classToSwitch)) {
									$component.attr({'checked': true});
								}
							}
						}

						uid++;
					});
				}
			}
		})
	}
});
