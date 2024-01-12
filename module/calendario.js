class Calendario {
    constructor(calendarioId, fechaSeleccionadaId, anteriorBtnId, siguienteBtnId) {
        this.calendarioContainer = document.getElementById("calendario");
        this.fechaSeleccionadaSpan = document.getElementById(fechaSeleccionadaId);
        this.anteriorBtn = document.getElementById(anteriorBtnId);
        this.siguienteBtn = document.getElementById(siguienteBtnId);

        this.fechaActual = moment();
        this.primerDia = moment(this.fechaActual).startOf('month');
        this.ultimoDia = moment(this.fechaActual).endOf('month');
        this.diasSemana = ["L", "M", "X", "J", "V", "S", "D"];

        this.anteriorBtn.addEventListener('click', () => this.mesAnterior());
        this.siguienteBtn.addEventListener('click', () => this.mesSiguiente());
        this.generarCalendario();
    }

    generarCalendario() {
        let diasSemanaDivs = [];
        let calendarioArray = this.generarArrayCalendario();
        let currentRow = document.createElement("div");
        currentRow.className = "row";

        this.diasSemana.forEach(dia => {
            diasSemanaDivs.push(`<div class="header">${dia}</div>`);
        });
        this.calendarioContainer.innerHTML = `<div class="row">${diasSemanaDivs.join('')}</div>`;        
        currentRow.className = "row";
        calendarioArray.forEach((dia, index) => {
            let celda = document.createElement("div");
            celda.className = "day";
            if (dia) {
                celda.textContent = dia;
                let fechaCelda = moment([this.fechaActual.year(), this.fechaActual.month(), dia]);
                celda.addEventListener("click", () => this.celdaClickeada(fechaCelda));
                if (calendarioArray[index] === 'X') {
                    celda.classList.add("with-X"); 
                } 
            }
            currentRow.appendChild(celda);
            if ((index + 1) % this.diasSemana.length === 0 || index === calendarioArray.length - 1) {
                this.calendarioContainer.appendChild(currentRow);
                currentRow = document.createElement("div");
                currentRow.className = "row";
            }
        });
        this.actualizarFechaSeleccionada();
    }

    generarArrayCalendario() {
        let calendarioArray = [];
        let fechaCelda = moment(this.primerDia);
        let primerDiaSemana = (fechaCelda.day() + 6) % 7; 
    
        for (let i = 0; i < primerDiaSemana; i++) {
            calendarioArray.push('X');
        }

        while (fechaCelda.isSameOrBefore(this.ultimoDia)) {
            calendarioArray.push(fechaCelda.date());
            fechaCelda.add(1, 'day');
        }
    
        while (calendarioArray.length % 7 !== 0) {
            calendarioArray.push('X');
        }
        return calendarioArray;
    }

    mesAnterior() {
        this.fechaActual.subtract(1, 'month');
        this.actualizarCalendario();
    }

    mesSiguiente() {
        this.fechaActual.add(1, 'month');
        this.actualizarCalendario();
    }

    actualizarCalendario() {
        this.primerDia = moment(this.fechaActual).startOf('month');
        this.ultimoDia = moment(this.fechaActual).endOf('month');
        this.generarCalendario();
    }

    actualizarFechaSeleccionada() {
        this.fechaSeleccionadaSpan.textContent = this.fechaActual.format('MMMM YYYY');
    }
    celdaClickeada(fecha) {
        let fechaMoment = moment(fecha);
        if (fechaMoment.isValid()) {
            this.fechaSeleccionadaSpan.textContent = fechaMoment.format('MMMM D, YYYY');
        } else {
            console.error('Fecha no válida');
        }
    }
}
export { Calendario };