
loadData();

inicializarSlider();

function loadData() {
  $.ajax(
    {
      url: "./api.php",
      type: "GET",
      data: { all: true },
      success: (data) => {

        json = jQuery.parseJSON(data);

        json = jQuery.parseJSON(json);

        valuesToShow = json;

        initArrays();

      },
      error: () => {
        alert("Ocurrió un error al consumir el servicio");
      }
    }
  );
}

function inicializarSlider() {
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 100000,
    prefix: "$",
    onChange: saveResult
  });
}

function saveResult(data) {

  from = data.from;
  to = data.to;

};

var json;
var valuesToShow;
var cities;
var types;
var from = 200;
var to = 80000;

$("#mostrarTodos").click(() => {

  valuesToShow = json;

  from = 0;
  to = 100000;

  populateList(valuesToShow);

});

function initArrays() {

  cities = [];
  types = [];

  for (var index in json) {

    var element = json[index];

    if (!cities.includes(element.Ciudad)) {
      cities.push(element.Ciudad);
    }

    if (!types.includes(element.Tipo)) {
      types.push(element.Tipo);
    }

  }

  $("#selectCiudad").empty();
  $("#selectCiudad").append($("<option />").val("").text("Elige una ciudad"));
  $.each(cities, function (item) {
    $("#selectCiudad").append($("<option />").val(this).text(this));
  });

  $("#selectTipo").empty();
  $("#selectTipo").append($("<option />").val("").text("Elige un tipo"));
  $.each(types, function (item) {
    $("#selectTipo").append($("<option />").val(this).text(this));
  });

  $("#selectCiudad").show();
  $("#selectTipo").show();

}

function filterByCity(properties, city) {

  var result = properties.filter((opc) => {
    return opc.Ciudad == city
  })

  return result;

}

function filterByType(properties, type) {

  var result = properties.filter((opc) => {
    return opc.Tipo == type
  })

  return result;

}

$("#selectTipo").change(() => {

  var type = $("#selectTipo").val();

  valuesToShow = filterByType(json, type);

  var city = $("#selectCiudad").val();
  if (city != "") {

    valuesToShow = filterByCity(valuesToShow, city);

  }

  populateList(valuesToShow);

});

$("#selectCiudad").change(() => {

  var city = $("#selectCiudad").val();

  valuesToShow = filterByCity(json, city);

  var type = $("#selectTipo").val();
  if (type != "") {

    valuesToShow = filterByType(valuesToShow, type);

  }

  populateList(valuesToShow);

});

$("#submitButton").click(() => {

  var result = json;

  var city = $("#selectCiudad").val();
  if (city != "") {

    result = filterByCity(result, city);

  }

  var type = $("#selectTipo").val();
  if (type != "") {

    result = filterByType(result, type);

  }

  populateList(result);

});

function populateList(elements) {

  elements = elements.filter((opc) => {

    var price = Number(opc.Precio.replace("$", "").replace(",", ""));

    return price > from && price < to;

  })

  $("#content").empty();
  for (var index in elements) {

    var item = elements[index];

    $("#content")
      .append('<div class="itemMostrado card">' +
      '<img src="./img/home.jpg">' +
      '<div>' +
      '<p>Dirección:' + item.Direccion + '</p>' +
      '<p>Ciudad: ' + item.Ciudad + '</p>' +
      '<p>Teléfono: ' + item.Telefono + '</p>' +
      '<p>Código postal: ' + item.Codigo_Postal + '</p>' +
      '<p>Tipo: ' + item.Tipo + '</p>' +
      '<p>Precio:' +
      '<span class="precioTexto">' + item.Precio + '</span>' +
      '</p>' +
      '</div>' +
      '</div>')
  }

}