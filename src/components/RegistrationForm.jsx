import { useState } from 'react';
import { motion } from 'framer-motion';
import { form, nextEvent } from '../data/content';

export default function RegistrationForm() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const formData = new FormData(e.target);

    try {
      const res = await fetch(form.endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        e.target.reset();
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'inscripcion_enviada', {
            event_category: 'form',
            event_label: 'Hannah Montana Edition',
          });
        }
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data?.errors?.[0]?.message || form.errorMessage);
        setStatus('error');
      }
    } catch (err) {
      setErrorMsg(form.errorMessage);
      setStatus('error');
    }
  };

  return (
    <section id="inscripcion" className="bg-pink/30 section-pad">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left: copy + payment info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <p className="eyebrow mb-4">{form.eyebrow}</p>
            <h2 className="display text-4xl text-wine md:text-5xl">{form.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-charcoal/75 md:text-lg">
              {form.subtitle}
            </p>

            <div className="mt-10 rounded-2xl bg-cream p-7">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange">
                Método de pago
              </p>
              <p className="mt-3 text-2xl font-semibold text-wine">{form.payment.method}</p>
              <p className="mt-1 text-base text-charcoal">{form.payment.number}</p>
              <p className="text-sm text-charcoal/60">A nombre de {form.payment.name}</p>
              <p className="mt-4 border-t border-charcoal/10 pt-4 text-sm leading-relaxed text-charcoal/70">
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
            <div className="rounded-3xl bg-cream p-7 md:p-10">
              {status === 'success' ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold/30">
                    <span className="text-3xl text-wine">✦</span>
                  </div>
                  <h3 className="display text-3xl text-wine">¡Listo!</h3>
                  <p className="mt-4 max-w-md text-base text-charcoal/75">{form.successMessage}</p>
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
                  {/* Hidden field with event name for Formspree */}
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

                  <div>
                    <label htmlFor="brunch" className="label-base">
                      Elegí tu brunch *
                    </label>
                    <p className="mb-3 text-xs leading-relaxed text-charcoal/60">
                      {form.brunchIntro}
                    </p>
                    <div className="space-y-3">
                      {form.brunchOptions.map((opt) => (
                        <label
                          key={opt.value}
                          htmlFor={`brunch-${opt.value}`}
                          className="flex cursor-pointer items-start gap-3 rounded-2xl border border-charcoal/10 bg-white/60 p-4 transition-colors hover:border-wine/40 has-[:checked]:border-wine has-[:checked]:bg-pink/30"
                        >
                          <input
                            id={`brunch-${opt.value}`}
                            type="radio"
                            name="brunch"
                            value={opt.title}
                            required
                            className="mt-1 h-4 w-4 accent-wine"
                          />
                          <span className="flex-1">
                            <span className="block text-sm font-semibold text-wine">
                              {opt.title}
                              <span className="ml-2 text-xs font-medium uppercase tracking-[0.15em] text-orange">
                                {opt.tagline}
                              </span>
                            </span>
                            <span className="mt-1 block text-sm leading-relaxed text-charcoal/75">
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
                    <p className="rounded-xl bg-orange/10 px-4 py-3 text-sm text-orange">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'submitting' ? 'Enviando…' : 'Enviar inscripción'}
                  </button>

                  <p className="text-center text-xs text-charcoal/50">
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
