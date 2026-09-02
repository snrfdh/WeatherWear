const EMAIL_TUJUAN = 'snrfdh25@gmail.com'
const form = document.getElementById('form-masukan')

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const nama = document.getElementById('nama').value.trim()
    const email = document.getElementById('email').value.trim()
    const jenisSelect = document.getElementById('jenis')
    const jenis = jenisSelect.options[jenisSelect.selectedIndex].text
    const pesan = document.getElementById('pesan').value.trim()

    const subjek = `[WeatherWear] Masukan dari ${nama}`

    const isiPesan =
        `Nama : ${nama}
Email : ${email || '-'}
Jenis : ${jenis}
Pesan : ${pesan}`
    
    const linkMailto =
        `mailto:${EMAIL_TUJUAN}` +
        `?subject=${encodeURIComponent(subjek)}` +
        `&body=${encodeURIComponent(isiPesan)}`

    window.location.href = linkMailto
    alert('Masukan akan dikirim')

    form.reset()

})