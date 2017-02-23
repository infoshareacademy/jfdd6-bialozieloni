  var howOften = 500;
  var coinSpeed = 200;
  var points = 0;
  var $container = $('#app');
  var $counter = $('<p>').text('Points: ' + points);
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
    $('p', $container).text('Points: ' + points);
    $('#gameover').text('Liczba zdobytych punktów: ' + points);
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
    var count = 5;
    var counter = setInterval(timer, 1000);

    function timer() {
      count -= 1;
      var minutes = Math.floor(count / 60);
      var sec = count % 60;
      if (sec < 10) {
        sec = '0' + sec;
      }

      var out = "Koniec gry za " + minutes + ':' + sec;
      $("#timer").html(out);
      if (count == 0) {
        clearInterval(coinsIntervalId);
        clearInterval(counter);
        $('#gameover').fadeIn(1000);
        $('#game').fadeOut(1000);
      }
    }
  }

  function makeCoin() {
    coinsIntervalId = setInterval(function () {
      $('tr:first td', $table)
        .eq(Math.floor(Math.random() * 10))
        .addClass('coin');
    }, howOften);
  }

    $(document).ready(function () {
      $container.append($counter);
      $container.append($table);

      for (var y = 0; y < 10; y += 1) {
        $tr = $('<tr>');
        for ( var x = 0; x < 10; x += 1) {
          $td = $('<td>')
            .addClass('cell');
          $tr.append($td);
        }
        $table.append($tr);
        $('table tr:nth-child(10) td:nth-child(5)').addClass('pig') //świnia ładuje się razem z grą
      }

    setTimer();

    $('tr:last td', $table).on('click', function () {
      $('.pig', $table).removeClass('pig');
      $(this).addClass('pig');
      if ($('.coin.pig', $table).length > 0) {
        updatePoints();
      }
    });

    function below(node) {
      return $(node).parent().next().find(':nth-child(' + ($(node).index() + 1) + ')');
    }

    setInterval(function () {
      $('.coin', $table).each(function () {
        $(this).removeClass('coin');
        below(this).addClass('coin');
      });

      if ($('.coin.pig', $table).length > 0) {
        updatePoints();
      }
    }, coinSpeed)
    makeCoin();
  });









