function NotificacionesIn() {
    notificaciones.classList.remove("animate-scaleOut")
    notificaciones.classList.add("animate-scale")
    notificaciones.classList.remove("hidden")
    ESTADO_NOTIFICACIONES = true
}

function NotificacionesOut() {
    notificaciones.classList.remove("animate-scale")
    notificaciones.classList.add("animate-scaleOut")
    setTimeout(() => {
        notificaciones.classList.add("hidden")
    }, 150)
    ESTADO_NOTIFICACIONES = false
}

function RecomendacionesIn() {
    recomendaciones.classList.remove("hidden")
}

function RecomendacionesOut() {
    recomendaciones.classList.add("hidden")
}

function MenuUsuarioIn() {
    menu_usuario?.classList.remove("animate-scaleOut")
    menu_usuario?.classList.add("animate-scale")
    menu_usuario.classList.remove("hidden")
    ESTADO_MENU = true
}

function MenuUsuarioOut() {
    menu_usuario?.classList.remove("animate-scale")
    menu_usuario?.classList.add("animate-scaleOut")
    
    setTimeout(() => {
        menu_usuario.classList.add("hidden")
    }, 150)

    ESTADO_MENU = false
}

function MenuCrearNuevoIn() {

    desplegable_crear.classList.add("animate-scale")
    desplegable_crear.classList.remove("animate-scaleOut")
    desplegable_crear.classList.remove("hidden")

    ESTADO_CREAR_NUEVO = true
}

function MenuCrearNuevoOut() {

    desplegable_crear.classList.remove("animate-scale")
    desplegable_crear.classList.add("animate-scaleOut")

    setTimeout(() => {
        desplegable_crear.classList.add("hidden")
    }, 150)

    ESTADO_CREAR_NUEVO = false
}