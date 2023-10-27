const output = document.getElementById("output");
var url = "https://api.hadith.gading.dev/books";


function getListHadits() {
    axios.get(url).then(function (res) {
    var hadits = res.data.data
    .map((h) => {
        return `<div class="card-hadits">
        <div class="img-hadits">
            <img src="./images/${h.id}.jpg" alt="${h.name}" />
        </div>
        <h2>${h.name}</h2>
        <p>Jumlah hadits : <b>${h.available}</b></p>
        <a class="btn btn-secondary w-75" href="./hadits/${h.id}.html" 
        target="_blank">Klik Buku Ini</a>
        </div>`;
    })
    .join("");

    output.innerHTML = hadits;
});
}


const outputHadits = document.getElementById("output-hadits");

var currentURL = window.location.href;
var fileName = currentURL.split('/').pop();
var fileNameWithoutExtension = fileName.replace(/\.html$/, '');


function getHaditsById() {
    axios.get(`${url}/${fileNameWithoutExtension}?range=1-300`).then
    (function (res) {
        var getHadits = res.data.data.hadiths
        .map((hadits) => {
            return `
            <div class="arab p-5">
            <h2>Hadits No : <p>${hadits.number}</p> </h2>
            <p class="text-end" fs-2>${hadits.arab}</p>
            <p>${hadits.id}</p>
            </div>
            `;
            })
            .join("");

            outputHadits.innerHTML = getHadits;
    });
}

// function btnSearch() {
//     const search = document.getElementById("search-hadits").value;
//     const outputSearch = document.getElementById("output-search")

//     axios
//     .get(`${url}/${fileNameWithoutExtension}/${search}`)
//     .then(function (res) {
//         var getSearch = res.data.data.contents;

//        outputSearch.innerHTML = `<p>${getSearch.arab}</p> <p>${getSearch.id}</p>`;
       
//     });
// }

function btnSearch() {
    const search = document.getElementById("search-hadits").value
    const judulPencarian = document.getElementById("judul-pencarian")
    const hasilPencarian = document.getElementById("output-search")

    axios
    .get(`${url}/${fileNameWithoutExtension}?range=1-300`)
    .then(function (res) {
        var getSearch = res.data.data.hadiths.filter((fill) => {
            return fill.id.toLowerCase().includes(search.toLowerCase());
        });

       
    
        if (search.length > 0) {
            judulPencarian.innerHTML = `pencarian Hadits : <br> ${search}</br>`;

            hasilPencarian.innerHTML = getSearch.map((hasil) => {
                return`<div class="arab p-5">
                <h2 class="bg-danger  text-white p-2 mb-1" >Hadits No : <p>${hasil.number}</p> </h2>
                <p class="text-end" fs-2>${hasil.arab}</p>
                <h3>Artinya :</h3>
                <pre class="text-hadits fs-10">${hasil.id}</pre>
                </div>
                `;
            })
            .join("");
        } else if (search == "" ) {
            judulPencarian.innerHTML = "";
            hasilPencarian.innerHTML= "Data Tidak Tersedia";
        }
    });

}



