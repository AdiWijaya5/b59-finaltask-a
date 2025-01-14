function alertError(messages) {
  Swal.fire({
    position: "center",
    icon: "error",
    title: messages,
    showConfirmButton: true,
  });
}
function alertSuccess(messages) {
  Swal.fire({
    position: "center",
    icon: "success",
    title: messages,
    showConfirmButton: false,
    timer: 1500,
  });
}
function deletButton() {
  event.preventDefault();
  var form = event.target.form;
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        title: "Deleted!",
        text: "Your Hero has been deleted.",
        position: "center",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        form.submit();
      }, 1500);
    }
  });
}
