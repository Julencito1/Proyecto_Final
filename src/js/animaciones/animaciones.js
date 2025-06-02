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

function SubMenuPrivadoIn(submenu) {

    submenu.classList.add("animate-scale")
    submenu.classList.remove("animate-scaleOut")
    submenu.classList.remove("hidden")

    ESTADO_SUBMENU_PRIVADO = true
}

function SubMenuPrivadoOut(submenu) {

    submenu.classList.remove("animate-scale")
    submenu.classList.add("animate-scaleOut")

    setTimeout(() => {
        submenu.classList.add("hidden")
    }, 150)

    ESTADO_SUBMENU_PRIVADO = false
}

function MenuUsuarioFiltroVideosGuardarIn()
{
    subContenedor_filtros_videos_guardar.classList.add("animate-scale")
    subContenedor_filtros_videos_guardar.classList.remove("animate-scaleOut")
    subContenedor_filtros_videos_guardar.classList.remove("hidden")


    ESTADO_MENU_FILTROS_VIDEOS_GUARDAR = true

}

function MenuUsuarioFiltroVideosGuardarOut()
{

    subContenedor_filtros_videos_guardar.classList.remove("animate-scale")
    subContenedor_filtros_videos_guardar.classList.add("animate-scaleOut")

    setTimeout(() => {
        subContenedor_filtros_videos_guardar.classList.add("hidden")
    }, 150)

    ESTADO_MENU_FILTROS_VIDEOS_GUARDAR = false

}

function MostrarMenuTresPuntosVideoIn()
{
    submenu_videos_menu_g.classList.add("animate-scale")
    submenu_videos_menu_g.classList.remove("animate-scaleOut")
    submenu_videos_menu_g.classList.remove("hidden")


    ESTADO_SUBMENU_TRES_PUNTOS_VIDEO = true
}

function MostrarMenuTresPuntosVideoOut()
{
    submenu_videos_menu_g.classList.remove("animate-scale")
    submenu_videos_menu_g.classList.add("animate-scaleOut")

    setTimeout(() => {
        submenu_videos_menu_g.classList.add("hidden")
    }, 150)

    ESTADO_SUBMENU_TRES_PUNTOS_VIDEO = false
}

function VelocidadesVideoIn()
{
    submenu_velocidades_video.classList.add("animate-scale")
    submenu_velocidades_video.classList.remove("animate-scaleOut")
    submenu_velocidades_video.classList.remove("hidden")


    ESTADO_SUBMENU_VELOCIDADES = true
}

function VelocidadesVideoOut()
{
    submenu_velocidades_video.classList.remove("animate-scale")
    submenu_velocidades_video.classList.add("animate-scaleOut")

    setTimeout(() => {
        submenu_velocidades_video.classList.add("hidden")
    }, 150)

    ESTADO_SUBMENU_VELOCIDADES = false
}

function CategoriasMenuIn()
{
    contenedor_categorias_listar.classList.add("animate-scale")
    contenedor_categorias_listar.classList.remove("animate-scaleOut")
    contenedor_categorias_listar.classList.remove("hidden")


    ESTADO_MENU_CATEGORIA = true
}

function CategoriasMenuOut()
{
    contenedor_categorias_listar.classList.remove("animate-scale")
    contenedor_categorias_listar.classList.add("animate-scaleOut")

    setTimeout(() => {
        contenedor_categorias_listar.classList.add("hidden")
    }, 150)

    ESTADO_MENU_CATEGORIA = false
}