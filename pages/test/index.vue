<template>
	<div class="container mx-auto px-4 py-4 h-full">
		<div class="flex content-center items-center justify-center h-full">
			<div class="w-full lg:w-4/12 px-4">
				<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 h-auto">
					<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
						<h1>Template testing</h1>
					</div>
					<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
						<p v-html="$decode(string)"></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'test',
		layout: 'auth',
		data() {
			return {
				string: `&lt;p&gt;MINIMNYA FASILITAS TAK MEMUTUSKAN SEMANGAT BELAJAR PARA SANTRI&lt;/p&gt;\n&lt;p&gt;Pondok pesantren MIFTAHUL ULUM, KP. Peundeuy, Desa Pringkasap KEC. Pabuaran, KAB. Subang.&lt;/p&gt;\n&lt;p&gt;&amp;nbsp;Pesantren gratis untuk anak yatim dan dhuafa yang dibangun oleh KH. Hasyim pada tahun 1988 dan masih berdiri sampai saat ini,&amp;nbsp; menjadi udara segar bagi warga masyarakat untuk menyekolahkan anak mereka agar bisa belajar dan menghapal al-quran disana.&amp;nbsp;&lt;/p&gt;\n&lt;p&gt;&amp;nbsp;&lt;/p&gt;\n&lt;p&gt;Meski dalam perjalanan membangun pesantren yang penuh dengan perjuangan juga kesabaran, Sebab pihak pesantren paham kondisi ekonomi keluarga santri,&amp;nbsp; diantara 330 jumlah santri 20 orang diantaranya adalah anak yatim, sehingga sebagian santri tidak perlu membayar iuran sekolah dan sebagian santri lainnya membayar secara sukarela.&amp;nbsp;&lt;/p&gt;\n&lt;p&gt;&amp;nbsp;&lt;/p&gt;\n&lt;p&gt;Itulah mengapa sudah 17 tahun lamanya pondok pesantren belum melakukan renovasi pembangunan, sebab pihak pesantren masih belum memiliki biaya yang cukup untuk merenovasi bangunan pesantren. Mulai dari bangunan Gedung yang sudah rapuh, langit langit bolong, kayu jendelah keropos, lantai yang retak retak juga Gedung bangunan yang masih terbatas menghambat aktivitas belajar mengajar para santri. Seperti&amp;nbsp; Para santri tingkat SMP yang terpaksa belajar di masjid karena kurangnya Gedung bangunan untuk mereka bermukim, belajar, mengaji dan aktivitas sekolah lainnya.&lt;/p&gt;\n&lt;p&gt;&amp;nbsp;&lt;/p&gt;\n&lt;p&gt;Segala usaha sudah coba dilakukan oleh pihak pesantren dan juga warga masyarakat untuk melakukan swadaya , bergotong royong Bersama untuk merenovasi pesantren, tapi apalah daya kondisi ekonomi warga sekitar yang masih dalam keterbatasan, yang hanya mengumpulkan sedikit dana yang masih belum cukup untuk melakukan renovasi,&amp;nbsp; Mengharuskan mereka bersabar dengan lapang dada menunggu adanya bantuan untuk proses renovasi pembangunan pesantren.&amp;nbsp;&lt;/p&gt;\n&lt;p&gt;Walaupun&amp;nbsp; pesantren ini bukan pesantren yang bagus, dan tidak memiliki fasilitas yang memadai, tetapi pesantren ini bisa mencetak anak anak yang berprestasi yang tetap giat menuntut ilmu meski harus belajar di tengah himpitan adalah penanda bahwa mereka bersungguh-sungguh. Kerja keras ustaz-ustazah dan masyarakat untuk mewujudkan pesantren idaman perlu diapresiasi.&amp;nbsp;&lt;/p&gt;\n&lt;p&gt;&amp;nbsp;&lt;/p&gt;\n&lt;p&gt;Maka dari itu yuk kita patungan Bersama untuk membagun Gedung tahfidz untuk para santri penghapal al-quran pondok pesantren MIFTAHUL ULUM. Berikan infak terbaik kita untuk membantu pembangunan ponpes ini. Semoga apa yang kita berika bisa menjadi saksi kebaikan kita diakhirat nanti dan menjadi ladang pahala jariya kita.. dengan cara:&amp;nbsp;&amp;nbsp;&lt;/p&gt;\n&lt;p&gt;&lt;img src=&quot;https://amalsholeh-s3.imgix.net/content/r4nU2woorcyhqtgkihj7skeVo2An9jNGafKONMnR.png?ar=16:9&amp;amp;w=720&amp;amp;auto=format,compress&quot; alt=&quot;&quot; /&gt;&lt;/p&gt;`
			}
		}
	}
</script>