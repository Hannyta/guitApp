import { LegalPageLayout } from '../components/legal/LegalPageLayout'

export function HelpPage() {
  return (
    <LegalPageLayout title="Ayuda y contacto" updatedAt="31 de julio de 2026">
      <p>
        GuitApp te permite registrar tus ingresos y gastos, organizarlos por categoría, definir
        presupuestos mensuales y ver tu historial con gráficos interactivos.
      </p>

      <h2>¿Cómo cambio mi moneda?</h2>
      <p>Desde el selector de moneda en el encabezado, arriba a la derecha.</p>

      <h2>¿Cómo creo una categoría nueva?</h2>
      <p>
        Andá a la sección "Categorías" en el menú y usá el formulario "Nueva categoría", donde
        también podés elegir un color y un ícono.
      </p>

      <h2>¿Cómo edito o elimino un movimiento o presupuesto?</h2>
      <p>
        En las secciones "Movimientos" y "Presupuestos", cada fila tiene un ícono de lápiz (editar)
        y uno de papelera (eliminar).
      </p>

      <h2>¿Necesitás ayuda con algo más?</h2>
      <p>
        Escribinos a <a href="mailto:Soporte@guitapp.com">Soporte@guitapp.com</a> y te
        respondemos a la brevedad.
      </p>
    </LegalPageLayout>
  )
}
