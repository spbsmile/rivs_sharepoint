// страница документов(которая перенапраляет на коллецию "документы") захардкожена.
// тут добавляется событие клика на плашку документа
namespace DocumentsPage {

	$(document).ready(function () {

		/** hide useless sharepoint content */
		$(".welcome-image").hide();
		$(".welcome-content").hide();

		/** add ability click event on full button (.link-item div)*/
		$(".link-item").on('click', function () {
			window.open(
				$(this).find(".linkOrder").attr('href'), "_self");
		});
	});
}


