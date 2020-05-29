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