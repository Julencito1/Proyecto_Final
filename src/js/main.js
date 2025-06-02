let token = localStorage.getItem("logged")



const contenedor_notificaciones_btn = document.getElementById("contenedor_notificaciones_btn")
const contenedor_buscador = document.getElementById("contenedor_buscador")
const contenedor_menu_usuario = document.getElementById("contenedor_menu_usuario")
const contenedor_crear = document.getElementById("contenedor_crear")
const contenedor_submenu_privado = document.getElementById("contenedor_submenu_privado")
const contenedor_filtros_videos_guardar = document.getElementById("contenedor_filtros_videos_guardar")
const contenedor_submenu_tres_puntos_video = document.getElementById("contenedor_submenu_tres_puntos_video")
const contenedor_velocidades_video = document.getElementById("contenedor_velocidades_video")
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

  if (contenedor_filtros_videos_guardar && !contenedor_filtros_videos_guardar.contains(e.target))
  {
    MenuUsuarioFiltroVideosGuardarOut()
  }

  if (contenedor_submenu_tres_puntos_video && !contenedor_submenu_tres_puntos_video.contains(e.target))
  {
    MostrarMenuTresPuntosVideoOut()
  }
  
  if (contenedor_velocidades_video && !contenedor_velocidades_video.contains(e.target))
    {
      VelocidadesVideoOut()
    }


})

let busquedasRecientes = localStorage.getItem("busquedas_recientes")

if (!busquedasRecientes)
{
  localStorage.setItem("busquedas_recientes", JSON.stringify([]))
}


