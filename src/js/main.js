let token = localStorage.getItem("logged")



const contenedor_notificaciones_btn = document.getElementById("contenedor_notificaciones_btn")
const contenedor_buscador = document.getElementById("contenedor_buscador")
const contenedor_menu_usuario = document.getElementById("contenedor_menu_usuario")
const contenedor_crear = document.getElementById("contenedor_crear")
const main = document.getElementById('main')

document.addEventListener("click", (e) => {
  if (contenedor_notificaciones_btn && !contenedor_notificaciones_btn.contains(e.target)) {
    NotificacionesOut()
  }

  if (contenedor_buscador && !contenedor_buscador.contains(e.target)) {
    RecomendacionesOut()
  }

  if (contenedor_menu_usuario && !contenedor_menu_usuario.contains(e.target)) {
    MenuUsuarioOut()
  }

  if (contenedor_crear && !contenedor_crear.contains(e.target))
  {
    MenuCrearNuevoOut()
  }
})



