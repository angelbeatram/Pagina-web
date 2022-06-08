const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#input-file");


let files;
//Creamos eventos

/*Abre el dialogo para poder agregar archivos directamente
En esta parte aun no esta la función de drop y drag*/

button.addEventListener("click", (e) =>{
    input.click();
});

/*Cada vez que cambie un archivo se coleara toda la zona,
aplicando el estilo de active de la style.css*/
input.addEventListener("change", (e) =>{
    files = input.files;
    dropArea.classList.add("active");
    showFiles(files);
    dropArea.classList.remove("active");
});

function showFiles(files){
    //Esta parte del if es cuando pasa un solo archivo
    if( files.length === undefined){
        processFile(files);
    }else{
        //Aqui es cuando hay muchos archivos
        for(const file of files){
            processFile(file);
        }
    }
}

//********PARTE DE ARRASTRAR Y SOLTAR OBJETOS*************

//Este se activara cuando estemos arrastrando las cosas
dropArea.addEventListener("dragover", (e) =>{
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Suelta para subir los archivos";
});

//Este se activara cuando estemos arrastrando el objeto, pero no estemos
//dentro de la zona de dejar las cosas
dropArea.addEventListener("dragleave", (e) =>{
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta las imagenes";

});

//Cuando soltamos los archivos que estamos arrastrando dentro de la zona
dropArea.addEventListener("drop", (e)=>{
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files)
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta las imagenes";
});



//*********Para poder procesar los archivos y agregarlos a la cola
function processFile(file){

    const docType = file.type;
    const validExtensions = ["image/jpeg", "image/jpg","image/png", "image/gif"];

    //en caso de que la extension sea valida
    if(validExtensions.includes(docType)){

        const fileReader = new FileReader();
        const id = `file-${Math.random().toString(32).substring(7)}`;

        fileReader.addEventListener('load', e =>{
            //Aqui nos regresa la URL de nuestra imagen, esta será la dirreción de nuestro equipo
            const fileUrl = fileReader.result;
            const image = `
                <div id="${id}" class="file-container">
                    <img src="${fileUrl}" alt="${file.name}" width="50">
                    <div class="status">
                        <span>${file.name}</span>
                        <span class="status-text">
                            Cargada
                        </span>
                    </div>
                
                </div>
            `;
            const html = document.querySelector('#preview').innerHTML;
            document.querySelector('#preview').innerHTML = image + html;
        });

        fileReader.readAsDataURL(file);

    }else{
        alert("No es un archivo valido");
    }

}

//Esta se actualiza una vez que se subio nuestro archivo, lo subimos a nuestra base
// de datos
