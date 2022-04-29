import swal from 'sweetalert2'

export const buildQueryString = (obj) => {
    const keyValuePairs = []
    for (const key in obj) {
        keyValuePairs.push(
            encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
        )
    }
    return keyValuePairs.join('&')
}

export const sendAlert = (message, type, timer = 4000) => {
    const icon = type
    swal
        .mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
            customClass: {
                container: 'tofront'
            },
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', swal.stopTimer)
                toast.addEventListener('mouseleave', swal.resumeTimer)
            }
        })
        .fire({
            icon: icon,
            title: message
        })
}
