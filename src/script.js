let m_data = [];
$(function () {
  $(document).on("click", ".close", function () { //Dynamic onclick handling for close message 
    console.log("CLSOE");
    $(this).parent("div").hide();
  });
  //Dynamic onclick handling for delete 
  $(document).on("click", ".delete", function(){
    let sku=$(this).parent("td").siblings("#sku").html();
    del(sku);
  });
  //Dynamic onclick handling for edit
  $(document).on("click", ".edit", function(){
    $("#product_sku").val($(this).parent("td").siblings("#sku").html());
    $("#product_name").val($(this).parent("td").siblings("#name").html());
    $("#product_price").val($(this).parent("td").siblings("#price").html());
    $("#product_quantity").val($(this).parent("td").siblings("#qty").html());
    $("#product_sku").prop("readonly",true);
    let sku=$(this).parent("td").siblings("#sku").html();
    del(sku);
  }); 

  //read data
  $("#add_product").click(function () {
    // add_product.onclick()
    console.log("CLICK");
    let prod = {};
    prod.sku = $("#product_sku").val();
    prod.name = $("#product_name").val();
    prod.qty = $("#product_quantity").val();
    prod.price = $("#product_price").val();
    console.log(checkUnique(prod));
    $("#product_sku").val("");
    $("#product_name").val("");
    $("#product_quantity").val("");
    $("#product_price").val("");
    $("#product_sku").prop("readonly",false);
  });
  $(".error").hide();
  $(".success").hide();
});
function checkUnique(p) {
  console.log("chk");
  if (m_data.length < 1) {
    $(".success").show();
    $(".error").hide();
    m_data.push(p);
    display();
    return true;
  }
  for (let i of m_data) {
    console.log(i);
    if (i.sku == p.sku) {
      $(".error").show();
      $(".success").hide();
      return false;
    }
  }
  m_data.push(p);
  $(".success").show();
  $(".error").hide();
  display();
  return true;
}
function display() {
  console.log(m_data);
  $("#table_body").html("");
  for (i of m_data) {
    let prodStr = `<tr><td id="sku">${i.sku}</td><td id="name">${i.name}</td><td id="qty">${i.qty}</td><td id="price">${i.price}</td><td><a href="#" class="edit">Edit</a><a href="#" class="delete">Delete</a></td></tr>`;
    $("#table_body").html($("#table_body").html() + prodStr);
  }
}
function del(id) {
  console.log("Deleting " + id);
  temp = [];//new array
  //Adding all elements to temp except the one to be deleted
  for (let i = 0; i < m_data.length; i++) {
    if (m_data[i]["sku"] != id) {
      temp.push(m_data[i]);
    }
    console.log("DELETE!");
    console.log(m_data);
  }
  m_data = temp; //Assigning temp to m_data 
  display();
}