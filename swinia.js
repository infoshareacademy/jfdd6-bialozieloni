  var howOften = 500;
  var coinSpeed = 200;
  var points = 0;
  var $table = $('<table>');
  var $tr, $td;
  var coinsIntervalId;

  $('#newsletterSubmit').click(function () {
    $('#form').hide();
    $('.game').attr('id', 'game');
  });


  function below(node) {
    return $(node).parent().next().find(':nth-child(' + ($(node).index() + 1) + ')');
  }

  function updatePoints() {
    points += 1;
    $('table tr:nth-child(1) td:nth-child(10)').text('PUNKTY: ' + points);
  }

  //sterowanie na strzalkach
  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: // left
        if ( $('.pig', $table).prev().length===1){    //sprawdza czy porzedni element ma długość, jeżeli by nie miał to znaczy że nie jest elementem tabeli i linijka poniżej się nie wykonuje
          $('.pig', $table).removeClass('pig').prev().addClass('pig')
        }
        if ($('.coin.pig', $table).length > 0) {
          updatePoints();
        }
        break;

      case 39: // right
        if ( $('.pig', $table).next().length===1){
          $('.pig', $table).removeClass('pig').next().addClass('pig')
        }
        if ($('.coin.pig', $table).length > 0) {
          updatePoints();
        }
        break;

      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  function setTimer() {
    var count = 60;
    var counter = setInterval(timer, 1000);

    function timer() {
      count -= 1;
      var minutes = Math.floor(count / 60);
      var sec = count % 60;
      if (sec < 10) {
        sec = '0' + sec;
      }

      var out = "CZAS: 00:" + sec;
      $('table tr:nth-child(1) td:nth-child(1)').addClass('counter').html(out);
      if (count == 0) {
        clearInterval(coinsIntervalId);
        clearInterval(counter);
        $('#gameover').fadeIn(1000);
      }
    }
  }

  function startItemsGenerator() {
    coinsIntervalId = setInterval(function () {
      $('tr:first td', $table)
        .eq(Math.floor(Math.random() * 10))
        .addClass(Math.random() > 0.2 ? 'coin': 'bomb');
    }, howOften);
  }

    $(document).ready(function () {
      $('.game').append($table);
      var $td, $tr;
      for (var y = 0; y < 10; y += 1) {
        $tr = $('<tr>');
        for ( var x = 0; x < 10; x += 1) {
          $td = $('<td>')
            .addClass('cell');
          $tr.append($td);
        }
        $table.append($tr);
        $('table tr:nth-child(1) td:nth-child(10)').addClass('pointer').text('PUNKTY: ' + points);
        $('table tr:nth-child(9) td:nth-child(5)').addClass('pig') //świnia ładuje się razem z grą
      }

    setTimer();

    $('tr:nth-child(9) td', $table).on('click', function () {
      $('.pig', $table).removeClass('pig');
      $(this).addClass('pig');
      if ($('.coin.pig', $table).length > 0) {
        updatePoints();
      }
    });

    function below(node) {
      return $(node).parent().next().find(':nth-child(' + ($(node).index() + 1) + ')');
    }

    function move(what, replacement) {
      $('.' + what, $table).each(function () {
        $(this).removeClass(what);
        below(this).addClass(what);
        $('tr .' + replacement).removeClass(replacement);
        $('tr:last .' + what).removeClass(what).addClass(replacement);
      });
    }

    setInterval(function () {
      move('coin', 'sad');
      move('bomb', 'explosion');

      if ($('.coin.pig', $table).length > 0) {
        updatePoints();
      }
    }, coinSpeed);
    startItemsGenerator();
  });









