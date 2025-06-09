let parametros = new URLSearchParams(document.location.search)
let video = parametros.get("ref")

if (!video) {
    window.location.href = '../404.html'
}


let contenedor_ref = document.getElementById("contenedor_ref")
let video_tag = document.getElementById("video_tag")
let contenedor_ref_video_reproductor = document.getElementById("contenedor_ref_video_reproductor")
let controles_video_tag_cus = document.getElementById("controles_video_tag_cus")
let rep_par_btn = document.getElementById("rep_par_btn")
let sonido_btn = document.getElementById("sonido_btn")
let barra_sonido = document.getElementById("barra_sonido")
let tiempo_actual = document.getElementById("tiempo_actual")
let tiempo_video = document.getElementById("tiempo_video")
let agrandar_video_btn = document.getElementById("agrandar_video_btn")
let barra_mover_video = document.getElementById("barra_mover_video")
let btn_compartir_video_enlace_videos = document.getElementById("btn_compartir_video_enlace_videos")

let tiempoActual = 0
let tiempoVideo = 0
let separacionTiempoPausa = 1000
let velocidadVideo = 1000
var REPRODUCIENDO = false
var ESTADO_SONIDO = true
var ESTADO_SUBMENU_VELOCIDADES = false
var MARCADO_ESTADO = { estado: 0, tipo: "" }
var NOMBRE_CANAL = ""
var llego_final = false

video_tag.pause()

rep_par_btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play-icon lucide-play"><path d="m6 3 14 9-14 9z"/></svg>`


rep_par_btn.addEventListener("click", () => {

    if (llego_final) {
        REPRODUCIENDO = true
        video_tag.currentTime = 0
        tiempoActual = 0
        separacionTiempoPausa = 1000
        video_tag.play()
        tiempo_actual.textContent = "00:00"
        llego_final = false
        rep_par_btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause-icon lucide-pause"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>`
        return
    }

    if (REPRODUCIENDO) {
        video_tag.pause()
        REPRODUCIENDO = false
        
        rep_par_btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play-icon lucide-play"><path d="m6 3 14 9-14 9z"/></svg>`

    } else {
        video_tag.play()
        REPRODUCIENDO = true
        
        rep_par_btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause-icon lucide-pause"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>`
    }


})

function IconoSonidoActual() {

    if (video_tag.volume > 0.5 && !video_tag.muted) {
        sonido_btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume2-icon lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>
        `
    } else if (video_tag.volume <= 0.5 && video_tag.volume >= 0.1 && !video_tag.muted) {
        sonido_btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume1-icon lucide-volume-1"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"/></svg>
        `
    } else {
        sonido_btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#fff" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-x-icon lucide-volume-x"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>
        `
    }

}


barra_sonido.value = video_tag.muted ? 0 : 1

IconoSonidoActual()

sonido_btn.addEventListener("click", () => {

    if (ESTADO_SONIDO) {
        video_tag.muted = true
        ESTADO_SONIDO = false
        barra_sonido.value = 0
        video_tag.volume = 0
        IconoSonidoActual()
    } else {
        video_tag.muted = false
        ESTADO_SONIDO = true
        barra_sonido.value = 1
        video_tag.volume = 1
        IconoSonidoActual()
    }


})


barra_sonido.addEventListener("input", (e) => {

    video_tag.volume = e.target.value

    if (video_tag.volume > 0) {
        video_tag.muted = false
        ESTADO_SONIDO = true
        IconoSonidoActual()
    } else {
        video_tag.muted = true
        ESTADO_SONIDO = false
        IconoSonidoActual()
    }


})

let actualTiempoVideo = null
let xTime = null

video_tag.addEventListener("timeupdate", () => {

    tiempoActual = Math.floor(video_tag.currentTime)
    
    barra_mover_video.value = Math.floor(video_tag.currentTime)

    tiempo_actual.textContent = `${String(Math.floor(tiempoActual / 60)).padStart(2, "0")}:${String(tiempoActual % 60).padStart(2, "0")}`
    
    if (video_tag.duration === video_tag.currentTime) {

        llego_final = true
        REPRODUCIENDO = false
        video_tag.pause()
        rep_par_btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw-icon lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
        `
    }
    
    
})

var ESTADO_FS = false


agrandar_video_btn.addEventListener("click", () => {

    if (ESTADO_FS) {
       
        document.exitFullscreen()
        video_tag.setAttribute("class", "w-full max-h-[840px] object-contain")
        ESTADO_FS = false
    } else {
        contenedor_ref_video_reproductor.requestFullscreen()
        video_tag.setAttribute("class", "w-full object-contain h-full")
        ESTADO_FS = true
    }
})

