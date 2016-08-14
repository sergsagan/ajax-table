/**
 * Created by martynuk on 14.08.16.
 */

$(function() {
  var output = $('table tbody'),
    layer = $('#layer'),
    modal = $('#modal');
  $.ajax({
    url: 'http://cm.mmi.macc.com.ua/tests/sample.php',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      var rows = '';
      $.each(data, function(i, el) {
        rows += `<tr>
        <td data-descr="` + el.description + `" data-img="` + el.img + `">` + el.id + `</td>
        <td>` + el.name + `</td>
        <td>` + el.author + `</td>
        <td>` + el.date + `</td>
        <td>` + el.number + `</td>
        <tr>`;
      });
      output.html(rows);
    }
  });
  output.on('click', 'tr td:first-child', function() {
    var $that = $(this),
      tds = $that.siblings('td'),
      html = '<span class="close">X</span>';
    html += '<h1>' + tds.eq(0).text() + '</h1>';
    html += '<img src="' + $that.data('img') + '" alt="">';
    html += `<ul>
        <li>` + tds.eq(1).text() + `</li>
        <li>` + tds.eq(2).text() + `</li>
        <li>` + tds.eq(3).text() + `</li>
        <li>` + tds.eq(4).text() + `</li>
      </ul>`;
    html += '<div>' + $that.data('descr') + '</div>';
    modal.html(html);
    layer.fadeIn();
  });
  layer.on('click', function(e) {
    if (e.target === this) {
      $(this).fadeOut();
    }
  });
  modal.on('click', '.close', function(e) {
    layer.trigger('click');
  });
});
