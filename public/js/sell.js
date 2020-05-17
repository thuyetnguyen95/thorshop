let userCart = {}

function pickProduct(product) {
  console.log(product)
  product = JSON.parse(product)

  if (typeof userCart[product.id] !== 'undefined') {
    let qty = userCart[product.id].qty += 1

    userCart[product.id] = {
      id: product.id,
      cart: product,
      price: product.price,
      qty: qty
    }
  } else {
    userCart[product.id] = {
      id: product.id,
      cart: product,
      price: product.price,
      qty: 1
    }
  }

  setStock(product.id, false)
  renderUserCart()
}


function increment(id) {
  if (typeof userCart[id] !== 'undefined') {
    let qty = userCart[id].qty += 1
    userCart[id].qty = qty

    setStock(id, false)
    renderUserCart()
  }
}

function decrement(id) {
  let qty = 0
  if (typeof userCart[id] !== 'undefined') {
    if (userCart[id].qty > 1) {
      qty = userCart[id].qty -= 1
      userCart[id].qty = qty
    } else {
      delete userCart[id]
    }

    setStock(id, true)

    renderUserCart()
  }
}

function remove(id) {
  setStock(id, true, userCart[id].qty)

  delete userCart[id]

  renderUserCart()
}

function setStock(id, isIncrement = true, qtyRestore = 0) {
  let productStock = parseInt($(`.product-stock_${id}`).text())

  if (qtyRestore) {
    productStock += qtyRestore
  } else {
    if (isIncrement) {
      productStock += 1
    } else {
      productStock -= 1
    }
  }

  if (productStock === 0) {
    $(`#product_${id}`).find('button.btn-pick').addClass('is-btn-hidden')
    $(`#product_${id}`).find('button.btn-out').addClass('is-btn-block')
    $(`#product_${id}`).find('button.btn-pick').removeClass('is-btn-block')
    $(`#product_${id}`).find('button.btn-out').removeClass('is-btn-hidden')
  } else {
    $(`#product_${id}`).find('button.btn-pick').addClass('is-btn-block')
    $(`#product_${id}`).find('button.btn-out').addClass('is-btn-hidden')
    $(`#product_${id}`).find('button.btn-pick').removeClass('is-btn-hidden')
    $(`#product_${id}`).find('button.btn-out').removeClass('is-btn-block')
  }

  $(`.product-stock_${id}`).text(productStock)
}

function renderUserCart() {
  let userCartEl = $('#user-cart')
  let cardDOM = ''
  let userCartParse = Object.values(userCart)

  for (let i = 0; i < userCartParse.length; i++) {
    cardDOM += `<tr class="user-cart-item table-info">
                  <th scope="row">${i + 1}</th>
                  <td>${userCartParse[i].cart.name}</td>
                  <td>${userCartParse[i].price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                  <td>${userCartParse[i].qty}</td>
                  <td>${(userCartParse[i].price * userCartParse[i].qty).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                  <td>
                    <button title="Thêm" class="btn btn-sm btn-info" onclick="increment('${userCartParse[i].id}')">
                      <i class="fa fa-plus"></i>
                    </button>
                    <button title="Giảm" class="btn btn-sm btn-warning" onclick="decrement('${userCartParse[i].id}')">
                      <i class="fa fa-minus"></i>
                    </button>
                    <button title="Loại bỏ" class="btn btn-sm btn-danger" onclick="remove('${userCartParse[i].id}')">
                      <i class="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
                `
  }

  $(userCartEl).html(cardDOM)
}


// Filter product
function filterProduct() {
  let keyword = $('#input-filter').val().trim() || ''
  let productEls = $('.product')

  for (let i = 0; i < productEls.length; i++) {
    let product = $(productEls[i]).find('.product-name')

    if (product[0].innerText && keyword) {
      let isContain = stringToSlug(product[0].innerText).includes(stringToSlug(keyword))

      if (isContain) {
        $(productEls[i]).addClass('is-block')
        $(productEls[i]).removeClass('is-hidden')
      } else {
        $(productEls[i]).addClass('is-hidden')
        $(productEls[i]).removeClass('is-block')
      }
    } else {
      $(productEls[i]).addClass('is-block')
      $(productEls[i]).removeClass('is-hidden')
    }
  }
}

function stringToSlug(str) {
  var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñç",
    to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouunc";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  str = str.toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, '-')
    .replace(/-+/g, '-');

  return str;
}