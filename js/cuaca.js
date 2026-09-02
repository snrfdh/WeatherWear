// kode cuaca bawaan untuk menentukan rekomendasi outfit berdasarkan suhu dan kategori cuaca
const KODE_CUACA = {
    0: { teks: 'Cerah', ikon: 'wb_sunny', kategori: 'cerah' },
    1: { teks: 'Cerah Berawan', ikon: 'partly_cloudy_day', kategori: 'cerah' },
    2: { teks: 'Berawan Sebagian', ikon: 'partly_cloudy_day', kategori: 'berawan' },
    3: { teks: 'Mendung', ikon: 'cloud', kategori: 'berawan' },
    45: { teks: 'Berkabut', ikon: 'foggy', kategori: 'kabut' },
    48: { teks: 'Kabut Beku', ikon: 'foggy', kategori: 'kabut' },
    51: { teks: 'Gerimis Ringan', ikon: 'rainy_light', kategori: 'gerimis' },
    53: { teks: 'Gerimis Sedang', ikon: 'rainy_light', kategori: 'gerimis' },
    55: { teks: 'Gerimis Lebat', ikon: 'rainy_light', kategori: 'gerimis' },
    61: { teks: 'Hujan Ringan', ikon: 'rainy', kategori: 'hujan' },
    63: { teks: 'Hujan Sedang', ikon: 'rainy', kategori: 'hujan' },
    65: { teks: 'Hujan Lebat', ikon: 'rainy', kategori: 'hujan' },
    71: { teks: 'Salju Ringan', ikon: 'ac_unit', kategori: 'salju' },
    73: { teks: 'Salju Sedang', ikon: 'ac_unit', kategori: 'salju' },
    75: { teks: 'Salju Lebat', ikon: 'ac_unit', kategori: 'salju' },
    80: { teks: 'Hujan Sebagian', ikon: 'rainy', kategori: 'hujan' },
    81: { teks: 'Hujan Lokal Sedang', ikon: 'rainy', kategori: 'hujan' },
    82: { teks: 'Hujan Lokal Lebat', ikon: 'thunderstorm', kategori: 'badai' },
    95: { teks: 'Badai Petir', ikon: 'thunderstorm', kategori: 'badai' },
    96: { teks: 'Badai Petir + Hujan Es', ikon: 'thunderstorm', kategori: 'badai' },
    99: { teks: 'Badai Petir + Hujan Es Lebat', ikon: 'thunderstorm', kategori: 'badai' }
};

//Mengambil kode dan memberi nilai default jika kode tidak dikenali
function deskripsiCuaca(kode) {
    return KODE_CUACA[kode] || { teks: 'Tidak Diketahui', ikon: 'help', kategori: 'lainnya' };
}

// membuat elemen icon + Gambar
function buatElemenIkon(namaIkon) {
    const span = document.createElement('span');
    span.className = 'material-symbols-outlined';
    span.textContent = namaIkon;
    return span;
}
function buatElemenGambar(namaFile){
    const img = document.createElement('img')
    img.src = `../assets/${namaFile}`
    img.className = 'gambar-outfit'
    return img
}

