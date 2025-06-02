

<div id="header" class="px-4 py-2 flex items-center justify-between">
      <div>
        <div class="flex items-center gap-1">
          <button aria-label="Botón Menu Sidebar" id="btn_sidebar" class="p-2 rounded-full cursor-pointer transition-colors duration-150 hover:bg-[#f2f2f2]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu-icon lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
          <a href="/" aria-label="Link Página Principal" class="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.25 27h13.5a6.75 6.75 0 0 0 0 -13.5 9 9 0 0 0 -17.438 -1.125A5.625 5.625 0 0 0 11.25 27" fill="#F03" stroke="none" stroke-width="0.9"/><path d="m20.25 18 -5.625 -3.375v6.75z" stroke="#FFF" fill="#FFF" stroke-width="0.5625"/></svg>
          </a>
        </div>
      </div>

      <div id='contenedor_buscador' class="border border-[#e6e6e6] bg-[#f2f2f2] rounded-lg h-[34px] w-[35%] relative z-40">
        <div class="absolute top-1.5 left-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#888888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search-icon lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <div class="absolute top-1 right-2">
          <button id="limpiar_buscador" class="rounded-full p-1 hidden transition-colors duration-150 hover:bg-[#e6e6e6] cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888888" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <input id="buscador" autocomplete="off" spellcheck='false' type="text" class="w-full rounded-lg text-[#737373] h-full outline-none text-[13px] font-light font-Inter px-9 placeholder:text-[#737373]" placeholder="Buscar..." />
        <div id='recomendaciones' class="absolute top-9 hidden border bg-white shadow-md w-full py-2 rounded-md">
            
        </div>
      </div>

      <div class="flex items-center gap-2">
        <div id="contenedor_crear" class="relative">
          <button id="btn_crear_nuevo" title="Nuevo" class="p-2 rounded-full cursor-pointer transition-colors duration-150 hover:bg-[#f2f2f2]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
          </button>
          <div id="desplegable_crear" class="absolute hidden z-50 right-0 p-2 rounded-md w-36 border origin-top-right bg-white shadow-md overflow-hidden">
            <a href="#" class="flex items-center gap-2 text-xs font-Inter rounded-md px-2 py-1.5 transition-colors duration-150 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 22.5 22.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M4.688 11.25h13.125M11.25 4.688v13.125"/></svg>
            Nuevo vídeo
            </a>
          </div>
        </div>
        <div id="contenedor_notificaciones_btn" class="relative">
          <button id="btn_notificaciones" title="Notificaciones" class="relative p-2 rounded-full cursor-pointer transition-colors duration-150 hover:bg-[#f2f2f2]">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-icon lucide-bell"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>
            <div class="absolute top-0.5 right-0">
              <span id="total_notis" class="rounded-full text-white flex items-center justify-center min-w-[19.21px] text-[8px] font-Inter bg-[#FF0033] pointer-events-none select-none">
                
              </span>
            </div>
          </button>
          <div id="notificaciones" class="absolute z-50 right-0 max-h-72 rounded-md w-80 border hidden origin-top-right bg-white shadow-md overflow-hidden">
            <div class="flex flex-col">
              <div class="font-Roboto text-[13px] py-3 p-2">
                Notificaciones
              </div>

              <hr class="border-[#e6e6e6]" />

              <div id="contenedor_notificaciones" class="overflow-auto h-[calc(288px-43.49px)]">
              
              </div>

            </div>
          </div>
        </div>
        <div id="posicion_mostrar_header" class="flex items-center justify-center">
          
        </div>
      </div>
    </div>

