"use client";

import { useTranslations } from "@/hooks/useTranslations";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import Footer from "@/components/Footer";


export default function Home() {
  const { t } = useTranslations();

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <Header />
      {/* Contenido */}
       <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        {/* Sobre Nosotros */}
        <section className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-black font-bold mb-4">{t('home.aboutUs.title')}</h2>
            <div className="w-20 h-1 bg-green-800 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-green-800 text-xl">{t('home.aboutUs.history.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {t('home.aboutUs.history.description')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-green-800 text-xl">{t('home.aboutUs.mission.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {t('home.aboutUs.mission.description')}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="relative">
              <img
                src={"/assets/CRZedificio.png"}
                alt={t('home.images.building')}
                className="w-full h-102 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="bg-gray-200 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">{t('home.values.title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: t('home.values.empathy.title'),
                desc: t('home.values.empathy.description'),
              },
              {
                title: t('home.values.excellence.title'),
                desc: t('home.values.excellence.description'),
              },
              {
                title: t('home.values.innovation.title'),
                desc: t('home.values.innovation.description'),
              },
              {
                title: t('home.values.confidentiality.title'),
                desc: t('home.values.confidentiality.description'),
              },
              {
                title: t('home.values.accessibility.title'),
                desc: t('home.values.accessibility.description'),
              },
            ].map((valor, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-green-800 text-xl">{valor.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{valor.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Equipo Fundador */}
        <section className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">{t('home.team.title')}</h2>
            <div className="w-20 h-1 bg-green-800 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={"/assets/fundadores.png"}
                alt={t('home.images.team')}
                className="w-full h-80 object-cover rounded-xl shadow-lg"
              />
            </div>

            <div className="space-y-6">
              {[
                {
                  name: t('home.team.members.francisco.name'),
                  role: t('home.team.members.francisco.role'),
                  desc: t('home.team.members.francisco.description'),
                },
                {
                  name: t('home.team.members.nicolas.name'),
                  role: t('home.team.members.nicolas.role'),
                  desc: t('home.team.members.nicolas.description'),
                },
                {
                  name: t('home.team.members.malena.name'),
                  role: t('home.team.members.malena.role'),
                  desc: t('home.team.members.malena.description'),
                },
                {
                  name: t('home.team.members.lara.name'),
                  role: t('home.team.members.lara.role'),
                  desc: t('home.team.members.lara.description'),
                },
              ].map((doctor, index) => (
                <Card key={index} className="border-l-4 border-l-green-800 border-t-0 border-r-0 border-b-0 shadow-sm">
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-black">{doctor.name}</h3>
                    <p className="text-green-800 text-lg font-medium mb-2">{doctor.role}</p>
                    <p className="text-gray-600 text-lg leading-relaxed">{doctor.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

{/* Video Institucional */}
<section className="space-y-8">
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold text-black mb-4">
      {t('home.video.title')}
    </h2>
    <div className="w-20 h-1 bg-green-800 mx-auto rounded-full"></div>
  </div>

  <div className="flex justify-center">
    <div className="w-full md:w-3/4 lg:w-2/3 rounded-xl overflow-hidden shadow-lg">
      <iframe
        className="w-full aspect-video"
        src="https://www.youtube.com/embed/XXXXXXXX" 
        title="Video Institucional"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
</section>

        {/* Servicios */}
        <section className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">{t('home.services.title')}</h2>
            <div className="w-20 h-1 bg-green-800 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              t('home.services.service1'),
              t('home.services.service2'),
              t('home.services.service3'),
              t('home.services.service4'),
              t('home.services.service5'),
              t('home.services.service6'),
            ].map((servicio, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <p className="text-gray-600 leading-relaxed">{servicio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
