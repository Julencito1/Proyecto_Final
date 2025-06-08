<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title> - NewTube</title>
  <link href='../styles/styles.css' rel='stylesheet'>
  <link href="../output.css" rel="stylesheet">
  <link rel="stylesheet" href="../styles/fonts.css">
  <link rel="icon" type="image/x-icon" href="../assets/favicon/newtube.ico">

</head>
<body>
  <div id="plantilla">
    <?php include '../components/header.php'; ?>
    <main id='main' class="contenedor_ref p-5 overflow-auto h-[100vh-50px]">
      <div class="flex flex-col space-y-4 2xl:w-[1284px] mx-auto max-2xl:w-full">

          <div class="rounded-md w-full">
            <img id="portada_canal" class="bg-cover bg-no-repeat bg-center h-[190px] max-xs:h-[72px] max-sm:h-[90px] between_sm-md:h-[110px] between_md-lg:h-[140px] w-full rounded-md" draggable="false">
          </div>
          
        <div  id="info_canal" class="flex flex-col gap-8">
          <div class="flex gap-6">
            <div>
                <img id="avatar_usuario_canal" width="105" height="105" class="bg-cover rounded-full bg-center bg-no-repeat" draggable="false">
            </div>
            <div id="contenedor_info_canal" class="flex flex-col gap-2 max-xs:gap-1 max-sm:gap-1">
                <div>
                  <h2 id="nombre_usuario" class="font-Poppins font-semibold text-xl">

                  </h2>
                </div>
                <div class="flex items-center gap-2 max-xs:flex-col max-sm:flex-col max-sm:items-start max-sm:gap-0 max-xs:items-start max-xs:gap-0">
                  <div>
                      <span id="nombre_canal" class="font-Inter text-xs">

                      </span>
                  </div>
                  <div class="max-xs:hidden max-sm:hidden">
                    <span class="text-gray-700">·</span>
                  </div>
                  <div class="flex items-center gap-2">
                      <div>
                      <span class="font-Inter text-xs text-gray-700">
                        <span id="total_suscriptores">
                        
                        </span> suscriptores
                      </span>
                  </div>
                  <div>
                    <span class="text-gray-700">·</span>
                  </div>
                  <div>
                      <span class="font-Inter text-xs text-gray-700">
                        <span id="total_videos">
                        
                        </span> videos 
                      </span>
                  </div>
                  </div>
                </div>
                
            </div>
          </div>
        </div>
        <div>

        <div>
          <nav id="navegacion_tabs" class="border-b border-gray-200 flex items-center gap-6 py-2">
          <div>
              <button id="inicio_tab" class="flex items-center gap-2 font-Inter text-trece">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-grid-icon lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
              Inicio
              </button>
            </div>
            <div>
              <button id="videos_tab" class="flex items-center gap-2 font-Inter text-trece">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-video-icon lucide-video"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg> 
              Videos
              </button>
            </div>
            <div>
              <button id="sobre_mi_tab" class="flex items-center gap-2 font-Inter text-trece">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-user-icon lucide-book-user"><path d="M15 13a3 3 0 1 0-6 0"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><circle cx="12" cy="8" r="2"/></svg>
                <span class="block truncate line-clamp-1">Sobre Mí</span>
              </button>
            </div>
          </nav>
        </div>
        <div id="contenedor_contenido_tabs">
        
        </div>

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
  <script src="../js/pages/canal.js"></script>

</body>
</html>
