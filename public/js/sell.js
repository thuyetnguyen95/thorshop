let userCart = {}

/**
 * Handle pick product to cart
 * 
 * @param {Object} product 
 */
function pickProduct(product) {
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

/**
 * Handle click increment button on cart list
 * 
 * @param {String} id 
 */
function increment(id) {
  let productStock = parseInt($(`.product-stock_${id}`).text())

  if (typeof userCart[id] !== 'undefined' && productStock > 0) {
    let qty = userCart[id].qty += 1
    userCart[id].qty = qty

    setStock(id, false)
    renderUserCart()
  }
}

/**
 * Handle click decrement button on cart list
 * 
 * @param {String} id 
 */
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

/**
 * Handle remove item on cart
 * 
 * @param {String} id 
 */
function remove(id) {
  setStock(id, true, userCart[id].qty)

  delete userCart[id]

  renderUserCart()
}

/**
 * Re-set stock on products list
 * 
 * @param {String} id 
 * @param {Boolean} isIncrement 
 * @param {Int, String} qtyRestore 
 */
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

/**
 * Render cart with product choosed
 */
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

  setCartToBill()
  $(userCartEl).html(cardDOM)
  allowSubmitPay()
  setCartInfo()
}

/**
 * Check button submit is available
 */
function allowSubmitPay() {
  let inDebt = parseInt($('#f_in_debt').val() || 0)

  let userCartArr = Object.values(userCart)
  if (userCartArr.length && inDebt >= 0) {
    $('#btnSubmitPay').removeAttr('disabled')
  } else {
    $('#btnSubmitPay').attr('disabled','disabled')
  }
}

/**
 * Set cart info to submit
 */
function setCartInfo() {
  let userCartArr = Object.values(userCart)
  
  let productInfo = []
  for (let i = 0; i < userCartArr.length; i++) {
    productInfo.push({
      id: userCartArr[i].id,
      qty: userCartArr[i].qty,
      price: userCartArr[i].price
    })
  }

  $('#productInfo').val(JSON.stringify(productInfo))
}

/**
 * Set cart info to bill (qty, total price, pay...)
 */
function setCartToBill() {
  let userCartArr = Object.values(userCart)
  let totalPrice = userCartArr.reduce(function(accumulator, cartItem) {
    accumulator += cartItem.qty * cartItem.price

    return accumulator
  }, 0)

  let qty = userCartArr.reduce(function(accumulator, cartItem) {
    accumulator += cartItem.qty

    return accumulator
  }, 0)

  $('#f_qty').val(qty)
  $('#f_total_price').val(totalPrice)

  //Reset calc bill
  $('#f_pay').val('')
  onChangePay()

  if (!userCartArr.length) {
    $('#f_pay').val('')
    $('#f_qty').val('')
    $('#f_total_price').val('')
    $('#f_in_debt').val('')
    $('#f_refund').val('')
  }
}

/**
 * Handle input pay
 */
function onChangePay() {
  let pay = parseInt($('#f_pay').val()) || 0
  let totalPrice = parseInt($('#f_total_price').val())  || 0

  if (pay > totalPrice) {
    $('#f_refund').val(pay - totalPrice)
    $('#f_in_debt').val('')
  } else {
    $('#f_in_debt').val(totalPrice - pay)
    $('#f_refund').val('')
  }

  allowSubmitPay()
}

function onFilterUser() {
  $('#f_user')[0][0].selected = true

  let keyword = $('#f_filter_user').val().trim() || ''
  let userEls = $('#f_user')
  userEls = userEls[0]

  for (let i = 0; i < userEls.length; i++) {
    let user = userEls[i].innerText

    if (user && keyword) {
      let isContain = stringToSlug(user).includes(stringToSlug(keyword))

      if (isContain) {
        $(userEls[i]).addClass('is-block')
        $(userEls[i]).removeClass('is-hidden')
      } else {
        $(userEls[i]).addClass('is-hidden')
        $(userEls[i]).removeClass('is-block')
      }
    } else {
      $(userEls[i]).addClass('is-block')
      $(userEls[i]).removeClass('is-hidden')
    }
  }
}

/**
 * Handle filter products
 */
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

/**
 * Convert Vietnamese character with mark
 * 
 * Source: https://gist.github.com/bluzky/b8c205c98ff3318907b30c3e0da4bf3f
 * Auth: bluzky
 * 
 * @param {String} str 
 */
function stringToSlug(str) {
  var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçỳýỷỹỵ",
    to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  str = str.toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, '-')
    .replace(/-+/g, '-');

  return str;
}