import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function removeDateMask(dateWithMask: string) {
    const fields = dateWithMask.split('/');
    return fields[2] + '-' + fields[1] + '-' + fields[0];
}

export function addDateMask(dateWithoutMask: string) {
    const fields = dateWithoutMask.split('-');
    return fields[2] + '/' + fields[1] + '/' + fields[0];
}

export function successMessage(message: string) {
    toast.success(message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
}

export function errorMessage(message: string) {
    toast.error(message, {
        position: 'top-center',
        autoClose: 2800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
}

export function warningMessage(message: string) {
    toast.warning(message, {
        position: 'top-center',
        autoClose: 2800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
}