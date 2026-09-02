const inputKota = document.getElementById('input-kota')
const hasilDiv = document.getElementById('hasil')
const cari = document.getElementById('cari')
const formCari = document.querySelector('main form')

cari.addEventListener('click', cariCuaca)

// === klik enter
inputKota.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        e.preventDefault()
        cariCuaca()
    }
})

// kosongkan hasil sebelum hasil baru dibawah search bar
function kosongkanHasil(){
    while(hasilDiv.firstChild){
        hasilDiv.removeChild(hasilDiv.firstChild)
    }
}

// menampilkan pesan hasil pencarian
function tampilPesan(teks){
    kosongkanHasil();
    const p = document.createElement('p')
    p.textContent = teks
    hasilDiv.appendChild(p)

}
// cari kota berdasarkan koordinat yang nantinya bakal dikirim lemparannya ke cuaca.html
function bukaHalamanCuaca(lokasi){
    const param = new URLSearchParams({
        kota: lokasi.name,
        lat: lokasi.latitude,
        lon: lokasi.longitude,
        admin1: lokasi.admin1 || '',
        admin2: lokasi.admin2 || '',
        country: lokasi.country || ''
    })
    window.location.href = `html/cuaca.html?${param.toString()}`
}

//menampilkan daftar kota - kota yang cocok dengan pencarian, memberi pilihan kota ke user
function tampilanPilihanKota(daftarLokasi){
    kosongkanHasil()

    const judul = document.createElement('p')
    judul.id = 'label-pilih-kota'
    judul.textContent = 'Ada beberapa kota dengan nama serupa, pilih salah satu:'
    hasilDiv.appendChild(judul)

    const ulPilihan = document.createElement('ul')
    ulPilihan.id = 'daftar-pilihan-kota'

    daftarLokasi.forEach(lokasi => {
        const li = document.createElement('li')
        const tombolPilih = document.createElement('button')
        tombolPilih.type = 'button'
        tombolPilih.className = 'opsi-kota'

        //susun teks lokasi lengkap
        const bagianLokasi = [lokasi.name, lokasi.admin1,lokasi.admin2,lokasi.country].filter(Boolean)
        tombolPilih.textContent = bagianLokasi.join(', ')

        tombolPilih.addEventListener('click', () => bukaHalamanCuaca(lokasi))

        li.appendChild(tombolPilih)
        ulPilihan.appendChild(li)
    });
    hasilDiv.appendChild(ulPilihan)
}

//fungsi yang dipanggi saat tombol cari di klik
async function cariCuaca() {
    const kota = inputKota.value.trim();

    if(!kota){
        tampilPesan("Silakan isi nama kota terlebih dahulu")
        return
    }
    tampilPesan("Mencari...")

    try{
        //ngambil data dari API
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(kota)}&count=5&language=id `)
        const geoData = await geoRes.json();
        if(!geoData.results || geoData.results.length === 0){
            tampilPesan('Kota tidak ditemukan!')
            return

        }
        if(geoData.results.length === 1){
            bukaHalamanCuaca(geoData.results[0])
            return
        }
        else{
            tampilanPilihanKota(geoData.results)
            return
        }
    }
    catch (error){
        tampilPesan('Data gagal diambil. Silakan cek kembali koneksi internet Anda')
        console.error(error)
    }
    
}