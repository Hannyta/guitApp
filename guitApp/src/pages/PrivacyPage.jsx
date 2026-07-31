import { Link } from 'react-router-dom'
import { LegalPageLayout } from '../components/legal/LegalPageLayout'

export function PrivacyPage() {
  return (
    <LegalPageLayout title="Política de privacidad" updatedAt="31 de julio de 2026">
      <p>
        Esta Política de Privacidad explica qué datos recopila GuitApp (la "Aplicación"), para qué los usamos
        y qué opciones tenés sobre ellos.
      </p>

      <h2>1. Qué datos recopilamos</h2>
      <ul>
        <li>Tu email y, si iniciás sesión con Google, tu nombre y foto de perfil básicos.</li>
        <li>Los movimientos (ingresos y gastos), categorías y presupuestos que cargues vos mismo.</li>
        <li>
          Tu moneda y país preferidos, ya sea que los elijas manualmente o que los infiramos de forma
          automática por tu dirección IP al iniciar sesión por primera vez.
        </li>
      </ul>

      <h2>2. Cómo obtenemos tu país</h2>
      <p>
        Al iniciar sesión por primera vez, consultamos el servicio de terceros ipapi.co con tu dirección IP
        para sugerir tu país y moneda por defecto. Podés cambiar ese valor en cualquier momento desde los
        selectores del encabezado. Este paso no se repite una vez que ya elegiste un país o una moneda.
      </p>

      <h2>3. Cómo usamos tus datos</h2>
      <p>
        Usamos tus datos únicamente para mostrar tu información financiera, calcular tus gráficos y
        presupuestos, y personalizar la moneda de visualización. No usamos tus datos para publicidad ni los
        analizamos con fines comerciales.
      </p>

      <h2>4. Con quién compartimos datos</h2>
      <p>
        Tus datos se almacenan en Supabase, nuestro proveedor de base de datos e infraestructura. Si iniciás
        sesión con Google, Google procesa la autenticación según sus propias políticas. No vendemos ni
        compartimos tus datos con terceros con fines de marketing.
      </p>

      <h2>5. Seguridad</h2>
      <p>
        Cada cuenta solo puede acceder a sus propios datos: la base de datos aplica reglas de seguridad a
        nivel de fila (Row Level Security) que impiden que un usuario vea o modifique la información de otro.
      </p>

      <h2>6. Tus derechos</h2>
      <p>
        Podés corregir o eliminar tus movimientos, categorías y presupuestos en cualquier momento desde la
        Aplicación. Si querés eliminar tu cuenta por completo, contactanos.
      </p>

      <h2>7. Cambios a esta política</h2>
      <p>Podemos actualizar esta política ocasionalmente; la fecha de la última actualización figura arriba.</p>

      <h2>8. Contacto</h2>
      <p>
        Ante cualquier consulta sobre esta política o tus datos, escribinos a través de los canales de
        contacto de la Aplicación. También podés revisar nuestros <Link to="/terms">Términos de servicio</Link>.
      </p>
    </LegalPageLayout>
  )
}