// LOGIKA REKOMENDASI OUTFIT
function rekomendasiOutfit(suhu, kategori){
    // Tentukan baju dasar berdasarkan suhu
    let dasar

    if(suhu <= 18){
        dasar = {
            teks: 'Cukup dingin, pakai jaket tebal atau sweater berbahan wol supaya tetap hangat.',
            gambar: 'salju.png',
            aksesoris: [
                { gambar: 'water_bottle', teks: 'Bawa tumbler isi air hangat, untuk menjaga badan tetap hangat.' },
                { gambar: 'healing', teks: 'Pakai lip balm, udara dingin membuat bibir mudah kering.' }
            ]
        }
    } else if(suhu <= 24){
        dasar = {
            teks: 'Cuaca sejuk, cocok pakai kemeja lengan panjang atau jaket tipis berbahan katun.',
            gambar: 'kemeja.png',
            aksesoris: [
                { gambar: 'water_bottle', teks: 'Bawa tumbler isi air hangat untuk menjaga badan tetap hangat.' }
            ]
        }
    } else if(suhu <= 30){
        dasar = {
            teks: 'Cuaca nyaman, kaos atau kemeja lengan pendek berbahan katun sudah cukup.',
            gambar: 'kaus.png',
            aksesoris: [
                { gambar: 'water_bottle', teks: 'Bawa tumbler isi air dingin agar tubuh tetap segar.' }
            ]
        }
    } else {
        dasar = {
            teks: 'Cuaca panas, pakai baju berbahan katun atau linen yang tipis agar menyerap keringat.',
            gambar: 'kaus.png',
            aksesoris: [
                { gambar: 'sunny', teks: 'Pakai sunscreen sebelum keluar rumah.' },
                { gambar: 'water_bottle', teks: 'Bawa tumbler isi air, supaya tubuh tetap terhidrasi.' },
                { gambar: 'healing', teks: 'Pakai lip balm, panas matahari membuat bibir kering.' }
            ]
        }
    }

    // MENAMBAH catatan + aksesoris sesuai kategori cuaca, di atas baju dasar tadi
    if(kategori === 'hujan' || kategori === 'gerimis'){
        dasar.teks += ' Di luar sedang hujan, tambahin jaket/pelapis tahan air di luar baju tadi.'
        dasar.gambar = 'jas.png'
        dasar.aksesoris.push({ gambar: 'umbrella', teks: 'Jangan lupa bawa payung atau jas hujan.' })
    } 
    else if(kategori === 'badai'){
        dasar.teks += ' Cuaca lagi badai, sebaiknya tunda dulu kalau bisa. Kalau harus keluar, pakai jaket waterproof dan sepatu tertutup.'
        dasar.gambar = 'jas.png'
        dasar.aksesoris.push({ gambar: 'umbrella', teks: 'Bawa payung atau jas hujan yang kuat, angin di luar kencang.' })
    } 
    else if(kategori === 'salju'){
        dasar.teks += ' Ada salju, pastikan pakaianmu berlapis dan tahan dingin ekstra.'
        dasar.gambar = 'salju.png'
    } 
    else if(kategori === 'kabut'){
        dasar.teks += ' Udara lembab dan jarak pandang terbatas, hati-hati kalau bepergian.'
        dasar.gambar = 'sweater.png'
    }

    return dasar
}

// RENDER
function renderRekomendasiOutfit(kotakOutfit,suhu,kategori, labelWaktu){
    kotakOutfit.textContent = ''

    const labelOutfit = document.createElement('p')
    labelOutfit.id = 'label-waktu-outfit'
    labelOutfit.textContent = `Rekomendasi untuk ${labelWaktu}`
    kotakOutfit.appendChild(labelOutfit)

    const outfit = rekomendasiOutfit(suhu,kategori)
    
    // MENAMPILKAN GAMBAR BAJU DAN TEKS
    const barisOutfit = document.createElement('div')
    barisOutfit.className = 'baris-outfit'

    if(outfit.gambar){
        barisOutfit.appendChild(buatElemenGambar(outfit.gambar))
    }

    const teksOutfit = document.createElement('p')
    teksOutfit.id = 'teks-outfit'
    teksOutfit.textContent = outfit.teks
    barisOutfit.appendChild(teksOutfit)

    kotakOutfit.appendChild(barisOutfit)

    // DAFTAR AKSESORIS
    if(outfit.aksesoris && outfit.aksesoris.length > 0){
        const wadahAksesoris = document.createElement('div')
        wadahAksesoris.id = 'wadah-aksesoris'

        outfit.aksesoris.forEach(item => {
            const kartuAksesoris = document.createElement('div')
            kartuAksesoris.className = 'kartu-aksesoris'

            if(item.gambar){
                kartuAksesoris.appendChild(buatElemenIkon(item.gambar))
            }

            const teksAksesoris = document.createElement('p')
            teksAksesoris.textContent = item.teks
            kartuAksesoris.appendChild(teksAksesoris)

            wadahAksesoris.appendChild(kartuAksesoris)
        })
        kotakOutfit.appendChild(wadahAksesoris)
    }
}

//mengambil koordinat dari query string yang dikirim dari halaman cari-kota
function ambilKoordinatDariUrl(params, namaKota){
    const lat = params.get('lat')
    const lon = params.get('lon')

    if(!lat || !lon){
        return null
    }
    return{
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        admin1: params.get('admin1') ||'',
        admin2: params.get('admin2') || '',
        country: params.get('country') || ''
    }
}

