$(document).ready(function() {
  let titleNoteEL = $('#titleNote'),
      descriptionEL = $('#description'),
      formValidation = $('.needs-validation'),
      listItemEL = $('#listItem'),
      listEmptyEL = $('#listEmpty'),
      newNoteEL = $('#newNote');

  function emptyMessageToggle(showListEmpty) {
    if (showListEmpty) {
      listEmptyEL.show(true);
    } else {
      listEmptyEL.hide(false);
    }
  }

  if (localStorage.getItem('notes') == null) {
    emptyMessageToggle(true);
  } else {
    listItemEL.html(localStorage.getItem('notes'));;
    emptyMessageToggle();
  }

  function addNoteToLocalStorage(noteItemMarkup = listItemEL.html()) {
    localStorage.setItem('notes', noteItemMarkup);
	}

  function verifyRequiredFields(verifyTrue) {
    if (verifyTrue) {
      formValidation.addClass('was-validated').prop('required', true);

      titleNoteEL.prop('required', true);

      descriptionEL.prop('required', true);
    } else {
      formValidation.removeClass('was-validated').prop('required', false);

      titleNoteEL.prop('required', false);

      descriptionEL.prop('required', false);
    }
  }

  function getToDoItem(
    title = titleNoteEL.val(),
    text = descriptionEL.val()) {
      return ['<li class="list-group-item mb-3 border-light note-item"><article><header class="d-flex align-items-center mb-2"><h3 class="h6 mb-0 font-weight-normal">',
              title,
              '</h3><button class="close ml-2" type="button" name="CloseButton" data-dismiss="note-item" aria-label="Close"><span aria-hidden="true">&times;</span></button><button class="btn expand-btn btn-outline-light ml-auto px-1 py-0" type="button" aria-label="Скрыть описание"><svg width="8" height="7" viewBox="-0.019531 -52.792969 30.039062 25.195312"><path d="M29.941406 -52.500000C29.785156 -52.656250 29.589844 -52.753906 29.355469 -52.792969L0.644531 -52.792969C0.410156 -52.753906 0.214844 -52.656250 0.058594 -52.500000C-0.019531 -52.265625 0.000000 -52.050781 0.117188 -51.855469L14.472656 -27.890625C14.628906 -27.734375 14.804688 -27.636719 15.000000 -27.597656C15.234375 -27.636719 15.410156 -27.734375 15.527344 -27.890625L29.882812 -51.855469C30.000000 -52.089844 30.019531 -52.304688 29.941406 -52.500000ZM29.941406 -52.500000"></path></svg></button></header><footer class="note-item-description"><p class="text-muted text-break">',
              text,
              '</p></footer></article></li>'].join('')
  }

	function addNewNote() {
    let title = titleNoteEL.val(),
        text = descriptionEL.val();

    if (title.length !== 0 && text.length !== 0) {
      verifyRequiredFields();

      listItemEL.append(getToDoItem(title, text));

      newNoteEL[0].reset();

      emptyMessageToggle();

      addNoteToLocalStorage();

    } else {
      verifyRequiredFields(true);
    }
  }

  newNoteEL.submit(function disableFormSending(e) {
    e.preventDefault();
    addNewNote();
    });

  listItemEL.on('click', '.close', function closeNote() {

      $(this).parents('.note-item')
      .remove();

      addNoteToLocalStorage();

      if ($('.note-item').length == 0) {
  			emptyMessageToggle(true);
        localStorage.removeItem('notes');
  		}
    });

  listItemEL.on('click', '.expand-btn', function expandNoteFooter() {
     $(this).attr('aria-label', $(this).attr('aria-label') == 'Скрыть описание' ? "Развернуть описание" : "Скрыть описание")
     .find('svg')
     .toggleClass('js-rotate')
     .parents('.note-item')
     .find('.note-item-description')
     .toggleClass('collapse');
     });
});
