$(function () {

	//Анимация разлетающихся элементов после загрузки страницы
	$('#fly__div-top').addClass("fly__animate fly__div-top_after");
	$('#fly__div-bottom').addClass("fly__animate fly__div-bottom_after");
	$('#fly__slash-bottom').addClass("fly__animate fly__slash-bottom_after");
	$('#fly__braces').addClass("fly__animate fly__braces_after");
	$('#fly__grid').addClass("fly__animate fly__grid_after");
	$('#fly__slash-top').addClass("fly__animate fly__slash-top_after");

// ПОЯВЛЕНИЕ КНОПКИ "ВВЕРХ" ПРИ ПРОКРУТКИ СТРАНИЦЫ
	let btn = document.querySelector('.arrow-top');

	function magic() {
		if (window.pageYOffset > 400) {
			btn.style.opacity = '1'
		} else { btn.style.opacity = '0' }
	}
	btn.onclick = function () {
		window.scrollTo(0, 0)
	};

	window.onscroll = magic;

	$('form').each(function () {
		$(this).validate({
			errorPlacement(error, element) {
				return true;
			},

			focusInvalid: false,
			rules: {
				name: {
					required: true,
					minlength: 3,
					maxlength: 30
				},
				phone: {
					required: true,
				},
				email: {
					required: true,
					email: true,
				}
			},
			submitHandler(form) {
				let dataForm = $(form);

				$.ajax({
					type: 'POST',
					url:  'https://echo.htmlacademy.ru',
					data:  dataForm.serialize(),
				}).done(() => {
					dataForm.trigger('reset');
					$('.form__answer').addClass('answer__active')

					 setTimeout(function () {
             closeModal();
           }, 2000);
				
		});
			
	}
		
});
	
});
	

    //  маска
	$('input[type="tel"]').inputmask({ "mask": "+7 (999) 999-9999" });




	//СКРОЛЛ СТРАНИЦЫ
	//Функция отключения скролла
	function disable() {
		$('body').addClass('body__scroll-off')
	};

	//функция включения скролла
	function enable() {
		$('body').removeClass('body__scroll-off');
	}


	//ДЛЯ МОБИЛЬНОГО МЕНЮ

	//Открываем мобильное меню
	$('body').on('click', '#btn-burger', function (e) {
		e.preventDefault();
		$('#nav').addClass('nav-mobile-active');
		disable();
	});

	//Закрываем мобильное меню
	function closeMobileMenu() {
		$('#nav').removeClass('nav-mobile-active');
		enable();
	}

	//Вызов функции закрыть меню при нажатии на кнопку Закрыть
	$('body').on('click', '#menu-mobile-off', function (e) {
		closeMobileMenu();
	});

	//Вызов функции закрытия меню при нажатии вне мобильного меню
	$(document).mouseup(function (e) {
		let div = $("#mobile-menu-content");
		if ((!div.is(e.target)) && (div.has(e.target).length === 0)) { closeMobileMenu(); };
	});

	//Закрываем меню при нажатии на ссылку в header
	$('body').on('click', '.nav__link', function () {
		closeMobileMenu();
	});


	//ОКНО ЗАКАЗ УСЛУГИ ИЛИ ЗВОНКА
	//Сбрасываем прошлые данные формы
	function resetForm() {
		$('.form__answer').removeClass('answer__active');
		$('input').removeClass('error');
	};

	//Открываем модальное окно
	function openModal() {
		resetForm();
		$('.popup').css({ 'top': $(window).scrollTop() + 100 }).addClass('popup_active');
		$('.popup-background').fadeIn();
		disable();
	};

	//Обработка клика кнопки Заказать звонок
	$('.btn-more__short').on('click', function (e) {
		openModal();
		$("#form-title").text('Заказать обратный звонок');
		$('#emailField').css('display', 'none');
		$('#emailField').val('-');
		$('#span-email').css('display', 'none');
		$('#form-btn').val('Заказать звонок');
	});

	//Обработка клика кнопки заказать консультацию
	$('.btn-more__complete').on('click', function (e) {
		openModal();
		$('#emailField').val('');
	});

	//обработка кликов по форме и на кнопке Закрыть в форме
	$('body').on('click', '.popup', function (e) {
		let btnClose = $("#order-off");
		if (!btnClose.is(e.target)) {
			$('body').addClass('body__scroll-off');
		} else {
			closeModal();
		};
	});


	//Функция, которая закрывает модальное окно Заказ услуги/звонка и включает скролл
	function closeModal() {
		//Возвращаю значения по умолчанию
		$("#form-title").text('Заказать консультацию');
		$('#emailField').css('display', 'block');
		$('#span-email').css('display', 'block');
		$('input').val('');
		$('#form-btn').val('Заказать консультацию');
		//Убираю с экрана форму
		$('.popup').removeClass('popup_active');
		$('.popup').removeClass('popup_active');
		enable();
		$('.popup-background').fadeOut();
	}


	//Вызов функции закрытия меню при нажатии вне модального окна
	$('body').on('click', '.popup-background', function () {
		closeModal();
	});




	//ПЛАВНЫЙ ПЕРЕХОД ПО ССЫЛКАМ
	//Для плавного скролла при переходе по ссылкам
	$('nav a').on('click', function (event) {
		event.preventDefault();

		let href = $(this).attr('href');
		let offset = $(href).offset().top;

		$('body,html').animate({
			scrollTop: offset,
		}, 500);
	});


	//ДЛЯ СЛАЙДЕРА
	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 1,
		spaceBetween: 30,
		slidesPerGroup: 1,
		loop: true,
		loopFillGroupWithBlank: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			950: {
				slidesPerView: 2,
				spaceBetween: 33,
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			1230: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
		}
	});
});



