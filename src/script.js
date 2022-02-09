let m_data = [];
let m_tmp={};
$(function () {
  $(document).on("click", ".close", function () {
    //Dynamic onclick handling for close message
    console.log("CLOSE");
    $(this).parent("div").hide();
  });
  //Dynamic onclick handling for delete
  $(document).on("click", ".delete", function () {
    let sku = $(this).parent("td").siblings("#sku").html();
    del(sku);
  });
  //Dynamic onclick handling for edit
  $(document).on("click", ".edit", function () {
    $("#product_sku").val($(this).parent("td").siblings("#sku").html());
    $("#product_name").val($(this).parent("td").siblings("#name").html());
    $("#product_price").val($(this).parent("td").siblings("#price").html());
    $("#product_quantity").val($(this).parent("td").siblings("#qty").html());
    $("#product_sku").prop("readonly",true);
    let sku = $(this).parent("td").siblings("#sku").html();
    $("#add_product").val("Update Product");
    del(sku);
  });

  //read data
  $("#add_product").click(function () {
    // add_product.onclick()
    console.log("CLICK");
    let prod = {};
    if (!$("#product_sku").val()) {
      error("SKU field is empty");
      redBorder($("#product_sku"));
    } else if (!$("#product_name").val()) {
      error("Name field is empty");
      redBorder($("#product_name"));
    } else if (isNaN(parseFloat($("#product_sku").val()))) {
      error("SKU field not a number");
      redBorder($("#product_sku"));
    } else if (!isNaN(parseFloat($("#product_name").val()))) {
      error("Name field is a number, string needed");
      redBorder($("#product_name"));
    } else {
      prod.sku = $("#product_sku").val();
      prod.name = $("#product_name").val();
      prod.qty = $("#product_quantity").val();
      prod.price = $("#product_price").val();
      console.log(checkUnique(prod));
      $("#product_sku").val("");
      $("#product_name").val("");
      $("#product_quantity").val("");
      $("#product_price").val("");
      $("#product_sku").prop("readonly", false);
      success();
    }
  });
  $(".error").hide();
  $(".success").hide();
});
function checkUnique(p) {
  console.log("chk");
  if (m_data.length < 1) {
    success();
    m_data.push(p);
    display();
    return true;
  }
  for (let i of m_data) {
    console.log(i);
    if (i.sku == p.sku) {
      error("SKU duplicate");
      return false;
    }
  }
  m_data.push(p);
  success();
  display();
  return true;
}
function display() {
  console.log(m_data);
  $("#table_body").html("");
  for (i of m_data) {
    let prodStr = `<tr><td id="sku">${i.sku}</td><td id="name">${i.name}</td><td id="price">${i.price}</td><td id="qty">${i.qty}</td><td><a href="#" class="edit">Edit</a><a href="#" class="delete">Delete</a></td></tr>`;
    $("#table_body").html($("#table_body").html() + prodStr);
  }
}
function del(id) {
  console.log("Deleting " + id);
  temp = []; //new array
  //Adding all elements to temp except the one to be deleted
  for (let i = 0; i < m_data.length; i++) {
    if (m_data[i]["sku"] != id) {
      temp.push(m_data[i]);
    }
    else{
      m_tmp=m_data[i]; // saving the last deleted value
    }
    console.log("DELETE!");
    console.log(m_data);
  }
  m_data = temp; //Assigning temp to m_data
  display();
}
function error(str) {
  $(".error").html(`${str}.<a href="#" class="close">X</a>`);
  $(".error").show();
  $(".success").hide();
  if(!$.isEmptyObject(m_tmp)){
    $("#product_sku").val("");
    $("#product_name").val("");
    $("#product_price").val("");
    $("#product_qty").val("");
    m_data.push(m_tmp);
    display();
  }
}
function success() {
  $("#add_product").val("Add Product");
  $(".error").hide();
  $(".success").show();
  $("input").each(function(){
    whiteBorder($(this));
  });
}
function redBorder(e){
  $(e).css("border-color","red");
}
function whiteBorder(e){
  $(e).css("border-color",'');
}