  var howOften = Math.random() * 2500;
  var coinSpeed = 300;
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
    $('#app p').text('Points: ' + points);
  }

  function setTimer() {
    var count = 10;
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
      for (var x = 0; x < 10; x += 1) {
        $td = $('<td>')
          .addClass('cell');
        $tr.append($td);
      }
      $table.append($tr);
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









