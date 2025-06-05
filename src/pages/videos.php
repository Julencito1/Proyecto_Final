<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Video - NewTube</title>
  <link href='../styles/styles.css' rel='stylesheet'>
  <link href="../output.css" rel="stylesheet">
  <link rel="stylesheet" href="../styles/fonts.css">
  <link rel="icon" type="image/x-icon" href="../assets/favicon/newtube.ico">
</head>
<body>
  <div id="plantilla">
    <?php include '../components/header.php'; ?>
    <main id='main' class="contenedor_ref p-5 overflow-auto h-[100vh-50px]"> 
        <div class="w-full flex gap-5 max-xl:flex-col">
            <div id="contenedor_video_reproducir" class="w-[70%] max-xl:w-full flex flex-col gap-5">
                <div  class="relative overflow-hidden  rounded-md" id="contenedor_ref_video_reproductor" >
                    <video id="video_tag" class="w-full max-h-[840px] object-contain">
                    </video>
                    <div id="controles_video_tag_cus" class="absolute bottom-0 w-full flex flex-col gap-3 p-2 transition-opacity duration-150">
                        <div>
                            <input id="barra_mover_video" type="range" step="1" min="0" value="0">
                        </div> 
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-5 max-xl:gap-2.5">
                                <div>
                                    <button id="rep_par_btn" class="flex items-center outline-none">
                                    
                                    </button>
                                </div>
                                <div class="flex items-center gap-1">
                                    <button id="sonido_btn" class="outline-none">

                                    </button>
                                    <div class="flex items-center max-xl:w-[60%]">
                                        <input id="barra_sonido" class="max-xl:w-[70%]" step="0.1" min="0" max="1" type="range">
                                    </div>
                                </div>
                                <div class="font-Geist text-xs max-xl:text-[10px] text-white">
                                    <span id="tiempo_actual">00:00</span> / <span id="tiempo_video">00:00</span>
                                </div>
                            </div>  
                            <div class="flex items-center gap-5">
                                <div class="relative" id="contenedor_velocidades_video">
                                    <button id="mostrarVelocidadesVideo" class="flex items-center outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gauge-icon lucide-gauge"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
                                    </button>
                                    <div id="submenu_velocidades_video" class="absolute hidden origin-bottom-right bottom-6 flex flex-col p-2 right-0 rounded-md w-36 bg-white z-40">
                                        
                                            <button id="btn_velocidad_lenta" class="flex items-center justify-between font-Geist text-[13px] transition-all duration-150 hover:bg-gray-200 rounded-md py-1.5 px-2 ">
                                                <div class="flex items-center gap-2">
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-down-icon lucide-chevrons-down"><path d="m6.125 5.25 4.375 4.375 4.375 -4.375"/><path d="m6.125 11.375 4.375 4.375 4.375 -4.375"/></svg>
                                                    </div>
                                                 0.5
                                                </div>
                                            </button>
                                            <button id="btn_velocidad_normal" class="flex items-center justify-between gap-2 font-Geist text-[13px] transition-all duration-150 hover:bg-gray-200 rounded-md py-1.5 px-2 ">
                                                <div class="flex items-center gap-2">
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus-icon lucide-minus"><path d="M4.375 10.5h12.25"/></svg>
                                                    </div>
                                                    1
                                                </div>
                                            </button>
                                            <button id="btn_velocidad_rapida" class="flex items-center justify-between gap-2 font-Geist text-[13px] transition-all duration-150 hover:bg-gray-200 rounded-md py-1.5 px-2 ">
                                                <div class="flex items-center gap-2">
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-up-icon lucide-chevrons-up"><path d="M14.875 9.625 10.5 5.25 6.125 9.625m8.75 6.125L10.5 11.375 6.125 15.75"/></svg>
                                                    </div>
                                                    2
                                                </div>
                                            </button>
                                        
                                    </div>
                                </div>
                                <div>
                                    <button id="agrandar_video_btn" class="flex items-center outline-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize-icon lucide-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col gap-4 w-full">
                    <div>
                        <h2 id="titulo_video" class="font-Geist text-[16px] max-xl:text-[13px] line-clamp-2">

                        </h2>
                    </div>
                    <div class="flex items-center justify-between max-xl:items-start max-xl:gap-5 max-xl:flex-col-reverse">
                        <div id="contenedor_video_segundalinea" class="flex items-center gap-3 max-xl:w-full max-xl:justify-between">
                            <a id="video_link_canal_usuario" class="flex items-center gap-3">
                            <div>
                                <img id="img_video_canal_usuario" width="30" height="30" class="rounded-full overflow-hidden bg-cover bg-no-repeat bg-center">
                            </div>
                            <div class="flex flex-col">
                                <div id="nombre_video_canal_usuario" class="font-Inter text-[13px]">

                                </div>
                                <div class="font-Inter text-[10px] text-gray-700">
                                   <span id="total_suscriptores_video_canal"></span> suscriptores
                                </div>
                            </div>
                            </a>
                            
                        </div>
                        <div class="flex items-center gap-3 max-xl:w-full">
                            <div class="flex items-center">
                                <button id="btn_video_megusta" class="rounded-tl-full rounded-bl-full min-w-[55.5px] px-3 py-1.5 font-Inter text-xs border border-l border-t border-b border-gray-200 bg-white flex items-center gap-2 transition-colors duration-150 hover:bg-gray-100">
                                    <div class="flex items-center justify-center">
                                        <svg id="video_svg_icono_megusta" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M6.125 8.75v10.5"/><path d="M13.125 5.145 12.25 8.75h5.101a1.75 1.75 0 0 1 1.68 2.24l-2.039 7A1.75 1.75 0 0 1 15.313 19.25H3.5a1.75 1.75 0 0 1 -1.75 -1.75v-7a1.75 1.75 0 0 1 1.75 -1.75h2.415a1.75 1.75 0 0 0 1.566 -0.971L10.5 1.75a2.739 2.739 0 0 1 2.625 3.395"/></svg>
                                    </div>
                                    <div id="video_total_megusta">
                                        
                                    </div>
                                </button>
                                <button id="btn_video_no_megusta" class="rounded-tr-full rounded-br-full min-w-[55.5px] px-3 py-1.5 font-Inter text-xs border-r border-t border-b  border-gray-200 bg-white flex items-center gap-2 transition-colors duration-150 hover:bg-gray-100">
                                    <div class="flex items-center justify-center">
                                        <svg id="video_svg_icono_nomegusta" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-down-icon lucide-thumbs-down"><path d="M14.875 12.25V1.75m-7 14.105.875-3.605H3.649a1.75 1.75 0 0 1-1.68-2.24l2.039-7a1.75 1.75 0 0 1 1.68-1.26H17.5a1.75 1.75 0 0 1 1.75 1.75v7a1.75 1.75 0 0 1-1.75 1.75h-2.415a1.75 1.75 0 0 0-1.566.971L10.5 19.25a2.74 2.74 0 0 1-2.625-3.395"/></svg>
                                    </div>
                                    <div id="video_total_nomegusta">
                                        
                                    </div>
                                </button>    
                            </div>
                            <div class="max-xl:ml-auto">
                                <button id="btn_compartir_video_enlace_videos" class="rounded-full px-3 py-1.5 font-Inter text-xs flex border items-center gap-2 transition-all duration-150 hover:opacity-80 hover:bg-gray-100">
                                    <div class="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share2-icon lucide-share-2"><path cx="18" cy="5" r="3" d="M18.375 4.375A2.625 2.625 0 0 1 15.75 7A2.625 2.625 0 0 1 13.125 4.375A2.625 2.625 0 0 1 18.375 4.375z"/><path cx="6" cy="12" r="3" d="M7.875 10.5A2.625 2.625 0 0 1 5.25 13.125A2.625 2.625 0 0 1 2.625 10.5A2.625 2.625 0 0 1 7.875 10.5z"/><path cx="18" cy="19" r="3" d="M18.375 16.625A2.625 2.625 0 0 1 15.75 19.25A2.625 2.625 0 0 1 13.125 16.625A2.625 2.625 0 0 1 18.375 16.625z"/><path x1="8.59" x2="15.42" y1="13.51" y2="17.49" d="M7.516 11.821L13.492 15.304"/><path x1="15.41" x2="8.59" y1="6.51" y2="10.49" d="M13.484 5.696L7.516 9.179"/></svg>
                                    </div>
                                    <div>
                                        Compartir
                                    </div>
                                </button>   
                            </div>
                            <div class="relative" id="contenedor_submenu_tres_puntos_video">
                                <button id="tres_video_mostrar_submenu" class="rounded-full h-full p-2 flex items-center gap-2 transition-all duration-150 hover:opacity-80 hover:bg-gray-100">
                                    <div class="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><path d="M11.375 10.5a.875.875 0 0 1-.875.875.875.875 0 0 1-.875-.875.875.875 0 0 1 1.75 0m0-6.125a.875.875 0 0 1-.875.875.875.875 0 0 1-.875-.875.875.875 0 0 1 1.75 0m0 12.25a.875.875 0 0 1-.875.875.875.875 0 0 1-.875-.875.875.875 0 0 1 1.75 0"/></svg>
                                    </div>
                                </button>
                                <div id="submenu_videos_menu_g" class='absolute flex flex-col w-44 p-1 right-0 rounded-md bg-white z-20 shadow-md border hidden origin-top-right'>
                                    <button id="btn_video_guardar_video" class='flex items-center gap-2 font-Inter text-xs w-full text-left rounded-md transition-colors duration-150 p-1.5 hover:bg-gray-100'>

                                    </button>
                                </div>   
                            </div>
                        </div>
                    </div>
                    
                    <hr class="bg-gray-200"/>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 max-xl:flex-col max-xl:items-start">
                            <div class="flex items-center gap-2">
                                <div class="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M1.804 10.805a.86.86 0 0 1 0-.61 9.407 9.407 0 0 1 17.391 0 .86.86 0 0 1 0 .61 9.407 9.407 0 0 1-17.391 0"/><path d="M13.126 10.5a2.63 2.63 0 0 1-2.626 2.626A2.63 2.63 0 0 1 7.874 10.5a2.626 2.626 0 0 1 5.25 0"/></svg>
                                </div>
                                <div id="videos_vistas" class="font-Geist text-xs">

                                </div>
                            </div>
                            <div class="font-Geist text-xs max-xl:hidden">·</div>
                            <div class="flex items-center gap-2">
                                <div class="flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-icon lucide-calendar"><path d="M7 1.75v3.5m7-3.5v3.5M4.375 3.5h12.25a1.75 1.75 0 0 1 1.75 1.75V17.5a1.75 1.75 0 0 1-1.75 1.75H4.375a1.75 1.75 0 0 1-1.75-1.75V5.25a1.75 1.75 0 0 1 1.75-1.75m-1.75 5.25h15.75"/></svg>
                                </div>
                                <div id="video_fecha_creacion" class="font-Geist text-xs">
                                    Publicado 
                                </div>
                            </div>
                        </div>
                        <a href="#" id="video_categoria" class="text-[#564CBD] bg-[#F2F3FB] font-Geist text-xs rounded-full px-2 py-1 transition-colors duration-150 hover:bg-[#d8dbf3]">

                        </a>
                    </div>
                    <div id="video_descripcion" class="font-Geist text-[13px] text-gray-700">
                        
                    </div>
                    <hr class="bg-gray-200">
                    <div class="border rounded-md flex flex-col">
                        <div>
                            <div contenteditable="" spellcheck="false" id="comentario_contenedor_editable" class="w-full outline-none p-2 font-Inter text-xs relative"></div>
                        </div>
                        <div class="p-2 ml-auto">
                            <button id="btn_publicarComentario" class="rounded-full flex items-center gap-2 text-white px-3 py-1.5 bg-[#E65605] font-Geist text-xs transition-colors duration-150 hover:bg-[#e15505]">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 21 21" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal-icon lucide-send-horizontal"><path d="M3.25 2.667a0.436 0.436 0 0 0 -0.598 0.549l2.488 6.674a1.75 1.75 0 0 1 0 1.221l-2.487 6.674a0.436 0.436 0 0 0 0.597 0.549l15.75 -7.438a0.438 0.438 0 0 0 0 -0.791z"/><path d="M5.25 10.5h14"/></svg>
                                </div>
                                Comentar   
                            </button>
                        </div>
                    </div>
                    
                    <div class="flex flex-col gap-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <h2 id="cabecera_comentarios_total" class="font-Geist text-[15px]">
                                    Comentarios
                                </h2>
                            </div>
                        </div>
                        <div id="contenedor_comentarios_video" class="space-y-10">

                        </div>
                    </div>
                </div>
            </div>
            <hr class="hidden max-xl:block" />
            <div id="contenedor_videos_recomendados_videos" class="flex flex-col gap-5 w-[30%] max-xl:w-full max-xl:gap-10">
                
            </div>
        </div>
    </main>
    <?php include '../components/sidebar.php'; ?>
  </div>
  <script src="../js/components/sidebar.js"></script>
  <script src="../js/components/header.js"></script>
  <script src="../js/utils/observer.js"></script>
  <script src="../js/main.js"></script>
  <script src="../js/animaciones/animaciones.js"></script>
  <script src="../js/pages/videos.js"></script>
  

</body>
</html>
