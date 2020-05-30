let productId = null

function openConfirmDeleteProduct(id) {
  productId = id
}

function deleteProduct() {
  let url = `/thor/product/delete/${productId}`
  window.location.href = url
}

$('#modalConfirmDeleteProduct').on('hidden.bs.modal', function (e) {
  productId = null
})