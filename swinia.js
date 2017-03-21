  var howOften = 500;
  var coinSpeed = 200;
  var points = 0;
  var $table = $('<table>');
  var movementIntervalId;
  var coinsIntervalId;
  var $check = $('#form__checkbox:checked');  // checkbox w pozycji checked
  var $email = $('#inputEmail3'); // id pola input type ='e-mail'


// PONOWNE URUCHOMIENIE GRY
$('.again').on('click', function () {
  play();
});
// ROZPOCZĘCIE GRY
function start(e) {
  e.preventDefault();

  if ($check && $email.val() !== '') {
    $('#form').hide();
    $('.nav-form').hide();
    $('#nav-game').show();
    $('.btn-zaj').hide();
    $('.game').attr('id', 'game').show('slow', play);
    $('.points').text('Liczba zdobytych punktów: ' + points);

    $('html, body').animate({
      scrollTop: $('#game').offset().top
    }, 500);
  }
}
//NA KLIKNIĘCIE PRZYCISKU ZAPISZ MNIE PRZECHODZI DO ROZPOCZĘCIA GRY
$('.form-horizontal').submit(start);

function below(node) {
  return $(node).parent().next().find(':nth-child(' + ($(node).index() + 1) + ')');
}

function showPoints() {
  $('.points').text('Liczba zdobytych punktów: ' + points);
  $('.points-counter').text('PUNKTY: ' + points);
}
  // LICZNIK PUNKTÓW SKORELOWANE Z DZWIĘKIEM SUKCESU
function addPoint() {
  points += 1;
  var audio = new Audio('Oink.mp3');   // Chrum!
  audio.play();
  showPoints();
}

  function removePoint() {
    points -= 1;
    var audio = new Audio('Boom.mp3');   // Boom!
    audio.play();
    showPoints();
  }

//STEROWANIE ŚWINIĄ ZA POMOCĄ KURSORÓW
$(document).keydown(function (e) {
  //$('.coin.pig', $table).removeClass('coin');
  switch (e.which) {
    case 37: // left
      if ($('.pig', $table).prev().length === 1) {    //sprawdza czy porzedni element ma długość, jeżeli by nie miał to znaczy że nie jest elementem tabeli i linijka poniżej się nie wykonuje
        $('.pig', $table).removeClass('pig').prev().addClass('pig')
      }
      if ($('.coin.pig', $table).length > 0) {
        addPoint();
      }
      if ($('.bomb.pig', $table).length > 0) {
        removePoint();
      }
      break;

    case 39: // right
      if ($('.pig', $table).next().length === 1) {
        $('.pig', $table).removeClass('pig').next().addClass('pig')
      }
      if ($('.coin.pig', $table).length > 0) {
        addPoint();
      }
      if ($('.bomb.pig', $table).length > 0) {
        removePoint();
      }
      break;
    case 38:
      e.preventDefault();
      break;
    case 40:
      e.preventDefault();
      break;
    default:
      return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
});

  // USTAWIENIE TIMERA
function setTimer() {
  var count = 30;
  var counter = setInterval(timer, 1000);

  function timer() {
    count -= 1;

    var sec = count % 60;
    if (sec < 10) {
      sec = '0' + sec;
    }
//CZYSZCZENIE INTERWAŁU I POJAWIENIE SIĘ GAMEOVER
    var out = "CZAS: 00:" + sec;
    $('.time-counter').html(out);
    if (count == 0) {
      clearInterval(coinsIntervalId);
      clearInterval(counter);
      clearInterval(movementIntervalId);
      $('#gameover').fadeIn(1000);
    }
  }
}
  // GENERACJA LOSOWA MONET/BOMB PRZY POMOCY INSTRUKCJI WARUNKOWEJ IF W ZMIENNYCH PROPORCJACH
function startItemsGenerator() {
  coinsIntervalId = setInterval(function () {
    $('tr:first td', $table)
      .eq(Math.floor(Math.random() * 10))
      .addClass(Math.random() > 0.2 ? 'coin' : 'bomb');
  }, howOften);
}
  // FUNKCJA PLAY OBEJMUJĄCA CAŁY KOD
function play() {
  $(document).ready(function () {
    var $td, $tr;
    $('.gameover').hide();
    $('.game').append($table.empty());

//TWORZENIE PLANSZY ZA POMOCĄ TABELKI

    for (var y = 0; y < 10; y += 1) {
      $tr = $('<tr>');
      for (var x = 0; x < 10; x += 1) {
        $td = $('<td>')
          .addClass('cell');
        $tr.append($td);
      }
      $table.append($tr);
      points = 0;
    }
    // DODAJE ŚWINIĘ W WYZNACZONYM MIEJSCU ORAZ LICZNIK PUNKTÓW
    $('tr:last td', $table).addClass('no-item');
    $('.points-counter').text('PUNKTY: ' + points);
    $('table tr:nth-child(9) td:nth-child(5)').addClass('pig'); //świnia ładuje się razem z grą

    setTimer();
// PORUSZANIE SIĘ ŚWINI ZA POMOCĄ MYSZKI
    $('td', $table).click(function () {
      $('.pig', $table).removeClass('pig');
      $('tr:nth-child(9) td', $table).eq($(this).index()).addClass('pig'); // eq zwraca n-ty element z kolekcji
// UPDATE PUNKTÓW PRZY STEROWANIU ZA POMOCĄ MYSZKI
      if ($('.coin.pig', $table).length > 0) {
        addPoint();
        $('.coin.pig', $table).removeClass('coin');
      }
      if ($('.bomb.pig', $table).length > 0) {
        removePoint();
      }
    });
//RUCH OBIEKTÓW W PIONIE
    function move(what, replacement) {
      $('.' + what, $table).each(function () {
        $(this).removeClass(what);
        below(this).addClass(what);
        $('tr .' + replacement).removeClass(replacement);
        $('tr:last .' + what).removeClass(what).addClass(replacement);
      });
    }

    movementIntervalId = setInterval(function () {
      move('coin');
      move('bomb', 'explosion');
//DODAWANIE PUNKTÓW GDY ŚWINIA SPOTKA MONETĘ
      if ($('.coin.pig', $table).length > 0) {
        addPoint();

      }
      //ODEJMOWANIE PUNKTÓW GDY ŚWINIA SPOTKA BOMBĘ
      if ($('.bomb.pig', $table).length > 0) {
        removePoint();
      }
    }, coinSpeed);

    startItemsGenerator();
  });
}










