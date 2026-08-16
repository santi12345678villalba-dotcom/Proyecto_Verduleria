// Crear el modal automáticamente
const CrearModal = () => {

    const modalHTML = `
        <div id="myModal" class="modal">

            <div class="modal-content">

                <div class="modal-header">

                    <span id="cerrarModal" class="close">&times;</span>

                    <h2 id="modalTitulo">FrutaManía</h2>

                </div>

                <div class="modal-body">

                    <p id="modalMensaje"></p>

                </div>

                <div class="modal-footer">

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
    const aceptar = document.getElementById("btnAceptarModal");


    // Cerrar con la X
    cerrar.onclick = () => {
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

    modalTitulo.textContent = titulo;
    modalMensaje.textContent = mensaje;

    modal.style.display = "flex";
};


// Crear el modal cuando carga la página
CrearModal();


// Hacer disponible MostrarModal para los otros archivos JS
window.MostrarModal = MostrarModal;