// FUNGSI UTAMA UNTUK MENGAMBIL SEMUA DATA CUACA
async function ambilCuaca() {
    const params = new URLSearchParams(window.location.search);
    const namaKota = params.get('kota');
    const judulKota = document.getElementById('judul-kota');
    const infoCuaca = document.getElementById('info-cuaca');
    const prediksiContainer = document.getElementById('prediksi-container');

    //VALIDASI
    if (!namaKota) {
        judulKota.textContent = 'Kota tidak ditentukan!';
        return;
    }

    judulKota.textContent = `Cuaca di ${namaKota}`;

    try {
        //ambil koordinat dari halaman cari
        const lokasi = ambilKoordinatDariUrl(params, namaKota)

        if(!lokasi){
            judulKota.textContent = 'Kota tidak ditemukan!';
            return;
        }

        const { latitude, longitude, admin1, admin2, country } = lokasi;
        // MENAMBAH PROVINSI DAN NEGARA SAAT DITAMPILKAN AGAR AKURAT
        const lokasiLengkap = [namaKota, admin1, admin2, country].filter(Boolean).join(', ')
        judulKota.textContent = `Cuaca di ${lokasiLengkap}`

        // Ambil data cuaca saat ini DAN prediksi harian (daily) 7 hari ke depan & per jam
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_mean&timezone=auto`);
        const weatherData = await weatherRes.json();

        //cek data current ada
        if(!weatherData.current){
            infoCuaca.textContent = 'Gagal memuat data cuaca saat ini.'
            return
        }

        //kosongkan container
        infoCuaca.textContent= "";
        prediksiContainer.textContent = "";

        // Tampilkan cuaca saat ini
        const cuacaSaatIni = deskripsiCuaca(weatherData.current.weather_code)
        const pSuhu = document.createElement('div')
        pSuhu.id = 'suhu-saat-ini'
        pSuhu.appendChild(buatElemenIkon(cuacaSaatIni.ikon))

        const teksSuhu = document.createElement('p')
        teksSuhu.textContent = `Suhu saat ini: ${weatherData.current.temperature_2m}°C`;
        pSuhu.appendChild(teksSuhu)

        const teksKondisi = document.createElement('p')
        teksKondisi.id = 'kondisi-saat-ini'
        teksKondisi.textContent = cuacaSaatIni.teks
        pSuhu.appendChild(teksKondisi)

        infoCuaca.appendChild(pSuhu)

        function warnaBg(suhu){
            if(suhu <= 15) return '#B5D4F4';
            if(suhu <= 25) return '#C0DD97';
            if(suhu <= 32) return '#FAC775';
            return '#F0997B'
        }
        //bg saat hover
        pSuhu.addEventListener('mouseenter', () =>{
            pSuhu.style.backgroundColor = warnaBg(weatherData.current.temperature_2m)
        });
        //bg saat menjauh
        pSuhu.addEventListener('mouseleave', () =>{
            pSuhu.style.backgroundColor = '';
        });
        //wadah untuk kelembapan dll
        const detailWrap = document.createElement('div')
        detailWrap.id = 'detail-cuaca'

        // kelembapan
        const kelembapan = document.createElement('div')
        kelembapan.className = 'kartu-detail'
        const labelLembab = document.createElement('p')
        labelLembab.className = 'label-detail'
        labelLembab.textContent = 'Kelembapan'
        const nilaiLembab = document.createElement('p')
        nilaiLembab.className = 'nilai-detail'
        nilaiLembab.textContent = `${weatherData.current.relative_humidity_2m}%`
        kelembapan.appendChild(labelLembab)
        kelembapan.appendChild(nilaiLembab)
        detailWrap.appendChild(kelembapan)

        // Angin
        const angin = document.createElement('div')
        angin.className = 'kartu-detail'
        const labelAngin = document.createElement('p')
        labelAngin.className = 'label-detail'
        labelAngin.textContent = 'Angin'
        const nilaiAngin = document.createElement('p')
        nilaiAngin.className = 'nilai-detail'
        nilaiAngin.textContent = `${weatherData.current.wind_speed_10m} km/j`
        angin.appendChild(labelAngin)
        angin.appendChild(nilaiAngin)
        detailWrap.appendChild(angin)

        // Curah Hujan
        const curahHujan = document.createElement('div')
        curahHujan.className = 'kartu-detail'
        const labelHujan = document.createElement('p')
        labelHujan.className = 'label-detail'
        labelHujan.textContent = 'Curah Hujan'
        const nilaiHujan = document.createElement('p')
        nilaiHujan.className = 'nilai-detail'
        nilaiHujan.textContent = `${weatherData.current.precipitation} mm`
        curahHujan.appendChild(labelHujan)
        curahHujan.appendChild(nilaiHujan)
        detailWrap.appendChild(curahHujan)
        
        infoCuaca.appendChild(detailWrap)
        
        // WADAH REKOMENDASI OUTFIT
        const kotakOutfit = document.createElement('div')
        kotakOutfit.id = 'rekomendasi-outfit'

        // render prediksi per jam
        if(weatherData.hourly){
            const waktuJam = weatherData.hourly.time
            const suhuJam = weatherData.hourly.temperature_2m
            const kodeJam = weatherData.hourly.weather_code
            const waktuSaatIni = weatherData.current.time

            let indexMulai = waktuJam.findIndex(t => t >= waktuSaatIni)
            if(indexMulai === -1) indexMulai = 0

            const judulJam = document.createElement('h3')
            judulJam.id = 'judul-per-jam'
            judulJam.textContent = 'Cuaca per Jam'
            prediksiContainer.appendChild(judulJam)
            
            const ulJam = document.createElement('ul')
            ulJam.id = 'daftar-jam'
            
            const semuaKartuJam = []
            
            // TAMPILKAN MAKSIMAL 24 JAM KEDEPAN DARI JAM SEKARANG
            const batasAkhir = Math.min(indexMulai + 24, waktuJam.length)
            for(let i = indexMulai; i < batasAkhir; i++){
                const cuacaJam = deskripsiCuaca(kodeJam[i])
                const li = document.createElement('li')
                li.className = 'kartu-jam'
                
                li.appendChild(buatElemenIkon(cuacaJam.ikon))
                
                const jamTeks = i === indexMulai
                ? 'Sekarang'
                : new Date(waktuJam[i]).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
                
                const jamLabel = document.createElement('span')
                jamLabel.className = 'jam-per-jam'
                jamLabel.textContent = jamTeks
                li.appendChild(jamLabel)
                
                const suhuSpan = document.createElement('span')
                suhuSpan.className = 'suhu-per-jam'
                suhuSpan.textContent = `${suhuJam[i]}°C`
                li.appendChild(suhuSpan)
                
                // MENANDAI AKTIF
                const pilihJamIni = () => {
                    semuaKartuJam.forEach(k => k.classList.remove('aktif'))
                    li.classList.add('aktif')
                    const labelWaktu = i === indexMulai ? 'sekarang' : `jam ${jamTeks}`
                    renderRekomendasiOutfit(kotakOutfit, suhuJam[i], cuacaJam.kategori, labelWaktu)
                }
                
                li.addEventListener('click', pilihJamIni)
                
                if(i === indexMulai) li.classList.add('aktif')
                    
                    semuaKartuJam.push(li)
                    ulJam.appendChild(li)
                }
                prediksiContainer.appendChild(ulJam)
            }


            
            // Rekomendasi outfit awal, sesuai cuaca saat ini
            renderRekomendasiOutfit(kotakOutfit, weatherData.current.temperature_2m, cuacaSaatIni.kategori, 'sekarang')
            prediksiContainer.appendChild(kotakOutfit)

            // Render Prediksi 7 Hari Kedepan
            if(weatherData.daily){
                const dates = weatherData.daily.time;
                const suhuHarian = weatherData.daily.temperature_2m_mean;
                const kodeCuaca = weatherData.daily.weather_code;
    
                const ul = document.createElement('ul')
    
                for(let i = 0; i < dates.length; i++){
                    const cuacaHari = deskripsiCuaca(kodeCuaca[i])
                    const li = document.createElement('li')
                    li.className = 'kartu-hari'
                    li.style.transition = 'background-color 1s ease'
    
                    li.appendChild(buatElemenIkon(cuacaHari.ikon))
    
                    const tanggal = document.createElement('span')
                    tanggal.className = 'tanggal-hari'
                    tanggal.textContent = dates[i]
                    li.appendChild(tanggal)
    
                    const suhu = document.createElement('span')
                    suhu.className = 'suhu-hari'
                    suhu.textContent = `${suhuHarian[i]}°C`
                    li.appendChild(suhu)
    
                    const kondisi = document.createElement('span')
                    kondisi.className = 'kondisi-hari'
                    kondisi.textContent = cuacaHari.teks
                    li.appendChild(kondisi)    

                    ul.appendChild(li)
                }
                prediksiContainer.appendChild(ul)
            }

    }
    catch (error) {
        infoCuaca.textContent = 'Gagal memuat data cuaca.';
        console.error(error);

    }

} 

// Jalankan fungsi
ambilCuaca();

