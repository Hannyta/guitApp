import { Link } from 'react-router-dom'
import { LegalPageLayout } from '../components/legal/LegalPageLayout'

export function TermsPage() {
  return (
    <LegalPageLayout title="Términos de servicio" updatedAt="31 de julio de 2026">
      <p>
        Estos Términos de Servicio ("Términos") rigen el uso de GuitApp (la "Aplicación"). Al crear una
        cuenta o usar la Aplicación, aceptás estos Términos.
      </p>

      <h2>1. Descripción del servicio</h2>
      <p>
        GuitApp es una herramienta personal para registrar ingresos y gastos, organizarlos por categorías,
        definir presupuestos mensuales y visualizar tu historial financiero mediante gráficos. No es un
        servicio bancario, no mueve dinero real y no constituye asesoría financiera, contable ni impositiva.
      </p>

      <h2>2. Tu cuenta</h2>
      <p>
        Sos responsable de mantener la confidencialidad de tus credenciales (o de la cuenta de Google que
        uses para iniciar sesión) y de toda actividad que ocurra en tu cuenta.
      </p>

      <h2>3. Uso aceptable</h2>
      <p>
        No debés usar la Aplicación para actividades ilegales, ni intentar acceder a datos de otros usuarios,
        interferir con su funcionamiento o realizar ingeniería inversa sobre ella.
      </p>

      <h2>4. Tus datos</h2>
      <p>
        Los movimientos, categorías y presupuestos que cargues son tuyos. Podés corregirlos o eliminarlos en
        cualquier momento desde la Aplicación. Para más detalle sobre qué datos recopilamos y cómo los usamos,
        consultá nuestra <Link to="/privacy">Política de privacidad</Link>.
      </p>

      <h2>5. Disponibilidad del servicio</h2>
      <p>
        La Aplicación se ofrece "tal cual", sin garantías de disponibilidad continua. Puede haber
        interrupciones, mantenimiento o cambios de funcionalidad sin aviso previo.
      </p>

      <h2>6. Limitación de responsabilidad</h2>
      <p>
        GuitApp se provee sin garantías de ningún tipo. No nos hacemos responsables por decisiones financieras
        tomadas en base a la información registrada en la Aplicación, ni por pérdida de datos.
      </p>

      <h2>7. Cambios a estos Términos</h2>
      <p>
        Podemos actualizar estos Términos ocasionalmente. Si los cambios son significativos, intentaremos
        avisarte dentro de la Aplicación.
      </p>

      <h2>8. Contacto</h2>
      <p>Si tenés preguntas sobre estos Términos, podés escribirnos a través de los canales de contacto de la Aplicación.</p>
    </LegalPageLayout>
  )
}
