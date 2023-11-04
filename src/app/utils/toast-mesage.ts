import Swal, { SweetAlertOptions } from "sweetalert2";

interface ToastOption {
    heightAuto: boolean,
    timerProgressBar: boolean,
    timer: number,
    allowOutsideClick: boolean,
    title: string,
    showConfirmButton: boolean,
    confirmButtonText: string,
    confirmButtonColor: string,
}

const options: ToastOption = {
    heightAuto: false,
    timerProgressBar: true,
    timer: 4000,
    allowOutsideClick: true,
    title: '',
    showConfirmButton: true,
    confirmButtonText: 'OK',
    confirmButtonColor: 'green',
}

const errorOption: SweetAlertOptions = {
  icon: 'error',
  ...options
};

const successOption: SweetAlertOptions = {
  icon: 'success',
  ...options
};

const warningOption: SweetAlertOptions = {
  icon: 'warning',
  ...options
};

export const showSuccessPopup = async (message?: string) => {
  if (message) successOption.title = message;
  const res = await Swal.fire(successOption);
  return res;
};

export const showWarningPopup = async (message?: string) => {
  if (message) warningOption.title = message;
  const res = await Swal.fire(warningOption);
  return res;
};

export const showErrorPopup = async (message?: string) => {
  if (message) errorOption.title = message;
  const res = await Swal.fire(errorOption);
  return res;
};

