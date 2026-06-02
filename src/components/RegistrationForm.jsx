import { useState } from 'react';
import { motion } from 'framer-motion';
import { form, nextEvent } from '../data/content';
import Butterfly from './Butterfly.jsx';
import { useEventStatus } from '../data/eventStatus.jsx';

export default function RegistrationForm() {
  const eventStatus = useEventStatus();
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const formData = new FormData(e.target);
    const hubPayload = Object.fromEntries(formData.entries());

    // Postear PRIMERO al hub para verificar el cap del lado server.
    // Si responde 409 (sold_out), no posteamos a Formspree para no
    // mandar emails de inscripciones rechazadas.
    let hubRes;
    try {
      hubRes = await fetch('/api/inscripciones/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hubPayload),
      });
    } catch {
      hubRes = null;
    }

    if (hubRes && hubRes.status === 409) {
      // Cupo lleno justo mientras llenaba el form. Refrescamos el
      // contexto para que el resto de la página también lo refleje.
      eventStatus.refresh?.();
      setStatus('error');
      setErrorMsg(
        'Los cupos para esta edición ya están llenos. Escribinos por WhatsApp para sumarte a la lista de espera.'
      );
      return;
    }

    // El hub aceptó (201) o falló por motivos no-cupo (ej. Redis caído).
    // En ambos casos seguimos con Formspree para no perder la inscripción.
    try {
      const formspreeRes = await fetch(form.endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (formspreeRes.ok) {
        setStatus('success');
        e.target.reset();
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'inscripcion_enviada', {
            event_category: 'form',
            event_label: 'Hannah vs Miley Edition',
          });
        }
        // Refrescamos el contador global por si la página queda abierta.
        eventStatus.refresh?.();
      } else {
        const data = await formspreeRes.json().catch(() => ({}));
        setErrorMsg(data?.errors?.[0]?.message || form.errorMessage);
        setStatus('error');
      }
    } catch (err) {
      setErrorMsg(form.errorMessage);
      setStatus('error');
    }
  };

  // Render del panel SOLD OUT: reemplaza el form cuando el evento está lleno.
  if (eventStatus.soldOut) {
    return <SoldOutPanel />;
  }

  return (
    <section
      id="inscripcion"
      className="relative overflow-hidden bg-gradient-y2k section-pad"
    >
      <span className="pointer-events-none absolute left-10 bottom-10 text-4xl text-orange floaty" style={{ animationDelay: '1s' }}>✦</span>

      <Butterfly color="#E7552C" size={42} className="right-6 top-10 md:right-16 md:top-14"
                 rotate={12} driftX={-50} driftY={-100} spin={-18} flapMs={560} />
      <Butterfly color="#D6C774" size={28} className="left-1/3 top-6 hidden md:block"
                 rotate={-8} driftX={40} driftY={-120} spin={18} flapMs={620} delay={0.2} flip />
      <Butterfly color="#F4BABB" size={34} className="right-1/4 bottom-12 hidden md:block"
                 rotate={5} driftX={-30} driftY={-80} spin={-12} flapMs={580} delay={0.4} />

      <div className="container-site relative">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left: copy + payment info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <p className="eyebrow">{form.eyebrow}</p>
            <h2 className="mt-4 display text-4xl text-ink md:text-5xl">
              {form.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/85 md:text-lg">
              {form.subtitle}
            </p>

            <div className="mt-10 rounded-3xl bg-white p-7 shadow-md">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-violet">
                Método de pago
              </p>
              <p className="mt-3 font-display text-2xl font-semibold text-ink">
                {form.payment.method}
              </p>
              <p className="mt-1 text-base text-ink">{form.payment.number}</p>
              <p className="text-sm text-ink/80">A nombre de {form.payment.name}</p>
              <p className="mt-4 border-t border-violet/10 pt-4 text-sm leading-relaxed text-ink/85">
                {form.payment.note}
              </p>
            </div>

            <a
              href={form.whatsappFallback.href}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary mt-6 w-full sm:w-auto"
            >
              {form.whatsappFallback.label}
            </a>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl bg-white p-7 shadow-lg md:p-10">
              {status === 'success' ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-y2k text-white">
                    <span className="text-3xl">✦</span>
                  </div>
                  <h3 className="display text-3xl text-ink">¡Listo, pop star!</h3>
                  <p className="mt-4 max-w-md text-base text-ink/85">
                    {form.successMessage}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="btn-secondary mt-8"
                  >
                    Inscribir a otra persona
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input type="hidden" name="evento" value={nextEvent.title} />

                  <div>
                    <label htmlFor="nombre" className="label-base">
                      Nombre completo *
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      className="input-base"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="telefono" className="label-base">
                        Teléfono *
                      </label>
                      <input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        required
                        className="input-base"
                        placeholder="+506 0000 0000"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="label-base">
                        Correo electrónico *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="input-base"
                        placeholder="tu@correo.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="instagram" className="label-base">
                      Instagram
                    </label>
                    <input
                      id="instagram"
                      name="instagram"
                      type="text"
                      className="input-base"
                      placeholder="@tuusuario"
                    />
                  </div>

                  <div>
                    <label htmlFor="acompanantes" className="label-base">
                      ¿Vienes sola o con amigas? *
                    </label>
                    <select
                      id="acompanantes"
                      name="acompanantes"
                      required
                      className="input-base appearance-none"
                      defaultValue=""
                    >
                      <option value="" disabled>Seleccioná una opción</option>
                      <option value="sola">Voy sola</option>
                      <option value="con-amigas">Con amigas (también se inscriben aparte)</option>
                      <option value="quiero-conocer">Voy sola pero quiero conocer gente</option>
                    </select>
                  </div>

                  {/* Energía Hannah / Miley */}
                  <div>
                    <label className="label-base">{form.energy.label}</label>
                    <p className="mb-3 text-xs leading-relaxed text-ink/80">
                      {form.energy.intro}
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {form.energy.options.map((opt) => (
                        <label
                          key={opt.value}
                          htmlFor={`energy-${opt.value}`}
                          className="flex cursor-pointer items-center gap-3 rounded-2xl border border-violet/15 bg-white px-4 py-3 transition-colors hover:border-violet/40 has-[:checked]:border-violet has-[:checked]:bg-candy/40"
                        >
                          <input
                            id={`energy-${opt.value}`}
                            type="radio"
                            name="energia"
                            value={opt.label}
                            className="h-4 w-4 accent-violet"
                          />
                          <span className="text-sm font-medium text-ink">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="brunch" className="label-base">
                      Elegí tu brunch *
                    </label>
                    <p className="mb-3 text-xs leading-relaxed text-ink/80">
                      {form.brunchIntro}
                    </p>
                    <div className="space-y-3">
                      {form.brunchOptions.map((opt) => (
                        <label
                          key={opt.value}
                          htmlFor={`brunch-${opt.value}`}
                          className="flex cursor-pointer items-start gap-3 rounded-2xl border border-violet/15 bg-white p-4 transition-colors hover:border-violet/40 has-[:checked]:border-violet has-[:checked]:bg-candy/40"
                        >
                          <input
                            id={`brunch-${opt.value}`}
                            type="radio"
                            name="brunch"
                            value={opt.title}
                            required
                            className="mt-1 h-4 w-4 accent-violet"
                          />
                          <span className="flex-1">
                            <span className="block text-sm font-semibold text-ink">
                              {opt.title}
                              <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-violet">
                                {opt.tagline}
                              </span>
                            </span>
                            <span className="mt-1 block text-sm leading-relaxed text-ink/85">
                              {opt.description}
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lesiones" className="label-base">
                      ¿Tenés alguna lesión o condición que debamos conocer?
                    </label>
                    <textarea
                      id="lesiones"
                      name="lesiones"
                      rows={2}
                      className="input-base"
                      placeholder="Si no, dejalo en blanco."
                    />
                  </div>

                  <div>
                    <label htmlFor="comprobante" className="label-base">
                      Comprobante de pago / SINPE *
                    </label>
                    <textarea
                      id="comprobante"
                      name="comprobante"
                      rows={3}
                      required
                      className="input-base"
                      placeholder="Indicá si ya hiciste el SINPE: monto, fecha, hora y los últimos dígitos del número desde el que se envió."
                    />
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="label-base">
                      Mensaje adicional
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={3}
                      className="input-base"
                      placeholder="Algo que quieras contarnos."
                    />
                  </div>

                  {status === 'error' && (
                    <p className="rounded-xl bg-bubblegum/10 px-4 py-3 text-sm text-bubblegum">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'submitting' ? 'Enviando…' : '✦ Apartar mi spot'}
                  </button>

                  <p className="text-center text-xs text-ink/80">
                    Al enviar este formulario aceptás que te contactemos por WhatsApp para confirmar tu cupo.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Panel que reemplaza el formulario cuando los cupos están llenos.
// Mantiene el id #inscripcion para que los anchors del Hero/Header/Details
// sigan funcionando (la persona aterriza acá y entiende qué pasó).
function SoldOutPanel() {
  const waitlistHref =
    'https://wa.me/' +
    '50670101783' +
    '?text=Hola%2C%20quiero%20entrar%20a%20la%20lista%20de%20espera%20de%20Sculpt%20Society%20%E2%80%94%20Hannah%20vs%20Miley%20Edition';

  return (
    <section
      id="inscripcion"
      className="relative overflow-hidden bg-gradient-y2k section-pad"
    >
      <Butterfly
        color="#E7552C"
        size={42}
        className="right-6 top-10 md:right-16 md:top-14"
        rotate={12}
        driftX={-50}
        driftY={-100}
        spin={-18}
        flapMs={560}
      />
      <Butterfly
        color="#F4BABB"
        size={34}
        className="left-8 bottom-12 hidden md:block"
        rotate={-10}
        driftX={50}
        driftY={-120}
        spin={20}
        flapMs={620}
        delay={0.3}
        flip
      />

      <div className="container-site relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl md:p-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-y2k px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-wine shadow-sm">
            ✦ Cupos agotados ✦
          </span>

          <h2 className="mt-6 display text-5xl text-ink md:text-6xl">
            <span className="bg-gradient-to-r from-orange to-wine bg-clip-text text-transparent italic">
              Sold out.
            </span>
          </h2>

          <p className="mt-5 text-base leading-relaxed text-ink/85 md:text-lg">
            Las 24 entradas para la Hannah vs Miley Edition se vendieron.
            Si querés sumarte a la lista de espera (por si alguien libera
            su cupo), escribinos por WhatsApp y te avisamos primera.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={waitlistHref}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              ✦ Sumarme a la lista de espera
            </a>
            <a
              href="https://instagram.com/sculptsocietycr"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Seguir en Instagram
            </a>
          </div>

          <p className="mt-6 text-xs text-ink/70">
            La próxima edición se anuncia primero por nuestro Instagram.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
