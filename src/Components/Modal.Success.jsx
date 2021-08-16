import Swal from "sweetalert2";

const Success = (message) =>
  Swal.fire({
    icon: "success",
    title: "SUCCESSS",
    text: `${message ? message : "Completed"}`,
    showConfirmButton: false,
    timer: 3000,
  });

export default Success;
