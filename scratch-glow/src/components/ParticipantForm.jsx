import { useState } from 'react';
import { motion } from 'framer-motion';
import { COPY } from '../data/copy.js';
import { validateParticipantForm, normalizePhone, normalizeInstagram } from '../utils/validation.js';
import { participate } from '../utils/api.js';

export default function ParticipantForm({ onReady, onFull }) {
  const [values, setValues] = useState({ nombre: '', telefono: '', instagram: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const { ok, errors: localErrors } = validateParticipantForm(values);
    setErrors(localErrors);
    if (!ok) return;

    setSubmitting(true);
    try {
      const res = await participate({
        nombre: values.nombre.trim(),
        telefono: normalizePhone(values.telefono),
        instagram: values.instagram ? normalizeInstagram(values.instagram) : '',
      });

      if (res.kind === 'already') onReady(res.participant, { isNew: false });
      else if (res.kind === 'new') onReady(res.participant, { isNew: true });
      else if (res.kind === 'full') onFull?.();
    } catch (err) {
      if (err.status === 409 || err.data?.kind === 'full') {
        onFull?.();
      } else {
        setServerError(
          'Algo salió mal — probá de nuevo en unos segundos. Si no funciona avisanos al equipo.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="screen relative flex flex-1 flex-col justify-center pt-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="eyebrow mb-3">Antes de rascar</p>
        <h1 className="display text-[2.5rem] text-charcoal leading-[1]">
          {COPY.form.title}
          <span className="text-orange">.</span>
        </h1>
        <p className="mt-4 text-sm text-charcoal/75">{COPY.form.subtitle}</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        onSubmit={handleSubmit}
        className="card mt-8 space-y-5 p-6"
        noValidate
      >
        <Field
          label={COPY.form.nombreLabel}
          name="nombre"
          autoComplete="name"
          value={values.nombre}
          error={errors.nombre}
          placeholder={COPY.form.nombrePlaceholder}
          onChange={(v) => setValues({ ...values, nombre: v })}
        />

        <Field
          label={COPY.form.telefonoLabel}
          name="telefono"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.telefono}
          error={errors.telefono}
          placeholder={COPY.form.telefonoPlaceholder}
          onChange={(v) => setValues({ ...values, telefono: v })}
        />

        <Field
          label={
            <>
              {COPY.form.instagramLabel}{' '}
              <span className="text-charcoal/50 normal-case tracking-normal font-normal">
                · {COPY.form.instagramHint}
              </span>
            </>
          }
          name="instagram"
          autoComplete="off"
          value={values.instagram}
          placeholder={COPY.form.instagramPlaceholder}
          onChange={(v) => setValues({ ...values, instagram: v })}
        />

        {serverError && (
          <p className="rounded-xl bg-orange/10 px-4 py-3 text-sm text-orange">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full py-4 text-base"
        >
          {submitting ? 'Enviando…' : `✦ ${COPY.form.cta}`}
        </button>

        <p className="text-center text-[11px] text-charcoal/60">{COPY.form.legal}</p>
      </motion.form>
    </section>
  );
}

function Field({ label, name, type = 'text', value, error, placeholder, onChange, ...rest }) {
  return (
    <div>
      <label htmlFor={name} className="label-base">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`input-base ${
          error ? 'border-orange focus:border-orange focus:ring-orange/30' : ''
        }`}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-orange">{error}</p>}
    </div>
  );
}
