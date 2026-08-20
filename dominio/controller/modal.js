// Crear el modal automáticamente
const CrearModal = () => {

    const modalHTML = `
        <div id="myModal" class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitulo" aria-describedby="modalMensaje" tabindex="-1">

            <div class="modal-content">

                <div class="modal-header">

                    <button id="cerrarModal" class="close" type="button" aria-label="Cerrar ventana">&times;</button>

                    <h2 id="modalTitulo">FrutaManía</h2>

                </div>

                <div class="modal-body">

                    <p id="modalMensaje"></p>

                </div>

                <div class="modal-footer">

                    <button id="btnCancelarModal" class="btn-modal">
                        Cancelar
                    </button>

                    <button id="btnAceptarModal" class="btn-modal">
                        Aceptar
                    </button>

                </div>

            </div>

        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);


    // Obtener elementos
    const modal = document.getElementById("myModal");
    const cerrar = document.getElementById("cerrarModal");
    const cancelar = document.getElementById("btnCancelarModal");
    const aceptar = document.getElementById("btnAceptarModal");

    cancelar.style.display = "none";


    // Cerrar con la X
    cerrar.onclick = () => {
        modal.style.display = "none";
    };

    modal.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            modal.style.display = "none";
        }
    });

    cancelar.onclick = () => {
        modal.style.display = "none";
    };


    // Cerrar con Aceptar
    aceptar.onclick = () => {
        modal.style.display = "none";
    };


    // Cerrar haciendo clic fuera
    window.onclick = (event) => {

        if (event.target === modal) {
            modal.style.display = "none";
        }

    };

};


// Mostrar el modal
const MostrarModal = (mensaje, titulo = "FrutaManía") => {

    const modal = document.getElementById("myModal");
    const modalTitulo = document.getElementById("modalTitulo");
    const modalMensaje = document.getElementById("modalMensaje");
    const cancelar = document.getElementById("btnCancelarModal");
    const aceptar = document.getElementById("btnAceptarModal");

    modalTitulo.textContent = titulo;
    modalMensaje.textContent = mensaje;
    cancelar.style.display = "none";
    aceptar.textContent = "Aceptar";
    aceptar.onclick = () => {
        modal.style.display = "none";
    };

    modal.style.display = "flex";
    aceptar.focus();
};


// Mostrar una confirmacion antes de ejecutar una accion
const ConfirmarModal = (mensaje, accion, titulo = "Confirmar accion") => {

    const modal = document.getElementById("myModal");
    const modalTitulo = document.getElementById("modalTitulo");
    const modalMensaje = document.getElementById("modalMensaje");
    const cancelar = document.getElementById("btnCancelarModal");
    const aceptar = document.getElementById("btnAceptarModal");

    modalTitulo.textContent = titulo;
    modalMensaje.textContent = mensaje;
    cancelar.style.display = "inline-block";
    aceptar.textContent = "Confirmar";
    aceptar.onclick = () => {
        modal.style.display = "none";
        accion();
    };

    modal.style.display = "flex";
    aceptar.focus();
};


// Crear el modal cuando carga la página
CrearModal();


// Hacer disponible MostrarModal para los otros archivos JS
window.MostrarModal = MostrarModal;
window.ConfirmarModal = ConfirmarModal;
