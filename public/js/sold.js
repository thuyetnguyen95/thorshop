let orderDeleteId = null

function openConfirmDelete(id) {
  orderDeleteId = id
}

function deleteOrder() {
  let url = `/thor/sold/delete/${orderDeleteId}`
  
  window.location.href = url
}

$('#modalConfirmDelete').on('hidden.bs.modal', function (e) {
  orderDeleteId = null
})

//=================================================================
let debtAmount = null
let debtId = null

function openConfirmPay(id, name, amount) {
  debtId = id || null

  name = name || 'Guest'
  amount = parseInt(amount) || 0
  amountWithFormat = amount.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})

  $('#messageConfirmPay').html(`
    <div>
    <span>Bạn đang thanh toán nợ cho</span>
    <span class='font-weight-bold'> ${name} </span>
    </div>
    <div>
    <span>Với số tiền là: </span>
    <span class='font-weight-bold'> ${amountWithFormat} !</span>
    </div>
  `)
}

function pay() {
  let url = `/thor/sold/pay-debt/${debtId}`
  
  window.location.href = url
}

$('#modalConfirmPay').on('hidden.bs.modal', function (e) {
  debtId = null

  $('#messageConfirmPay').text('')
})