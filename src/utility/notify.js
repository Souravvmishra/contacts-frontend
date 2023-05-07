import { toast } from "react-toastify";
import "./toast.css"

export const notify = (message) => toast(`${message} `, {
    position: "top-center",
    className : "main",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    progressClassName: "toastProgress",
    bodyClassName: "toastBody",
    toastClassName: 'toastClass',
    closeButton : false



});;