function AlmacenarHistorial() { 
    if (!localStorage.getItem("logged") || !video) return

    fetch("http://localhost:8080/historial/almacenar",
        {
            method: 'POST',
            body: JSON.stringify({
                identificador: video
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
        .then((res) => {
            if (!res.ok) {
                throw new Error("ERROR")
            }

            return res.json()
        })
        .then((datos) => {

            if (datos.codigo === 404) {
                window.location.href = '../404.html'
            }

        })
}

AlmacenarHistorial()

var ESTADO_SUSCRIPCION = null
var ESTADO_SUBMENU_TRES_PUNTOS_VIDEO = false
var ESTADO_GUARDADO_VIDEO = null
let contenedor_video_segundalinea = document.getElementById("contenedor_video_segundalinea")
let btn_video_megusta = document.getElementById("btn_video_megusta")
let btn_video_no_megusta = document.getElementById("btn_video_no_megusta")
let btn_video_guardar_video = document.getElementById("btn_video_guardar_video")
let submenu_videos_menu_g = document.getElementById("submenu_videos_menu_g")
let tres_video_mostrar_submenu = document.getElementById("tres_video_mostrar_submenu")
let video_link_canal_usuario = document.getElementById("video_link_canal_usuario")

function EstadisticasVideo() {
    if (!localStorage.getItem("logged") || !video) return

    fetch("http://localhost:8080/videos/estadisticas",
        {
            method: 'POST',
            body: JSON.stringify({
                identificador: video
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
        .then((res) => {
            if (!res.ok) {
                throw new Error("ERROR")
            }

            return res.json()
        })
        .then((datos) => {

            if (datos.codigo === 404) {
                window.location.href = '../404.html'
            } else if (datos.codigo === 200) {
                if (!datos.mensaje.estado) {
                    window.location.href = '../404.html'
                }

                ESTADO_SUSCRIPCION = datos.mensaje.suscriptor

                if (!datos.mensaje.actual) {
                    let btnSuscribir = document.createElement("div")

                    btnSuscribir.innerHTML = `
                <button id='btn_suscribir_canal_vid' class="rounded-full flex items-center gap-2 cursor-pointer px-4 py-[5px] font-Inter text-[13px] transition-opacity duration-150 ${ESTADO_SUSCRIPCION ? "bg-slate-100 text-black" : "text-white bg-black"} hover:opacity-80">
                                    <div>
                                    ${ESTADO_SUSCRIPCION ? "Suscrito" : "Suscribirme"}
                                    </div>
                                </button>   
                `

                    contenedor_video_segundalinea.appendChild(btnSuscribir)

                    let btn_suscribir_canal_vid = document.getElementById("btn_suscribir_canal_vid")

                    btn_suscribir_canal_vid.addEventListener("click", () => {

                        if (!ESTADO_SUSCRIPCION) {
                            SuscribirseCanal(NOMBRE_CANAL)

                        } else {

                            QuitarSuscripcion(NOMBRE_CANAL)
                        }
                    })
                }

                if (datos.mensaje.guardado)
                {
                    btn_video_guardar_video.innerHTML = `
                        <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark-minus-icon lucide-bookmark-minus"><path d="m16.625 18.375 -6.125 -3.5 -6.125 3.5V4.375a1.75 1.75 0 0 1 1.75 -1.75h8.75a1.75 1.75 0 0 1 1.75 1.75z"/><path x1="15" x2="9" y1="10" y2="10" d="M13.125 8.75L7.875 8.75"/></svg>
                                                </div>
                                                Quitar de guardados
                    `
                    ESTADO_GUARDADO_VIDEO = false
                    
                } else {
                    btn_video_guardar_video.innerHTML = `
                        <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark-icon lucide-bookmark"><path d="m16.625 18.375-6.125-3.5-6.125 3.5v-14a1.75 1.75 0 0 1 1.75-1.75h8.75a1.75 1.75 0 0 1 1.75 1.75z"/></svg>
                                            </div>
                                            Guardar video
                    `
                    ESTADO_GUARDADO_VIDEO = true
                }

                if (datos.mensaje.gustado === "si" || datos.mensaje.gustado === "no") {
                    MARCADO_ESTADO = { estado: 1, tipo: datos.mensaje.gustado }

                    switch (MARCADO_ESTADO.tipo) {
                        case "si":
                            btn_video_megusta.classList.add("bg-green-100")
                            break;
                        case "no":
                            btn_video_no_megusta.classList.add("bg-red-100")
                            break;
                    }
                }
            }

        })
}

EstadisticasVideo()

tres_video_mostrar_submenu.addEventListener("click", () => {

    if (ESTADO_SUBMENU_TRES_PUNTOS_VIDEO)
    {
        MostrarMenuTresPuntosVideoOut()
    } else {
        MostrarMenuTresPuntosVideoIn()
    }
})

btn_video_guardar_video.addEventListener("click", () => {

    
    

    if (ESTADO_GUARDADO_VIDEO)
    {

        GuardarVideoVideos()
        btn_video_guardar_video.innerHTML = `
            <div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark-minus-icon lucide-bookmark-minus"><path d="m16.625 18.375 -6.125 -3.5 -6.125 3.5V4.375a1.75 1.75 0 0 1 1.75 -1.75h8.75a1.75 1.75 0 0 1 1.75 1.75z"/><path x1="15" x2="9" y1="10" y2="10" d="M13.125 8.75L7.875 8.75"/></svg>
                                                </div>
                                                Quitar de guardados
        `
       
    } else {
        QuitarVideoGuardadosVideos()
        btn_video_guardar_video.innerHTML = `
                        <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark-icon lucide-bookmark"><path d="m16.625 18.375-6.125-3.5-6.125 3.5v-14a1.75 1.75 0 0 1 1.75-1.75h8.75a1.75 1.75 0 0 1 1.75 1.75z"/></svg>
                                            </div>
                                            Guardar video
                    `
        
    }
 
})


btn_video_megusta.addEventListener("click", () => {

    if (MARCADO_ESTADO.estado === 1 && MARCADO_ESTADO.tipo === "si") {
        QuitarMarcado()
        MARCADO_ESTADO = { estado: 0, tipo: "" }
        video_total_megusta.textContent = Number(video_total_megusta.textContent) - 1
        btn_video_megusta.classList.remove("bg-green-100")
        btn_video_no_megusta.classList.remove("bg-red-100")

    } else if (MARCADO_ESTADO.estado === 1 && MARCADO_ESTADO.tipo === "no") {

        QuitarMarcado()
        MeGusta()
        btn_video_megusta.classList.add("bg-green-100")
        btn_video_no_megusta.classList.remove("bg-red-100")
        MARCADO_ESTADO = { estado: 1, tipo: "si" }
        video_total_nomegusta.textContent = Number(video_total_nomegusta.textContent) - 1
        video_total_megusta.textContent = Number(video_total_megusta.textContent) + 1

    } else {

        MeGusta()
        MARCADO_ESTADO = { estado: 1, tipo: "si" }
        video_total_megusta.textContent = Number(video_total_megusta.textContent) + 1
        btn_video_megusta.classList.add("bg-green-100")
        btn_video_no_megusta.classList.remove("bg-red-100")
    }

})

btn_video_no_megusta.addEventListener("click", () => {

    if (MARCADO_ESTADO.estado === 1 && MARCADO_ESTADO.tipo === "no") {
        QuitarMarcado()
        MARCADO_ESTADO = { estado: 0, tipo: "" }
        video_total_nomegusta.textContent = Number(video_total_nomegusta.textContent) - 1
        btn_video_megusta.classList.remove("bg-green-100")
        btn_video_no_megusta.classList.remove("bg-red-100")

    } else if (MARCADO_ESTADO.estado === 1 && MARCADO_ESTADO.tipo === "si") {

        QuitarMarcado()
        NoMeGusta()
        btn_video_megusta.classList.remove("bg-green-100")
        btn_video_no_megusta.classList.add("bg-red-100")
        MARCADO_ESTADO = { estado: 1, tipo: "no" }
        video_total_megusta.textContent = Number(video_total_megusta.textContent) - 1
        video_total_nomegusta.textContent = Number(video_total_nomegusta.textContent) + 1
    } else {

        NoMeGusta()
        MARCADO_ESTADO = { estado: 1, tipo: "no" }
        video_total_nomegusta.textContent = Number(video_total_nomegusta.textContent) + 1
        btn_video_megusta.classList.remove("bg-green-100")
        btn_video_no_megusta.classList.add("bg-red-100")
    }

})


let titulo_video = document.getElementById("titulo_video")
let img_video_canal_usuario = document.getElementById("img_video_canal_usuario")
let nombre_video_canal_usuario = document.getElementById("nombre_video_canal_usuario")
let videos_vistas = document.getElementById("videos_vistas")
let video_fecha_creacion = document.getElementById("video_fecha_creacion")
let video_categoria = document.getElementById("video_categoria")
let video_descripcion = document.getElementById("video_descripcion")
let video_total_megusta = document.getElementById("video_total_megusta")
let video_total_nomegusta = document.getElementById("video_total_nomegusta")
let total_suscriptores_video_canal = document.getElementById("total_suscriptores_video_canal")

function ObtenerDatosVideo() {
    if (!localStorage.getItem("logged") || !video) return

    fetch("http://localhost:8080/videos/datos/video",
        {
            method: 'POST',
            body: JSON.stringify({
                identificador: video
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
        .then((res) => {
            if (!res.ok) {
                throw new Error("ERROR")
            }

            return res.json()
        })
        .then((datos) => {

            if (datos.codigo === 404) {
                window.location.href = '../404.html'
            } else if (datos.codigo === 200) {
                let video = datos.mensaje.video

                video_tag.src = video.media.video
                document.title = video.titulo + " - NewTube"
                tiempoVideo = video.media.duracion
                titulo_video.textContent = video.titulo
                titulo_video.title = video.titulo
                img_video_canal_usuario.src = video.canal.media.avatar
                nombre_video_canal_usuario.textContent = video.canal.nombre_usuario
                videos_vistas.textContent = video.estadisticas.visitas + " visualizaciones"
                video_fecha_creacion.textContent += video.estadisticas.fecha.fecha_creacion
                video_categoria.textContent = video.categoria.nombre
                video_categoria.href = '../index.html?categoria=' + video.categoria.nombre
                video_descripcion.textContent = video.descripcion
                video_total_megusta.textContent = video.estadisticas.me_gusta
                video_total_nomegusta.textContent = video.estadisticas.no_megusta
                NOMBRE_CANAL = video.canal.nombre
                video_link_canal_usuario.href = './canal.html?ref=' + video.canal.nombre
                total_suscriptores_video_canal.textContent = video.canal.total_suscriptores
                barra_mover_video.max = video.media.duracion
                
                tiempo_video.textContent = `${Math.trunc(video.media.duracion / 60) < 10 ? "0" + String(Math.trunc(video.media.duracion / 60)) : String(Math.trunc(video.media.duracion / 60))}:${video.media.duracion % 60 < 10 ? "0" + String(video.media.duracion % 60) : video.media.duracion % 60}`;
            }

        })
}

ObtenerDatosVideo()

function SuscribirseCanal(nombre_canal) {

    fetch(`http://localhost:8080/canal/agregar/suscribirse`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`,
            },
            body: JSON.stringify({
                canal: nombre_canal,
            })
        }
    )
        .then((res) => {

            if (!res.ok) {

                throw new Error("ERROR")
            }
            return res.json()
        })
        .then((datos) => {

            if (datos.codigo === 200) {
                ESTADO_SUSCRIPCION = true
                EstilosBtnSuscripcion()
                total_suscriptores_video_canal.textContent = Number(total_suscriptores_video_canal.textContent) + 1
            }
        })
}

function QuitarSuscripcion(nombre_canal) {


    fetch(`http://localhost:8080/canal/quitar/suscribirse`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`,
            },
            body: JSON.stringify({
                canal: nombre_canal,
            })
        }
    )
        .then((res) => {

            if (!res.ok) {

                throw new Error("ERROR")
            }
            return res.json()
        })
        .then((datos) => {

            if (datos.codigo === 200) {
                ESTADO_SUSCRIPCION = false
                EstilosBtnSuscripcion()
                total_suscriptores_video_canal.textContent = Number(total_suscriptores_video_canal.textContent) - 1
            }
        })

}

function MeGusta() {
    fetch(`http://localhost:8080/videos/megusta`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`,
            },
            body: JSON.stringify({
                identificador: video,
            })
        }
    )
        .then((res) => {

            if (!res.ok) {

                throw new Error("ERROR")
            }
            return res.json()
        })
        .then((datos) => {

            if (datos.codigo === 200) {

            }
        })
}

function NoMeGusta() {
    fetch(`http://localhost:8080/videos/nomegusta`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`,
            },
            body: JSON.stringify({
                identificador: video,
            })
        }
    )
        .then((res) => {

            if (!res.ok) {

                throw new Error("ERROR")
            }
            return res.json()
        })
        .then((datos) => {

            if (datos.codigo === 200) {

            }
        })
}

function QuitarMarcado() {
    fetch(`http://localhost:8080/videos/quitar/marcado`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`,
            },
            body: JSON.stringify({
                identificador: video,
            })
        }
    )
        .then((res) => {

            if (!res.ok) {

                throw new Error("ERROR")
            }
            return res.json()
        })
        .then((datos) => {

            if (datos.codigo === 200) {

            }
        })
}

function EstilosBtnSuscripcion() {
    let btn_suscribir_canal_vid = document.getElementById("btn_suscribir_canal_vid")

    if (ESTADO_SUSCRIPCION) {
        btn_suscribir_canal_vid?.classList.add("bg-slate-100", "text-black")
        btn_suscribir_canal_vid?.classList.remove("bg-black", "text-white")
    }
    else {
        btn_suscribir_canal_vid?.classList.add("bg-black", "text-white")
        btn_suscribir_canal_vid?.classList.remove("bg-slate-100", "text-black")
    }

    btn_suscribir_canal_vid.textContent = ESTADO_SUSCRIPCION ? "Suscrito" : "Suscribirme"


}

let contenedor_comentarios_video = document.getElementById("contenedor_comentarios_video")
let cabecera_comentarios_total = document.getElementById("cabecera_comentarios_total")
let mostrarComentariosPosiciones = []

function ObtenerComentarios(limit = 20, offset = 0) {
    mostrarComentariosPosiciones = []

    const timeout = setTimeout(() => {

        let loaderComentarios = document.createElement("div")
        loaderComentarios.classList.add("flex", "items-center", "justify-center", "mt-3")
        loaderComentarios.setAttribute("id", "loaderComentariosVideo")
        
        loaderComentarios.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide animate-spin lucide-loader-icon lucide-loader"><path d="M9 1.5v3"/><path d="m12.144 5.844 2.172 -2.172"/><path d="M13.5 9h3"/><path d="m12.144 12.144 2.172 2.172"/><path d="M9 13.5v3"/><path d="m3.672 14.328 2.172 -2.172"/><path d="M1.5 9h3"/><path d="m3.672 3.672 2.172 2.172"/></svg>
        `

        contenedor_comentarios_video.appendChild(loaderComentarios)

    }, 200)

    fetch(`http://localhost:8080/obtener/comentarios`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`,
            },
            body: JSON.stringify({
                identificador: video,
                limit: limit,
                offset: offset
            })
        }
    )
        .then((res) => {

            if (!res.ok) {

                throw new Error("ERROR")
            }
            return res.json()
        })
        .then((datos) => {

            try {
                if (datos.codigo === 200) {

                    let comentarios = datos.mensaje.comentarios
                    cabecera_comentarios_total.textContent = `${datos.mensaje.total} Comentarios`
    
                    if (comentarios.length > 0) {
    
                        
    
                        for (let j = 0; j < comentarios.length; j++) {
                            let comentarioPrincipal = document.createElement("div")
                            comentarioPrincipal.setAttribute("id", `comentario_${offset + j}`)
                            comentarioPrincipal.classList.add("flex", "flex-col", "gap-0.5", "relative")
    
    
    
                            comentarioPrincipal.innerHTML = `
                            
                                <div class='flex flex-row items-center z-30'>
                                    <div class='flex items-center gap-2'>
                                        <div>
                                        <a href="./canal.html?ref=${comentarios[j].usuario.canal.nombre}" class='flex flex-row items-center gap-3'>
                                            <div>
                                                <img src='${comentarios[j].usuario.media.avatar}' width='30' height='30' class='rounded-full bg-center bg-cover overflow-hidden bg-no-repeat' />
                                            </div>
                                            <div class='font-Geist font-medium text-[13px]'>
                                                ${comentarios[j].usuario.nombre}
                                            </div>
                                        </a>
                                        </div>
                                        <div class='font-Geist text-xs text-gray-700'>·</div>
                                        <div class='font-Geist text-xs text-gray-700'>
                                            ${comentarios[j].fecha.fecha_publicacion}
                                        </div>
                                    </div>
                                </div>
                                <div class='pl-[42px] flex flex-col gap-2'>
                                    <div>
                                        <p class='font-Geist text-[13px] break-all'>
                                            ${comentarios[j].contenido}
                                        </p>
                                    </div>
                                    <div class='flex items-center gap-2'>
                                        <button id='btnMarcadoComentario_${offset+j}' onclick='MarcarSiComentario(${offset+j}, "${comentarios[j].accion.identificador}")' class='rounded-full flex items-center gap-2 font-Geist text-xs p-1 transition-colors duration-150 hover:bg-gray-100'>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M6.125 8.75v10.5m7-14.105L12.25 8.75h5.101a1.75 1.75 0 0 1 1.68 2.24l-2.039 7a1.75 1.75 0 0 1-1.679 1.26H3.5a1.75 1.75 0 0 1-1.75-1.75v-7A1.75 1.75 0 0 1 3.5 8.75h2.415a1.75 1.75 0 0 0 1.566-.971L10.5 1.75a2.74 2.74 0 0 1 2.625 3.395"/></svg>
                                            </div>
                                            <span id='contMeGusta_${offset+j}'>${comentarios[j].estadisticas.megusta}</span>
                                        </button>
                                        <button id='btnMarcadoNoComentario_${offset+j}' onclick='MarcarNoComentario(${offset+j}, "${comentarios[j].accion.identificador}")' class='rounded-full flex items-center gap-2 font-Geist text-xs p-1 transition-colors duration-150 hover:bg-gray-100'>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-down-icon lucide-thumbs-down"><path d="M14.875 12.25V1.75"/><path d="M7.875 15.855 8.75 12.25H3.649a1.75 1.75 0 0 1 -1.68 -2.24l2.039 -7A1.75 1.75 0 0 1 5.688 1.75H17.5a1.75 1.75 0 0 1 1.75 1.75v7a1.75 1.75 0 0 1 -1.75 1.75h-2.415a1.75 1.75 0 0 0 -1.566 0.971L10.5 19.25a2.739 2.739 0 0 1 -2.625 -3.395"/></svg>
                                            </div>
                                            <span id='contNoMeGusta_${offset+j}'>${comentarios[j].estadisticas.no_megusta}</span>
                                        </button>
                                        <button onclick='MostrarRespuestasInput(${offset+j})' class='rounded-full flex items-center gap-1 font-Geist text-xs px-3 py-1.5 transition-colors duration-150 hover:bg-gray-100'>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-reply-icon lucide-reply"><path d="M20 18v-2a4 4 0 0 0-4-4H4"/><path d="m9 17-5-5 5-5"/></svg>
                                            </div>
                                            Responder
                                        </button>
                                        </div>
                                        <div id='responder_caja_comentario_${offset+j}' class='flex gap-3 w-full hidden'>
                                        <div>
                                            <img src='${IMAGEN_USUARIO}'  class='rounded-full min-h-[24px] min-w-[24px] w-[24px] h-[24px] bg-center bg-cover bg-no-repeat' />
                                        </div>
                                        <div class='w-[calc(100%-33.32px)] flex flex-col gap-3'>
                                            <div id='responder_comentario_input_${offset+j}' contenteditable spellcheck='false' class='outline-none whitespace-break-spaces border-b px-2 py-1 font-Inter text-xs'></div>
                                            <div class='flex items-center gap-2 ml-auto'>
                                                <div>
                                                    <button onclick='OcultarRespuestasInput(${offset+j})' class='rounded-full px-3 py-1.5 font-Geist text-xs transition-colors duration-150 hover:bg-gray-100'>
                                                        Cancelar
                                                    </button>
                                                </div>
                                                <div>
                                                    <button onclick='PublicarComentarioHijo("${comentarios[j].accion.identificador}", ${offset+j})' class='rounded-full px-3 py-1.5 bg-[#065FD4] text-white font-Geist text-xs transition-colors duration-150 hover:bg-[#0659c6]'>
                                                        Responder
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                        ${comentarios[j].comentarios_hijos.length > 0 ? (
                                    comentarioPrincipal.innerHTML += `
                                            
    
                                         
                                    
                                    <div>
                                    <button onclick='ComentariosHijosMostrados(${offset + j}, ${JSON.stringify(comentarios[j].comentarios_hijos)})' id='btn_mostrarcomentarioshijos_${offset + j}' class='text-[#EC5504] bg-[#ffefe6] flex items-center gap-2 rounded-full px-3 py-1.5 font-Geist text-xs transition-colors duration-150 hover:bg-[#fedecd]'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M4.375 10.5h12.25"/><path d="M10.5 4.375v12.25"/></svg>
                                        </div>
                                        Mostrar respuestas
                                    </button>
                                    </div>
                                `
                                ) : ('')}
                                        
                                    
                                </div>  
                                
                            `
    
    
    
                            contenedor_comentarios_video.appendChild(comentarioPrincipal)
    
                            if (contenedor_comentarios_video.childElementCount === offset+20 && datos.mensaje.mas)
                            {   
                                let ultimoComentario = document.getElementById(`comentario_${offset + j}`)
    
                                if (ultimoComentario)
                                {
                                    ObservarElemento(ultimoComentario, contenedor_ref, false, true, () => ObtenerComentarios(20, offset + 20))
                                }
                            }
                        }
                    } else {
    
                        let svgVacio = document.createElement("div")
                        svgVacio.classList.add("flex", "items-center", "justify-center", "flex-col")
    
                        svgVacio.innerHTML = `
                        
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="170" height="136" viewBox="0 0 170 136" fill="none"><path d="M0 0h170v136H0z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M114.632 85.731c-1.752 1.309-3.461 2.54-5.394 3.603l.112 9.576a1.36 1.36 0 0 1-2.19 1.094l-8.611-6.625A45.2 45.2 0 0 1 88.4 94.52c-20.656 0-37.4-13.7-37.4-30.6s16.744-30.6 37.4-30.6 37.4 13.7 37.4 30.6c0 4.678-1.282 9.11-3.576 13.074a29 29 0 0 1-1.37 2.145s-.958 1.441-2.874 3.481-3.348 3.111-3.348 3.111" fill="#fff"/><path clip-rule="evenodd" d="M114.632 85.731c-1.752 1.309-3.461 2.54-5.394 3.603l.112 9.576a1.36 1.36 0 0 1-2.19 1.094l-8.611-6.625A45.2 45.2 0 0 1 88.4 94.52c-20.656 0-37.4-13.7-37.4-30.6s16.744-30.6 37.4-30.6 37.4 13.7 37.4 30.6c0 4.678-1.282 9.11-3.576 13.074a29 29 0 0 1-1.37 2.145s-.958 1.441-2.874 3.481-3.348 3.111-3.348 3.111Z" stroke="#1F64E7" stroke-width="1.7" stroke-linecap="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M110.74 55.481c3.607 0 7.081-.43 10.335-1.226a23.4 23.4 0 0 1 2.005 9.466c0 4.308-1.189 8.391-3.316 12.043q-.588 1.01-1.27 1.975c-.717 1.015-1.229 1.732-1.68 2.307-1.065 1.359-1.788 1.924-4.09 3.764a34.4 34.4 0 0 1-5.002 3.319l.104 8.821c.008.692.218 1.962-.478 1.97-.283.003-1.327-.791-1.552-.963l-6.943-6.2c-2.993.684-7.192 1.149-10.454 1.149-19.154 0-34.68-12.619-34.68-28.185.001-12.748 10.414-23.518 24.704-27.001 3.743 10.794 16.793 18.761 32.317 18.761M74.998 59.94c-2.247 0-4.069 1.834-4.069 4.096s1.822 4.096 4.069 4.096 4.069-1.834 4.069-4.096-1.822-4.096-4.069-4.096m12.886 0c-2.247 0-4.069 1.834-4.069 4.096s1.822 4.096 4.069 4.096 4.069-1.834 4.069-4.096-1.822-4.096-4.069-4.096m12.886 0c-2.247 0-4.069 1.834-4.069 4.096s1.822 4.096 4.069 4.096 4.07-1.834 4.07-4.096-1.822-4.096-4.07-4.096" fill="#E8F0FE"/><path fill-rule="evenodd" clip-rule="evenodd" d="M74.8 59.84a4.08 4.08 0 1 1 0 8.16 4.08 4.08 0 0 1 0-8.16Zm12.92 0a4.08 4.08 0 1 1 0 8.16 4.08 4.08 0 0 1 0-8.16Zm12.92 0a4.08 4.08 0 1 1 0 8.16 4.08 4.08 0 0 1 0-8.16Z" fill="#fff" stroke="#1F64E7" stroke-width="1.7"/><path d="M60.97 53.931a23 23 0 0 0-1.598 3.237M73.455 42.89c-4.456 2.127-8.218 5.135-10.936 8.736" stroke="#75A4FE" stroke-width="1.7" stroke-linecap="round"/></svg>
                            </div>
                            <div class='font-Geist text-[13px] flex flex-col gap-2 items-center'>
                                <div>
                                    Todavía no hay comentarios.
                                </div>
                                 <div>Comparte tu opinión y empieza la conversación.</div>
                            </div>
                        `
    
                        contenedor_comentarios_video.appendChild(svgVacio)
                    }
    
                }
            }
            catch(error)
            {
                console.error(error)
            }
            finally {

                clearTimeout(timeout)
                let loaderComentariosVideo = document.getElementById("loaderComentariosVideo")

                if (loaderComentariosVideo)
                {
                    contenedor_comentarios_video.removeChild(loaderComentariosVideo)
                }
            }
        })
}
ObtenerComentarios()



function MostrarRespuestasInput(posicion)
{

    let responder_caja_comentario = document.getElementById("responder_caja_comentario_" + posicion)

    responder_caja_comentario.classList.remove("hidden")

}

function OcultarRespuestasInput(posicion)
{

    let responder_caja_comentario = document.getElementById("responder_caja_comentario_" + posicion)
    let responder_comentario_input = document.getElementById("responder_comentario_input_"+  posicion)

    responder_caja_comentario.classList.add("hidden")
    responder_comentario_input.textContent = ''

}

function ComentariosHijosMostrados(posicion, comentariosHijos) {

    
    let comentario = document.getElementById("comentario_" + String(posicion))
    let btn_mostrarcomentarioshijos = document.getElementById("btn_mostrarcomentarioshijos_" + posicion)
    if (!mostrarComentariosPosiciones.includes(posicion)) {
        mostrarComentariosPosiciones.push(posicion)
        comentario.classList.add("after:h-full", "after:w-[1px]", "after:bg-gray-200", "after:absolute", "after:left-3.5")
        btn_mostrarcomentarioshijos.innerHTML = `
        
            <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus-icon lucide-minus"><path d="M4.375 10.5h12.25"/></svg>
                                    </div>
                                    Ocultar respuestas
        `

        let comentariosHijoContenedor = document.createElement("div")
        comentariosHijoContenedor.setAttribute("id", `comentarios_hijos_mostrando_${posicion}`)
        

        for (let v = 0; v < comentariosHijos.length; v++) {
            let comentario_hijo = document.createElement("div")
            comentario_hijo.classList.add("flex", "flex-col", "gap-3")

            comentario_hijo.innerHTML += `
                
                    <div class='flex flex-row items-center z-30 pl-[42px] mt-5'>
                                <div class='flex items-center gap-2'>
                                    <div>
                                    <a href="./canal.html?ref=${comentariosHijos[v].usuario.canal.nombre}" class='flex flex-row items-center gap-3'>
                                        <div>
                                            <img src='${comentariosHijos[v].usuario.media.avatar}' width='30' height='30' class='rounded-full bg-center bg-cover overflow-hidden bg-no-repeat' />
                                        </div>
                                        <div class='font-Geist font-medium text-[13px]'>
                                            ${comentariosHijos[v].usuario.nombre}
                                        </div>
                                    </a>
                                    </div>
                                    <div class='font-Geist text-xs text-gray-700'>·</div>
                                    <div class='font-Geist text-xs text-gray-700'>
                                        ${comentariosHijos[v].fecha.fecha_publicacion}
                                    </div>
                                </div>
                                
                            </div>
                            <div class='pl-[42px] flex flex-col gap-2'>
                                <div>
                                    <p class='font-Geist text-[13px] break-all'>
                                        ${comentariosHijos[v].contenido}
                                    </p>
                                </div>
                                <div class='flex items-center gap-2'>
                                    <button onclick='MarcarSiComentarioHijo("${comentariosHijos[v].accion.identificador}")' class='rounded-full flex items-center gap-2 font-Geist text-xs p-1 transition-colors duration-150 hover:bg-gray-100'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M6.125 8.75v10.5m7-14.105L12.25 8.75h5.101a1.75 1.75 0 0 1 1.68 2.24l-2.039 7a1.75 1.75 0 0 1-1.679 1.26H3.5a1.75 1.75 0 0 1-1.75-1.75v-7A1.75 1.75 0 0 1 3.5 8.75h2.415a1.75 1.75 0 0 0 1.566-.971L10.5 1.75a2.74 2.74 0 0 1 2.625 3.395"/></svg>
                                        </div>
                                        <span id='contMeGustaCHijo_${comentariosHijos[v].accion.identificador}'>${comentariosHijos[v].estadisticas.megusta}</span>
                                    </button>
                                    <button  onclick='MarcarNoComentarioHijo("${comentariosHijos[v].accion.identificador}")'  class='rounded-full flex items-center gap-2 font-Geist text-xs p-1 transition-colors duration-150 hover:bg-gray-100'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-down-icon lucide-thumbs-down"><path d="M14.875 12.25V1.75"/><path d="M7.875 15.855 8.75 12.25H3.649a1.75 1.75 0 0 1 -1.68 -2.24l2.039 -7A1.75 1.75 0 0 1 5.688 1.75H17.5a1.75 1.75 0 0 1 1.75 1.75v7a1.75 1.75 0 0 1 -1.75 1.75h-2.415a1.75 1.75 0 0 0 -1.566 0.971L10.5 19.25a2.739 2.739 0 0 1 -2.625 -3.395"/></svg>
                                        </div>
                                        <span id='contNoMeGustaCHijo_${comentariosHijos[v].accion.identificador}'>${comentariosHijos[v].estadisticas.no_megusta}</span>
                                    </button>
                                    </div>
                                    </div>
                
                `

            comentariosHijoContenedor.appendChild(comentario_hijo)

        }

        comentario.appendChild(comentariosHijoContenedor)


    } else {

        mostrarComentariosPosiciones = mostrarComentariosPosiciones.filter((e) => e !== posicion)
        comentario.classList.remove("after:h-full", "after:w-[1px]", "after:bg-gray-200", "after:absolute", "after:left-3.5")
        btn_mostrarcomentarioshijos.innerHTML = `
        
        <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M4.375 10.5h12.25"/><path d="M10.5 4.375v12.25"/></svg>
                                    </div>
                                    Mostrar respuestas
        `

        let comentarios_hijos_mostrando = document.getElementById("comentarios_hijos_mostrando_" + posicion)
        comentario.removeChild(comentarios_hijos_mostrando)
    }
}

     

function MarcarSiComentario(posicion, identificador_comentario)
{
    if (!localStorage.getItem("logged") || !video) return
    let btnComentarioSi = document.getElementById("contMeGusta_" + posicion)
    let btnComentarioNo = document.getElementById("contNoMeGusta_" + posicion)
    fetch("http://localhost:8080/comentarios/marcar",
        {
            method: 'POST',
            body: JSON.stringify({
                identificador_comentario: identificador_comentario,
                visto: Number(btnComentarioSi.textContent),
                op: Number(btnComentarioNo.textContent)
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
        .then((res) => {
            if (!res.ok) {
                throw new Error("ERROR")
            }

            return res.json()
        })
        .then((datos) => {

            if (datos.codigo === 200)
            {
               

                btnComentarioSi.textContent  = datos.mensaje.sig
                

                btnComentarioNo.textContent = datos.mensaje.opsig
                
            }

        })
}


function MarcarNoComentario(posicion, identificador_comentario)
{
    if (!localStorage.getItem("logged") || !video) return
    let btnComentarioSi = document.getElementById("contMeGusta_" + posicion)
    let btnComentarioNo = document.getElementById("contNoMeGusta_" + posicion)
    fetch("http://localhost:8080/comentarios/marcar/no",
        {
            method: 'POST',
            body: JSON.stringify({
                identificador_comentario: identificador_comentario,
                visto: Number(btnComentarioNo.textContent),
                op: Number(btnComentarioSi.textContent)
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
        .then((res) => {
            if (!res.ok) {
                throw new Error("ERROR")
            }

            return res.json()
        })
        .then((datos) => {

            if (datos.codigo === 200)
            {
               

                btnComentarioNo.textContent = datos.mensaje.sig
                

                btnComentarioSi.textContent =  datos.mensaje.opsig
                
            }

        })
}

let btn_publicarComentario = document.getElementById("btn_publicarComentario")

btn_publicarComentario.addEventListener("click", () => {

    PublicarComentario()
})
let comentario_contenedor_editable = document.getElementById("comentario_contenedor_editable")
comentario_contenedor_editable.classList.add("after:absolute", "after:left-2", "after:top-2", "after:content-['Escribe_un_comentario...']", "after:text-gray-600")

comentario_contenedor_editable.addEventListener("input", (e) => {
    
    let valor = e.currentTarget.textContent

    if (valor.length === 0)
    {
        comentario_contenedor_editable.classList.add("after:absolute", "after:left-2", "after:top-2", "after:content-['Escribe_un_comentario...']", "after:text-gray-600")
    } else {
        comentario_contenedor_editable.classList.remove("after:absolute", "after:left-2", "after:top-2", "after:content-['Escribe_un_comentario...']", "after:text-gray-600")
    }

})

function PublicarComentario()
{
    
    
    if (!localStorage.getItem("logged") || !video || comentario_contenedor_editable.textContent.trim().length === 0) return

    
    fetch("http://localhost:8080/publicar/comentario",
        {
            method: 'POST',
            body: JSON.stringify({
                identificador: video,
                comentario: comentario_contenedor_editable.textContent
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
        .then((res) => {
            if (!res.ok) {
                throw new Error("ERROR")
            }

            return res.json()
        })
        .then((datos) => {

            if (datos.codigo === 200)
            {
                contenedor_comentarios_video.innerHTML = ''
              ObtenerComentarios()  
              comentario_contenedor_editable.textContent = ''
              comentario_contenedor_editable.classList.add("after:absolute", "after:left-2", "after:top-2", "after:content-['Escribe_un_comentario...']", "after:text-gray-600")
            }

        })
}



function PublicarComentarioHijo(comentario_padre_identificador, posicion)
{
    let responder_comentario_input = document.getElementById("responder_comentario_input_"+  posicion)
    
    if (!localStorage.getItem("logged") || !video || responder_comentario_input.textContent.trim().length === 0) return

    
    
    fetch("http://localhost:8080/comentarios/hijos/publicar",
        {
            method: 'POST',
            body: JSON.stringify({
                identificador: video,
                comentario: responder_comentario_input.textContent,
                identificador_comentario: comentario_padre_identificador
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
        .then((res) => {
            if (!res.ok) {
                throw new Error("ERROR")
            }

            return res.json()
        })
        .then((datos) => {

            if (datos.codigo === 200)
            {
            contenedor_comentarios_video.innerHTML = ''
              ObtenerComentarios()  
            }

        })
}


function MarcarSiComentarioHijo(identificador_comentario)
{
    if (!localStorage.getItem("logged") || !video) return
    let btnComentarioSi = document.getElementById("contMeGustaCHijo_" + identificador_comentario)
    let btnComentarioNo = document.getElementById("contNoMeGustaCHijo_" + identificador_comentario)
    fetch("http://localhost:8080/comentarios/hijos/marcar",
        {
            method: 'POST',
            body: JSON.stringify({
                identificador_comentario: identificador_comentario,
                visto: Number(btnComentarioSi.textContent),
                op: Number(btnComentarioNo.textContent)
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
        .then((res) => {
            if (!res.ok) {
                throw new Error("ERROR")
            }

            return res.json()
        })
        .then((datos) => {

            if (datos.codigo === 200)
            {
               

                btnComentarioSi.textContent  = datos.mensaje.sig
                

                btnComentarioNo.textContent = datos.mensaje.opsig
                
            }

        })
}


function MarcarNoComentarioHijo(identificador_comentario)
{
    if (!localStorage.getItem("logged") || !video) return
    let btnComentarioSi = document.getElementById("contMeGustaCHijo_" + identificador_comentario)
    let btnComentarioNo = document.getElementById("contNoMeGustaCHijo_" + identificador_comentario)
    fetch("http://localhost:8080/comentarios/hijos/marcar/no",
        {
            method: 'POST',
            body: JSON.stringify({
                identificador_comentario: identificador_comentario,
                visto: Number(btnComentarioNo.textContent),
                op: Number(btnComentarioSi.textContent)
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
        .then((res) => {
            if (!res.ok) {
                throw new Error("ERROR")
            }

            return res.json()
        })
        .then((datos) => {

            if (datos.codigo === 200)
            {
               

                btnComentarioNo.textContent = datos.mensaje.sig
                

                btnComentarioSi.textContent =  datos.mensaje.opsig
                
            }

        })
}

function GuardarVideoVideos()
{
    if (!localStorage.getItem("logged") || !video) return

    fetch("http://localhost:8080/canal/videos/guardar",
        {
            method: 'POST',
            body: JSON.stringify({
                canal: NOMBRE_CANAL,
                identificador: video
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
    .then((res) => {
        if (!res.ok)
        {
            throw new Error("ERROR")
        }

        return res.json()
    })
    .then((datos) => {

        if (datos.codigo === 200)
        {
            ESTADO_GUARDADO_VIDEO = false
        }

    })
}

function QuitarVideoGuardadosVideos()
{
    if (!localStorage.getItem("logged") || !video) return

    fetch("http://localhost:8080/canal/videos/quitar",
        {
            method: 'POST',
            body: JSON.stringify({
                canal: NOMBRE_CANAL,
                identificador: video
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
    .then((res) => {
        if (!res.ok)
        {
            throw new Error("ERROR")
        }

        return res.json()
    })
    .then((datos) => {

        if (datos.codigo === 200)
        {
            ESTADO_GUARDADO_VIDEO = true
        }

    })
}

let identificadoresVideos = []

let contenedor_videos_recomendados_videos = document.getElementById("contenedor_videos_recomendados_videos")

function RecomendacionVideosVideo()
{
    if (!localStorage.getItem("logged") || !video) return

    const timeout = setTimeout(() => {

        let loaderVideoRecomendados = document.createElement("div")
        loaderVideoRecomendados.classList.add("flex", "items-center", "justify-center", "mt-3")
        loaderVideoRecomendados.setAttribute("id", "loaderVideoRecomendados")
        
        loaderVideoRecomendados.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide animate-spin lucide-loader-icon lucide-loader"><path d="M9 1.5v3"/><path d="m12.144 5.844 2.172 -2.172"/><path d="M13.5 9h3"/><path d="m12.144 12.144 2.172 2.172"/><path d="M9 13.5v3"/><path d="m3.672 14.328 2.172 -2.172"/><path d="M1.5 9h3"/><path d="m3.672 3.672 2.172 2.172"/></svg>
        `

        contenedor_videos_recomendados_videos.appendChild(loaderVideoRecomendados)

    }, 200)

    fetch("http://localhost:8080/videos/recomendados/video",
        {
            method: 'POST',
            body: JSON.stringify({
                identificadores: identificadoresVideos,
                identificador: video
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("logged")}`
            }
        }
    )
    .then((res) => {
        if (!res.ok)
        {
            throw new Error("ERROR")
        }

        return res.json()
    })
    .then((datos) => {

        try {
            if (datos.codigo === 200)
                {
                    
                    let videos = datos.mensaje.videos
        
                    for (let k = 0; k < videos.length; k++)
                    {
        
                        let recomendacion = document.createElement("a")
                        recomendacion.href = './videos.html?ref=' + videos[k].link.ruta
                        recomendacion.setAttribute("id", "recomendacion_video_" + identificadoresVideos.length)
                        recomendacion.classList.add("flex", "gap-2", "w-full", "max-w-[350px]",  "max-xs:flex-col", "max-all:flex-col")
        
        
                        recomendacion.innerHTML = `
                        
                                            <div class='min-w-[180px] max-w-[180px] h-[100px] max-xs:w-full max-xs:max-w-full max-xs:h-[180px] max-all:w-full max-all:max-w-full max-all:h-[160px] relative'>
                                                <img src='${videos[k].media.miniatura}' class='rounded-md bg-cover object-cover bg-no-repeat bg-center min-w-[180px] max-w-[180px] max-xs:h-[180px] max-xs:max-w-full max-xs:w-full max-all:w-full max-all:max-w-full max-all:h-[160px] h-[100px]'>
                                                <div class='absolute select-none bg-black rounded-sm py-0.5 px-1 right-0 mb-1 bottom-0 mr-1'>
                                                    <div class='text-white select-none font-Inter text-[10px]'>${videos[k].estadisticas.duracion}</div>
                                                </div>
                                            </div>
                                            <div class='flex flex-col gap-2 w-[calc(100%-180px)] max-xs:w-full max-all:w-full'>
                                                <div class='font-Inter text-xs'>
                                                    <div class='line-clamp-2'>
                                                        ${videos[k].contenido.titulo}
                                                    </div>
                                                </div>
                                                <div class='flex items-center gap-2'>
                                                    <div class='font-Inter text-[10px] text-gray-700'>
                                                        ${videos[k].estadisticas.visitas} visitas · ${videos[k].estadisticas.fecha.fecha_creacion} 
                                                    </div>
                                                </div>
                                                <div class='flex items-center gap-2'>
                                                    <div>
                                                        <img src='${videos[k].canal.media.avatar_usuario}' class='rounded-md bg-cover bg-no-repeat bg-center w-6 h-6'>
                                                    </div>
                                                    <div class='font-Lexend text-[11px]'>
                                                        ${videos[k].canal.nombre_usuario}
                                                    </div>
                                                </div>
                                            </div>
                        `
        
                        contenedor_videos_recomendados_videos.appendChild(recomendacion)
                        identificadoresVideos.push("'" + videos[k].link.ruta + "'")
        
                        if (identificadoresVideos.length % 20 === 0 && datos.mensaje.mas)
                        {
                            let ultimoVideoRecomendado = document.getElementById("recomendacion_video_" + (identificadoresVideos.length-1))
                            
                            if (ultimoVideoRecomendado)
                            {
                                ObservarElemento(ultimoVideoRecomendado, contenedor_ref, false, true, () => RecomendacionVideosVideo())
                            }
        
                        }
                        
                    }
        
                    
        
                }
        } catch(error)
        {
            console.error(error)
        }
        finally {
            clearTimeout(timeout)
            let loaderVideoRecomendados = document.getElementById("loaderVideoRecomendados")

            if (loaderVideoRecomendados)
            {
                contenedor_videos_recomendados_videos.removeChild(loaderVideoRecomendados)
            }
        }

    })
}

RecomendacionVideosVideo()
let check = document.createElement("div")
check.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M15 4.5 6.75 12.75l-3.75 -3.75"/></svg>
`
let btn_velocidad_lenta = document.getElementById("btn_velocidad_lenta")
let btn_velocidad_normal = document.getElementById("btn_velocidad_normal")
let btn_velocidad_rapida = document.getElementById("btn_velocidad_rapida")

btn_velocidad_normal.addEventListener("click", () => {

    video_tag.playbackRate = 1.0
    velocidadVideo = 1000
    separacionTiempoPausa = 1000
    
    VelocidadesVideoOut()
})

btn_velocidad_rapida.addEventListener("click", () => {

    video_tag.playbackRate = 2.0
    velocidadVideo = 500
    separacionTiempoPausa = 500
    
    VelocidadesVideoOut()
})

btn_velocidad_lenta.addEventListener("click", () => {

    video_tag.playbackRate = 0.5
    velocidadVideo = 2000
    separacionTiempoPausa = 2000
    
    VelocidadesVideoOut()
})

let submenu_velocidades_video = document.getElementById("submenu_velocidades_video")
let mostrarVelocidadesVideo = document.getElementById("mostrarVelocidadesVideo")

mostrarVelocidadesVideo.addEventListener("click", () => {

    if (ESTADO_SUBMENU_VELOCIDADES)
    {
        VelocidadesVideoOut()
    } else {
        VelocidadesVideoIn()
    }
})

contenedor_ref_video_reproductor.addEventListener("mouseover", () => {
    controles_video_tag_cus.classList.add("opacity-100")
    controles_video_tag_cus.classList.remove("opacity-0")
})

contenedor_ref_video_reproductor.addEventListener("mouseout", () => {
    if (!ESTADO_SUBMENU_VELOCIDADES)
    {
        controles_video_tag_cus.classList.add("opacity-0")
    controles_video_tag_cus.classList.remove("opacity-100")
    }
})

barra_mover_video.addEventListener("input", (e) => {

    video_tag.currentTime = parseFloat(e.target.value)
})

btn_compartir_video_enlace_videos.addEventListener("click", () => {

    navigator.clipboard.writeText(window.location)

})