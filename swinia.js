  var howOften = 500;
  var coinSpeed = 200;
  var points = 0;
  var $table = $('<table>');
  var $tr, $td;
  var coinsIntervalId;

$('.again').on('click', function () {
  play();
});

function start(e) {
  e.preventDefault();

  if ($check && $email.val() !== '') {
    $('#form').hide();
    $('.game').attr('id', 'game');
    $('.game').show('slow', play);

  }
}

$('.form-horizontal').submit(start);


function below(node) {
  return $(node).parent().next().find(':nth-child(' + ($(node).index() + 1) + ')');
}

function updatePoints() {
  points += 1;
  $('.points').text('Liczba zdobytych punktów: ' + points);
  $('table tr:nth-child(1) td:nth-child(10)').text('PUNKTY: ' + points);
}


//sterowanie na strzalkach
$(document).keydown(function (e) {
  $('.coin.pig', $table).removeClass('coin');
  switch (e.which) {
    case 37: // left
      if ($('.pig', $table).prev().length === 1) {    //sprawdza czy porzedni element ma długość, jeżeli by nie miał to znaczy że nie jest elementem tabeli i linijka poniżej się nie wykonuje
        $('.pig', $table).removeClass('pig').prev().addClass('pig')
      }
      if ($('.coin.pig', $table).length > 0) {
        updatePoints();
      }
      break;

    case 39: // right
      if ($('.pig', $table).next().length === 1) {
        $('.pig', $table).removeClass('pig').next().addClass('pig')
      }
      if ($('.coin.pig', $table).length > 0) {
        updatePoints();
      }
      break;
    default:
      return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
});

function setTimer() {
  var count = 5;
  var counter = setInterval(timer, 1000);

  function timer() {
    count -= 1;

    var sec = count % 60;
    if (sec < 10) {
      sec = '0' + sec;
    }

    var out = "CZAS: 00:" + sec;
    $('table tr:nth-child(1) td:nth-child(1)').addClass('counter').html(out);
    if (count == 0) {
      clearInterval(coinsIntervalId);
      clearInterval(counter);
      clearInterval(movementIntervalId);
      $('#gameover').fadeIn(1000);
    }
  }
}

function startItemsGenerator() {
  coinsIntervalId = setInterval(function () {
    $('tr:first td', $table)
      .eq(Math.floor(Math.random() * 10))
      .addClass(Math.random() > 0.2 ? 'coin' : 'bomb');
  }, howOften);
}

function play() {
  $(document).ready(function () {
    var $td, $tr;
    $('.gameover').hide();
    $('.game').append($table.empty());

    for (var y = 0; y < 10; y += 1) {
      $tr = $('<tr>');
      for (var x = 0; x < 10; x += 1) {
        $td = $('<td>')
          .addClass('cell');
        $tr.append($td);
      }
      $table.append($tr);
      points = 0;
      $('table tr:nth-child(1) td:nth-child(10)').addClass('pointer').text('PUNKTY: ' + points);
      $('table tr:nth-child(9) td:nth-child(5)').addClass('pig'); //świnia ładuje się razem z grą
    }

    setTimer();

    $('td', $table).click(function () {
      $('.pig', $table).removeClass('pig');
      $('tr:nth-child(9) td', $table).eq($(this).index()).addClass('pig'); // eq zwraca n-ty element z kolekcji
      if ($('.coin.pig', $table).length > 0) {
        updatePoints();
        $('.coin.pig', $table).removeClass('coin');
      }
    });

    function move(what, replacement) {
      $('.' + what, $table).each(function () {
        $(this).removeClass(what);
        below(this).addClass(what);
        $('tr .' + replacement).removeClass(replacement);
        $('tr:last .' + what).removeClass(what).addClass(replacement);
      });
    }

    movementIntervalId = setInterval(function () {
      move('coin', 'sad');
      move('bomb', 'explosion');

      if ($('.coin.pig', $table).length > 0) {
        updatePoints();
        var audio = new Audio('Oink.mp3');   // Chrum!
        audio.play();
        $('.coin.pig', $table).removeClass('coin');
      }
    }, coinSpeed);

    startItemsGenerator();
  });
}










